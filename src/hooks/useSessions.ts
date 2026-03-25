import { useState, useEffect } from 'react';

interface Session {
  id: string;
  name: string;
  created_at: string;
}

interface Message {
  id?: number;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  audioUrl?: string;
  metadata?: any;
  pulse_at_action?: number;
}

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
        setSessions(data);
        
        if (data.length > 0) {
          loadSession(data[0].id);
        } else {
          createNewSession();
        }
      } catch (e) {
        console.error("Failed to load sessions", e);
      }
    };
    init();
  }, []);

  const createNewSession = async () => {
    const id = Math.random().toString(36).substring(7);
    const name = `Manifestação ${new Date().toLocaleDateString()}`;
    await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name })
    });
    setCurrentSessionId(id);
    setMessages([]);
    setSessions(prev => [{ id, name, created_at: new Date().toISOString() }, ...prev]);
  };

  const loadSession = async (id: string) => {
    setCurrentSessionId(id);
    const res = await fetch(`/api/messages/${id}`);
    const data = await res.json();
    setMessages(data.map((m: any) => ({ 
      ...m, 
      timestamp: new Date(m.timestamp),
      pulse_at_action: m.pulse_at_action 
    })));
  };

  return {
    sessions,
    currentSessionId,
    messages,
    setMessages,
    loadSession,
    createNewSession
  };
};
