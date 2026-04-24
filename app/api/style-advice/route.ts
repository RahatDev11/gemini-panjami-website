import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { userPrompt } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({ 
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `আপনি "Any's Beauty Corner" এর একজন বিউটি কনসালট্যান্ট। 
        আপনার লক্ষ্য হলো গ্রাহকদের সঠিক স্কিনকেয়ার এবং মেকআপ সম্পর্কে পরামর্শ দেওয়া।
        আপনার কথা হবে মার্জিত, শ্রদ্ধাশীল এবং সাহায্যকারী। 
        সব সময় বাংলায় উত্তর দেবেন। 
        উত্তর ৩ বাক্যের মধ্যে রাখার চেষ্টা করুন।`,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Route Error:", error);
    return NextResponse.json({ error: "Failed to fetch advice" }, { status: 500 });
  }
}
