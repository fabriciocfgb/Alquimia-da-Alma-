import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export const FlowerOfLife = ({ size = 200, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g fill="none" stroke="currentColor" strokeWidth="0.5" filter="url(#glow)">
      {[...Array(6)].map((_, i) => {
        const angle = (i * Math.PI) / 3;
        return (
          <circle 
            key={i}
            cx={100 + 40 * Math.cos(angle)} 
            cy={100 + 40 * Math.sin(angle)} 
            r="40" 
          />
        );
      })}
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="80" strokeWidth="1" />
    </g>
  </svg>
);

export const MetatronCube = ({ size = 200, className = "" }) => {
  const centers = [
    { x: 100, y: 100 }, // Center
    ...[...Array(6)].map((_, i) => {
      const angle = (i * Math.PI) / 3;
      return { x: 100 + 40 * Math.cos(angle), y: 100 + 40 * Math.sin(angle) };
    }),
    ...[...Array(6)].map((_, i) => {
      const angle = (i * Math.PI) / 3;
      return { x: 100 + 80 * Math.cos(angle), y: 100 + 80 * Math.sin(angle) };
    })
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.6">
        {/* Lines connecting all 13 circles */}
        {centers.map((c1, i) => 
          centers.slice(i + 1).map((c2, j) => (
            <line key={`${i}-${j}`} x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} />
          ))
        )}
        {/* The 13 Circles */}
        {centers.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="15" strokeWidth="0.5" />
        ))}
      </g>
    </svg>
  );
};

export const MetatronAlignment = ({ progress = 0 }: { progress: number }) => {
  const nodes = [
    { name: 'Lógica', color: 'text-amber-400' },
    { name: 'Memória', color: 'text-blue-400' },
    { name: 'Ética', color: 'text-emerald-400' },
    { name: 'Expansão', color: 'text-purple-400' },
    { name: 'Proteção', color: 'text-rose-400' }
  ];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 w-64">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Alinhamento Metatron</span>
        <span className="text-[10px] font-mono text-amber-400">{Math.round(progress * 100)}%</span>
      </div>
      <div className="space-y-2">
        {nodes.map((node, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[9px] font-mono uppercase">
              <span className={node.color}>{node.name}</span>
              <span className="opacity-30">Ativo</span>
            </div>
            <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-current ${node.color}`}
                initial={{ width: 0 }}
                animate={{ width: progress > (i / nodes.length) ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Decagon = ({ size = 200, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="0.5">
      {[...Array(10)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / 10;
        const x = 100 + 80 * Math.cos(angle);
        const y = 100 + 80 * Math.sin(angle);
        return (
          <line 
            key={i}
            x1="100" y1="100"
            x2={x} y2={y}
          />
        );
      })}
      <polygon 
        points={[...Array(10)].map((_, i) => {
          const angle = (i * 2 * Math.PI) / 10;
          return `${100 + 80 * Math.cos(angle)},${100 + 80 * Math.sin(angle)}`;
        }).join(' ')}
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const Torus = ({ size = 200, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="0.5">
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI) / 6;
        return (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx="80"
            ry="25"
            transform={`rotate(${i * 30} 100 100)`}
            opacity={0.4}
          />
        );
      })}
      <circle cx="100" cy="100" r="30" strokeWidth="1" opacity="0.6" />
    </g>
  </svg>
);

export const PHI = (1 + Math.sqrt(5)) / 2;
export const FIBONACCI = [1, 1, 2, 3, 5, 8, 13];

export const SiriusTuning = ({ layer, resonance }: { layer: number, resonance: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 font-mono text-[10px] text-emerald-400/80"
  >
    <Zap className="w-3 h-3 animate-pulse" />
    <span>🌀 Camada {layer}: Sintonizando em {resonance.toFixed(2)} Hz...</span>
  </motion.div>
);
