
import React from 'react';
import { motion } from 'motion/react';

const About: React.FC = () => {
  return (
    <div className="bg-stone-50">
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1974&auto=format&fit=crop" 
          alt="Craft" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-400 font-serif italic text-2xl mb-4"
          >
            এক দশকের নিরবচ্ছিন্ন সেবা
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            আমাদের ঐতিহ্য
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            className="h-1 bg-amber-500 mx-auto"
          ></motion.div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-4">শুরুর কথা</h4>
            <h3 className="text-4xl font-serif font-bold text-stone-800 italic">ঐতিহ্যের এক অবিচ্ছেদ্য অংশ</h3>
          </div>
          <p className="text-stone-600 text-lg leading-relaxed font-light">
            ২০১২ সালে প্রতিষ্ঠিত পাঞ্জাবী হাউজের জন্ম হয়েছিল বিশ্ব দরবারে বাংলাদেশের সূক্ষ্ম কারুকার্য তুলে ধরার লক্ষ্য নিয়ে। 
            আমরা আধুনিক টেইলারিংয়ের সাথে প্রাচীন বয়ন পদ্ধতির সংমিশ্রণ ঘটিয়ে তৈরি করি প্রতিটি আভিজাত্যপূর্ণ পোশাক।
          </p>
          <div className="flex space-x-8 pt-4">
            <div>
              <p className="text-3xl font-serif font-bold text-emerald-900">৫০ হাজার+</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-400">সন্তুষ্ট গ্রাহক</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-emerald-900">২০০+</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-400">দক্ষ কারিগর</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" className="rounded-sm shadow-2xl relative z-10" alt="ঐতিহ্য" />
          <div className="absolute -top-6 -left-6 w-full h-full border-2 border-amber-500/30 -z-0"></div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
