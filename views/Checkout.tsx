
import React, { useState } from 'react';
import { Product, CartItem, Order } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, User, Phone, MapPin, Building2, ChevronDown, CreditCard, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { dbService } from '../services/dbService';
import { notificationService } from '../services/notificationService';
import { User as FirebaseUser } from 'firebase/auth';

interface CheckoutProps {
  cartItems: CartItem[];
  cartTotal: number;
  user: FirebaseUser | null;
  onSuccess: () => void;
  onBackToShop: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, cartTotal, user, onSuccess, onBackToShop }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    city: 'Dhaka',
    note: ''
  });

  const shippingCharge = formData.city === 'Dhaka' ? 80 : 150;
  const grandTotal = cartTotal + shippingCharge;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderData: Partial<Order> = {
        userId: user?.uid || 'guest',
        items: cartItems,
        total: grandTotal,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city}`,
        status: 'Pending',
        note: formData.note
      };

      const result = await dbService.placeOrder(orderData);
      setOrderDetails(result);
      
      // Send notifications
      await notificationService.sendTelegramNotification(result);
      // await notificationService.sendOneSignalNotification(result); // Optional

      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 5000);
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && orderDetails) {
    return (
      <div className="bg-background-soft py-20 px-4 min-h-screen flex items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 text-center shadow-2xl border border-lipstick/10 max-w-2xl mx-auto rounded-[40px]"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <Check className="h-12 w-12" strokeWidth={3} />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">অর্ডার সফল হয়েছে!</h2>
          <div className="bg-lipstick/5 p-4 rounded-2xl mb-8 border border-lipstick/10">
              <p className="text-lipstick-dark font-black text-xl mb-1">ID: #{orderDetails.orderId}</p>
              <p className="text-stone-500 text-sm">অনুগ্রহ করে আপনার অর্ডার আইডিটি কপি করে রাখুন।</p>
          </div>
          <p className="text-stone-500 mb-10 text-lg leading-relaxed">
            ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।
          </p>
          <button 
            onClick={onBackToShop} 
            className="bg-lipstick-dark text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-lipstick transition shadow-lg flex items-center gap-3 mx-auto active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>আরও প্রোডাক্ট দেখুন</span>
          </button>
        </motion.div>
      </div>
    );
  }

  const inputClasses = "w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 pl-12 focus:bg-white focus:border-lipstick-dark focus:ring-4 focus:ring-lipstick/5 outline-none transition-all placeholder:text-stone-300 text-stone-800 font-bold";
  const labelClasses = "text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2 block ml-1";

  return (
    <div className="bg-background-soft py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 shadow-xl rounded-[40px] border border-lipstick/10"
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-stone-900">শিপিং তথ্য</h2>
            <p className="text-lipstick-dark text-sm mt-2 font-bold flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                সঠিক তথ্য দিয়ে আমাদের ডেলিভারি করতে সহায়তা করুন
            </p>
          </div>
          
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className={labelClasses}>আপনার নাম</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-lipstick-dark" />
                    <input 
                        type="text" 
                        placeholder="সম্পূর্ণ নাম" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className={inputClasses} 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={labelClasses}>মোবাইল নম্বর</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-lipstick-dark" />
                    <input 
                        type="tel" 
                        placeholder="০১৭XXXXXXXX" 
                        required 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className={inputClasses} 
                    />
                  </div>
                </div>
            </div>

            <div className="relative">
              <label className={labelClasses}>বিস্তারিত ঠিকানা</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-5 h-5 w-5 text-lipstick-dark" />
                <textarea 
                    placeholder="বাসা নং, রোড, এলাকা" 
                    required 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className={`${inputClasses} pl-12 h-28 resize-none pt-4`}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className={labelClasses}>শহর/জেলা</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-lipstick-dark" />
                    <select 
                        required 
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                      <option value="Dhaka">ঢাকা (সিটি কর্পোরেশন)</option>
                      <option value="Outside Dhaka">ঢাকার বাইরে (অন্যান্য)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 w-5 h-5" />
                  </div>
                </div>
            </div>

            <div className="bg-lipstick/5 p-6 rounded-3xl border-2 border-dashed border-lipstick/20 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-lipstick-dark" />
                <p className="text-xs uppercase tracking-widest font-black text-lipstick-dark">পেমেন্ট মেথড</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-lipstick/10 shadow-sm flex items-center gap-4">
                 <div className="w-6 h-6 rounded-full border-4 border-lipstick-dark flex items-center justify-center">
                    <div className="w-2 h-2 bg-lipstick-dark rounded-full"></div>
                 </div>
                 <span className="font-bold text-stone-800 text-sm">ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-lipstick-dark text-white font-bold py-5 rounded-2xl uppercase tracking-widest shadow-xl hover:bg-lipstick transition-all transform active:scale-[0.98] mt-8 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingBag className="w-5 h-5" />}
              অর্ডার সম্পন্ন করুন ৳{grandTotal.toLocaleString()}
            </button>
          </form>
        </motion.div>

        {/* Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:pt-6"
        >
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-lipstick/20 pb-4">
              <h2 className="text-2xl font-bold text-stone-900">অর্ডার সারসংক্ষেপ</h2>
              <button 
                onClick={onBackToShop} 
                className="text-lipstick-dark hover:text-stone-800 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>আরও প্রোডাক্ট যোগ করুন</span>
              </button>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={item.id} 
                    className="flex gap-4 items-center group bg-white p-3 rounded-2xl shadow-sm border border-lipstick/5"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-stone-800 text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-stone-400 font-bold uppercase mt-0.5">Qty: <span className="text-lipstick-dark">x{item.quantity}</span></p>
                    </div>
                    <span className="font-bold text-stone-900 text-sm">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-8 space-y-4 bg-white p-8 rounded-[40px] shadow-sm border border-lipstick/10">
              <div className="flex justify-between text-stone-500 text-sm font-bold">
                  <span>উপমোট</span>
                  <span>৳{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500 text-sm font-bold">
                  <span>শিপিং চার্জ ({formData.city === 'Dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})</span>
                  <span>৳{shippingCharge}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-lipstick-dark pt-6 border-t-2 border-lipstick/10">
                <span>সর্বমোট</span>
                <span className="drop-shadow-sm">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
