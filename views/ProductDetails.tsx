
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Zap, Ruler, ShieldCheck, Heart, Share2, Plus, Minus, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProductDetailsProps {
  product: Product;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onViewProduct: (product: Product) => void;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, products, onAddToCart, onBuyNow, onViewProduct, onBack 
}) => {
  const images = product.image ? product.image.split(',').map(s => s.trim()) : ['https://via.placeholder.com/600x900'];
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('Standard');
  const sizes = ['Mini', 'Standard', 'Combo'];

  useEffect(() => {
    setMainImage(images[0]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  const isOutOfStock = product.stockStatus === 'out_of_stock';

  return (
    <div className="bg-background-soft min-h-screen py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="flex items-center gap-2 text-lipstick-dark font-bold uppercase text-xs mb-8 group"
        >
          <ArrowLeft className="w-4 h-4" />
          সব প্রোডাক্ট দেখুন
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20 bg-white p-6 md:p-10 rounded-[40px] shadow-xl shadow-lipstick/5 border border-lipstick/10">
          {/* Gallery */}
          <div className="space-y-6">
            <motion.div 
              layoutId={`product-image-${product.id}`}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-stone-50 border border-lipstick/10"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              {isOutOfStock && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-red-500 text-white font-black px-6 py-3 rounded-full text-xl shadow-2xl transform -rotate-12">স্টকে নেই</span>
                </div>
              )}
            </motion.div>
            
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setMainImage(img)}
                    className={cn(
                        "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0",
                        mainImage === img ? "border-lipstick-dark shadow-md scale-105" : "border-stone-100 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`view ${i}`} referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-lipstick/10 text-lipstick-dark px-3 py-1 rounded-full">{product.category}</span>
                <div className="flex gap-2">
                    <button className="p-2.5 rounded-full bg-stone-100 text-stone-400 hover:bg-lipstick/10 hover:text-lipstick-dark transition-colors"><Heart className="w-5 h-5" /></button>
                    <button className="p-2.5 rounded-full bg-stone-100 text-stone-400 hover:bg-lipstick/10 hover:text-lipstick-dark transition-colors"><Share2 className="w-5 h-5" /></button>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-stone-900 leading-tight">{product.name}</h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl md:text-4xl font-black text-lipstick-dark">৳{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-stone-300 line-through">৳{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">ভ্যারিয়েন্ট নির্বাচন করুন</label>
                <button className="text-[10px] text-lipstick-dark font-bold uppercase underline tracking-widest flex items-center gap-1">
                  <Ruler className="w-3 h-3" />
                  <span>গাইড</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider border-2 transition-all",
                      selectedSize === size 
                        ? "bg-lipstick-dark text-white border-lipstick-dark shadow-lg ring-4 ring-lipstick/10" 
                        : "bg-white text-stone-400 border-stone-100 hover:border-lipstick/30"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">পরিমাণ</label>
                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-2xl border-2 border-stone-100 w-fit">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white rounded-xl transition-colors"><Minus className="w-4 h-4 text-stone-600" /></button>
                    <span className="w-12 text-center font-black text-stone-800 text-lg">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-white rounded-xl transition-colors"><Plus className="w-4 h-4 text-stone-600" /></button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                disabled={isOutOfStock}
                onClick={() => onBuyNow(product, quantity)}
                className="flex-1 bg-lipstick-dark text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm shadow-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5" />
                <span>এখনই কিনুন</span>
              </button>
              <button 
                disabled={isOutOfStock}
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-white border-2 border-lipstick-dark text-lipstick-dark font-black py-5 rounded-2xl uppercase tracking-widest text-sm hover:bg-lipstick/5 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>কার্টে যোগ করুন</span>
              </button>
            </div>

            <div className="pt-8 border-t-2 border-dashed border-lipstick/10 space-y-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-lipstick/10 text-lipstick-dark rounded-2xl shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                    <div>
                        <h4 className="font-bold text-stone-800 text-sm">১০০% অরিজিনাল প্রোডাক্ট</h4>
                        <p className="text-xs text-stone-500">আমরা সরাসরি ব্র‍্যান্ড থেকে প্রোডাক্ট সংগ্রহ করি।</p>
                    </div>
                </div>
                <div className="bg-lipstick/5 p-6 rounded-3xl">
                    <h4 className="font-black text-stone-800 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <Star className="w-4 h-4 text-lipstick-dark" />
                        বিস্তারিত বর্ণনা
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                        {product.description || "এই প্রোডাক্টটি সম্পর্কে কোনো বিস্তারিত তথ্য নেই। তবে আমরা নিশ্চিত করছি এটি আপনার সৌন্দর্যের পরিপূরক হবে।"}
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tight">আপনার আরও পছন্দ হতে পারে</h2>
              <div className="w-12 h-1 bg-lipstick-dark mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map(rp => (
                <ProductCard 
                  key={rp.id} 
                  product={rp} 
                  onAdd={(p) => onAddToCart(p, 1)} 
                  onBuyNow={(p) => onBuyNow(p, 1)} 
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
