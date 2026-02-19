
import React, { useState } from 'react';
import { View } from '../App';

interface NavbarProps {
  currentView: View;
  navigateTo: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, navigateTo, cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Heritage', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNav = (view: View) => {
    navigateTo(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-900/95 backdrop-blur-md text-stone-50 shadow-xl">
      <nav className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
        {/* Brand */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => handleNav('home')}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-full flex items-center justify-center font-serif text-2xl md:text-3xl font-bold text-emerald-950 group-hover:rotate-6 transition-all duration-500">
            N
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tighter">NOOR</h1>
            <p className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-70 font-bold">Panjabi House</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-12 text-[11px] uppercase tracking-[0.3em] font-bold">
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`hover:text-amber-400 transition-all relative py-1 ${
                currentView === link.view ? 'text-amber-400' : 'text-stone-100'
              }`}
            >
              {link.label}
              {currentView === link.view && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 animate-expand-width"></span>
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button 
            className="relative p-2 hover:text-amber-400 transition transform hover:scale-110" 
            onClick={onOpenCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="lg:hidden p-2 text-amber-500" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-[300px] border-t border-white/5' : 'max-h-0'}`}>
        <div className="px-6 py-8 flex flex-col space-y-6 text-sm uppercase tracking-[0.2em] font-bold">
          {navLinks.map((link) => (
            <button 
              key={link.view} 
              onClick={() => handleNav(link.view)}
              className={currentView === link.view ? 'text-amber-400' : 'text-stone-300'}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
