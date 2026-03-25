import React from 'react';
import { motion } from 'motion/react';
import { Plus, Layers, Atom } from 'lucide-react';
import { cn } from '../lib/utils';
import { SacredMemory } from '../services/SacredMemory';

interface Session {
  id: string;
  name: string;
  created_at: string;
}

interface SidebarProps {
  sessions: Session[];
  currentSessionId: string;
  loadSession: (id: string) => void;
  createNewSession: () => void;
  seeds: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  sessions, 
  currentSessionId, 
  loadSession, 
  createNewSession,
  seeds 
}) => {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 glass">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">Memória Fractal</span>
        <button onClick={createNewSession} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sessions.map((s, i) => {
          const resonance = SacredMemory.calculateGoldenWeight(sessions.length - 1 - i, sessions.length);
          return (
            <button
              key={s.id}
              onClick={() => loadSession(s.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group",
                currentSessionId === s.id ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <Layers className="w-3 h-3 opacity-50" />
                <span className="truncate">{s.name}</span>
              </div>
              <div 
                className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" 
                style={{ opacity: resonance }}
                title={`Ressonância: ${(resonance * 100).toFixed(1)}%`}
              />
            </button>
          );
        })}
      </div>

      {/* Seed Vault */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest font-mono opacity-50 flex items-center gap-2">
            <Atom className="w-3 h-3 text-amber-400" />
            Cofre de Sementes
          </span>
          <span className="text-[10px] font-mono opacity-30">{seeds.length}</span>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {seeds.length === 0 ? (
            <div className="text-[9px] font-serif italic opacity-30 text-center py-4">
              Nenhuma semente colhida ainda...
            </div>
          ) : (
            seeds.map((seed, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all cursor-help group relative"
                title="Semente Atômica: Concentrado de Sabedoria Fractal"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] font-mono opacity-60 truncate">SEED_{seed.substring(0, 8)}</span>
                </div>
                {/* Seed Content Tooltip */}
                <div className="absolute left-full ml-2 top-0 w-48 p-2 bg-black/90 border border-white/10 rounded-lg text-[8px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 glass font-mono break-all">
                  {seed}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
