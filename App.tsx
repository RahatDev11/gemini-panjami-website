
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PRODUCTS, TESTIMONIALS, CATEGORIES } from './constants';
import { Product, ChatMessage } from './types';
import { getStyleAdvice } from './services/geminiService';

type View = 'home' | 'about' | 'contact' | 'checkout';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [showAI, setShowAI] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  useEffect(() => {
    if (isSidebarOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen, isCartOpen]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    const advice = await getStyleAdvice(userInput);
    const aiMsg: ChatMessage = { role: 'model', text: advice || '' };
    setChatHistory(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setCartItems([]);
    window.scrollTo(0, 0);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
    setOrderSuccess(false);
    window.scrollTo(0, 0);
  };

  // --- Views ---

  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Panjabi" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4">Premium Panjabi for Every Occasion</h2>
          <h3 className="text-white text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Elegance Redefined <br/> <span className="text-amber-500">Traditional Roots</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#shop" className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-10 py-4 transition-all rounded-sm uppercase tracking-widest text-sm shadow-xl text-center">
              Shop Now
            </a>
            <button onClick={() => navigateTo('about')} className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold px-10 py-4 transition-all rounded-sm uppercase tracking-widest text-sm backdrop-blur-sm text-center">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section id="collections" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-emerald-800 font-medium tracking-[0.3em] uppercase text-sm mb-2">Our World</h4>
          <h3 className="text-4xl font-serif font-bold text-stone-800">Explore Collections</h3>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="group relative overflow-hidden h-64 md:h-80 cursor-pointer rounded-sm shadow-md transition-transform hover:-translate-y-1 border border-stone-200">
              <img 
                src={`https://picsum.photos/seed/${cat.slug}/600/800`} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h5 className="text-white text-xl font-serif font-bold mb-1">{cat.name}</h5>
                <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold group-hover:translate-x-2 transition-transform">Browse &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 pb-6">
            <div>
              <h4 className="text-emerald-800 font-medium tracking-[0.3em] uppercase text-xs mb-2">The Catalog</h4>
              <h3 className="text-3xl font-serif font-bold text-stone-800">New & Trending</h3>
            </div>
            <button className="text-stone-500 hover:text-emerald-800 border-b border-amber-500/50 font-bold uppercase tracking-widest text-[10px] py-1 mt-4 md:mt-0 transition">
              View All Products
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-12">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[3/4.5] bg-stone-200 overflow-hidden mb-5 shadow-sm">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-900 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-tighter">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-amber-500 text-emerald-950 text-xs font-bold py-3 uppercase tracking-widest shadow-lg hover:bg-amber-400 transition"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-medium mb-2">
                    {product.category}
                  </span>
                  <h5 className="text-stone-800 font-serif font-bold text-sm md:text-lg mb-2 leading-tight group-hover:text-emerald-900 transition-colors">
                    {product.name}
                  </h5>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-emerald-900 font-bold text-base md:text-lg">৳{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-stone-400 line-through text-xs md:text-sm">৳{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-emerald-950 text-stone-100 overflow-hidden relative">
        <div className="islamic-pattern absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="w-16 h-16 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 rounded-full group hover:border-amber-500 transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m9-2.333a9.945 9.945 0 00-6.834-2.734c-1.12 0-2.125.188-3.001.528v4.456M12 10c0-5.523 4.477-10 10-10s10 4.477 10 10v4.456c-.876-.34-1.881-.528-3.001-.528A9.945 9.945 0 0012 16.333" />
                </svg>
              </div>
              <h6 className="text-amber-500 font-serif font-bold text-lg mb-2">Premium Fabric</h6>
              <p className="text-stone-400 text-sm">Finest cotton, silk and mixed materials selected for comfort.</p>
            </div>
            <div>
              <div className="w-16 h-16 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 rounded-full group hover:border-amber-500 transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h6 className="text-amber-500 font-serif font-bold text-lg mb-2">Cash on Delivery</h6>
              <p className="text-stone-400 text-sm">Shop with confidence across all 64 districts in Bangladesh.</p>
            </div>
            <div>
              <div className="w-16 h-16 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 rounded-full group hover:border-amber-500 transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h6 className="text-amber-500 font-serif font-bold text-lg mb-2">Fast Delivery</h6>
              <p className="text-stone-400 text-sm">24-48 hours delivery within Dhaka, 3-5 days nationwide.</p>
            </div>
            <div>
              <div className="w-16 h-16 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 rounded-full group hover:border-amber-500 transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h6 className="text-amber-500 font-serif font-bold text-lg mb-2">Trusted Quality</h6>
              <p className="text-stone-400 text-sm">Over 50,000+ happy customers across the country.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-emerald-800 font-medium tracking-[0.3em] uppercase text-sm mb-2">Voices of Noor</h4>
            <h3 className="text-4xl font-serif font-bold text-stone-800">What Our Customers Say</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((review) => (
              <div key={review.id} className="bg-white p-8 border-l-4 border-amber-500 shadow-sm italic text-stone-700">
                <p className="text-lg mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex justify-between items-center not-italic">
                  <span className="font-bold text-stone-900">— {review.name}</span>
                  <div className="flex text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const AboutView = () => (
    <div className="bg-stone-50 min-h-screen">
      {/* About Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <img 
          src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1974&auto=format&fit=crop" 
          alt="Craftsmanship" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4 uppercase tracking-widest">Since 2012</h2>
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold mb-6">Our Legacy & Craft</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h4 className="text-emerald-800 font-medium tracking-[0.3em] uppercase text-xs mb-4">The Beginning</h4>
            <h3 className="text-3xl font-serif font-bold text-stone-800 mb-6 italic">A Thread of Tradition</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Noor Panjabi House was born out of a desire to preserve the rich textile heritage of Bangladesh while embracing the modern silhouette of the contemporary man. 
              Starting in a small atelier in Dhaka, we've grown into a symbol of premium elegance.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Every stitch in our collection tells a story of craftsmanship, from the delicate hand-embroidery to the selection of the finest cottons and silks. We believe that a Panjabi isn't just clothing; it's a reflection of identity and faith.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" 
              alt="Tailoring" 
              className="rounded-sm shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-amber-500 -z-0"></div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Highlights */}
      <section className="py-20 bg-emerald-900 text-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-2">Our Quality</h4>
            <h3 className="text-3xl font-serif font-bold italic">The Noor Standard</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Pure Silk & Cotton", desc: "We source our yarns directly from the best mills in South Asia to ensure maximum breathability and shine.", icon: "🧶" },
              { title: "Hand Embroidery", desc: "Our artisans spend dozens of hours on each piece, using techniques passed down through generations.", icon: "🪡" },
              { title: "Sultan Fit", desc: "Our unique Sultan cut is designed to provide a majestic silhouette without compromising on movement.", icon: "🤴" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 p-8 border border-white/10 text-center group hover:bg-amber-500 hover:text-emerald-950 transition-all duration-500">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h5 className="font-serif font-bold text-xl mb-4 tracking-tight">{item.title}</h5>
                <p className="text-sm opacity-80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Impact */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-serif font-bold text-stone-800 mb-8">Empowering Artisans</h3>
        <p className="text-stone-600 leading-relaxed mb-10">
          We work with over 200 local artisans across Bangladesh, providing them with fair wages and a platform to showcase their incredible talent. When you wear Noor, you support a community of craftsmen dedicated to perfection.
        </p>
        <button onClick={() => navigateTo('home')} className="text-emerald-900 border-b-2 border-amber-500 font-bold uppercase tracking-widest text-xs py-2">
          Explore Our Collection
        </button>
      </section>
    </div>
  );

  const ContactView = () => (
    <div className="bg-stone-50 min-h-screen">
      {/* Contact Hero */}
      <section className="py-20 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">Get In Touch</h4>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Contact Noor Style Team</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
          <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Need styling advice or have a question about your order? We are here to help you experience the best of Noor.
          </p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-6">Our Showroom</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="font-bold text-stone-900">Banani Headquarter</h6>
                    <p className="text-stone-600">Road 11, House 42, Block F, Banani, Dhaka 1213</p>
                    <p className="text-stone-400 text-xs mt-1">Open daily: 10:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="font-bold text-stone-900">Support Hotline</h6>
                    <p className="text-stone-600">+880 1712 345678 (Toll Free)</p>
                    <p className="text-emerald-700 font-bold text-sm mt-1">WhatsApp Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-stone-100 p-3 rounded-full text-stone-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="font-bold text-stone-900">Email Address</h6>
                    <p className="text-stone-600">care@noorpanjabi.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 p-8 text-white relative overflow-hidden group">
               <div className="islamic-pattern absolute inset-0 opacity-10"></div>
               <div className="relative z-10">
                 <h4 className="font-serif font-bold text-xl mb-4">Corporate Inquiries</h4>
                 <p className="text-stone-300 text-sm mb-6 leading-relaxed">For bulk orders, wedding party customizations, or retail partnership inquiries, please contact our business desk.</p>
                 <a href="mailto:business@noorpanjabi.com" className="text-amber-400 font-bold uppercase tracking-widest text-xs border-b border-amber-400 pb-1">Email Business Desk &rarr;</a>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 md:p-14 shadow-2xl border border-stone-100">
            <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Shukran! Your message has been received."); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Your Name</label>
                  <input type="text" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition" placeholder="Ahsan Kabir" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Phone Number</label>
                  <input type="tel" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition" placeholder="01712345678" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Email Address</label>
                <input type="email" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition" placeholder="ahsan@example.com" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Subject</label>
                <select className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition bg-transparent text-stone-600">
                  <option>Style Advice</option>
                  <option>Order Status</option>
                  <option>Wedding Customization</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Your Message</label>
                <textarea rows={5} required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition resize-none" placeholder="How can we assist you today?"></textarea>
              </div>

              <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-5 rounded-sm uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-800 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stylized Map Placeholder */}
      <section className="h-[400px] bg-stone-200 relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 grayscale">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover" />
         </div>
         <div className="relative bg-white p-6 shadow-xl text-center max-w-xs animate-bounce">
            <div className="w-4 h-4 bg-emerald-900 rounded-full mx-auto mb-2"></div>
            <p className="font-serif font-bold text-sm">NOOR Showroom</p>
            <p className="text-[10px] text-stone-400">Banani 11, Dhaka</p>
         </div>
      </section>
    </div>
  );

  const CheckoutView = () => (
    <div className="bg-stone-50 min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {orderSuccess ? (
          <div className="bg-white p-12 text-center shadow-2xl border border-stone-100 max-w-2xl mx-auto animate-fade-in-up">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Shukran! Order Confirmed</h2>
            <p className="text-stone-600 mb-8 leading-relaxed">Your order #NH-{Math.floor(Math.random()*90000) + 10000} has been placed successfully. We've sent a confirmation message to your phone. Our team will call you shortly for verification.</p>
            <button 
              onClick={() => navigateTo('home')}
              className="bg-emerald-900 text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition shadow-lg"
            >
              Back to Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="bg-white p-8 md:p-12 shadow-xl border border-stone-100">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center text-stone-400 hover:text-emerald-900 transition mb-8 text-xs font-bold uppercase tracking-widest"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Shop
              </button>
              
              <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-8">Shipping Information</h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Full Name</label>
                    <input type="text" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none text-stone-900" placeholder="Ahsan Kabir" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Phone Number</label>
                    <input type="tel" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none text-stone-900" placeholder="017XXXXXXXX" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Full Address</label>
                  <input type="text" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none text-stone-900" placeholder="House #, Road #, Area" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">City / District</label>
                    <select required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none text-stone-900 bg-transparent">
                      <option value="">Select District</option>
                      <option value="dhaka">Dhaka</option>
                      <option value="chittagong">Chittagong</option>
                      <option value="sylhet">Sylhet</option>
                      <option value="rajshahi">Rajshahi</option>
                      <option value="khulna">Khulna</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Postal Code (Optional)</label>
                    <input type="text" className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none text-stone-900" placeholder="1212" />
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-serif font-bold text-emerald-950 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-stone-100 bg-stone-50 cursor-pointer hover:border-emerald-900/30 transition">
                      <input type="radio" name="payment" defaultChecked className="text-emerald-900 focus:ring-emerald-900" />
                      <div className="ml-4">
                        <span className="block font-bold text-stone-900 text-sm">Cash on Delivery</span>
                        <span className="block text-xs text-stone-500">Pay when you receive the product</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-900 text-white font-bold py-5 rounded-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-800 transition mt-10"
                >
                  Place Order ৳{(cartTotal + 100).toLocaleString()}
                </button>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="lg:pl-8">
              <div className="sticky top-32">
                <h2 className="text-2xl font-serif font-bold text-emerald-950 mb-8 border-b border-stone-200 pb-4 tracking-tight">Order Summary</h2>
                
                <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex space-x-4 items-center">
                      <div className="w-20 aspect-[3/4] bg-stone-200 shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-serif font-bold text-stone-800 text-sm">{item.product.name}</h4>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest">{item.product.category} (x{item.quantity})</p>
                      </div>
                      <span className="font-bold text-emerald-950">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-stone-200 pt-8">
                  <div className="flex justify-between text-stone-600 text-sm">
                    <span>Subtotal</span>
                    <span>৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600 text-sm">
                    <span>Shipping Fee</span>
                    <span>৳100</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-900 pt-4 border-t border-stone-100">
                    <span className="font-bold uppercase tracking-widest text-xs">Total Amount</span>
                    <span className="text-3xl font-serif font-bold text-emerald-900">৳{(cartTotal + 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-emerald-900 text-stone-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-emerald-950 group-hover:scale-110 transition">
              N
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight">NOOR</h1>
              <p className="text-[10px] tracking-widest uppercase opacity-80">Panjabi House</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
            <button onClick={() => navigateTo('home')} className={`hover:text-amber-400 transition ${currentView === 'home' ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>Home</button>
            <a href="#shop" onClick={() => navigateTo('home')} className="hover:text-amber-400 transition">Shop</a>
            <button onClick={() => navigateTo('about')} className={`hover:text-amber-400 transition ${currentView === 'about' ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-amber-400 transition ${currentView === 'contact' ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>Contact</button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:text-amber-400 transition" onClick={() => setIsCartOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-500 text-emerald-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside 
        className={`fixed top-0 right-0 h-full w-72 bg-emerald-950 text-stone-50 z-[70] shadow-2xl transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-serif text-lg font-bold text-emerald-950">N</div>
              <span className="font-serif font-bold text-xl tracking-tight uppercase">Noor</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-amber-500 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-lg uppercase tracking-widest font-medium">
            <button onClick={() => navigateTo('home')} className="text-left py-2 border-b border-white/10 hover:text-amber-400">Home</button>
            <button onClick={() => navigateTo('home')} className="text-left py-2 border-b border-white/10 hover:text-amber-400">Shop</button>
            <button onClick={() => navigateTo('about')} className="text-left py-2 border-b border-white/10 hover:text-amber-400">About</button>
            <button onClick={() => navigateTo('contact')} className="text-left py-2 border-b border-white/10 hover:text-amber-400">Contact</button>
          </nav>
        </div>
      </aside>

      {/* Cart Drawer Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white text-stone-900 z-[70] shadow-2xl transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-emerald-900 text-white">
            <h2 className="text-xl font-serif font-bold tracking-tight">Your Collection ({cartCount})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="font-medium">Your cart is currently empty.</p>
                <button onClick={() => setIsCartOpen(false)} className="text-emerald-900 font-bold underline underline-offset-4">Continue Shopping</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="flex space-x-4">
                  <div className="w-24 aspect-[3/4] bg-stone-100 overflow-hidden shrink-0 shadow-sm">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-stone-800 leading-tight pr-2">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-stone-300 hover:text-red-500 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-1">{item.product.category}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-stone-200 rounded-sm">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="px-3 py-1 hover:bg-stone-50 text-stone-500">-</button>
                        <span className="px-2 text-sm font-bold min-w-[2rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="px-3 py-1 hover:bg-stone-50 text-stone-500">+</button>
                      </div>
                      <p className="font-bold text-emerald-900">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-500 uppercase tracking-widest text-xs font-bold">Total Amount</span>
                <span className="text-2xl font-serif font-bold text-emerald-950">৳{cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full bg-emerald-900 text-white font-bold py-4 rounded-sm uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-grow">
        {currentView === 'home' && <HomeView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'checkout' && <CheckoutView />}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-stone-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-serif text-lg font-bold text-emerald-950">N</div>
              <h1 className="text-xl font-serif font-bold tracking-tight">NOOR</h1>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Founded in 2012, Noor Panjabi House represents the pinnacle of Bangladeshi traditional craftsmanship and modern design.
            </p>
          </div>
          
          <div>
            <h6 className="font-serif font-bold text-lg mb-6 text-amber-500">Navigation</h6>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><button onClick={() => navigateTo('home')} className="hover:text-stone-100 transition">Shop Home</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-stone-100 transition">Our Story</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-stone-100 transition">Contact Us</button></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-serif font-bold text-lg mb-6 text-amber-500">Customer Support</h6>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-stone-100 transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-stone-100 transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-stone-100 transition">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-serif font-bold text-lg mb-6 text-amber-500">Newsletter</h6>
            <p className="text-stone-400 text-sm mb-4">Subscribe to receive updates and exclusive deals.</p>
            <form className="flex" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
              <input type="email" placeholder="Your Email" className="bg-emerald-900 border-none px-4 py-2 w-full text-stone-100 focus:ring-1 focus:ring-amber-500 outline-none" required />
              <button className="bg-amber-500 text-emerald-950 px-4 py-2 font-bold uppercase text-xs">Join</button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 border-t border-emerald-900/50 pt-8 text-center text-stone-500 text-xs">
          <p>© 2025 Noor Panjabi House. Built with Elegance. All Rights Reserved.</p>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <button 
        onClick={() => {
          setShowAI(!showAI);
          if (!showAI && chatHistory.length === 0) {
            setChatHistory([{ role: 'model', text: 'Salam! I am your Noor Style Consultant. How can I help you find the perfect Panjabi today?' }]);
          }
        }}
        className="fixed bottom-6 right-6 bg-amber-500 text-emerald-950 p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 flex items-center space-x-2"
        aria-label={showAI ? "Close Chat" : "Open Style AI"}
      >
        {showAI ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        <span className="hidden md:inline font-bold uppercase text-xs tracking-widest">{showAI ? "Close" : "Style AI"}</span>
      </button>

      {/* AI Chat Drawer */}
      {showAI && (
        <div className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] bg-white rounded-lg shadow-2xl border border-stone-200 z-50 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-emerald-900 font-bold">N</div>
              <span className="font-serif font-bold">Noor AI Stylist</span>
            </div>
            <button onClick={() => setShowAI(false)} className="opacity-70 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-emerald-950 rounded-br-none' 
                    : 'bg-stone-100 text-stone-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-100 text-stone-400 rounded-2xl px-4 py-2 text-xs flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleAISubmit} className="p-4 border-t border-stone-100 flex space-x-2">
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask for style advice..." 
              className="flex-grow bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="bg-emerald-900 text-white p-2 rounded-full hover:bg-emerald-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
