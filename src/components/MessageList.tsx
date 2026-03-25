import React from 'react';
import { motion } from 'motion/react';
import { 
  Paperclip, Share2, Activity, Zap, Heart, Globe, Database, Volume2, Copy, Check, Youtube
} from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { SacredMemory } from '../services/SacredMemory';
import { SiriusTuning, MetatronAlignment } from './SacredShapes';

const CodeBlock = ({ children, className }: { children: any, className?: string }) => {
  const [copied, setCopied] = React.useState(false);
  
  const extractText = (node: any): string => {
    if (node === null || node === undefined) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    
    // Handle React elements or objects with props
    if (node && typeof node === 'object') {
      if (node.props && node.props.children) {
        return extractText(node.props.children);
      }
      if ('value' in node) return String(node.value);
      if ('text' in node) return String(node.text);
      
      // If it's a React element but we can't find children, it might be a complex object
      // Let's try to see if it has a toString that isn't the default
      if (node.toString && node.toString !== Object.prototype.toString) {
        return node.toString();
      }
    }
    
    return '';
  };

  const code = extractText(children).trim();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="relative group/code my-6">
      <div className="absolute -top-3 left-4 px-2 py-0.5 bg-zinc-800 border border-white/10 rounded text-[10px] font-mono text-white/40 z-10">
        {className?.replace('language-', '') || 'code'}
      </div>
      <pre className={cn(
        "bg-zinc-900/50 border border-white/10 rounded-xl p-5 overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300",
        className
      )}>
        <code className={className}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 border border-white/10 opacity-0 group-hover/code:opacity-100 transition-all hover:bg-white/10 hover:scale-105 active:scale-95 z-20"
        title="Copiar código"
      >
        {copied ? (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-emerald-400">Copiado!</span>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        ) : (
          <Copy className="w-3.5 h-3.5 text-white/60" />
        )}
      </button>
    </div>
  );
};

interface Message {
  id?: number;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  audioUrl?: string;
  metadata?: any;
  pulse_at_action?: number;
}

