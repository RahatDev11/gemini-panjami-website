
import React from 'react';
import { motion } from 'motion/react';
import { Ruler, Info } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const sizeData = [
    { size: 'এস (S)', chest: '৩৮"', length: '৪০"', sleeve: '২৪"', shoulder: '১৬.৫"' },
    { size: 'এম (M)', chest: '৪০"', length: '৪২"', sleeve: '২৫"', shoulder: '১৭.৫"' },
    { size: 'এল (L)', chest: '৪২"', length: '৪৪"', sleeve: '২৫.৫"', shoulder: '১৮.৫"' },
    { size: 'এক্সএল (XL)', chest: '৪৪"', length: '৪৬"', sleeve: '২৬"', shoulder: '১৯.৫"' },
    { size: 'ডাবল এক্সএল (XXL)', chest: '৪৬"', length: '৪৮"', sleeve: '২৬.৫"', shoulder: '২০.৫"' },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.h4 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3"
          >
            নিখুঁত ফিটিং
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900"
          >
            সাধারণ সাইজ গাইড
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5 }}
            className="h-1 bg-amber-500 mx-auto mt-6"
          ></motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl overflow-hidden border border-stone-100 rounded-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-emerald-950 text-white">
                <tr>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-widest font-black border-r border-white/10">সাইজ</th>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-widest font-black border-r border-white/10">বুক (Chest)</th>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-widest font-black border-r border-white/10">লম্বা (Length)</th>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-widest font-black border-r border-white/10">হাতা (Sleeve)</th>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-widest font-black">কাঁধ (Shoulder)</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {sizeData.map((row, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    key={idx} 
                    className={`${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'} hover:bg-amber-50 transition-colors group`}
                  >
                    <td className="p-6 md:p-8 font-black text-emerald-900 group-hover:text-amber-600 transition-colors border-r border-stone-100">{row.size}</td>
                    <td className="p-6 md:p-8 font-light border-r border-stone-100">{row.chest}</td>
                    <td className="p-6 md:p-8 font-light border-r border-stone-100">{row.length}</td>
                    <td className="p-6 md:p-8 font-light border-r border-stone-100">{row.sleeve}</td>
                    <td className="p-6 md:p-8 font-light">{row.shoulder}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Ruler className="h-6 w-6 text-emerald-900" />
              <h3 className="font-serif font-bold text-2xl text-stone-900 italic">মাপ নেওয়ার পদ্ধতি</h3>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Info className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h5 className="text-[11px] uppercase tracking-widest font-black text-amber-600 mb-1">বুক</h5>
                  <p className="text-stone-500 text-sm font-light">ফিতাটি বুকের প্রশস্ত অংশের চারদিকে অনুভূমিকভাবে রেখে মাপ নিন।</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Info className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h5 className="text-[11px] uppercase tracking-widest font-black text-amber-600 mb-1">লম্বা</h5>
                  <p className="text-stone-500 text-sm font-light">কাঁধের সর্বোচ্চ বিন্দু থেকে আপনার কাঙ্ক্ষিত দৈর্ঘ্য পর্যন্ত মাপ নিন।</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Info className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h5 className="text-[11px] uppercase tracking-widest font-black text-amber-600 mb-1">কাস্টম ফিট</h5>
                  <p className="text-stone-500 text-sm font-light italic">বিশেষ মাপের পাঞ্জাবী দরকার? আমাদের বনানী শোরুমে ভিজিট করুন দর্জি পরিষেবার জন্য।</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-auto h-full min-h-[400px]"
          >
             <img 
               src="https://images.unsplash.com/photo-1598462047020-d7aa42d46e8c?q=80&w=1974&auto=format&fit=crop" 
               alt="টেইলারিং" 
               className="absolute inset-0 w-full h-full object-cover shadow-2xl rounded-sm"
             />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
