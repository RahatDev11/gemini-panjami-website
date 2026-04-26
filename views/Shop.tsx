
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, LayoutGrid, List, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart, onBuyNow, onViewProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // newest as default if we had dates
    });
  }, [activeCategory, searchQuery, sortBy, products]);

  return (
    <div className="py-12 md:py-16 bg-background-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header/Title */}
        <div className="mb-12 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
            >
                আমাদের কালেকশন
            </motion.h1>
            <div className="w-20 h-1.5 bg-lipstick-dark mx-auto rounded-full"></div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-xl shadow-lipstick/5 border border-lipstick/10 mb-12 flex flex-col lg:flex-row gap-6 items-center">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="প্রোডাক্ট খুঁজুন..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-lipstick-dark outline-none transition-all font-bold"
            />
          </div>

          {/* Categories Scrollable */}
          <div className="flex-grow flex overflow-x-auto gap-2 no-scrollbar w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all",
                  activeCategory === cat 
                    ? "bg-lipstick-dark text-white shadow-lg" 
                    : "bg-white text-stone-400 hover:text-lipstick-dark"
                )}
              >
                {cat === 'All' ? 'সব ডিজাইন' : 
                 cat === 'health' ? 'স্বাস্থ্য' :
                 cat === 'cosmetics' ? 'মেকআপ' :
                 cat === 'skincare' ? 'স্কিনকেয়ার' :
                 cat === 'haircare' ? 'হেয়ারকেয়ার' :
                 cat === 'mehandi' ? 'মেহেদী' : cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative w-full lg:w-48">
            <select 
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full appearance-none pl-4 pr-10 py-3 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-lipstick-dark outline-none font-bold text-sm cursor-pointer"
            >
              <option value="newest">সর্বশেষ</option>
              <option value="price-low">মূল্য (নিম্ন থেকে উচ্চ)</option>
              <option value="price-high">মূল্য (উচ্চ থেকে নিম্ন)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
              >
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={onAddToCart} 
                    onBuyNow={onBuyNow} 
                    onViewProduct={onViewProduct}
                  />
                ))}
              </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-stone-400"
                >
                    <SlidersHorizontal className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-xl font-bold">কোন প্রোডাক্ট খুঁজে পাওয়া যায়নি!</p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Shop;
