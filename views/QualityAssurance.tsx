
import React from 'react';
import { motion } from 'motion/react';
import { Microscope, Scissors, ShieldCheck, Sparkles } from 'lucide-react';

const QualityAssurance: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <motion.h4 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3"
          >
            নূর স্ট্যান্ডার্ড
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900"
          >
            আপসহীন গুণমান
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5 }}
            className="h-1 bg-amber-500 mx-auto mt-6"
          ></motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative order-2 lg:order-1"
           >
             <img src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1964&auto=format&fit=crop" className="shadow-2xl rounded-sm" alt="কোয়ালিটি" />
             <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500/10 -z-10 rounded-full blur-3xl"></div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8 order-1 lg:order-2"
           >
             <h3 className="font-serif font-bold text-3xl text-emerald-950 italic">রাজকীয় ফেব্রিক</h3>
             <p className="text-stone-600 leading-relaxed font-light text-lg">
               প্রতিটি পাঞ্জাবীর বুনন শুরু হয় সেরা সুতা দিয়ে। আমরা সরাসরি সেরা মিল থেকে মালবেরি সিল্ক এবং ইজিপশিয়ান কটন সংগ্রহ করি। কাটিং টেবিলে যাওয়ার আগে প্রতিটি কাপড় রঙ এবং স্থায়িত্বের জন্য পরীক্ষা করা হয়।
             </p>
             <div className="space-y-4">
               {[
                 "কাপড়ের আকার ঠিক রাখতে প্রি-শ্রাঙ্ক ফেব্রিক",
                 "উন্নত মানের জৈব রঙ (অর্গানিক ডাই)",
                 "আরামদায়ক বুনন যা বাতাসের চলাচলে সহায়তা করে"
               ].map((item, i) => (
                 <motion.div 
                   initial={{ opacity: 0, x: 10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.1 * i }}
                   viewport={{ once: true }}
                   key={i} 
                   className="flex items-center space-x-3"
                 >
                   <Sparkles className="h-4 w-4 text-amber-500" />
                   <span className="text-sm font-bold uppercase tracking-widest text-stone-400">{item}</span>
                 </motion.div>
               ))}
             </div>
           </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-950 p-12 md:p-20 text-white grid md:grid-cols-3 gap-12 text-center rounded-sm shadow-2xl"
        >
           <div className="space-y-6">
             <div className="flex justify-center">
               <Microscope className="h-12 w-12 text-amber-500" />
             </div>
             <h5 className="font-serif font-bold text-xl text-amber-500">কঠোর পরীক্ষণ</h5>
             <p className="text-stone-400 text-xs font-light tracking-wide leading-relaxed uppercase">প্যাকেজিংয়ের আগে প্রতিটি পোশাক ১২টি ধাপে মান পরীক্ষা করা হয়।</p>
           </div>
           <div className="space-y-6">
             <div className="flex justify-center">
               <Scissors className="h-12 w-12 text-amber-500" />
             </div>
             <h5 className="font-serif font-bold text-xl text-amber-500">কারিগরী বুনন</h5>
             <p className="text-stone-400 text-xs font-light tracking-wide leading-relaxed uppercase">অভিজ্ঞ কারিগরদের নিখুঁত হাতের স্পর্শে তৈরি হয় প্রতিটি নকশা।</p>
           </div>
           <div className="space-y-6">
             <div className="flex justify-center">
               <ShieldCheck className="h-12 w-12 text-amber-500" />
             </div>
             <h5 className="font-serif font-bold text-xl text-amber-500">স্থায়িত্বের নিশ্চয়তা</h5>
             <p className="text-stone-400 text-xs font-light tracking-wide leading-relaxed uppercase">আমাদের প্রতিটি পোশাক প্রজন্মের পর প্রজন্ম টিকে থাকার মতো করে তৈরি।</p>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QualityAssurance;
