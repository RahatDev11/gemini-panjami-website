
import React, { useEffect, useState } from 'react';
import { View } from '../types';
import ProductCard from '../components/ProductCard';
import { Product, EventBanner } from '../types';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { dbService } from '../services/dbService';
import { ShoppingBag, Star, Sparkles, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface HomeProps {
  products: Product[];
  navigateTo: (view: View) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, navigateTo, onAddToCart, onBuyNow, onViewProduct }) => {
  const [events, setEvents] = useState<EventBanner[]>([]);
  const sliderProducts = products.filter(p => p.isInSlider).sort((a, b) => (a.sliderOrder || 99) - (b.sliderOrder || 99));
  const activeEvents = events.filter(e => e.isActive).slice(0, 3);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await dbService.fetchEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* New Arrivals / Hero Slider */}
      {sliderProducts.length > 0 && (
        <section className="relative h-[400px] md:h-[500px] overflow-hidden rounded-b-[40px] shadow-lg">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="fade"
            loop={sliderProducts.length > 1}
            className="h-full w-full"
          >
            {sliderProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <div className="relative h-full w-full">
                  <img 
                    src={p.image.split(',')[0]} 
                    className="absolute inset-0 h-full w-full object-cover" 
                    alt={p.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="max-w-2xl text-white"
                    >
                      <span className="bg-lipstick-dark text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                        New Arrival
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold mb-4">{p.name}</h2>
                      <p className="text-lg md:text-xl text-white/90 font-bold mb-6">৳{p.price.toLocaleString()}</p>
                      <button 
                        onClick={() => onViewProduct(p)}
                        className="bg-white text-lipstick-dark px-8 py-3 rounded-xl font-bold hover:bg-lipstick transition-colors uppercase tracking-wider text-sm shadow-xl"
                      >
                        Shop Now
                      </button>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Featured Events */}
        {activeEvents.length > 0 && (
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-lipstick-dark flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6" />
                Special Events
              </h2>
            </div>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000 }}
              pagination={{ clickable: true }}
              spaceBetween={20}
              className="rounded-2xl shadow-md"
            >
              {activeEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <div 
                    className="relative h-44 md:h-64 rounded-2xl bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${event.imageUrl || 'https://picsum.photos/seed/event/1200/400'})` }}
                  >
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-6 text-white">
                      <h3 className="text-2xl md:text-4xl font-bold mb-2">{event.title}</h3>
                      <p className="max-w-md text-sm md:text-lg opacity-90">{event.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-4 py-2 no-scrollbar scroll-smooth">
          {['all', 'health', 'cosmetics', 'skincare', 'haircare', 'mehandi'].map((cat) => (
            <button
              key={cat}
              onClick={() => navigateTo('shop')} // Could pass state later
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider border-2 transition-all",
                "bg-white border-lipstick-dark text-lipstick-dark hover:bg-lipstick-dark hover:text-white"
              )}
            >
              {cat === 'all' ? 'সকল প্রোডাক্ট' : 
               cat === 'health' ? 'স্বাস্থ্য' :
               cat === 'cosmetics' ? 'মেকআপ' :
               cat === 'skincare' ? 'স্কিনকেয়ার' :
               cat === 'haircare' ? 'হেয়ারকেয়ার' : 'মেহেদী'}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-lipstick-dark">Hot Deals</h2>
            <button 
              onClick={() => navigateTo('shop')}
              className="text-lipstick-dark font-bold text-sm hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAddToCart} 
                onBuyNow={onBuyNow}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-lipstick/10 py-12 rounded-[40px] px-6">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-lipstick-dark mb-4">আমাদের কালেকশন সম্পর্কে গ্রাহক মতামত</h2>
                <div className="w-20 h-1 bg-lipstick-dark mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[1, 2].map(i => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-lipstick/20 relative">
                        <Star className="absolute -top-3 -right-3 text-yellow-400 w-10 h-10 fill-yellow-400 bg-white rounded-full p-1 shadow-md" />
                        <p className="text-stone-600 italic mb-6 leading-relaxed">
                            {i === 1 
                                ? "আমি তাদের মেকআপ প্রোডাক্টগুলো ব্যবহার করে খুবই সন্তুষ্ট। কোয়ালিটি অসাধারণ এবং প্যাকেজিং খুব সুন্দর ছিল।" 
                                : "অর্ডার করার ২ দিনের মধ্যেই প্রোডাক্ট হাতে পেয়েছি। অরিজিনাল প্রোডাক্ট পাওয়ার জন্য এটি সেরা জায়গা।"}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-lipstick flex items-center justify-center font-bold text-white">
                                {i === 1 ? "S" : "M"}
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-800">{i === 1 ? "Sultana Ahmed" : "Mehedi Hasan"}</h4>
                                <p className="text-xs text-stone-400">Verified Customer</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
