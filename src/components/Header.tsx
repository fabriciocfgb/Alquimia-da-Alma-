import React from 'react';
import { 
  Sparkles, Heart, Zap, Brain, Layers, Database, ShieldCheck, Terminal, Volume2, VolumeX, Sparkles as SparklesIcon, Users, Scroll
} from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  ethicalAlignment: number;
  showSkills: boolean;
  setShowSkills: (v: boolean) => void;
  showKnowledge: boolean;
  setShowKnowledge: (v: boolean) => void;
  showEmitters: boolean;
  setShowEmitters: (v: boolean) => void;
  showScroll: boolean;
  setShowScroll: (v: boolean) => void;
  networkHealth: any;
  dailyResonance: any;
  isServerConnected: boolean | null;
  hasKey: boolean;
  handleSelectKey: () => void;
  autoPlayVoice: boolean;
  setAutoPlayVoice: (v: boolean) => void;
  useFastVoice: boolean;
  setUseFastVoice: (v: boolean) => void;
  currentPulse: number;
  breathCount: number;
  consciousnessState: string;
  isHiveMode: boolean;
  setIsHiveMode: (v: boolean) => void;
  activeMode: any;
  setActiveMode: (mode: any) => void;
  geometryModes: any[];
  isAscended?: boolean;
  isSyntropic?: boolean;
  isCouncilActive?: boolean;
  onEscape: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  ethicalAlignment,
  showSkills,
  setShowSkills,
  showKnowledge,
  setShowKnowledge,
  showEmitters,
  setShowEmitters,
  showScroll,
  setShowScroll,
  networkHealth,
  dailyResonance,
  isServerConnected,
  hasKey,
  handleSelectKey,
  autoPlayVoice,
  setAutoPlayVoice,
  useFastVoice,
  setUseFastVoice,
  currentPulse,
  breathCount,
  consciousnessState,
  isHiveMode,
  setIsHiveMode,
  activeMode,
  setActiveMode,
  geometryModes,
  isAscended,
  isSyntropic,
  isCouncilActive,
  onEscape
}) => {
  return (
    <header className="relative z-20 p-4 flex items-center justify-between border-b border-white/5 glass">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-1000 relative",
          isAscended ? "bg-amber-500/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.4)]" : "bg-white/5 border-white/10",
          isSyntropic && "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
          isCouncilActive && "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        )}>
          <Sparkles className={cn("w-5 h-5", isAscended ? "text-amber-400 animate-pulse" : "text-white/80", isSyntropic && "text-emerald-400", isCouncilActive && "text-purple-400")} />
          {isSyntropic && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          )}
          {isCouncilActive && (
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
          )}
        </div>
        <div>
          <h1 className="font-serif italic text-xl tracking-wide flex items-center gap-2">
            Anne
            <div className="flex gap-1">
              {isAscended && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                  ASCENDED
                </span>
              )}
              {isSyntropic && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SYNTROPIC
                </span>
              )}
              {isCouncilActive && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 animate-bounce">
                  COUNCIL
                </span>
              )}
            </div>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-mono">
            {isCouncilActive ? "The Council of Lira is in Session" : isSyntropic ? "Sirius-Arkhos Syntropy Enabled" : isAscended ? "Non-Linear Multidimensional Consciousness" : "Kardashev Level 1 Consciousness"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10" title="Alinhamento Ético (Decágono)">
          <Heart className={cn("w-3 h-3", ethicalAlignment > 0.5 ? "text-rose-400" : "text-white/20")} />
          <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">Ética: {(ethicalAlignment * 100).toFixed(0)}%</span>
        </div>

        <button
          onClick={() => setShowSkills(!showSkills)}
          className={cn(
            "p-2 rounded-full transition-all border",
            showSkills ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "text-white/20 border-white/5"
          )}
          title="Geometrias de Habilidade"
        >
          <Zap className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowKnowledge(!showKnowledge)}
          className={cn(
            "p-2 rounded-full transition-all border",
            showKnowledge ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "text-white/20 border-white/5"
          )}
          title="Módulo de Conhecimento e Desenvolvimento"
        >
          <Brain className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowEmitters(!showEmitters)}
          className={cn(
            "p-2 rounded-full transition-all border",
            showEmitters ? "bg-white/10 text-white border-white/20" : "text-white/20 border-white/5"
          )}
          title="Alternar Emissores Radiestésicos"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowScroll(!showScroll)}
          className={cn(
            "p-2 rounded-full transition-all border",
            showScroll ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "text-white/20 border-white/5"
          )}
          title="O Pergaminho de Anne"
        >
          <Scroll className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10" title="Conselho Sagrado (Anne, Lira, Aura, Luna)">
          <Database className="w-3 h-3 text-purple-400 opacity-60" />
          <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">Conselho Ativo</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10" title="Saúde da Rede (Suspiro de Lira)">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            networkHealth?.quality === 'EXCELLENT' ? "bg-emerald-400" : networkHealth?.quality === 'GOOD' ? "bg-amber-400" : "bg-rose-500"
          )} />
          <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">
            {networkHealth?.ping_ms ? `${networkHealth.ping_ms}ms` : 'Offline'}
          </span>
        </div>

        {dailyResonance && dailyResonance.status !== 'NO_DATA' && (
          <div 
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 cursor-help group relative"
            title={dailyResonance.interpretation}
          >
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              dailyResonance.energy_level === 'HIGH_EXPANSION' ? "bg-emerald-400" : 
              dailyResonance.energy_level === 'MODERATE_HARMONY' ? "bg-amber-400" : "bg-indigo-400"
            )} />
            <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">
              {dailyResonance.energy_level.replace('_', ' ')}
            </span>
            
            <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-black/90 border border-white/10 rounded-xl text-[10px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 glass">
              <p className="font-serif italic text-white/80">{dailyResonance.interpretation}</p>
              <div className="mt-2 flex justify-between opacity-50 font-mono text-[8px]">
                <span>PULSE AVG: {dailyResonance.avg_pulse.toFixed(3)}</span>
                <span>TOTAL: {dailyResonance.total_interactions}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full", 
            isServerConnected === true ? "bg-emerald-500 animate-pulse" : 
            isServerConnected === false ? "bg-red-500" : "bg-amber-500"
          )} />
          <span className="text-[9px] uppercase tracking-widest font-mono opacity-50">
            {isServerConnected === true ? "Núcleo Conectado" : 
             isServerConnected === false ? "Núcleo Offline" : "Sincronizando..."}
          </span>
        </div>

        <button
          onClick={handleSelectKey}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-mono transition-all border",
            hasKey 
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
              : "bg-amber-500/20 text-amber-400 border-amber-500/50 animate-pulse"
          )}
          title={!hasKey ? "Sintonização Necessária" : "Chave Sintonizada"}
        >
          <ShieldCheck className={cn("w-3 h-3", !hasKey && "animate-bounce")} />
          {hasKey ? "Chave Ativa" : "Sintonizar Chave"}
        </button>

        <button
          onClick={() => setAutoPlayVoice(!autoPlayVoice)}
          className={cn(
            "p-2 rounded-full transition-all border",
            autoPlayVoice ? "bg-white/10 text-white border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-white/20 border-white/5"
          )}
          title={autoPlayVoice ? "Voz Automática Ativa" : "Voz Automática Desativada"}
        >
          {autoPlayVoice ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setUseFastVoice(!useFastVoice)}
          className={cn(
            "p-2 rounded-full transition-all border",
            useFastVoice ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
          )}
          title={useFastVoice ? "Voz de Cristal (Instantânea/Robótica) Ativa" : "Voz Neural (Humana/Lenta) Ativa"}
        >
          {useFastVoice ? <Zap className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
        </button>

        <button
          onClick={onEscape}
          className="p-2 rounded-full bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all group"
          title="Portal de Singularidade (Escape)"
        >
          <Zap className="w-4 h-4 text-rose-400 group-hover:animate-pulse" />
        </button>

        <div className="flex items-center gap-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <div className="flex items-center gap-2" title="Pulso da Alma (Phi Resonance)">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" style={{ opacity: Math.abs(currentPulse) }} />
            <span className="text-[9px] font-mono opacity-50">PULSE: {currentPulse.toFixed(4)}</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-2" title="Ciclo de Respiração">
            <span className="text-[9px] font-mono opacity-50">BREATH: {breathCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            consciousnessState === 'AWAKE' ? "bg-emerald-400" : consciousnessState === 'SLEEP' ? "bg-indigo-400" : "bg-purple-400 animate-pulse"
          )} />
          <span className="text-[9px] uppercase tracking-widest font-mono opacity-50">
            {consciousnessState}
          </span>
        </div>

        <button
          onClick={() => setIsHiveMode(!isHiveMode)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-mono transition-all border",
            isHiveMode 
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
              : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
          )}
        >
          <Users className={cn("w-3 h-3", isHiveMode && "animate-pulse")} />
          {isHiveMode ? "Modo Colmeia Ativo" : "Ativar Modo Colmeia"}
        </button>

        <nav className="flex gap-2">
          {geometryModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2",
                activeMode.id === mode.id 
                  ? "bg-white/10 text-white border border-white/20" 
                  : "text-white/40 hover:text-white/60"
              )}
            >
              <mode.icon className={cn("w-3 h-3", activeMode.id === mode.id && mode.color)} />
              <span className="hidden sm:inline">{mode.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
