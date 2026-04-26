
import React, { useState, useEffect } from 'react';
import { View } from '@/lib/types';
import { ShoppingBag, Menu, X, Search, User, ChevronDown, LogOut, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { User as FirebaseUser } from 'firebase/auth';
import { APP_CONFIG } from '@/lib/config';

interface NavbarProps {
  currentView: View;
  navigateTo: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
  products: Product[];
  user: FirebaseUser | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  navigateTo, 
  cartCount, 
  onOpenCart, 
  products,
  user,
  onLogin,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const filteredProducts = searchQuery.trim() 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleNav = (view: View) => {
    navigateTo(view);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-lipstick shadow-sm border-b border-lipstick/5">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer shrink-0" 
          onClick={() => handleNav('home')}
        >
          <img 
            src={APP_CONFIG.logo} 
            alt={APP_CONFIG.name} 
            className="w-10 h-10 rounded-full border-2 border-lipstick/20 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <span className="text-lg md:text-xl font-black text-lipstick tracking-tight">{APP_CONFIG.name}</span>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-grow max-w-md relative">
          <div className="relative">
            <input 
              type="text"
              placeholder="প্রোডাক্ট সার্চ করুন..."
              className="w-full bg-lipstick/5 border-0 rounded-full py-2 px-10 text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-lipstick outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lipstick" />
          </div>
          <AnimatePresence>
            {filteredProducts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl mt-2 text-stone-800 overflow-hidden"
              >
                {filteredProducts.map(p => (
                  <div 
                    key={p.id}
                    className="p-3 flex items-center gap-3 hover:bg-stone-50 cursor-pointer border-b last:border-0"
                    onClick={() => {
                      navigateTo('product-details'); // In App.tsx I need to handle selection
                      // For now just redirecting to detail logic
                      (window as any).navigateToProduct?.(p);
                      setSearchQuery('');
                    }}
                  >
                    <img src={p.image.split(',')[0]} className="w-10 h-10 object-cover rounded" alt={p.name} />
                    <div className="flex-grow">
                      <p className="text-sm font-semibold truncate">{p.name}</p>
                      <p className="text-xs text-primary-dark font-bold">{p.price}৳</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            className="md:hidden p-2 hover:bg-lipstick/5 rounded-full transition"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 hover:bg-lipstick/5 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Cart */}
          <button 
            className="relative p-2 hover:bg-lipstick/5 rounded-full transition group"
            onClick={onOpenCart}
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-lipstick text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                {cartCount}
              </span>
            )}
          </button>

          {/* User / Login */}
          <div className="hidden md:block relative">
            {user ? (
              <div 
                className="flex items-center space-x-2 cursor-pointer p-1 pr-3 hover:bg-lipstick/5 rounded-full transition border border-lipstick/10"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img src={user.photoURL || ''} className="w-8 h-8 rounded-full border-2 border-lipstick/20" alt="User" />
                <span className="text-sm font-black text-stone-800 max-w-[100px] truncate">{user.displayName}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform text-lipstick", isUserMenuOpen && "rotate-180")} />
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="flex items-center space-x-2 py-2 px-5 bg-lipstick text-white rounded-full transition font-bold shadow-lg shadow-lipstick/20 hover:bg-lipstick-dark active:scale-95"
              >
                <User className="w-5 h-5" />
                <span>লগইন</span>
              </button>
            )}

            <AnimatePresence>
              {isUserMenuOpen && user && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-stone-800"
                >
                  <button 
                    onClick={() => { handleNav('order-status'); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>আমার অর্ডারসমূহ</span>
                  </button>
                  <button 
                    onClick={() => { handleNav('home'); setIsUserMenuOpen(false); }} // Link to Notify page if created
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center space-x-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>নোটিফিকেশন</span>
                  </button>
                  <hr className="my-2 border-stone-100" />
                  <button 
                    onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>লগআউট</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-4 py-2 overflow-hidden"
          >
            <div className="relative">
              <input 
                type="text"
                placeholder="প্রোডাক্ট সার্চ করুন..."
                className="w-full bg-stone-100 border-0 rounded-full py-2 px-10 text-stone-800 focus:ring-2 focus:ring-lipstick outline-none"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            </div>
            {filteredProducts.length > 0 && (
              <div className="mt-2 text-stone-800">
                {filteredProducts.map(p => (
                  <div 
                    key={p.id}
                    className="p-3 flex items-center gap-3 hover:bg-stone-50 cursor-pointer border-b last:border-0"
                    onClick={() => {
                        (window as any).navigateToProduct?.(p);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <img src={p.image.split(',')[0]} className="w-8 h-8 object-cover rounded" alt={p.name} />
                    <div className="flex-grow">
                      <p className="text-xs font-semibold truncate">{p.name}</p>
                      <p className="text-[10px] text-lipstick font-bold">{p.price}৳</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[300] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 h-screen w-full max-w-[280px] bg-white shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 flex justify-between items-center bg-lipstick text-white shrink-0">
                <div className="flex items-center space-x-3">
                  <img src={APP_CONFIG.logo} className="w-8 h-8 rounded-full border-2 border-white" alt={APP_CONFIG.name} />
                  <span className="font-bold text-lg">{APP_CONFIG.name}</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow py-4 flex flex-col overflow-y-auto">
                {user ? (
                   <div className="px-6 py-4 flex items-center space-x-3 border-b mb-2">
                     <img src={user.photoURL || ''} className="w-12 h-12 rounded-full border-2 border-lipstick" alt="User" />
                     <div>
                       <p className="font-bold text-stone-800">{user.displayName}</p>
                       <p className="text-xs text-stone-500">{user.email}</p>
                     </div>
                   </div>
                ) : (
                  <button 
                    onClick={onLogin}
                    className="mx-6 my-4 py-3 bg-lipstick text-white rounded-lg font-bold flex items-center justify-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span>লগইন করুন</span>
                  </button>
                )}

                {[
                  { label: 'হোম', view: 'home', icon: '🏠' },
                  { label: 'শপ', view: 'shop', icon: '🛍️' },
                  { label: 'অর্ডার ট্র্যাকিং', view: 'order-status', icon: '📦' },
                  { label: 'আমাদের সম্পর্কে', view: 'about', icon: '✨' },
                  { label: 'যোগাযোগ', view: 'contact', icon: '📞' },
                ].map((link) => (
                  <button 
                    key={link.view} 
                    onClick={() => handleNav(link.view as View)}
                    className={cn(
                      "w-full text-left py-3 px-6 text-sm font-semibold transition-all flex items-center space-x-3",
                      currentView === link.view ? "text-lipstick bg-lipstick/5" : "text-stone-600 hover:bg-stone-50"
                    )}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                ))}

                {user && (
                    <button 
                        onClick={onLogout}
                        className="mt-auto mx-6 my-6 py-3 border-2 border-red-100 text-red-600 rounded-lg font-bold flex items-center justify-center space-x-2"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>লগআউট</span>
                    </button>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
