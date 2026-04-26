"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AIScreen from '@/components/AIScreen';
import Home from '@/components/views/Home';
import Shop from '@/components/views/Shop';
import About from '@/components/views/About';
import Contact from '@/components/views/Contact';
import Checkout from '@/components/views/Checkout';
import ProductDetails from '@/components/views/ProductDetails';
import OrderStatus from '@/components/views/OrderStatus';
import Returns from '@/components/views/Returns';
import SizeGuide from '@/components/views/SizeGuide';
import QualityAssurance from '@/components/views/QualityAssurance';
import { Product, CartItem, View } from '@/lib/types';
import { dbService } from '@/lib/services/dbService';
import { getFirebaseAuth, googleProvider } from '@/lib/services/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    } catch (error) {
      console.warn("Firebase Auth not available:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Set a timeout to stop loading even if Firebase hangs
      const timeoutId = setTimeout(() => {
        console.warn("Loading timed out, using fallback data.");
        setIsLoading(false);
      }, 5000);

      try {
        const data = await dbService.fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogin = async () => {
    try {
      const auth = getFirebaseAuth();
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const titles: Record<View, string> = {
      home: 'Any\'s Beauty Corner - আপনার সৌন্দর্য চর্চার বিশ্বস্ত সঙ্গী',
      shop: 'সংগ্রহশালা - Any\'s Beauty Corner',
      about: 'আমাদের সম্পর্কে - Any\'s Beauty Corner',
      contact: 'যোগাযোগ করুন - Any\'s Beauty Corner',
      checkout: 'চেকআউট - Any\'s Beauty Corner',
      'product-details': selectedProduct ? `${selectedProduct.name} - Any's Beauty Corner` : 'পণ্যের বিবরণ',
      'order-status': 'অর্ডার ট্র্যাকিং - Any\'s Beauty Corner',
      'returns': 'রিটার্ন ও এক্সচেঞ্জ - Any\'s Beauty Corner',
      'size-guide': 'সাইজ চার্ট - Any\'s Beauty Corner',
      'quality': 'মান নিয়ন্ত্রণ - Any\'s Beauty Corner'
    };
    if (typeof document !== 'undefined') {
        document.title = titles[currentView];
    }
  }, [currentView, selectedProduct]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image.split(',')[0], 
        quantity 
      }];
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigateTo('checkout');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
        (window as any).navigateToProduct = navigateToProduct;
    }
  }, [products]);

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  , [cartItems]);

  const cartCount = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  , [cartItems]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-40 h-40 rounded-full border-4 border-lipstick/10 flex items-center justify-center overflow-hidden bg-white shadow-2xl">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Spinning ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute -inset-2 border-t-2 border-r-2 border-lipstick rounded-full"
            />
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <h1 className="text-3xl md:text-5xl font-black text-lipstick tracking-tighter">
              Any'sBeautyCorner
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-4">
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-lipstick rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-lipstick rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-lipstick rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-soft selection:bg-lipstick/30 selection:text-lipstick-dark overflow-x-hidden pt-16 md:pt-20">
      <Navbar 
        currentView={currentView} 
        navigateTo={navigateTo} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        products={products}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'home' && (
              <Home 
                products={products}
                navigateTo={navigateTo} 
                onAddToCart={handleAddToCart} 
                onBuyNow={handleBuyNow} 
                onViewProduct={navigateToProduct}
              />
            )}
            {currentView === 'shop' && (
              <Shop 
                products={products}
                onAddToCart={handleAddToCart} 
                onBuyNow={handleBuyNow} 
                onViewProduct={navigateToProduct}
              />
            )}
            {currentView === 'product-details' && selectedProduct && (
              <ProductDetails 
                product={selectedProduct}
                products={products}
                onAddToCart={(p, q) => { addToCart(p, q); setIsCartOpen(true); }}
                onBuyNow={(p, q) => { addToCart(p, q); navigateTo('checkout'); }}
                onViewProduct={navigateToProduct}
                onBack={() => navigateTo('shop')}
              />
            )}
            {currentView === 'about' && <About />}
            {currentView === 'contact' && <Contact />}
            {currentView === 'checkout' && (
              <Checkout 
                cartItems={cartItems} 
                cartTotal={cartTotal} 
                user={user}
                onSuccess={() => { setCartItems([]); navigateTo('home'); }}
                onBackToShop={() => navigateTo('shop')}
              />
            )}
            {currentView === 'order-status' && <OrderStatus user={user} />}
            {currentView === 'returns' && <Returns />}
            {currentView === 'size-guide' && <SizeGuide />}
            {currentView === 'quality' && <QualityAssurance />}
          </motion.div>
        </AnimatePresence>
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
        onViewProduct={(product) => { setIsCartOpen(false); navigateToProduct(product); }}
      />

      <AIScreen 
        isOpen={showAI} 
        onToggle={() => setShowAI(!showAI)} 
      />
    </div>
  );
}
