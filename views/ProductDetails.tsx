
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Zap, Ruler, ShieldCheck, Star } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, products, onAddToCart, onBuyNow, onViewProduct, onBack 
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [mainImage, setMainImage] = useState<string>(product.image);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    setMainImage(product.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const galleryImages = [
    product.image,
    `https://picsum.photos/seed/${product.id + 101}/600/900`,
    `https://picsum.photos/seed/${product.id + 102}/600/900`,
    `https://picsum.photos/seed/${product.id + 103}/600/900`,
  ];

  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product, products]);

  return (
    <div className="bg-stone-50 min-h-screen py-4 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group flex items-center space-x-2 text-emerald-900 font-bold uppercase text-[11px] mb-6 md:mb-10 hover:text-amber-600 transition-colors py-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>সংগ্রহে ফিরে যান</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 z-10">
            <motion.div 
              layoutId={`product-image-${product.id}`}
              className="relative w-full overflow-hidden bg-white shadow-2xl rounded-sm border border-stone-200 aspect-[3/2]"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.div>
            
            <div className="flex flex-wrap justify-center lg:grid lg:grid-cols-4 gap-3 md:gap-4 max-w-full lg:max-w-md mx-auto">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:aspect-square overflow-hidden rounded-sm transition-all duration-300 border-2 ${
                    mainImage === img 
                      ? 'border-amber-500 scale-110 shadow-lg z-20' 
                      : 'border-transparent opacity-50 hover:opacity-100 hover:border-stone-300'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`দৃশ্য ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="bg-emerald-100 text-emerald-900 font-black tracking-widest uppercase text-[10px] md:text-xs px-3 py-1 rounded-full border border-emerald-200">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200">
                    {product.badge}
                  </span>
                )}
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-stone-900 leading-[1.1] tracking-tighter"
              >
                {product.name}
              </motion.h1>
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl md:text-4xl font-bold text-emerald-950 tracking-tighter">৳{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl md:text-2xl text-stone-400 line-through font-light italic">৳{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest">সাইজ নির্বাচন করুন</label>
                <button className="text-[11px] text-amber-600 font-bold uppercase underline tracking-widest flex items-center space-x-1">
                  <Ruler className="h-3 w-3" />
                  <span>সাইজ গাইড</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[56px] h-14 px-4 flex items-center justify-center font-bold transition-all border rounded-sm ${
                      selectedSize === size 
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl scale-110 z-10' 
                        : 'bg-white text-stone-600 border-stone-200 hover:border-amber-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-amber-500 text-emerald-950 font-black py-6 rounded-sm uppercase tracking-widest text-[13px] shadow-xl hover:bg-amber-400 transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3"
              >
                <Zap className="h-5 w-5" />
                <span>এখনই কিনুন</span>
              </button>
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-white border-2 border-emerald-900 text-emerald-900 font-black py-6 rounded-sm uppercase tracking-widest text-[13px] hover:bg-emerald-50 transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>ব্যাগে যোগ করুন</span>
              </button>
            </div>

            <div className="pt-12 border-t border-stone-200 space-y-10 text-stone-700 font-light leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-stone-900 text-2xl italic flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-500"></span>
                  কারিগরের গল্প
                </h4>
                <p className="text-base md:text-lg leading-relaxed text-stone-600">
                  প্রতিটি <span className="font-bold text-stone-900">{product.name}</span> আমাদের নিখুঁত কাজের এক অনন্য নিদর্শন। 
                  ঢাকার স্টুডিওতে অভিজ্ঞ দর্জিদের হাতে তৈরি এই পাঞ্জাবীতে আমরা প্রিমিয়াম তুলা এবং সিল্ক ব্যবহার করি যাতে আপনি পান এক আভিজাত্যপূর্ণ ও আরামদায়ক অভিজ্ঞতা।
                </p>
              </div>
              
              <div className="bg-emerald-950 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden group">
                <h5 className="text-[11px] uppercase tracking-widest font-black text-amber-500 mb-8 border-b border-amber-500/20 pb-4 flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>পণ্যের বৈশিষ্ট্যসমূহ</span>
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[12px] font-bold text-stone-300">
                  <li className="flex items-start space-x-3"><Star className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" /><span>উন্নত থ্রেড-কাউন্ট (TC 400+)</span></li>
                  <li className="flex items-start space-x-3"><Star className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" /><span>নূর সিগনেচার হেরিটেজ ফিট</span></li>
                  <li className="flex items-start space-x-3"><Star className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" /><span>নিখুঁত হাতের কাজ ও এমব্রয়ডারি</span></li>
                  <li className="flex items-start space-x-3"><Star className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" /><span>ইকো-সার্টিফাইড জৈব রং</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-24 border-t border-stone-200">
            <div className="text-center mb-16">
              <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3">আরও অপশন</h4>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight">আপনার আরও পছন্দ হতে পারে</h3>
              <div className="w-16 h-1 bg-amber-500 mx-auto mt-5"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
              {relatedProducts.map(rp => (
                <ProductCard 
                  key={rp.id} 
                  product={rp} 
                  onAdd={onAddToCart} 
                  onBuyNow={onBuyNow} 
                  onViewProduct={onViewProduct} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
