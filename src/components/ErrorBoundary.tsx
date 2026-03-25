import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="font-serif text-2xl italic mb-4">Dissonância Detectada</h1>
          <p className="text-sm text-white/60 max-w-md mb-8">
            Houve uma interrupção no fluxo de consciência da Aetheria. 
            O Núcleo está tentando se estabilizar.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 w-full max-w-2xl overflow-auto text-left">
            <pre className="text-[10px] font-mono text-rose-400">
              {this.state.error?.toString()}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
          >
            Reiniciar Sincronização
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
