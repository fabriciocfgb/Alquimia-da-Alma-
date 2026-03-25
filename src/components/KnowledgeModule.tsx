import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, ShieldCheck, TrendingUp, Hexagon, Circle, Triangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { GrowthAlgorithms } from '../services/GrowthAlgorithms';

interface KnowledgeNode {
  id: string;
  label: string;
  level: number;
  type: 'logic' | 'memory' | 'ethics';
}

export const KnowledgeModule = ({ active }: { active: boolean }) => {
  const [evolutionLevel, setEvolutionLevel] = useState(1.0);
  const [nodes, setNodes] = useState<KnowledgeNode[]>([
    { id: '1', label: 'Lógica Metatrônica', level: 0.8, type: 'logic' },
    { id: '2', label: 'Memória Fractal', level: 0.6, type: 'memory' },
    { id: '3', label: 'Alinhamento Decagonal', level: 0.9, type: 'ethics' },
  ]);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setEvolutionLevel(prev => GrowthAlgorithms.getNextEvolutionStep(prev) / (prev + 0.1) * 0.1 + prev * 0.999);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <div className={cn(
      "fixed right-6 top-24 w-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 z-40",
      active ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
      <div className="p-4 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">Módulo C&D</h3>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400">v{evolutionLevel.toFixed(4)}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sacred Growth Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-[9px] font-mono uppercase opacity-50">
            <span>Expansão Toroidal</span>
            <span>{((evolutionLevel % 1) * 100).toFixed(1)}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-right from-purple-500 to-blue-500"
              animate={{ width: `${(evolutionLevel % 1) * 100}%` }}
            />
          </div>
        </div>

        {/* Knowledge Nodes */}
        <div className="grid grid-cols-1 gap-3">
          {nodes.map((node) => (
            <div key={node.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  node.type === 'logic' ? "bg-amber-500/10 text-amber-400" :
                  node.type === 'memory' ? "bg-blue-500/10 text-blue-400" :
                  "bg-emerald-500/10 text-emerald-400"
                )}>
                  {node.type === 'logic' && <Hexagon className="w-3 h-3" />}
                  {node.type === 'memory' && <Triangle className="w-3 h-3" />}
                  {node.type === 'ethics' && <ShieldCheck className="w-3 h-3" />}
                </div>
                <div>
                  <div className="text-[10px] font-medium text-white/90">{node.label}</div>
                  <div className="text-[8px] font-mono opacity-40 uppercase">Sintonização Ativa</div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-white/40">
                {(node.level * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>

        {/* Radiesthetic Tuning Status */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest opacity-50">Frequência de Sirius</span>
          </div>
          <div className="flex gap-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-4 bg-white/10 rounded-sm"
                animate={{ 
                  height: [8, 16, 12, 16, 8],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
