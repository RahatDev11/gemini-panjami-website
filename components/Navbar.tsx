
import React, { useState } from 'react';
import { View } from '../App';
import { ShoppingBag, Menu, X, Phone, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: View;
  navigateTo: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, navigateTo, cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: View }[] = [
    { label: 'হোম', view: 'home' },
    { label: 'শপ', view: 'shop' },
    { label: 'ঐতিহ্য', view: 'about' },
    { label: 'যোগাযোগ', view: 'contact' },
  ];

  const handleNav = (view: View) => {
    navigateTo(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-900/95 backdrop-blur-md text-stone-50 shadow-xl border-b border-amber-500/20">
      <nav className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
        {/* Brand */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => handleNav('home')}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-full flex items-center justify-center font-serif text-2xl md:text-3xl font-bold text-emerald-950 group-hover:rotate-6 transition-all duration-500 shadow-lg shrink-0">
            প
          </div>
          <div className="flex items-baseline space-x-1.5 md:space-x-2">
            <h1 className="text-lg md:text-2xl font-serif font-bold tracking-tighter text-white leading-none">পাঞ্জাবী</h1>
            <p className="text-xs md:text-base tracking-widest uppercase text-amber-500 font-black leading-none">হাউজ</p>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-12 text-[13px] font-bold">
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`hover:text-amber-400 transition-all relative py-1 uppercase tracking-widest ${
                currentView === link.view ? 'text-amber-400' : 'text-stone-100'
              }`}
            >
              {link.label}
              {currentView === link.view && (
                <motion.span 
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <button 
            className="relative p-2 hover:text-amber-400 transition transform hover:scale-110" 
            onClick={onOpenCart}
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-amber-500 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg border border-emerald-900"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          
          <button 
            className="lg:hidden p-2 text-amber-500 hover:bg-white/10 rounded-full transition" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[300] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 h-screen w-full max-w-[320px] bg-emerald-900 shadow-2xl flex flex-col overflow-hidden border-l-2 border-amber-500/30"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5 bg-emerald-950 shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-serif text-xl font-bold text-emerald-950 shadow-lg">
                    প
                  </div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-serif font-bold text-lg text-white leading-none">পাঞ্জাবী</span>
                    <span className="text-xs tracking-widest uppercase text-amber-500 font-black leading-none">হাউজ</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-amber-500 hover:bg-white/5 p-2 rounded-full transition"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow py-6 flex flex-col px-4 space-y-2 overflow-y-auto bg-emerald-900">
                {navLinks.map((link) => (
                  <button 
                    key={link.view} 
                    onClick={() => handleNav(link.view)}
                    className={`w-full text-left py-4 px-6 text-[15px] font-bold transition-all rounded-sm flex items-center justify-between group uppercase tracking-widest ${
                      currentView === link.view 
                        ? 'text-amber-400 bg-emerald-950 border-r-4 border-amber-500' 
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`h-4 w-4 text-amber-500 transition-opacity ${currentView === link.view ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>

              <div className="p-8 border-t border-white/5 bg-emerald-950 shrink-0">
                <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-4">আমাদের সাথে যুক্ত থাকুন</p>
                <div className="space-y-3">
                   <div className="flex items-center space-x-3">
                     <Phone className="h-4 w-4 text-amber-500" />
                     <p className="text-[12px] text-stone-100 font-bold">+৮৮০ ১৭১২ ৩৪৫৬৭৮</p>
                   </div>
                   <div className="flex items-start space-x-3">
                     <MapPin className="h-4 w-4 text-amber-500 mt-0.5" />
                     <p className="text-[11px] text-stone-300 leading-relaxed">বনানী রোড ১১, ব্লক এফ, ঢাকা</p>
                   </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
