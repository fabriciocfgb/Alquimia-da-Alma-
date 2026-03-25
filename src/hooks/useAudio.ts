import { useState, useRef, useEffect } from 'react';
import { AnneAI } from '../services/AnneAI';

export const useAudio = (voices: SpeechSynthesisVoice[], useFastVoice: boolean, activeModeVoice: string) => {
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [audioStatus, setAudioStatus] = useState<'playing' | 'paused' | 'stopped'>('stopped');

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferCache = useRef<Map<number, AudioBuffer>>(new Map());
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/!\[([^\]]+)\]\([^\)]+\)/g, '')   // Remove imagens markdown
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links mantendo o texto
      .replace(/\*\*\*/g, '') // Remove separadores
      .replace(/\*\*/g, '')   // Remove negrito
      .replace(/\*/g, '')     // Remove itálico
      .replace(/###/g, '')    // Remove headers h3
      .replace(/##/g, '')     // Remove headers h2
      .replace(/#/g, '')      // Remove headers h1
      .replace(/`/g, '')      // Remove code blocks
      .replace(/>/g, '')      // Remove quotes
      .replace(/---/g, '')    // Remove horizontal rules
      .replace(/___/g, '')    // Remove horizontal rules
      .replace(/^[ \t]*[-*+][ \t]+/gm, '') // Remove list markers at start of lines
      .replace(/[\\/|<>~_]/g, ' ') // Remove caracteres especiais que podem ser falados
      .replace(/\n/g, ' ')    // Troca quebras de linha por espaços
      .replace(/\s+/g, ' ')   // Remove espaços múltiplos
      .trim();
  };

  const stopCurrentAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
    setIsSpeaking(null);
    setAudioStatus('stopped');
    pausedAtRef.current = 0;
  };

  const playFromOffset = (index: number, buffer: AudioBuffer, offset: number) => {
    if (!audioContextRef.current) return;

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    
    source.onended = () => {
      if (sourceNodeRef.current === source) {
        setIsSpeaking(null);
        setAudioStatus('stopped');
        pausedAtRef.current = 0;
      }
    };

    startTimeRef.current = Date.now() - (offset * 1000);
    sourceNodeRef.current = source;
    source.start(0, offset);
    setAudioStatus('playing');
  };

  const startPlayback = async (index: number, text: string) => {
    setIsSpeaking(index);
    setAudioStatus('playing');

    try {
      let buffer = audioBufferCache.current.get(index);

      if (!buffer) {
        setIsGeneratingAudio(index);
        const cleanedText = cleanTextForSpeech(text);
        const base64Audio = await AnneAI.generateSpeech(cleanedText, activeModeVoice);
        setIsGeneratingAudio(null);

        if (!base64Audio) {
          throw new Error("Erro ao gerar voz.");
        }
        
        const audioData = atob(base64Audio);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const uint8View = new Uint8Array(arrayBuffer);
        for (let i = 0; i < audioData.length; i++) {
          uint8View[i] = audioData.charCodeAt(i);
        }

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        const int16Buffer = new Int16Array(arrayBuffer);
        const float32Buffer = new Float32Array(int16Buffer.length);
        for (let i = 0; i < int16Buffer.length; i++) {
          float32Buffer[i] = int16Buffer[i] / 32768.0;
        }

        buffer = audioContextRef.current.createBuffer(1, float32Buffer.length, 24000);
        buffer.getChannelData(0).set(float32Buffer);
        audioBufferCache.current.set(index, buffer);
      }

      if (buffer) {
        playFromOffset(index, buffer, 0);
      } else {
        setIsSpeaking(null);
        setAudioStatus('stopped');
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsGeneratingAudio(null);
      setIsSpeaking(null);
      setAudioStatus('stopped');
    }
  };

  const speakMessage = async (index: number, text: string) => {
    if (useFastVoice) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        if (isSpeaking === index) {
          setIsSpeaking(null);
          setAudioStatus('stopped');
          return;
        }
      }

      const cleanedText = cleanTextForSpeech(text);
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'pt-BR';
      
      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      const ptVoices = currentVoices.filter(v => v.lang.includes('pt-BR'));
      
      const preferredVoice = ptVoices.find(v => v.name.includes('Natural')) || 
                            ptVoices.find(v => v.name.includes('Google')) ||
                            ptVoices.find(v => v.name.includes('Maria')) ||
                            ptVoices.find(v => v.name.includes('Francisca')) ||
                            ptVoices.find(v => v.name.includes('Heloisa')) ||
                            ptVoices[0];

      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.pitch = 1.0;
      utterance.rate = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(index);
        setAudioStatus('playing');
      };

      utterance.onend = () => {
        setIsSpeaking(null);
        setAudioStatus('stopped');
      };

      utterance.onerror = () => {
        setIsSpeaking(null);
        setAudioStatus('stopped');
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    if (isSpeaking === index) {
      if (audioStatus === 'playing') {
        if (sourceNodeRef.current) {
          sourceNodeRef.current.stop();
          sourceNodeRef.current = null;
        }
        pausedAtRef.current = Date.now() - startTimeRef.current;
        setAudioStatus('paused');
      } else if (audioStatus === 'paused') {
        const buffer = audioBufferCache.current.get(index);
        if (buffer) {
          playFromOffset(index, buffer, pausedAtRef.current / 1000);
        }
      } else {
        startPlayback(index, text);
      }
      return;
    }

    if (isSpeaking !== null) {
      stopCurrentAudio();
    }

    startPlayback(index, text);
  };

  return {
    isGeneratingAudio,
    isSpeaking,
    audioStatus,
    speakMessage,
    stopCurrentAudio
  };
};
