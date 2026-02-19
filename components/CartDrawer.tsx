
import React from 'react';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: {product: Product, quantity: number}[];
  total: number;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, items, total, updateQuantity, removeItem, onCheckout 
}) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose} 
      />
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-white text-stone-900 z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-emerald-900 text-white">
            <h2 className="text-2xl font-serif font-bold tracking-tight">Shopping Bag</h2>
            <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition">✕</button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-6">
                <div className="text-8xl opacity-10">👜</div>
                <p className="font-bold tracking-[0.3em] uppercase text-[10px]">Your bag is empty</p>
                <button 
                  onClick={onClose} 
                  className="text-emerald-900 font-bold border-b-2 border-amber-500 pb-1 uppercase tracking-widest text-[10px]"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex space-x-6 animate-fade-in-up">
                  <div className="w-24 aspect-[3/4] bg-stone-100 overflow-hidden shrink-0 shadow-md">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-stone-800 tracking-tight leading-tight">{item.product.name}</h3>
                        <button onClick={() => removeItem(item.product.id)} className="text-stone-300 hover:text-red-500 transition">✕</button>
                      </div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest">{item.product.category}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-stone-200 rounded-sm">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="px-3 py-1 hover:bg-stone-50 text-stone-500 transition">-</button>
                        <span className="px-4 text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="px-3 py-1 hover:bg-stone-50 text-stone-500 transition">+</button>
                      </div>
                      <p className="font-bold text-emerald-950 text-xl tracking-tighter">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 border-t border-stone-100 bg-stone-50 shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-black">Subtotal</span>
                <span className="text-3xl font-serif font-bold text-emerald-950 tracking-tighter">৳{total.toLocaleString()}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-emerald-900 text-white font-bold py-6 rounded-sm uppercase tracking-[0.4em] shadow-xl hover:bg-emerald-800 transition transform active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
