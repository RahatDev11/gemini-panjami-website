
import React, { useState, useEffect, useRef } from 'react';
import { getStyleAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, MessageSquare, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIScreenProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIScreen: React.FC<AIScreenProps> = ({ isOpen, onToggle }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([{ 
        role: 'model', 
        text: 'আসসালামু আলাইকুম! আমি পাঞ্জাবী হাউজের স্টাইল কনসালট্যান্ট। ঈদ, বিয়ে বা ক্যাজুয়াল ব্যবহারের জন্য সেরা পাঞ্জাবী খুঁজে পেতে আমি আপনাকে সাহায্য করতে পারি। আপনি কোন অনুষ্ঠানের জন্য পোশাক খুঁজছেন?' 
      }]);
    }
    scrollToBottom();
  }, [isOpen, chatHistory, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    const advice = await getStyleAdvice(userInput);
    const aiMsg: ChatMessage = { role: 'model', text: advice || 'দুঃখিত, আমি এই মুহূর্তে সংযোগ করতে পারছি না। দয়া করে আবার চেষ্টা করুন।' };
    setChatHistory(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[400px] max-w-[90vw] bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border border-stone-100 z-[100] overflow-hidden flex flex-col h-[600px]"
          >
            <div className="bg-emerald-900 text-white p-6 flex justify-between items-center shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-emerald-900 font-black text-lg">প</div>
                <div>
                  <p className="font-serif font-bold text-lg leading-none">স্টাইল কনসালট্যান্ট</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Sparkles className="h-2 w-2 text-amber-500" />
                    <p className="text-[9px] uppercase tracking-widest opacity-60">এআই প্রযুক্তি চালিত</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-stone-50/50 custom-scrollbar">
              {chatHistory.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-900 text-white rounded-br-none' 
                      : 'bg-white text-stone-800 rounded-bl-none border border-stone-100'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-100 rounded-2xl px-5 py-3 flex space-x-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-amber-500 rounded-full"></motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-amber-500 rounded-full"></motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-amber-500 rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-stone-100 flex items-center space-x-3">
              <input 
                type="text" 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="যেমন: বিয়ের জন্য কোন রঙটি ভালো হবে?" 
                className="flex-grow bg-stone-50 border border-stone-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-emerald-900 transition-colors"
              />
              <button type="submit" className="bg-emerald-900 text-white p-3 rounded-full hover:bg-emerald-800 transition shadow-lg transform active:scale-95">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className={`fixed bottom-8 right-8 p-5 rounded-full shadow-2xl transition-all duration-300 z-[110] flex items-center justify-center group ${
          isOpen ? 'bg-stone-100 text-emerald-900 hover:bg-stone-200' : 'bg-amber-500 text-emerald-950'
        }`}
      >
        <div className="flex items-center space-x-3">
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <>
              <MessageSquare className="h-7 w-7" />
              <span className="hidden md:block font-black uppercase text-[11px] tracking-widest">স্টাইল এআই</span>
            </>
          )}
        </div>
      </motion.button>
    </>
  );
};

export default AIScreen;
