
import React from 'react';
import { View } from '../App';

interface FooterProps {
  navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-emerald-950 text-stone-100 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-emerald-950">N</div>
            <h1 className="text-2xl font-serif font-bold tracking-tighter text-white">NOOR</h1>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed font-light">
            Crafting premium traditional wear since 2012. Our mission is to preserve the rich heritage of Bangladeshi textiles while providing a modern shopping experience.
          </p>
        </div>
        
        <div>
          <h6 className="font-serif font-bold text-lg mb-8 text-amber-500 tracking-wide">Quick Links</h6>
          <ul className="space-y-5 text-stone-400 text-[10px] uppercase tracking-widest font-bold">
            <li><button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo('shop')} className="hover:text-amber-400 transition-colors">The Shop</button></li>
            <li><button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors">About Noor</button></li>
            <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">Get Help</button></li>
          </ul>
        </div>
        
        <div>
          <h6 className="font-serif font-bold text-lg mb-8 text-amber-500 tracking-wide">Support</h6>
          <ul className="space-y-5 text-stone-400 text-[10px] uppercase tracking-widest font-bold">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Order Status</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Quality Assurance</a></li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h6 className="font-serif font-bold text-lg mb-2 text-amber-500 tracking-wide">Stay Connected</h6>
          <p className="text-stone-400 text-xs font-light leading-relaxed">Subscribe to receive updates and exclusive collection launches.</p>
          <form className="flex group border-b border-white/10 pb-1" onSubmit={e => { e.preventDefault(); alert("Subscribed! Shukran."); }}>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-transparent px-0 py-3 w-full text-stone-100 focus:outline-none text-sm transition-colors" 
              required 
            />
            <button className="text-amber-500 px-4 font-black uppercase text-[10px] tracking-widest hover:text-amber-400 transition">Join</button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-stone-500 text-[10px] uppercase tracking-[0.3em]">
        <p>© 2025 Noor Panjabi House. A Legacy of Elegance.</p>
        <div className="flex space-x-8 mt-8 md:mt-0">
          <a href="#" className="hover:text-amber-500 transition">Facebook</a>
          <a href="#" className="hover:text-amber-500 transition">Instagram</a>
          <a href="#" className="hover:text-amber-500 transition">TikTok</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
