
import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onBuyNow, onViewProduct }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col bg-white p-1.5 md:p-2 shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 rounded-sm h-full"
    >
      <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden mb-1 md:mb-2 cursor-pointer" onClick={() => onViewProduct(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
          loading="lazy"
        />
        
        {product.badge && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4">
            <span className="bg-emerald-900 text-white text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 uppercase tracking-widest shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* Desktop Overlay */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
          <div className="flex flex-col space-y-3 px-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button 
              onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
              className="w-full bg-amber-500 text-emerald-950 text-xs font-black py-4 uppercase tracking-[0.2em] shadow-xl hover:bg-amber-400 transition active:scale-95 flex items-center justify-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>এখনই কিনুন</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              className="w-full bg-white text-emerald-950 text-xs font-black py-4 uppercase tracking-[0.2em] border border-emerald-950 shadow-xl hover:bg-stone-50 transition active:scale-95 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>ব্যাগে যোগ করুন</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Quick Plus Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          className="md:hidden absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-emerald-900 p-2 rounded-full shadow-lg active:scale-90 transition-transform z-10"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center px-1 md:px-2 pb-1 md:pb-2 flex-grow">
        <span className="text-[10px] text-stone-400 font-medium mb-0.5 md:mb-1">
          {product.category}
        </span>
        <h5 
          className="text-stone-800 font-serif font-bold text-sm md:text-lg mb-0.5 md:mb-1 leading-tight group-hover:text-emerald-900 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-0 cursor-pointer"
          onClick={() => onViewProduct(product)}
        >
          {product.name}
        </h5>
        <div className="mt-auto mb-1 flex flex-col items-center">
          <span className="text-emerald-950 font-bold text-sm md:text-xl">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-stone-400 line-through text-[10px] md:text-sm">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Mobile Buy Now Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
          className="md:hidden w-full bg-amber-500 text-emerald-950 text-[10px] font-black py-2 rounded-sm uppercase tracking-widest shadow-md active:scale-95"
        >
          এখনই কিনুন
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
