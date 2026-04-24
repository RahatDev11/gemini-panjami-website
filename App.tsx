
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
import ProductDetails from './views/ProductDetails';
import OrderStatus from './views/OrderStatus';
import Returns from './views/Returns';
import SizeGuide from './views/SizeGuide';
import QualityAssurance from './views/QualityAssurance';
import { Product, CartItem } from './types';
import { dbService } from './services/dbService';
import { auth, googleProvider } from './services/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export type View = 'home' | 'shop' | 'about' | 'contact' | 'checkout' | 'product-details' | 'order-status' | 'returns' | 'size-guide' | 'quality';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await dbService.fetchProducts();
      setProducts(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
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
    document.title = titles[currentView];
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Expose for Navbar search
  (window as any).navigateToProduct = navigateToProduct;

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div id="global-loading-spinner">
        <div className="flex flex-col items-center space-y-6">
          <div className="spinner-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-medium text-lipstick-dark text-lg"
          >
            লোড হচ্ছে...
          </motion.p>
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
};

export default App;
