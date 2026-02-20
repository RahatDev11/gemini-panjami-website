
import React from 'react';
import { View } from '../App';
import { Facebook, Instagram, Youtube, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-emerald-950 text-stone-100 pt-16 pb-8 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <motion.div 
              whileHover={{ rotate: 12 }}
              className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-serif text-xl font-bold text-emerald-950"
            >
              প
            </motion.div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-white">পাঞ্জাবী হাউজ</h1>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed font-light max-w-xs">
            ২০১২ সাল থেকে আভিজাত্য আর ঐতিহ্যের মেলবন্ধনে আমরা তৈরি করছি প্রিমিয়াম পাঞ্জাবী।
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h6 className="font-serif font-bold text-sm mb-5 text-amber-500 uppercase tracking-widest">তথ্য ও সাহায্য</h6>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-stone-400 text-[11px] font-bold uppercase tracking-wider">
            <li><button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">হোম</button></li>
            <li><button onClick={() => navigateTo('shop')} className="hover:text-amber-400 transition-colors">দোকান</button></li>
            <li><button onClick={() => navigateTo('order-status')} className="hover:text-amber-400 transition-colors">ট্র্যাকিং</button></li>
            <li><button onClick={() => navigateTo('returns')} className="hover:text-amber-400 transition-colors">রিটার্ন</button></li>
            <li><button onClick={() => navigateTo('size-guide')} className="hover:text-amber-400 transition-colors">সাইজ</button></li>
            <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">যোগাযোগ</button></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div className="hidden lg:block">
          <h6 className="font-serif font-bold text-sm mb-5 text-amber-500 uppercase tracking-widest">ঠিকানা</h6>
          <div className="text-stone-400 text-[11px] space-y-3 font-medium">
            <p className="flex items-center space-x-3">
              <MapPin className="h-3 w-3 text-amber-500" />
              <span>বনানী রোড ১১, ঢাকা</span>
            </p>
            <p className="flex items-center space-x-3">
              <Phone className="h-3 w-3 text-amber-500" />
              <span>+৮৮০ ১৭১২ ৩৪৫৬৭৮</span>
            </p>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="space-y-4">
          <h6 className="font-serif font-bold text-sm mb-2 text-amber-500 uppercase tracking-widest">নিউজলেটার</h6>
          <p className="text-stone-400 text-[10px] font-light leading-relaxed">নতুন অফার পেতে আমাদের ইমেইল লিস্টে যোগ দিন।</p>
          <form className="flex border-b border-white/10 pb-1" onSubmit={e => { e.preventDefault(); alert("ধন্যবাদ!"); }}>
            <input 
              type="email" 
              placeholder="আপনার ইমেইল" 
              className="bg-transparent py-2 w-full text-stone-100 focus:outline-none text-[11px] font-medium" 
              required 
            />
            <button className="text-amber-500 px-2 font-black uppercase text-[10px] tracking-widest hover:text-amber-400 transition">
              <Send className="h-3 w-3" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-stone-500 text-[9px] uppercase tracking-[0.2em] font-bold">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-3 w-3 text-amber-500/50" />
          <p>© ২০২৫ পাঞ্জাবী হাউজ। আভিজাত্যের এক অনন্য ঐতিহ্য।</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => navigateTo('quality')} className="hover:text-amber-500 transition">মান নিয়ন্ত্রণ</button>
          <button onClick={() => navigateTo('about')} className="hover:text-amber-500 transition">আমাদের গল্প</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
