
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="group flex flex-col bg-white p-3 shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 rounded-sm">
      <div className="relative aspect-[3/4.5] bg-stone-100 overflow-hidden mb-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
          loading="lazy"
        />
        
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-emerald-900 text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={() => onAdd(product)}
            className="w-full bg-amber-500 text-emerald-950 text-xs font-bold py-4 uppercase tracking-[0.2em] shadow-2xl hover:bg-amber-400 transition transform active:scale-95"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center px-4 pb-4">
        <span className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-medium mb-3">
          {product.category}
        </span>
        <h5 className="text-stone-800 font-serif font-bold text-lg mb-3 leading-tight group-hover:text-emerald-900 transition-colors">
          {product.name}
        </h5>
        <div className="flex items-center space-x-4">
          <span className="text-emerald-950 font-bold text-xl">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-stone-400 line-through text-sm">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
