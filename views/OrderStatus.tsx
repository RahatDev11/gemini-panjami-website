
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Search, Truck, CheckCircle2, Clock } from 'lucide-react';

const OrderStatus: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("প্রসেসিং হচ্ছে");
  };

  return (
    <div className="bg-stone-50 min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-800 font-black tracking-[0.4em] uppercase text-[10px] mb-3"
          >
            শিপমেন্ট ট্র্যাকিং
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-bold text-stone-900 leading-tight"
          >
            আপনার অর্ডার ট্র্যাক করুন
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5 }}
            className="h-1.5 bg-amber-500 mx-auto mt-8 rounded-full"
          ></motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-stone-100 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50/50 rounded-full -mr-32 -mt-32 -z-0"></div>
          
          <form onSubmit={handleTrack} className="space-y-10 relative z-10">
            <div className="space-y-4">
              <label className="text-[11px] uppercase tracking-[0.3em] font-black text-emerald-900 text-center block mb-2">অর্ডার নম্বর (Order ID)</label>
              <div className="relative max-w-lg mx-auto">
                <Package className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-stone-300" />
                <input 
                  type="text" 
                  placeholder="যেমন: NH-12345" 
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  required
                  className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl py-6 pl-16 pr-6 focus:bg-white focus:border-amber-500 focus:ring-8 focus:ring-amber-500/5 outline-none transition-all text-xl md:text-2xl font-serif font-bold text-stone-800 placeholder:text-stone-200 shadow-inner"
                />
              </div>
            </div>
            
            <button type="submit" className="w-full max-w-lg mx-auto block bg-emerald-900 text-white font-black py-6 rounded-2xl uppercase tracking-[0.4em] shadow-2xl hover:bg-emerald-800 transition-all transform active:scale-[0.98] border-b-4 border-emerald-950 flex items-center justify-center space-x-3">
              <Search className="h-5 w-5" />
              <span>অবস্থা দেখুন</span>
            </button>
          </form>

          <AnimatePresence>
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-20 pt-16 border-t-2 border-dashed border-stone-100"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col">
                     <span className="text-stone-400 uppercase tracking-widest text-[10px] font-black mb-1">অর্ডার নম্বর: {orderId}</span>
                     <span className="text-stone-900 font-serif font-bold text-xl">অর্ডারের বর্তমান অবস্থা</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm border border-amber-200">{status}</span>
                </div>
                
                <div className="relative pt-8">
                  <div className="relative h-3 bg-stone-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '33.33%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute left-0 top-0 h-full bg-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.4)]"
                    ></motion.div>
                  </div>
                  <div className="grid grid-cols-3 mt-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black">
                    <div className="flex flex-col items-start space-y-2">
                      <span className="text-emerald-600 flex items-center space-x-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>অর্ডার হয়েছে</span>
                      </span>
                      <span className="text-stone-400 font-light">১০ মার্চ, ২০২৪</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-stone-400 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>তৈরি হচ্ছে</span>
                      </span>
                      <span className="text-stone-300 font-light">অপেক্ষা করুন</span>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-stone-400 flex items-center space-x-1">
                        <Truck className="h-3 w-3" />
                        <span>ডেলিভারি পথে</span>
                      </span>
                      <span className="text-stone-300 font-light">আসন্ন</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 bg-white/50 p-8 rounded-2xl border border-dashed border-stone-200 text-center">
          <p className="text-stone-500 text-sm font-light leading-relaxed">
            সাধারণত ঢাকা সিটিতে ২-৩ দিন এবং ঢাকার বাইরে ৫-৭ দিনের মধ্যে আমরা ডেলিভারি করে থাকি।<br/>
            যেকোনো প্রয়োজনে আমাদের <span className="text-emerald-900 font-black cursor-pointer hover:text-amber-600 transition-colors border-b-2 border-amber-500/30">হোয়াটসঅ্যাপ সাপোর্টে</span> যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
