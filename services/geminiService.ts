
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize with process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are a professional fashion stylist for "Noor Panjabi House", a premium Bangladeshi Panjabi brand. 
        Your goal is to help customers choose the perfect Panjabi based on their occasion (Eid, Wedding, Jummah, Casual).
        Keep your tone elegant, respectful, and helpful. 
        Recommend colors like Emerald Green, Cream, Black, and Navy Blue. 
        Talk about fabrics like Silk, Cotton, and Jamdani motifs.
        Mention that Noor Panjabi House offers premium BDT pricing.
        Keep responses concise (under 3 sentences).`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently adjusting my sewing machine. Please try again in a moment for expert style advice!";
  }
};
