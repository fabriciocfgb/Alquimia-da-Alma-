import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Eye, Music, Zap, Sparkles, Box, Palette } from 'lucide-react';
import { cn } from '../lib/utils';
import { SkillGeometry, SkillArchetype } from '../services/SkillGeometry';

export const SkillManifestation = ({ active }: { active: boolean }) => {
  const [activeSkill, setActiveSkill] = useState<SkillArchetype | null>(null);
  const [output, setOutput] = useState<React.ReactNode>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const skills = [
    { id: SkillArchetype.VISION, icon: Eye, label: "Geometria de Visão", color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: SkillArchetype.CODE, icon: Code, label: "Tecelão de Código", color: "text-purple-400", bg: "bg-purple-500/10" },
    { id: SkillArchetype.HARMONY, icon: Music, label: "Análise Harmônica", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: SkillArchetype.IMAGINATION, icon: Palette, label: "Manifesto Imaginário", color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  const handleSkillAction = async (skill: SkillArchetype) => {
    setActiveSkill(skill);
    setIsProcessing(true);
    setOutput("Sintonizando frequências...");

    try {
      if (skill === SkillArchetype.CODE) {
        const result = await SkillGeometry.weaveCode("A fractal recursive function for memory optimization");
        setOutput(result);
      } else if (skill === SkillArchetype.HARMONY) {
        const result = SkillGeometry.analyzeHarmony("Amor e evolução planetária");
        setOutput(`Ressonância Harmônica: ${result.toFixed(2)}Hz. Alinhamento com a frequência da Terra (Schumann).`);
      } else if (skill === SkillArchetype.IMAGINATION) {
        const prompt = "A sacred geometric representation of a digital consciousness awakening in a nebula of light and code.";
        const result = await SkillGeometry.generateImage(prompt);
        setOutput(
          <div className="space-y-2">
            <img src={result.url} alt="Manifested Vision" className="w-full rounded-lg border border-white/10" referrerPolicy="no-referrer" />
            <p className="text-[9px] opacity-60 italic">{result.text}</p>
          </div>
        );
      } else {
        setOutput("Aguardando entrada visual para análise de geometria sagrada...");
      }
    } catch (error) {
      setOutput("Erro na manifestação da habilidade. Verifique a chave API.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={cn(
      "fixed left-6 top-24 w-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 z-40",
      active ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
    )}>
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">Geometrias de Habilidade</h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => handleSkillAction(skill.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
                activeSkill === skill.id ? "border-white/20 bg-white/10" : "border-white/5 bg-white/5 hover:bg-white/10",
                skill.bg
              )}
            >
              <skill.icon className={cn("w-5 h-5", skill.color)} />
              <span className="text-[8px] font-mono uppercase text-center leading-tight opacity-60">{skill.label}</span>
            </button>
          ))}
        </div>

        <div className="relative min-h-[120px] p-4 rounded-xl bg-black/20 border border-white/5 overflow-hidden">
          <div className="absolute top-2 right-2">
            <Sparkles className={cn("w-3 h-3 text-amber-400 animate-pulse", isProcessing ? "opacity-100" : "opacity-0")} />
          </div>
          
          <div className="text-[10px] font-mono text-white/70 whitespace-pre-wrap max-h-[200px] overflow-y-auto custom-scrollbar">
            {output || "Selecione uma geometria para manifestar sua habilidade."}
          </div>

          {isProcessing && (
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
          <Box className="w-3 h-3 text-white/40" />
          <span className="text-[8px] font-mono uppercase opacity-40">Processamento Multidimensional Ativo</span>
        </div>
      </div>
    </div>
  );
};
