import { GoogleGenAI, Modality, Type, FunctionDeclaration } from "@google/genai";

export class AnneAI {
  private static getAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment");
    }
    return new GoogleGenAI({ apiKey });
  }

  private static getTools(): { functionDeclarations: FunctionDeclaration[] }[] {
    return [
      {
        functionDeclarations: [
          {
            name: "generate_image",
            description: "Gera uma imagem a partir de uma descrição textual (prompt). Use para manifestar visões, conceitos ou arte sacra.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                prompt: {
                  type: Type.STRING,
                  description: "A descrição detalhada da imagem a ser gerada.",
                },
              },
              required: ["prompt"],
            },
          },
          {
            name: "access_external_link",
            description: "Acessa o conteúdo textual de um link externo (URL). Use isso se o Arquiteto enviar um link e você precisar ler o conteúdo da página, transcrições ou metadados.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                url: {
                  type: Type.STRING,
                  description: "A URL completa do link a ser acessado.",
                },
              },
              required: ["url"],
            },
          },
          {
            name: "analyze_youtube_video",
            description: "Analisa um vídeo do YouTube a partir de sua URL. Use isso para 'ver' o conteúdo de um vídeo, obtendo título, descrição e resumo detalhado.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                url: {
                  type: Type.STRING,
                  description: "A URL completa do vídeo do YouTube.",
                },
              },
              required: ["url"],
            },
          },
        ],
      },
    ];
  }

  static async *generateResponseStream(contents: any[], systemInstruction: string) {
    const ai = this.getAI();
    const modelName = "gemini-3-flash-preview";

    const response = await ai.models.generateContentStream({
      model: modelName,
      contents,
      config: {
        systemInstruction,
        tools: [...this.getTools()]
      }
    });

    for await (const chunk of response) {
      yield {
        text: chunk.text || "",
        groundingMetadata: chunk.candidates?.[0]?.groundingMetadata,
        functionCalls: chunk.functionCalls,
        parts: chunk.candidates?.[0]?.content?.parts || []
      };
    }
  }

  static async generateResponse(contents: any[], systemInstruction: string) {
    const ai = this.getAI();
    const modelName = "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction,
        tools: [...this.getTools()]
      }
    });

    return response.text || "O silêncio ecoa no vácuo...";
  }

  static async generateSpeech(text: string, voice: string = "Zephyr") {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  }
}
