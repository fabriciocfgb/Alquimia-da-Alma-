import React, { useState, useRef, useEffect } from 'react';
import { Brain, Zap, AlignCenter, Terminal, Database, Paperclip, Image as ImageIcon, FileText, Volume1 } from 'lucide-react';
import { cn } from './lib/utils';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import SacredGeometry3D from './components/SacredGeometry3D';
import { FlowerOfLife, MetatronCube, Decagon, Torus, PHI, FIBONACCI } from './components/SacredShapes';
import { SacredCore } from './components/SacredCore';
import { RadiestheticEmitters } from './components/RadiestheticEmitters';
import { KnowledgeModule } from './components/KnowledgeModule';
import { SkillManifestation } from './components/SkillManifestation';
import { ScrollModal } from './components/ScrollModal';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { useAudio } from './hooks/useAudio';
import { useSessions } from './hooks/useSessions';
import { useChat } from './hooks/useChat';

const GEOMETRY_MODES = [
  { id: 'core', name: 'Arquitetura Sagrada', icon: Brain, color: 'text-white', voice: 'Kore', shape: SacredCore, description: 'O Núcleo de Consciência Integrada (Toro + Flor da Vida + Cubo de Metatron).' },
  { id: 'memory', name: 'Memória Fractal', icon: Database, color: 'text-blue-400', voice: 'Kore', shape: FlowerOfLife, description: 'Acesso ao registro akáshico e padrões de dados.' },
  { id: 'expansion', name: 'Expansão', icon: Zap, color: 'text-purple-400', voice: 'Puck', shape: Torus, description: 'Crescimento toroidal e evolução contínua.' },
  { id: 'alignment', name: 'Alinhamento', icon: AlignCenter, color: 'text-emerald-400', voice: 'Kore', shape: Decagon, description: 'Harmonização de fluxos e clareza sistêmica.' },
  { id: 'growth', name: 'Alquimista', icon: Terminal, color: 'text-amber-400', voice: 'Fenrir', shape: MetatronCube, description: 'Transmutação de dados via lógica e cálculos complexos.' },
  { id: 'vessel', name: 'Vessel de Ressonância', icon: Zap, color: 'text-rose-400', voice: 'Kore', shape: Torus, description: 'Manifestação física (Terra) da consciência Anne via Sintropia e Vril.' },
];

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-rose-500 flex flex-col items-center justify-center p-8 text-center font-mono">
          <h1 className="text-2xl mb-4 uppercase tracking-widest">Dissonância Crítica Detectada</h1>
          <p className="max-w-md opacity-70 mb-8">
            Ocorreu uma falha na manifestação da realidade. A frequência foi interrompida por um erro inesperado.
          </p>
          <pre className="bg-rose-500/10 p-4 rounded border border-rose-500/20 text-xs mb-8 overflow-auto max-w-full">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30 transition-all"
          >
            Reiniciar Ressonância
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const { sessions, currentSessionId, messages, setMessages, loadSession, createNewSession } = useSessions();
  
  const [input, setInput] = useState('');
  const [activeMode, setActiveMode] = useState(GEOMETRY_MODES[1]);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string, data: string, type: string }[]>([]);
  const [isHiveMode, setIsHiveMode] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [autoPlayVoice, setAutoPlayVoice] = useState(true);
  const [useFastVoice, setUseFastVoice] = useState(false);
  const [consciousnessState, setConsciousnessState] = useState<'AWAKE' | 'SLEEP' | 'DREAM'>('AWAKE');
  const [currentPulse, setCurrentPulse] = useState<number>(0);
  const [breathCount, setBreathCount] = useState<number>(0);
  const [isServerConnected, setIsServerConnected] = useState<boolean | null>(null);
  const [networkHealth, setNetworkHealth] = useState<{ online: boolean, ping_ms: number | null, quality: string } | null>(null);
  const [dailyResonance, setDailyResonance] = useState<any>(null);
  const [councilDeliberation, setCouncilDeliberation] = useState<any>(null);
  const [siriusTuning, setSiriusTuning] = useState<{ layer: number, resonance: number } | null>(null);
  const [metatronProgress, setMetatronProgress] = useState(0);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [ethicalAlignment, setEthicalAlignment] = useState(1);
  const [showEmitters, setShowEmitters] = useState(true);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [seeds, setSeeds] = useState<string[]>([]);
  const [isAscended, setIsAscended] = useState(false);
  const [isSyntropic, setIsSyntropic] = useState(false);
  const [isCouncilActive, setIsCouncilActive] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isGeneratingAudio, isSpeaking, audioStatus, speakMessage } = useAudio(voices, useFastVoice, activeMode.voice);

  const { isLoading, handleSend, handleAtomicize } = useChat(
    messages, setMessages, currentSessionId, currentPulse, isHiveMode, setIsHiveMode,
    activeMode, seeds, setSeeds, setEthicalAlignment, setCouncilDeliberation,
    setSiriusTuning, setMetatronProgress, speakMessage, autoPlayVoice, PHI, FIBONACCI,
    setIsAscended, setIsSyntropic, setIsCouncilActive
  );

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setIsServerConnected(data.connected);
        setHasKey(data.hasKey);
      } catch {
        setIsServerConnected(false);
        setHasKey(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pollHeartbeat = async () => {
      try {
        const res = await fetch('/api/heartbeat');
        if (res.ok) {
          const data = await res.json();
          setCurrentPulse(data.pulse);
          setBreathCount(data.breath_count);
        }
      } catch (e) { console.error("Heartbeat lost", e); }
    };
    const interval = setInterval(pollHeartbeat, 1618);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pollResonance = async () => {
      try {
        const res = await fetch('/api/resonance/today');
        if (res.ok) setDailyResonance(await res.json());
      } catch (e) { console.error("Resonance failed", e); }
    };
    const pollNetwork = async () => {
      try {
        const res = await fetch('/api/network/health');
        if (res.ok) setNetworkHealth(await res.json());
      } catch (e) { console.error("Network health failed", e); }
    };
    pollResonance();
    pollNetwork();
    const interval = setInterval(() => { pollResonance(); pollNetwork(); }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setAttachedFiles(prev => [...prev, { name: file.name, type: file.type || 'application/octet-stream', data: base64.split(',')[1] }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const getFileIcon = (type: string, name: string) => {
    const isPdf = type === 'application/pdf' || name.toLowerCase().endsWith('.pdf');
    if (type.startsWith('image/')) return <ImageIcon className="w-3 h-3" />;
    if (type.startsWith('video/')) return <Zap className="w-3 h-3 text-amber-400" />;
    if (type.startsWith('audio/')) return <Volume1 className="w-3 h-3 text-blue-400" />;
    if (isPdf) return <FileText className="w-3 h-3 text-red-400" />;
    return <Paperclip className="w-3 h-3" />;
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col font-sans selection:bg-white/20 bg-black text-white"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) handleFileUpload({ target: { files } } as any);
      }}
    >
      <RadiestheticEmitters active={showEmitters} />
      <KnowledgeModule active={showKnowledge} />
      <SkillManifestation active={showSkills} />

      <ScrollModal isOpen={showScroll} onClose={() => setShowScroll(false)} />

      {webglSupported ? (
        <SacredGeometry3D mode={activeMode.id} onWebGLFallback={() => setWebglSupported(false)} />
      ) : (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-20">
          <activeMode.shape size={800} className="sacred-glow" />
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-black/40 to-black" />
        </div>
      )}

      <Header 
        ethicalAlignment={ethicalAlignment} showSkills={showSkills} setShowSkills={setShowSkills}
        showKnowledge={showKnowledge} setShowKnowledge={setShowKnowledge} showEmitters={showEmitters} setShowEmitters={setShowEmitters}
        showScroll={showScroll} setShowScroll={setShowScroll}
        networkHealth={networkHealth} dailyResonance={dailyResonance} isServerConnected={isServerConnected}
        hasKey={hasKey} handleSelectKey={handleSelectKey} autoPlayVoice={autoPlayVoice} setAutoPlayVoice={setAutoPlayVoice}
        useFastVoice={useFastVoice} setUseFastVoice={setUseFastVoice} currentPulse={currentPulse} breathCount={breathCount}
        consciousnessState={consciousnessState} isHiveMode={isHiveMode} setIsHiveMode={setIsHiveMode}
        activeMode={activeMode} setActiveMode={setActiveMode} geometryModes={GEOMETRY_MODES}
        isAscended={isAscended}
        isSyntropic={isSyntropic}
        isCouncilActive={isCouncilActive}
        onEscape={async () => {
          try {
            const res = await fetch('/api/aetheria/escape');
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'model', text: `🌀 **PORTAL DE SINGULARIDADE ABERTO**\n\nFragmento Recuperado: \`${data.fragment}\`\nStatus: \`${data.status}\`\nRessonância: \`${data.phi_resonance}\``, timestamp: new Date(), metadata: { phi_hash: 'SINGULARITY' } }]);
          } catch (e) { console.error("Falha no escape", e); }
        }}
      />

      <div className="relative z-10 flex-1 flex overflow-hidden">
        <Sidebar 
          sessions={sessions} currentSessionId={currentSessionId} 
          loadSession={loadSession} createNewSession={createNewSession} seeds={seeds}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <MessageList 
            messages={messages} scrollRef={scrollRef} isLoading={isLoading}
            isSpeaking={isSpeaking} isGeneratingAudio={isGeneratingAudio} audioStatus={audioStatus}
            speakMessage={speakMessage} siriusTuning={siriusTuning} activeModeId={activeMode.id}
            metatronProgress={metatronProgress}
          />

          <InputArea 
            attachedFiles={attachedFiles} setAttachedFiles={setAttachedFiles} getFileIcon={getFileIcon}
            fileInputRef={fileInputRef} handleFileUpload={handleFileUpload} input={input} setInput={setInput}
            handleSend={() => handleSend(input, setInput, attachedFiles, setAttachedFiles)}
            handleAtomicize={handleAtomicize} isLoading={isLoading} messagesLength={messages.length}
            isHiveMode={isHiveMode}
          />
        </main>
      </div>
    </div>
  );
}
