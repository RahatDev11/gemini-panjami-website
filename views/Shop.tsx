
import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart, onBuyNow, onViewProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className="py-12 md:py-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 md:mb-16 space-y-8 lg:space-y-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3">প্রিমিয়াম ক্যাটালগ</h4>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight">২০২৫ কালেকশন</h3>
          </motion.div>
          
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border ${
                activeCategory === 'All' ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl' : 'bg-white text-stone-400 border-stone-200 hover:border-amber-500'
              }`}
            >
              সব ডিজাইন
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.slug}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat.name ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl' : 'bg-white text-stone-400 border-stone-200 hover:border-amber-500'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-10 md:gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAddToCart} 
                onBuyNow={onBuyNow} 
                onViewProduct={onViewProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
