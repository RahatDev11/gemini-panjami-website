
import React from 'react';
import { Product } from '../lib/types';
import { ShoppingBag, Zap, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onBuyNow, onViewProduct, className }) => {
  const imageUrl = product.image ? product.image.split(',')[0].trim() : 'https://via.placeholder.com/300';
  const isOutOfStock = product.stockStatus === 'out_of_stock';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 h-full",
        className
      )}
    >
      <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden cursor-pointer" onClick={() => onViewProduct(product)}>
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform -rotate-12">
              স্টকে নেই
            </span>
          </div>
        )}

        {/* Badge */}
        {product.badge && !isOutOfStock && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-lipstick-dark text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
                onClick={(e) => { e.stopPropagation(); onViewProduct(product); }}
                className="p-3 bg-white text-lipstick-dark rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                <Eye className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="flex flex-col p-3 md:p-4 flex-grow bg-lipstick/5">
        <div className="flex-grow">
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 
            className="text-stone-800 font-bold text-sm md:text-base mb-2 leading-tight group-hover:text-lipstick-dark transition-colors line-clamp-2 cursor-pointer"
            onClick={() => onViewProduct(product)}
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lipstick-dark font-black text-lg md:text-xl">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-stone-400 line-through text-xs md:text-sm">৳{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button 
              disabled={isOutOfStock}
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              className={cn(
                "w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95",
                isOutOfStock 
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed" 
                  : "bg-white text-lipstick-dark border-2 border-lipstick-dark hover:bg-lipstick-dark hover:text-white"
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>কার্টে যোগ করুন</span>
            </button>
            <button 
              disabled={isOutOfStock}
              onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
              className={cn(
                "w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md",
                isOutOfStock 
                  ? "bg-stone-100 text-stone-300 cursor-not-allowed" 
                  : "bg-lipstick-dark text-white hover:bg-lipstick-dark/90"
              )}
            >
              <Zap className="w-4 h-4" />
              <span>এখনই কিনুন</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
