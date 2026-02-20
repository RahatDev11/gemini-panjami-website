
import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const inputClasses = "w-full bg-stone-50 border-2 border-stone-100 rounded-lg px-5 py-4 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all placeholder:text-stone-300 text-stone-800 font-medium";
  const labelClasses = "text-[10px] uppercase tracking-[0.2em] font-black text-stone-400 mb-2 block ml-1";

  return (
    <div className="bg-stone-50">
      <section className="py-24 bg-emerald-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">যোগাযোগ করুন</h1>
          <p className="text-amber-500 max-w-xl mx-auto px-4 uppercase tracking-[0.3em] text-[10px] font-black">আমাদের বিশেষজ্ঞ স্টাইল কনসালট্যান্টদের সাথে কথা বলুন</p>
        </motion.div>
      </section>

      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h4 className="text-emerald-800 font-black tracking-[0.4em] uppercase text-[10px]">আমাদের স্টোর</h4>
            <h3 className="text-4xl font-serif font-bold text-emerald-950">শোরুমের ঠিকানা</h3>
          </div>
          
          <div className="space-y-10">
            <div className="flex items-start space-x-6 group">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="pt-1">
                <h6 className="font-bold text-xl mb-1 text-stone-800">বনানী ফ্ল্যাগশিপ স্টোর</h6>
                <p className="text-stone-500 font-light leading-relaxed">রোড ১১, ব্লক এফ, বনানী, ঢাকা ১২১৩</p>
                <p className="text-emerald-600 text-xs mt-2 font-bold uppercase tracking-widest">প্রতিদিন সকাল ১০টা - রাত ১০টা</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                <Phone className="h-6 w-6" />
              </div>
              <div className="pt-1">
                <h6 className="font-bold text-xl mb-1 text-stone-800">গ্রাহক সেবা</h6>
                <p className="text-stone-500 font-light leading-relaxed">+৮৮০ ১৭১২ ৩৪৫৬৭৮</p>
                <p className="text-amber-600 text-xs mt-2 font-bold uppercase tracking-widest">হোয়াটসঅ্যাপ সাপোর্ট উপলব্ধ</p>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-900 p-10 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
             <h4 className="font-serif font-bold text-2xl mb-4 text-amber-400 italic">কর্পোরেট ও ওয়েডিং ডেক</h4>
             <p className="text-stone-300 text-sm leading-relaxed mb-8 font-light">একসাথে বেশি অর্ডার বা ওয়েডিং পার্টির জন্য বিশেষ কাস্টমাইজেশন সুবিধা পেতে আমাদের স্টাইলিং ডেস্কে যোগাযোগ করুন।</p>
             <button className="bg-white text-emerald-950 font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-lg hover:bg-amber-500 hover:text-white transition-all shadow-lg flex items-center space-x-2">
               <Mail className="h-4 w-4" />
               <span>ইমেইল করুন</span>
             </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-3xl border border-stone-50"
        >
          <div className="mb-10 text-center md:text-left">
            <h4 className="text-stone-800 font-serif font-bold text-2xl mb-2">মেসেজ পাঠান</h4>
            <p className="text-stone-400 text-sm font-light">আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি</p>
          </div>

          <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert("শুকরান! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>আপনার নাম</label>
                <input type="text" placeholder="পুরো নাম লিখুন" required className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>মোবাইল নম্বর</label>
                <input type="tel" placeholder="০১৭XXXXXXXX" required className={inputClasses} />
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>ইমেইল ঠিকানা</label>
              <input type="email" placeholder="example@mail.com" required className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>মেসেজ</label>
              <textarea rows={5} placeholder="আপনার কথা লিখুন..." required className={`${inputClasses} resize-none`}></textarea>
            </div>

            <button type="submit" className="w-full bg-emerald-900 text-white font-black py-6 rounded-xl uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all shadow-2xl transform active:scale-[0.98] border-b-4 border-emerald-950 text-sm mt-4 flex items-center justify-center space-x-3">
              <Send className="h-5 w-5" />
              <span>মেসেজ পাঠান</span>
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
