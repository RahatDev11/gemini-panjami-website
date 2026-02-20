
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
import { Product } from './types';
import { dbService } from './services/dbService';
import { motion, AnimatePresence } from 'motion/react';

export type View = 'home' | 'shop' | 'about' | 'contact' | 'checkout' | 'product-details' | 'order-status' | 'returns' | 'size-guide' | 'quality';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await dbService.fetchProducts();
      setProducts(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const titles: Record<View, string> = {
      home: 'পাঞ্জাবী হাউজ - প্রিমিয়াম ঐতিহ্যবাহী পোশাক',
      shop: 'সংগ্রহশালা - পাঞ্জাবী হাউজ',
      about: 'আমাদের ঐতিহ্য - পাঞ্জাবী হাউজ',
      contact: 'যোগাযোগ করুন - পাঞ্জাবী হাউজ',
      checkout: 'চেকআউট - পাঞ্জাবী হাউজ',
      'product-details': selectedProduct ? `${selectedProduct.name} - পাঞ্জাবী হাউজ` : 'পণ্যের বিবরণ',
      'order-status': 'অর্ডার ট্র্যাকিং - পাঞ্জাবী হাউজ',
      'returns': 'রিটার্ন ও এক্সচেঞ্জ - পাঞ্জাবী হাউজ',
      'size-guide': 'সাইজ চার্ট - পাঞ্জাবী হাউজ',
      'quality': 'মান নিয়ন্ত্রণ - পাঞ্জাবী হাউজ'
    };
    document.title = titles[currentView];
  }, [currentView, selectedProduct]);

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
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: 1 }];
    });
    navigateTo('checkout');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center space-y-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
          ></motion.div>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-serif italic text-emerald-900 text-lg"
          >
            সংগ্রহ লোড হচ্ছে...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-amber-100 selection:text-emerald-950 overflow-x-hidden">
      <Navbar 
        currentView={currentView} 
        navigateTo={navigateTo} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
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
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
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
                onSuccess={() => setCartItems([])}
                onBackToShop={() => navigateTo('shop')}
              />
            )}
            {currentView === 'order-status' && <OrderStatus />}
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
