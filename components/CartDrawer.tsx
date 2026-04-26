
import React from 'react';
import { CartItem, Product } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
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
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-[60]" 
            onClick={onClose} 
          />
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 40, stiffness: 400 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 flex justify-between items-center bg-white border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lipstick/10 rounded-2xl flex items-center justify-center text-lipstick-dark">
                    <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-stone-900 leading-tight">শপিং ব্যাগ</h2>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-lipstick-dark">{items.length}টি প্রোডাক্ট</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="hover:bg-lipstick/10 p-2 rounded-2xl transition-colors text-stone-400 hover:text-lipstick-dark"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar bg-background-soft/30">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 bg-lipstick/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-16 h-16 text-lipstick/20" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">আপনার ব্যাগটি খালি!</h3>
                  <p className="text-sm text-stone-400 mb-8 leading-relaxed">এখনই আপনার পছন্দের প্রোডাক্টগুলো ব্যাগে যোগ করুন।</p>
                  <button 
                    onClick={onClose} 
                    className="bg-lipstick-dark text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-lipstick/20 active:scale-95 flex items-center gap-2"
                  >
                    শপিং শুরু করুন
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id} 
                      className="group flex gap-4 bg-white p-4 rounded-[32px] shadow-sm border border-lipstick/5 hover:border-lipstick/20 transition-all hover:shadow-xl hover:shadow-lipstick/5 relative overflow-hidden"
                    >
                      <div 
                        className="w-20 aspect-square overflow-hidden rounded-2xl shrink-0 bg-stone-50 cursor-pointer"
                        onClick={() => onViewProduct(item as any)}
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start gap-2">
                          <h3 
                            className="font-bold text-stone-800 text-sm leading-snug line-clamp-2 cursor-pointer hover:text-primary-dark transition-colors"
                            onClick={() => onViewProduct(item as any)}
                          >
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="text-stone-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-center bg-background-soft rounded-xl p-1 border border-primary/5 shadow-inner">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)} 
                              className="p-1 px-2 hover:bg-white rounded-lg transition-colors text-primary-dark disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-stone-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)} 
                              className="p-1 px-2 hover:bg-white rounded-lg transition-colors text-primary-dark"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-black text-primary-dark text-lg">৳{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Screenshot Style */}
            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-lipstick/10 bg-white shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between bg-stone-50 p-4 rounded-[24px] border border-stone-100">
                  <div className="flex flex-col">
                    <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                      Total Items: <span className="text-stone-900">{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </span>
                    <span className="text-xl font-black text-lipstick tabular-nums leading-tight">
                      BDT {total.toLocaleString()}.00
                    </span>
                  </div>
                  <button 
                    onClick={onCheckout}
                    className="bg-lipstick text-white font-black px-8 py-4 rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-lipstick/20 hover:bg-lipstick-dark transition-all transform active:scale-95 flex items-center gap-2 group"
                  >
                    Place Order
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
