
import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="animate-fade-in py-16 md:py-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3">Premium Catalog</h4>
            <h3 className="text-4xl font-serif font-bold text-stone-800 tracking-tight">The 2025 Collection</h3>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === 'All' ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl' : 'bg-white text-stone-400 border-stone-200 hover:border-amber-500'
              }`}
            >
              All Designs
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.slug}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat.name ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl' : 'bg-white text-stone-400 border-stone-200 hover:border-amber-500'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-stone-400 font-serif italic text-xl">We are currently stitching more masterpieces in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
