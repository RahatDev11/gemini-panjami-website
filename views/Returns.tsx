
import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, RefreshCcw, Check, ArrowRight } from 'lucide-react';

const Returns: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.h4 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3"
          >
            গ্রাহক সন্তুষ্টি আমাদের লক্ষ্য
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900"
          >
            রিটার্ন ও এক্সচেঞ্জ পলিসি
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5 }}
            className="h-1 bg-amber-500 mx-auto mt-6"
          ></motion.div>
        </div>

        <div className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 shadow-xl border border-stone-100 rounded-sm"
          >
            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="h-8 w-8 text-emerald-900" />
              <h3 className="font-serif font-bold text-2xl text-emerald-950 italic">আমাদের ৭ দিনের গ্যারান্টি</h3>
            </div>
            <p className="text-stone-600 leading-relaxed font-light mb-8">
              নূর পাঞ্জাবী হাউজে আমরা নিখুঁত মানের নিশ্চয়তা দিই। যদি আপনি আপনার কেনা পণ্যটি নিয়ে সম্পূর্ণ সন্তুষ্ট না হন, তবে আমরা সব ধরনের অব্যবহৃত পণ্যের জন্য ৭ দিনের রিটার্ন এবং এক্সচেঞ্জ সুবিধা প্রদান করি।
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-600">রিটার্ন করার শর্তাবলী</h4>
                <ul className="space-y-3 text-sm text-stone-500 font-light">
                  <li className="flex items-start space-x-3">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>পণ্যটি ট্যাগসহ মূল অবস্থায় থাকতে হবে।</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>ব্যবহারের চিহ্ন, পারফিউম বা ধোয়ার দাগ থাকা যাবে না।</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>মূল ইনভয়েস বা ডিজিটাল অর্ডার কনফার্মেশন থাকতে হবে।</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-600">প্রক্রিয়া</h4>
                <ul className="space-y-3 text-sm text-stone-500 font-light">
                  <li className="flex items-start space-x-3">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">১</span>
                    <span>আমাদের হোয়াটসঅ্যাপ বা ইমেইলে যোগাযোগ করুন।</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">২</span>
                    <span>পণ্যটি কুরিয়ারে পাঠান অথবা বনানী শোরুমে নিয়ে আসুন।</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">৩</span>
                    <span>যাচাই করার ৪৮ ঘণ্টার মধ্যে রিফান্ড বা এক্সচেঞ্জ সম্পন্ন হবে।</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-900 text-white p-10 shadow-lg group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <RefreshCcw className="h-6 w-6 text-amber-400 group-hover:rotate-180 transition-transform duration-700" />
                <h4 className="font-serif font-bold text-xl text-amber-400">এক্সচেঞ্জ</h4>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                অন্য সাইজ দরকার? প্রথমবার এক্সচেঞ্জের ক্ষেত্রে কোনো চার্জ নেওয়া হবে না। আমরা কুরিয়ারের মাধ্যমে আপনার কাছ থেকে পুরনো পণ্যটি সংগ্রহ করে নতুনটি পৌঁছে দেব।
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-stone-200 p-10 shadow-lg"
            >
              <h4 className="font-serif font-bold text-xl mb-4 text-emerald-950">রিফান্ড</h4>
              <p className="text-stone-600 text-sm leading-relaxed font-light">
                রিফান্ড আপনার মূল পেমেন্ট মেথড বা স্টোর ক্রেডিট হিসেবে দেওয়া হবে। ক্যাশ অন ডেলিভারির ক্ষেত্রে আমরা বিকাশ বা ব্যাংক ট্রান্সফার সুবিধা দিই।
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
