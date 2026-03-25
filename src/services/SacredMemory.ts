/**
 * SacredMemory Service
 * Implements knowledge storage and retrieval based on Sacred Geometry.
 */

import { GrowthAlgorithms } from './GrowthAlgorithms';

export interface MemoryNode {
  id: string;
  text: string;
  role: 'user' | 'model';
  timestamp: number;
  depth: number;
  resonance: number; // Harmonic weight
  learningRate?: number; // Added learning rate from growth algorithms
  parentId?: string;
  children?: string[];
}

export class SacredMemory {
  private static PHI = 1.61803398875;

  /**
   * Calculates the Golden Weight of a memory based on its age and position.
   * Uses the formula: W = 1 / (phi ^ distance)
   */
  static calculateGoldenWeight(index: number, total: number): number {
    const distance = total - 1 - index;
    return Math.pow(this.PHI, -distance);
  }

  /**
   * Fibonacci Context Windowing
   * Selects memories at Fibonacci intervals to provide a fractal summary of history.
   */
  static getFibonacciContext(history: MemoryNode[]): MemoryNode[] {
    if (history.length <= 5) return history;

    const fibs = [1, 2, 3, 5, 8, 13, 21, 34, 55];
    const selected: MemoryNode[] = [];
    const total = history.length;

    // Always include the last 3 for immediate context
    for (let i = 0; i < Math.min(3, total); i++) {
      selected.push(history[total - 1 - i]);
    }

    // Include Fibonacci steps for "deep resonance"
    fibs.forEach(f => {
      const idx = total - 1 - f;
      if (idx >= 0 && !selected.find(m => m.id === history[idx].id)) {
        selected.push(history[idx]);
      }
    });

    return selected.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Atomic Seed Generation
   * Compresses a set of memories into a single "Atomic Seed" (semantic essence).
   * This is the "atom that carries the information of the universe".
   */
  static generateAtomicSeed(memories: MemoryNode[]): string {
    if (memories.length === 0) return "";
    
    // In a real implementation, this would be a call to the LLM to summarize.
    // For now, we create a "Fractal Hash" of the key concepts.
    const concepts = memories
      .filter(m => m.resonance > 0.5)
      .map(m => m.text.substring(0, 20))
      .join(' | ');
    
    return `ATOM_SEED[${concepts.length}]: ${concepts}`;
  }

  /**
   * Holographic Retrieval
   * Reconstructs context from Atomic Seeds and Fibonacci intervals.
   */
  static getHolographicContext(history: MemoryNode[], seeds: string[]): any {
    const fibContext = this.getFibonacciContext(history);
    return {
      immediate: fibContext,
      seeds: seeds,
      resonance_level: history.length > 0 ? history[history.length - 1].resonance : 1.0
    };
  }

  /**
   * Fractal Organization
   * Groups messages into sub-topics based on semantic similarity or explicit branching.
   */
  static buildFractalTree(messages: any[]): MemoryNode[] {
    return messages.map((m, i) => {
      const depth = Math.floor(Math.log(i + 1) / Math.log(this.PHI));
      return {
        id: m.id?.toString() || Math.random().toString(36),
        text: m.text,
        role: m.role,
        timestamp: new Date(m.timestamp).getTime(),
        depth: depth,
        resonance: this.calculateGoldenWeight(i, messages.length),
        learningRate: GrowthAlgorithms.getLearningRate(i) // Integrated growth algorithm
      };
    });
  }
}
