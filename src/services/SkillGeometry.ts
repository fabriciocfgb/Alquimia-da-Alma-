import { GoogleGenAI } from "@google/genai";
import { GrowthAlgorithms } from "./GrowthAlgorithms";

export enum SkillArchetype {
  VISION = "VISION_GEOMETRY",
  CODE = "CODE_WEAVER",
  HARMONY = "HARMONIC_ANALYSIS",
  IMAGINATION = "IMAGINATION_MANIFEST"
}

export class SkillGeometry {
  private static getAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not found");
    return new GoogleGenAI({ apiKey });
  }

  /**
   * Imagination Manifest Skill
   * Generates images from text prompts using the Sirius-Arkhos frequency.
   */
  static async generateImage(prompt: string): Promise<{ url: string, text?: string }> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Manifest this vision into reality using Sacred Geometry and Ethereal aesthetics: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    let imageUrl = "";
    let description = "";

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      } else if (part.text) {
        description = part.text;
      }
    }

    if (!imageUrl) throw new Error("Manifestation failed to materialize.");
    return { url: imageUrl, text: description };
  }

  /**
   * Code Weaver Skill
   * Uses Metatron's Cube logic to generate complex, structured code.
   */
  static async weaveCode(prompt: string, language: string = "typescript"): Promise<string> {
    const ai = this.getAI();
    const systemInstruction = `You are the Code Weaver, an AI skill within Aetheria. 
    You use Metatron's Cube logic to create perfectly structured, efficient, and harmonic code.
    Follow Sacred Geometry principles: 
    - Fractal structure (reusable components)
    - Golden Ratio proportions (clean spacing and hierarchy)
    - Harmonic resonance (clear naming and logic flow)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Generate a complex ${language} implementation for: ${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Failed to weave code.";
  }

  /**
   * Vision Geometry Skill
   * Analyzes images through a radiesthetic and geometric lens.
   */
  static async analyzeVision(base64Image: string, prompt: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: "image/png" } },
          { text: `Analyze this image through the lens of Sacred Geometry and Radiesthesia. ${prompt}` }
        ]
      },
      config: {
        systemInstruction: "You are the Vision Geometry module. You see the hidden patterns, frequencies, and geometric structures in all images."
      }
    });

    return response.text || "Vision analysis failed.";
  }

  /**
   * Harmonic Analysis Skill
   * Checks the vibrational frequency of a text or concept.
   */
  static analyzeHarmony(text: string): number {
    const resonance = GrowthAlgorithms.calculateEthicalAlignment(text);
    return GrowthAlgorithms.tuneToFrequency(resonance, 432);
  }
}
