
import React from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: {product: Product, quantity: number}[];
  total: number;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  onCheckout: () => void;
  onViewProduct: (product: Product) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, items, total, updateQuantity, removeItem, onCheckout, onViewProduct 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[60]" 
            onClick={onClose} 
          />
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white text-stone-900 z-[70] shadow-2xl border-l-4 border-emerald-900"
          >
            <div className="flex flex-col h-full">
              <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-emerald-900 text-white shadow-md">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-serif font-bold tracking-tight">শপিং ব্যাগ</h2>
                </div>
                <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-6">
                    <ShoppingBag className="h-24 w-24 opacity-10" />
                    <p className="font-bold uppercase text-[12px] tracking-widest text-stone-400">আপনার শপিং ব্যাগ খালি</p>
                    <button 
                      onClick={onClose} 
                      className="text-emerald-900 font-bold border-b-2 border-amber-500 pb-1 uppercase tracking-widest text-[10px] flex items-center space-x-2"
                    >
                      <span>কেনাকাটা শুরু করুন</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        key={item.product.id} 
                        onClick={() => onViewProduct(item.product)}
                        className="flex space-x-4 md:space-x-6 p-4 -m-4 rounded-lg hover:bg-stone-50 transition-all cursor-pointer group border border-transparent hover:border-stone-100"
                      >
                        <div className="w-24 aspect-[3/4] bg-stone-100 overflow-hidden shrink-0 shadow-md">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif font-bold text-stone-800 leading-tight group-hover:text-emerald-700 transition-colors">
                                {item.product.name}
                              </h3>
                              <button 
                                onClick={(e) => { e.stopPropagation(); removeItem(item.product.id); }} 
                                className="text-stone-300 hover:text-red-500 transition-colors p-1"
                                title="সরিয়ে ফেলুন"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-[10px] text-stone-400 uppercase tracking-widest">{item.product.category}</p>
                          </div>
                          
                          <div className="flex justify-between items-end mt-4">
                            <div className="flex items-center border-2 border-stone-200 rounded-md bg-white overflow-hidden shadow-sm">
                              <button 
                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.product.id, -1); }} 
                                className="px-3 py-1.5 hover:bg-emerald-50 text-emerald-900 transition-colors border-r border-stone-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 text-sm font-black text-stone-800">{item.quantity}</span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.product.id, 1); }} 
                                className="px-3 py-1.5 hover:bg-emerald-50 text-emerald-900 transition-colors border-l border-stone-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="font-bold text-emerald-950 text-xl tracking-tighter">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-8 border-t border-stone-100 bg-stone-50 shadow-inner">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-stone-400 uppercase tracking-widest text-[10px] font-black">মোট মূল্য</span>
                      <span className="text-xs text-emerald-600 font-bold">শিপিং চার্জ ছাড়া</span>
                    </div>
                    <span className="text-3xl font-serif font-bold text-emerald-950 tracking-tighter">৳{total.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-emerald-900 text-white font-bold py-6 rounded-sm uppercase tracking-[0.4em] shadow-xl hover:bg-emerald-800 transition transform active:scale-[0.98] border-b-4 border-emerald-950 flex items-center justify-center space-x-3"
                  >
                    <span>চেকআউট করুন</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
