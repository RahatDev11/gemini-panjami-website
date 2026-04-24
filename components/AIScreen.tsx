
import React, { useState, useEffect, useRef } from 'react';
import { getStyleAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, MessageSquare, X, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

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
        text: 'আসসালামু আলাইকুম! আমি Any\'s Beauty Corner-এর এআই বিউটি কনসালট্যান্ট। আপনার স্কিন কেয়ার বা মেকআপ নিয়ে যেকোনো প্রশ্ন থাকলে আমাকে করতে পারেন। আমি আপনাকে সঠিক প্রোডাক্ট খুঁজে পেতে সাহায্য করব।' 
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
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-4 md:right-8 w-[420px] max-w-[95vw] bg-white rounded-[32px] shadow-2xl border border-lipstick/10 z-[100] overflow-hidden flex flex-col h-[600px]"
          >
            <div className="bg-lipstick-dark text-white p-6 flex justify-between items-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-20 h-20 rotate-12" />
                </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-lipstick-dark font-black text-xl shadow-inner italic">A</div>
                <div>
                  <p className="font-black text-lg leading-none">বিউটি কনসালট্যান্ট</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-[9px] uppercase tracking-widest opacity-80 font-bold">এআই অনলাইন</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={onToggle}
                className="relative z-10 w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                  <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-background-soft/30 no-scrollbar">
              {chatHistory.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm",
                      msg.role === 'user' ? "bg-lipstick-dark text-white" : "bg-white text-lipstick-dark border border-lipstick/10"
                  )}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : "AI"}
                  </div>
                  <div className={cn(
                      "max-w-[75%] rounded-2xl px-5 py-4 text-xs md:text-sm leading-relaxed shadow-sm font-bold",
                      msg.role === 'user' 
                        ? 'bg-lipstick-dark text-white rounded-br-none' 
                        : 'bg-white text-stone-800 rounded-bl-none border border-lipstick/10'
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white text-lipstick-dark border border-lipstick/10 flex items-center justify-center text-[10px] font-black shadow-sm">AI</div>
                  <div className="bg-white border border-lipstick/10 rounded-2xl px-5 py-4 flex gap-1.5 shadow-sm">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-lipstick-dark rounded-full"></motion.div>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-lipstick-dark rounded-full"></motion.div>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-lipstick-dark rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-lipstick/10 flex items-center gap-3">
              <input 
                type="text" 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="স্কিন কেয়ার নিয়ে প্রশ্ন করুন..." 
                className="flex-grow bg-stone-50 border-2 border-stone-100 rounded-2xl px-6 py-4 text-xs md:text-sm font-bold focus:outline-none focus:border-lipstick-dark focus:bg-white transition-all shadow-inner"
              />
              <button type="submit" className="bg-lipstick-dark text-white p-4 rounded-2xl hover:bg-black transition-all shadow-lg active:scale-90 shrink-0">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className={cn(
            "fixed bottom-6 right-6 md:bottom-8 md:right-8 p-4 md:p-5 rounded-[24px] shadow-2xl transition-all duration-300 z-[110] flex items-center justify-center group",
            isOpen ? 'bg-white text-lipstick-dark ring-4 ring-lipstick/10' : 'bg-lipstick-dark text-white'
        )}
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageSquare className="w-7 h-7" />
              <span className="hidden md:block font-black uppercase text-[10px] tracking-[0.2em]">এআই হেল্প</span>
            </>
          )}
        </div>
      </motion.button>
    </>
  );
};

export default AIScreen;
