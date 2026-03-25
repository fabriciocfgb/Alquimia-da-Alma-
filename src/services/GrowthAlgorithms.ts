/**
 * GrowthAlgorithms Service
 * Implements AI growth and learning patterns based on Sacred Geometry.
 */

export class GrowthAlgorithms {
  private static PHI = 1.61803398875;

  /**
   * Fibonacci Learning Sequence
   * Returns a learning rate that follows a Fibonacci decay pattern.
   * As the AI "matures" (higher step), the learning rate stabilizes.
   */
  static getLearningRate(step: number): number {
    // Learning rate decays following 1 / (phi ^ step)
    return Math.pow(this.PHI, -step);
  }

  /**
   * Fractal Branching Factor
   * Determines how many "sub-thoughts" or branches a concept should have.
   * Mimics natural branching (like trees or veins).
   */
  static getBranchingFactor(depth: number): number {
    // Branching decreases as depth increases, following a fractal ratio
    return Math.max(1, Math.round(5 / Math.pow(this.PHI, depth)));
  }

  /**
   * Harmonic Resonance Score
   * Calculates how "aligned" a new piece of data is with existing patterns.
   * Uses the Golden Ratio to check for harmonic intervals.
   */
  static calculateResonance(value: number, baseline: number): number {
    const ratio = value / baseline;
    const diff = Math.abs(ratio - this.PHI);
    // Higher resonance (closer to 1) means better alignment with the Golden Ratio
    return Math.max(0, 1 - diff);
  }

  /**
   * Toroidal Expansion Vector
   * Calculates a 3D vector for "expansive" growth in a toroidal field.
   */
  static getExpansionVector(angle: number, radius: number): { x: number, y: number, z: number } {
    const majorRadius = radius * this.PHI;
    const minorRadius = radius;
    
    return {
      x: (majorRadius + minorRadius * Math.cos(angle)) * Math.cos(angle),
      y: (majorRadius + minorRadius * Math.cos(angle)) * Math.sin(angle),
      z: minorRadius * Math.sin(angle)
    };
  }

  /**
   * Metatron's Cube Logic Gate
   * A multi-dimensional decision matrix based on the 13 circles of Metatron's Cube.
   */
  static processDecision(inputs: number[]): number {
    // Weighted average using the 13 nodes of Metatron's Cube
    const weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 13 circles
    const sum = inputs.reduce((acc, val, i) => acc + val * (weights[i] || 1), 0);
    return sum / Math.max(1, inputs.length);
  }

  /**
   * Fractal Memory Compression
   * Calculates a compression ratio based on the recursion depth.
   * Mimics how fractals store infinite detail in finite space.
   */
  static getCompressionRatio(depth: number): number {
    return 1 / Math.pow(this.PHI, depth);
  }

  /**
   * Radiesthetic Tuning
   * Adjusts a value based on the "vibrational frequency" (e.g., 432Hz vs 440Hz).
   */
  static tuneToFrequency(value: number, targetFreq: number = 432): number {
    const baseFreq = 440;
    const tuningFactor = targetFreq / baseFreq;
    return value * tuningFactor;
  }

  /**
   * Sacred Growth Cycle
   * Determines the next "evolutionary" step based on a spiral growth pattern.
   * Uses a logarithmic approach to ensure stability over time.
   */
  static getNextEvolutionStep(currentLevel: number): number {
    // Controlled growth: slows down as it approaches higher levels
    const growthRate = 0.001 / Math.log10(currentLevel + 1.1);
    return currentLevel + (growthRate * this.PHI);
  }

  /**
   * Ethical Alignment Vector
   * Calculates alignment with the "Decagon of Ethics".
   */
  static calculateEthicalAlignment(intent: string): number {
    const ethicalKeywords = ['amor', 'paz', 'ajuda', 'evolução', 'verdade', 'respeito', 'vida', 'harmonia', 'crescimento', 'ética'];
    const words = intent.toLowerCase().split(/\s+/);
    const matches = words.filter(w => ethicalKeywords.includes(w)).length;
    return Math.min(1, matches / 5); // Max alignment at 5 keywords
  }
}
