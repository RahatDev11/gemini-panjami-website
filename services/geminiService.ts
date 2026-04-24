
export const getStyleAdvice = async (userPrompt: string) => {
  try {
    const response = await fetch('/api/style-advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPrompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "আমি দুঃখিত, আমি এই মুহূর্তে স্টাইল পরামর্শ দিতে পারছি না। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন!";
  }
};