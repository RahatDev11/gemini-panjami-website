
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getStyleAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `আপনি "পাঞ্জাবী হাউজ" এর একজন পেশাদার স্টাইল কনসালট্যান্ট। 
        আপনার লক্ষ্য হলো গ্রাহকদের তাদের অনুষ্ঠান (ঈদ, বিয়ে, জুমা, ক্যাজুয়াল) অনুযায়ী সঠিক পাঞ্জাবী বাছাই করতে সাহায্য করা।
        আপনার কথা হবে মার্জিত, শ্রদ্ধাশীল এবং সাহায্যকারী। 
        সব সময় বাংলায় উত্তর দেবেন। কোনো ইংরেজি শব্দ ব্যবহার করবেন না।
        রঙ হিসেবে পান্না সবুজ (Emerald Green), ক্রিম, কালো এবং নেভি ব্লু এর কথা বলুন। 
        সিল্ক, কটন এবং জামদানি মোটিফের মতো ফেব্রিকের গুরুত্ব তুলে ধরুন।
        মনে করিয়ে দিন যে পাঞ্জাবী হাউজ এর দাম প্রিমিয়াম কিন্তু সাশ্রয়ী।
        উত্তর ৩ বাক্যের মধ্যে রাখার চেষ্টা করুন।`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "আমি দুঃখিত, আমি এই মুহূর্তে স্টাইল পরামর্শ দিতে পারছি না। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন!";
  }
};