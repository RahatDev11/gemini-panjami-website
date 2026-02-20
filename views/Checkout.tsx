
import React, { useState } from 'react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, User, Phone, MapPin, Building2, ChevronDown, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';

interface CheckoutProps {
  cartItems: { product: Product; quantity: number }[];
  cartTotal: number;
  onSuccess: () => void;
  onBackToShop: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, cartTotal, onSuccess, onBackToShop }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    onSuccess();
  };

  if (isSuccess) {
    return (
      <div className="bg-stone-50 py-24 px-4 min-h-[70vh] flex items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-16 text-center shadow-2xl border border-stone-100 max-w-2xl mx-auto rounded-3xl"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10"
          >
            <Check className="h-12 w-12" strokeWidth={3} />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">অর্ডার সফলভাবে সম্পন্ন হয়েছে</h2>
          <p className="text-stone-500 mb-10 text-lg font-light leading-relaxed">শুকরান! আপনার রিকোয়েস্ট NH-{Math.floor(10000+Math.random()*90000)} প্রসেস করা হচ্ছে। আমাদের প্রতিনিধি ভেরিফিকেশনের জন্য শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
          <button onClick={onBackToShop} className="bg-emerald-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition rounded-xl shadow-lg flex items-center space-x-3 mx-auto">
            <ShoppingBag className="h-5 w-5" />
            <span>আরও পাঞ্জাবী দেখুন</span>
          </button>
        </motion.div>
      </div>
    );
  }

  const inputClasses = "w-full bg-white border-2 border-stone-100 rounded-xl px-5 py-4 pl-12 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all placeholder:text-stone-300 text-stone-800 font-medium";
  const labelClasses = "text-[10px] uppercase tracking-[0.2em] font-black text-stone-400 mb-2 block ml-1";

  return (
    <div className="bg-stone-50 py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Shipping Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-stone-100"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold text-emerald-950">শিপিং তথ্য</h2>
            <p className="text-stone-400 text-xs mt-2 font-light">সঠিক তথ্য দিয়ে আমাদের ডেলিভারি করতে সহায়তা করুন</p>
          </div>
          
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="relative">
              <label className={labelClasses}>গ্রহীতার নাম</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                <input type="text" placeholder="পুরো নাম লিখুন" required className={inputClasses} />
              </div>
            </div>

            <div className="relative">
              <label className={labelClasses}>মোবাইল নম্বর</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                <input type="tel" placeholder="০১৭XXXXXXXX" required className={inputClasses} />
              </div>
            </div>

            <div className="relative">
              <label className={labelClasses}>বিস্তারিত ঠিকানা</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-5 h-5 w-5 text-stone-300" />
                <textarea placeholder="বাসা নং, রোড, এলাকা" required className={`${inputClasses} pl-12 h-32 resize-none pt-4`}></textarea>
              </div>
            </div>

            <div className="relative">
              <label className={labelClasses}>জেলা</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                <select required className={`${inputClasses} appearance-none cursor-pointer`}>
                  <option value="">জেলা নির্বাচন করুন</option>
                  <option value="Dhaka">ঢাকা</option>
                  <option value="Chittagong">চট্টগ্রাম</option>
                  <option value="Sylhet">সিলেট</option>
                  <option value="Rajshahi">রাজশাহী</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-4 w-4 text-amber-700" />
                <p className="text-[10px] uppercase tracking-widest font-black text-amber-700">পেমেন্ট মেথড</p>
              </div>
              <label className="flex items-center space-x-4 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="radio" defaultChecked className="peer appearance-none w-6 h-6 border-2 border-amber-300 rounded-full checked:border-emerald-900 transition-all" />
                  <div className="absolute w-3 h-3 bg-emerald-900 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
                <span className="font-bold text-stone-800 text-sm group-hover:text-emerald-900 transition-colors">ক্যাশ অন ডেলিভারি (পণ্য পেয়ে টাকা পরিশোধ)</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-6 rounded-xl uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-800 transition-all transform active:scale-[0.98] border-b-4 border-emerald-950 mt-8">
              অর্ডার সম্পন্ন করুন ৳{(cartTotal + 100).toLocaleString()}
            </button>
          </form>
        </motion.div>

        {/* Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:pt-10"
        >
          <div className="sticky top-32 space-y-10">
            <div className="flex items-center justify-between border-b-2 border-amber-500 pb-4">
              <h2 className="text-2xl font-serif font-bold text-emerald-950">অর্ডার সারসংক্ষেপ</h2>
              <button onClick={onBackToShop} className="text-stone-400 hover:text-emerald-900 transition-colors flex items-center space-x-1 text-xs font-bold uppercase tracking-widest">
                <ArrowLeft className="h-3 w-3" />
                <span>ফিরে যান</span>
              </button>
            </div>
            <div className="space-y-6 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.product.id} 
                    className="flex space-x-6 items-center group"
                  >
                    <div className="w-20 aspect-[3/4] overflow-hidden rounded-xl shadow-md shrink-0">
                      <img src={item.product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.product.name} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif font-bold text-stone-800 group-hover:text-emerald-800 transition-colors">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1 font-bold">{item.product.category} <span className="text-amber-600">x{item.quantity}</span></p>
                    </div>
                    <span className="font-bold text-emerald-950 text-lg">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="pt-8 border-t border-stone-200 space-y-4">
              <div className="flex justify-between text-stone-500 text-sm font-medium"><span>উপমোট</span><span>৳{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-stone-500 text-sm font-medium"><span>শিপিং চার্জ</span><span>৳১০০</span></div>
              <div className="flex justify-between text-2xl font-serif font-bold text-emerald-950 pt-6 border-t-2 border-stone-100">
                <span>সর্বমোট</span>
                <span className="text-emerald-900">৳{(cartTotal + 100).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
