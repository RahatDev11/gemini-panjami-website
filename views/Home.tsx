
import React from 'react';
import { CATEGORIES } from '../constants';
import { View } from '../App';

interface HomeProps {
  navigateTo: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ navigateTo }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Panjabi Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-70 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/20 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4 tracking-wide animate-slide-down">Elite Traditional Wear</h2>
          <h3 className="text-white text-4xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tighter animate-fade-in-up">
            Pure <span className="text-amber-500">Bengali</span> <br/> Mastery
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
            <button 
              onClick={() => navigateTo('shop')}
              className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-12 py-5 transition-all rounded-sm uppercase tracking-widest text-sm shadow-2xl active:scale-95"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold px-12 py-5 transition-all rounded-sm uppercase tracking-widest text-sm backdrop-blur-md active:scale-95"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3">Curated Selection</h4>
          <h3 className="text-4xl font-serif font-bold text-stone-800 tracking-tight">The Heritage Series</h3>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-5"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => navigateTo('shop')}
              className="group relative overflow-hidden h-[500px] cursor-pointer rounded-sm shadow-xl transition-all duration-700 hover:-translate-y-2"
            >
              <img 
                src={`https://picsum.photos/seed/${cat.slug}lux/600/900`} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h5 className="text-white text-2xl font-serif font-bold mb-2">{cat.name}</h5>
                <p className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold group-hover:translate-x-3 transition-transform duration-500">Browse &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="py-24 bg-emerald-950 text-stone-100 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Elite Quality", desc: "100% Pure Fabric", icon: "👑" },
            { label: "Pay on Arrival", desc: "Nationwide Delivery", icon: "🤝" },
            { label: "Swift Transit", desc: "Within 24-48 Hours", icon: "🚀" },
            { label: "Master Cut", desc: "Tailored to Perfection", icon: "✂️" }
          ].map((item, i) => (
            <div key={i} className="space-y-4 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h6 className="text-amber-500 font-serif font-bold text-lg">{item.label}</h6>
              <p className="text-stone-400 text-[10px] uppercase tracking-[0.3em]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