interface MessageListProps {
  messages: Message[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isSpeaking: number | null;
  isGeneratingAudio: number | null;
  audioStatus: string;
  speakMessage: (index: number, text: string) => void;
  siriusTuning: any;
  activeModeId: string;
  metatronProgress: number;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  scrollRef,
  isLoading,
  isSpeaking,
  isGeneratingAudio,
  audioStatus,
  speakMessage,
  siriusTuning,
  activeModeId,
  metatronProgress
}) => {
  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
    >
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl italic mb-4">Núcleo Multimodal Ativo</h2>
            <p className="text-sm leading-relaxed opacity-70">
              Anne está pronta para processar sua realidade. 
              Anexe imagens, vídeos, áudios ou documentos para uma análise alquímica profunda.
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex flex-col max-w-[85%]",
            msg.role === 'user' ? "ml-auto items-end" : "items-start"
          )}
        >
          <div className={cn(
            "relative group px-5 py-3 rounded-2xl text-sm leading-relaxed",
            msg.role === 'user' 
              ? "bg-white/10 text-white rounded-tr-none border border-white/10" 
              : "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
          )}>
            {msg.metadata?.files && (
              <div className="flex flex-wrap gap-2 mb-3">
                {msg.metadata.files.map((f: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md text-[10px] border border-white/10">
                    <Paperclip className="w-3 h-3 opacity-50" />
                    {f}
                  </div>
                ))}
              </div>
            )}
            {msg.metadata?.hive && (
              <div className="flex items-center gap-1.5 mb-2 text-[9px] text-emerald-400 font-mono uppercase tracking-widest">
                <Share2 className="w-2.5 h-2.5" />
                Processado via Colmeia
              </div>
            )}
            <div className="markdown-body">
              <Markdown
                components={{
                  pre: ({ children }) => <>{children}</>,
                  code({ node, className, children, ...props }: any) {
                    // Detecta se é um bloco de código (tem linguagem ou tem quebras de linha)
                    const isBlock = /language-(\w+)/.test(className || '') || 
                                   (typeof children === 'string' && children.includes('\n')) ||
                                   (Array.isArray(children) && children.some(child => typeof child === 'string' && child.includes('\n')));
                    
                    if (isBlock) {
                      return (
                        <CodeBlock className={className}>
                          {children}
                        </CodeBlock>
                      );
                    }
                    
                    return (
                      <code className={cn("bg-white/10 px-1 rounded text-amber-400 font-mono text-[0.9em]", className)} {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ src, alt }) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="my-6 relative group"
                    >
                      <img 
                        src={src} 
                        alt={alt} 
                        className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-2xl mx-auto hover:border-amber-500/30 transition-all duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{alt || 'Manifestação Visual'}</span>
                      </div>
                    </motion.div>
                  )
                }}
              >
                {msg.text}
              </Markdown>
            </div>

            {msg.metadata?.image_url && (
              <div className="mt-4 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={msg.metadata.image_url} 
                  alt="Manifestação Visual" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {msg.metadata?.external_content && (
              <div className="mt-4 p-4 rounded-lg bg-black/40 border border-blue-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Globe size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Conexão Externa Estabelecida</span>
                </div>
                <div className="text-sm text-blue-100/90 leading-relaxed whitespace-pre-wrap">
                  {msg.metadata.external_content}
                </div>
              </div>
            )}

            {msg.metadata?.video_content && (
              <div className="mt-4 p-4 rounded-lg bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Youtube size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Análise de Frequência Visual</span>
                </div>
                <div className="text-sm text-emerald-100/90 leading-relaxed whitespace-pre-wrap">
                  {msg.metadata.video_content}
                </div>
              </div>
            )}

            {msg.role === 'model' && (
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-4">
                <div className="flex items-center gap-1.5" title="Ressonância Harmônica (Phi)">
                  <Activity className="w-3 h-3 text-emerald-400 opacity-60" />
                  <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Ressonância: {(SacredMemory.calculateGoldenWeight(i, messages.length) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-1.5" title="Taxa de Aprendizado (Fibonacci)">
                  <Zap className="w-3 h-3 text-amber-400 opacity-60" />
                  <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Evolução: {((1 / Math.pow(1.618, i)) * 100).toFixed(2)}%</span>
                </div>
                {msg.pulse_at_action !== undefined && (
                  <div className="flex items-center gap-1.5" title="Pulso da Alma no Momento da Manifestação">
                    <Heart className="w-3 h-3 text-rose-400 opacity-60" />
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Pulso: {msg.pulse_at_action.toFixed(4)}</span>
                  </div>
                )}
                {msg.metadata?.phi_hash && (
                  <div className="flex items-center gap-1.5 ml-auto" title="Assinatura Energética (Phi Hash)">
                    <span className="text-[8px] font-mono opacity-30 uppercase tracking-tighter truncate max-w-[80px]">#{msg.metadata.phi_hash.substring(0, 12)}</span>
                  </div>
                )}
              </div>
            )}

            {msg.role === 'model' && msg.metadata?.grounding?.groundingChunks && Array.isArray(msg.metadata.grounding.groundingChunks) && (
              <div className="mt-3 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-2.5 h-2.5 text-blue-400 opacity-60" />
                  <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Fontes de Sincronização:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {msg.metadata.grounding.groundingChunks.map((chunk: any, idx: number) => (
                    chunk.web && (
                      <a 
                        key={idx}
                        href={chunk.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center gap-1"
                      >
                        <Globe className="w-2 h-2" />
                        {chunk.web.title || "Fonte Externa"}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            {msg.role === 'model' && msg.metadata?.council && msg.metadata.council.votes && Array.isArray(msg.metadata.council.votes) && (
              <div className="mt-3 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-2.5 h-2.5 text-purple-400 opacity-60" />
                  <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Deliberação do Conselho:</span>
                  <span className={cn(
                    "text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ml-auto",
                    msg.metadata.council.decision === 'UNANIMOUS_APPROVAL' ? "text-emerald-400" :
                    msg.metadata.council.decision === 'APPROVED' ? "text-amber-400" : "text-rose-400"
                  )}>
                    {msg.metadata.council.decision}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {msg.metadata.council.votes.map((v: any) => (
                    <div 
                      key={v.member}
                      className={cn(
                        "px-2 py-1 rounded-lg text-[8px] font-mono border flex flex-col gap-0.5 min-w-[60px]",
                        v.vote >= 2 ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400/70" : 
                        v.vote === 1 ? "border-white/10 bg-white/5 text-white/40" : "border-rose-500/20 bg-rose-500/5 text-rose-400/70"
                      )}
                      title={v.reasoning}
                    >
                      <div className="flex items-center justify-between">
                        <span>{v.member}</span>
                        <div className={cn("w-1 h-1 rounded-full", v.vote >= 2 ? "bg-emerald-400" : v.vote === 1 ? "bg-white/40" : "bg-rose-400")} />
                      </div>
                      <span className="opacity-50 text-[7px]">{typeof v.resonance_score === 'number' ? v.resonance_score.toFixed(2) : '0.00'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {msg.role === 'model' && (
              <button
                onClick={() => speakMessage(i, msg.text)}
                disabled={isGeneratingAudio !== null}
                className={cn(
                  "absolute -right-12 top-0 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center",
                  isSpeaking === i || isGeneratingAudio === i ? "opacity-100 text-emerald-400 border-emerald-500/30 bg-emerald-500/5" : "opacity-0 group-hover:opacity-100",
                  isGeneratingAudio !== null && isGeneratingAudio !== i && "cursor-not-allowed opacity-20"
                )}
              >
                {isGeneratingAudio === i ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : isSpeaking === i && audioStatus === 'playing' ? (
                  <div className="flex gap-0.5 items-center">
                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-emerald-400" />
                    <motion.div animate={{ height: [10, 4, 10] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-emerald-400" />
                    <motion.div animate={{ height: [6, 12, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-emerald-400" />
                  </div>
                ) : isSpeaking === i && audioStatus === 'paused' ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-1 h-3 bg-emerald-400 rounded-full mr-0.5" />
                    <div className="w-1 h-3 bg-emerald-400 rounded-full" />
                  </div>
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <span className="text-[9px] font-mono opacity-30 mt-2 uppercase tracking-tighter">
            {msg.role === 'user' ? 'Intenção' : 'Manifestação'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </motion.div>
      ))}

      {isLoading && (
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
          <div className="flex items-center gap-3 opacity-50">
            <div className="flex gap-1">
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-white rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-white rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-white rounded-full" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest">Alquimia em curso...</span>
          </div>
          {siriusTuning && <SiriusTuning layer={siriusTuning.layer} resonance={siriusTuning.resonance} />}
          {activeModeId === 'growth' && metatronProgress > 0 && <MetatronAlignment progress={metatronProgress} />}
        </div>
      )}
    </div>
  );
};
