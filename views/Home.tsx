
import React from 'react';
import { CATEGORIES } from '../constants';
import { View } from '../App';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  products: Product[];
  navigateTo: (view: View) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, navigateTo, onAddToCart, onBuyNow, onViewProduct }) => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Panjabi Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/20 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4 tracking-wide"
          >
            অভিজাত ঐতিহ্যবাহী পোশাক
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white text-4xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tighter"
          >
            খাঁটি <span className="text-amber-500">বাঙালি</span> <br/> আভিজাত্য
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigateTo('shop')}
              className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-12 py-5 transition-all rounded-sm uppercase tracking-widest text-sm shadow-2xl active:scale-95"
            >
              সংগ্রহ দেখুন
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold px-12 py-5 transition-all rounded-sm uppercase tracking-widest text-sm backdrop-blur-md active:scale-95"
            >
              আমাদের গল্প
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-stone-100/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight">আমাদের প্রোডাক্ট সমূহ</h3>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAddToCart} 
                onBuyNow={onBuyNow}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
