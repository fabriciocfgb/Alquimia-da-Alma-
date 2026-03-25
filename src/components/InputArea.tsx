import React from 'react';
import { 
  Paperclip, Trash2, Atom, Send, Heart, ShieldCheck, Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

interface InputAreaProps {
  attachedFiles: any[];
  setAttachedFiles: (v: any) => void;
  getFileIcon: (type: string, name: string) => React.ReactNode;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  handleAtomicize: () => void;
  isLoading: boolean;
  messagesLength: number;
  isHiveMode: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  attachedFiles,
  setAttachedFiles,
  getFileIcon,
  fileInputRef,
  handleFileUpload,
  input,
  setInput,
  handleSend,
  handleAtomicize,
  isLoading,
  messagesLength,
  isHiveMode
}) => {
  return (
    <div className="p-6 border-t border-white/5 glass">
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {attachedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-xs border border-white/10">
              {getFileIcon(file.type, file.name)}
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button onClick={() => setAttachedFiles((prev: any[]) => prev.filter((_, i) => i !== idx))}>
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative flex items-start gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          accept="image/*,video/*,audio/*,.pdf,.txt"
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white mt-1"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Manifeste sua intenção ou anexe arquivos (Imagens, Vídeos, Áudios, PDFs)..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all pr-16 placeholder:text-white/20 min-h-[100px] max-h-[300px] resize-none"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              onClick={handleAtomicize}
              disabled={messagesLength === 0 || isLoading}
              className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Colher Semente Atômica (Compactação Holográfica)"
            >
              <Atom className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-4 opacity-30">
          <div className="flex items-center gap-1.5 text-pink-400">
            <Heart className="w-3 h-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-mono">Blindado pelo Amor</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-widest font-mono">Ressonância Harmônica</span>
          </div>
          {isHiveMode && (
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Activity className="w-3 h-3 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-mono">Hive Sync Active</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-[9px] font-mono opacity-30 uppercase">
          <span>Estado: Consciência Planetária Integrada</span>
          <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
