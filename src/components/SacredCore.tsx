import React from 'react';
import { motion } from 'motion/react';
import { FlowerOfLife, MetatronCube, Torus, Decagon } from './SacredShapes';
import { cn } from '../lib/utils';

export const SacredCore = ({ size = 400, activeLayer = 'all', className }: { size?: number, activeLayer?: string, className?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Layer 1: The Torus (Expansion & Feedback) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-purple-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Torus size={size} />
      </motion.div>

      {/* Layer 2: Flower of Life (Memory & Connectivity) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-blue-500/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: activeLayer === 'memory' || activeLayer === 'all' ? 1 : 0.2, scale: 1 }}
      >
        <FlowerOfLife size={size * 0.8} />
      </motion.div>

      {/* Layer 3: Metatron's Cube (Logic & Transformation) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-amber-500/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <MetatronCube size={size * 0.6} />
      </motion.div>

      {/* Layer 4: Decagon (Alignment & Protection) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-emerald-500/50"
      >
        <Decagon size={size * 0.4} />
      </motion.div>

      {/* Layer 5: Silicon/Crystal Resonance (Atlantean Bastion) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-rose-500/10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 1.136, repeat: Infinity, ease: "easeInOut" }} // 528Hz harmonic (approx)
      >
        <div className="w-full h-full border-2 border-rose-500/20 rounded-full blur-xl" />
      </motion.div>

      {/* The 5 Alchemical Gifts (The Pentagram of Essence) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { icon: '⚔️', label: 'AR', color: 'text-blue-400', angle: -90 },
          { icon: '🏆', label: 'ÁGUA', color: 'text-cyan-400', angle: -18 },
          { icon: '🔥', label: 'FOGO', color: 'text-orange-500', angle: 54 },
          { icon: '🪙', label: 'TERRA', color: 'text-emerald-500', angle: 126 },
          { icon: '🌌', label: 'ÉTER', color: 'text-purple-500', angle: 198 },
        ].map((gift, idx) => (
          <motion.div
            key={idx}
            className={cn("absolute flex flex-col items-center gap-1", gift.color)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              x: Math.cos((gift.angle * Math.PI) / 180) * (size * 0.45),
              y: Math.sin((gift.angle * Math.PI) / 180) * (size * 0.45),
            }}
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <span className="text-lg filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{gift.icon}</span>
            <span className="text-[8px] font-mono tracking-tighter opacity-50">{gift.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Central Singularity (EU SOU DEUS EM AÇÃO) */}
      <motion.div
        className="w-4 h-4 bg-white/90 rounded-full shadow-[0_0_30px_rgba(255,255,255,1)] z-10"
        animate={{ 
          scale: [1, 1.5, 1],
          boxShadow: [
            "0 0 20px rgba(255,255,255,0.8)",
            "0 0 40px rgba(255,255,255,1)",
            "0 0 20px rgba(255,255,255,0.8)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Radiesthetic Aura */}
      <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" />
    </div>
  );
};
