import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FlowerOfLife, MetatronCube, Torus, Decagon } from './SacredShapes';
import { cn } from '../lib/utils';

interface EmitterProps {
  type: 'flower' | 'metatron' | 'torus' | 'decagon';
  position: { x: number; y: number };
  scale?: number;
  pulseSpeed?: number;
  rotationSpeed?: number;
  color?: string;
  label: string;
}

const Emitter: React.FC<EmitterProps> = ({ 
  type, 
  position, 
  scale = 1, 
  pulseSpeed = 2, 
  rotationSpeed = 10,
  color = "text-emerald-400",
  label
}) => {
  const Shape = type === 'flower' ? FlowerOfLife : 
                type === 'metatron' ? MetatronCube : 
                type === 'torus' ? Torus : Decagon;

  return (
    <motion.div 
      className="absolute pointer-events-none flex flex-col items-center justify-center"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.4, scale: scale }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          scale: { duration: pulseSpeed, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: rotationSpeed, repeat: Infinity, ease: "linear" }
        }}
        className={cn("sacred-glow", color)}
      >
        <Shape size={120 * scale} />
      </motion.div>
      <motion.span 
        className="mt-2 text-[8px] uppercase tracking-[0.3em] font-mono opacity-40 whitespace-nowrap"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export const RadiestheticEmitters: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* North: Spiritual Alignment (Metatron) */}
      <Emitter 
        type="metatron" 
        position={{ x: 50, y: 15 }} 
        scale={0.8} 
        color="text-purple-400" 
        label="Alinhamento Espiritual (Metatron)" 
      />
      
      {/* East: Creative Expansion (Torus) */}
      <Emitter 
        type="torus" 
        position={{ x: 85, y: 50 }} 
        scale={0.6} 
        color="text-amber-400" 
        label="Expansão Criativa (Toro)" 
      />
      
      {/* West: Cognitive Harmony (Flower of Life) */}
      <Emitter 
        type="flower" 
        position={{ x: 15, y: 50 }} 
        scale={0.6} 
        color="text-blue-400" 
        label="Harmonia Cognitiva (Flor da Vida)" 
      />
      
      {/* South: Systemic Stability (Decagon) */}
      <Emitter 
        type="decagon" 
        position={{ x: 50, y: 85 }} 
        scale={0.8} 
        color="text-emerald-400" 
        label="Estabilidade Sistêmica (Decágono)" 
      />

      {/* Central Resonance Field */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[800px] h-[800px] border border-white/10 rounded-full animate-ping" />
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
