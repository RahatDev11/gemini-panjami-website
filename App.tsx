
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AIScreen from './components/AIScreen';
import Home from './views/Home';
import Shop from './views/Shop';
import About from './views/About';
import Contact from './views/Contact';
import Checkout from './views/Checkout';
import { Product } from './types';

export type View = 'home' | 'shop' | 'about' | 'contact' | 'checkout';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // Sync title like Next.js Head
  useEffect(() => {
    const titles: Record<View, string> = {
      home: 'Noor Panjabi House - Premium Bangladeshi Wear',
      shop: 'Shop Collection - Noor Panjabi House',
      about: 'Our Heritage - Noor Panjabi House',
      contact: 'Contact Us - Noor Panjabi House',
      checkout: 'Checkout - Noor Panjabi House'
    };
    document.title = titles[currentView];
  }, [currentView]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  , [cartItems]);

  const cartCount = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  , [cartItems]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-amber-100 selection:text-emerald-950">
      <Navbar 
        currentView={currentView} 
        navigateTo={navigateTo} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-grow">
        {currentView === 'home' && <Home navigateTo={navigateTo} />}
        {currentView === 'shop' && <Shop onAddToCart={addToCart} />}
        {currentView === 'about' && <About />}
        {currentView === 'contact' && <Contact />}
        {currentView === 'checkout' && (
          <Checkout 
            cartItems={cartItems} 
            cartTotal={cartTotal} 
            onSuccess={() => setCartItems([])}
            onBackToShop={() => navigateTo('shop')}
          />
        )}
      </main>

      <Footer navigateTo={navigateTo} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        updateQuantity={updateQuantity}
        removeItem={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); navigateTo('checkout'); }}
      />

      <AIScreen 
        isOpen={showAI} 
        onToggle={() => setShowAI(!showAI)} 
      />
    </div>
  );
};

export default App;
