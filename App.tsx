
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PRODUCTS, TESTIMONIALS, CATEGORIES } from './constants';
import { Product, ChatMessage } from './types';
import { getStyleAdvice } from './services/geminiService';

type View = 'home' | 'shop' | 'about' | 'contact' | 'checkout';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // AI Assistant State
  const [showAI, setShowAI] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Checkout State
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

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

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

  // Fix: Implemented handlePlaceOrder to handle checkout form submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setCartItems([]);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
    setOrderSuccess(false);
    window.scrollTo(0, 0);
  };

  // --- View Components ---

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Panjabi" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4 tracking-wide">Elite Traditional Wear</h2>
          <h3 className="text-white text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            The Essence of <br/> <span className="text-amber-500">Bengali Elegance</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo('shop')}
              className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-12 py-5 transition-all rounded-sm uppercase tracking-widest text-sm shadow-2xl"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold px-12 py-5 transition-all rounded-sm uppercase tracking-widest text-sm backdrop-blur-md"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3">Curated Selection</h4>
          <h3 className="text-4xl font-serif font-bold text-stone-800 tracking-tight">Occasion Wear</h3>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-5"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => { setActiveCategory(cat.name); navigateTo('shop'); }}
              className="group relative overflow-hidden h-[450px] cursor-pointer rounded-sm shadow-xl transition-all duration-700 hover:-translate-y-2"
            >
              <img 
                src={`https://picsum.photos/seed/${cat.slug}noor/600/900`} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h5 className="text-white text-2xl font-serif font-bold mb-2">{cat.name}</h5>
                <p className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold group-hover:translate-x-3 transition-transform duration-500">Discover Now &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Markers */}
      <section className="py-20 bg-emerald-950 text-stone-100 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Premium Fabric", desc: "100% Authentic Quality", icon: "💎" },
            { label: "Cash On Delivery", desc: "Nationwide 64 Districts", icon: "📦" },
            { label: "Fast Shipping", desc: "24h Dhaka Delivery", icon: "⚡" },
            { label: "Craftsmanship", desc: "Handcrafted with Care", icon: "✨" }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <div className="text-3xl">{item.icon}</div>
              <h6 className="text-amber-500 font-serif font-bold text-lg">{item.label}</h6>
              <p className="text-stone-400 text-xs uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ShopView = () => (
    <div className="animate-fade-in py-12 md:py-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Shop Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-3">Our Collection</h4>
            <h3 className="text-4xl font-serif font-bold text-stone-800">The Catalog</h3>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                activeCategory === 'All' ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white text-stone-400 border-stone-200 hover:border-emerald-900'
              }`}
            >
              All Pieces
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.slug}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat.name ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white text-stone-400 border-stone-200 hover:border-emerald-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white p-3 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-stone-100">
              <div className="relative aspect-[3/4.5] bg-stone-100 overflow-hidden mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-900 text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-md">
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-amber-500 text-emerald-950 text-xs font-bold py-4 uppercase tracking-[0.2em] shadow-2xl hover:bg-amber-400 transition transform"
                  >
                    Quick Add to Cart
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center text-center px-4 pb-4">
                <span className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-medium mb-3">
                  {product.category}
                </span>
                <h5 className="text-stone-800 font-serif font-bold text-lg mb-3 leading-tight group-hover:text-emerald-900 transition-colors">
                  {product.name}
                </h5>
                <div className="flex items-center space-x-4">
                  <span className="text-emerald-950 font-bold text-xl">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-stone-400 line-through text-sm">৳{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AboutView = () => (
    <div className="bg-stone-50 animate-fade-in">
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <img 
          src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1974&auto=format&fit=crop" 
          alt="Craft" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-amber-400 font-serif italic text-2xl mb-4">A Decade of Excellence</h2>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-bold mb-6">Our Legacy</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div>
            <h4 className="text-emerald-800 font-medium tracking-[0.4em] uppercase text-xs mb-4">Our Roots</h4>
            <h3 className="text-4xl font-serif font-bold text-stone-800 italic">Threads of Tradition</h3>
          </div>
          <p className="text-stone-600 text-lg leading-relaxed font-light">
            Founded in 2012, Noor Panjabi House was born from a vision to bring the finest Bangladeshi craftsmanship to the global stage. 
            We specialize in blending age-old weaving techniques with modern tailoring for the discerning gentleman.
          </p>
          <div className="flex space-x-8 pt-4">
            <div>
              <p className="text-3xl font-serif font-bold text-emerald-900">50K+</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-400">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-emerald-900">200+</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-400">Artisans</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" className="rounded-sm shadow-2xl relative z-10" />
          <div className="absolute -top-6 -left-6 w-full h-full border-2 border-amber-500/30 -z-0"></div>
        </div>
      </section>
    </div>
  );

  const ContactView = () => (
    <div className="bg-stone-50 animate-fade-in">
      <section className="py-24 bg-emerald-950 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Let's Connect</h1>
        <p className="text-stone-400 max-w-xl mx-auto px-4 uppercase tracking-[0.2em] text-xs">Reach out for styling consultations or inquiries</p>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <h3 className="text-3xl font-serif font-bold text-emerald-950">Showroom Details</h3>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="text-2xl text-amber-600">📍</div>
              <div>
                <h6 className="font-bold text-lg mb-1">Banani Flagship Store</h6>
                <p className="text-stone-600 font-light">Road 11, Block F, Banani, Dhaka 1213</p>
                <p className="text-stone-400 text-sm mt-1">Open 10 AM - 10 PM Everyday</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="text-2xl text-emerald-600">📞</div>
              <div>
                <h6 className="font-bold text-lg mb-1">Customer Care</h6>
                <p className="text-stone-600 font-light">+880 1712 345678</p>
                <p className="text-stone-400 text-sm mt-1">Available on WhatsApp</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 border border-stone-200 shadow-xl">
             <h4 className="font-serif font-bold text-xl mb-4">Corporate & Wedding</h4>
             <p className="text-stone-500 text-sm leading-relaxed mb-6">For bulk orders or wedding party customization, please contact our specialized styling desk.</p>
             <button className="text-amber-600 font-bold uppercase tracking-widest text-xs border-b border-amber-600 pb-1">Email Styling Desk &rarr;</button>
          </div>
        </div>

        <div className="bg-white p-12 shadow-2xl border border-stone-100">
          <form className="space-y-8" onSubmit={e => { e.preventDefault(); alert("Shukran! We'll get back to you soon."); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="text" placeholder="Full Name" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition" />
              <input type="tel" placeholder="Phone Number" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition" />
            </div>
            <input type="email" placeholder="Email Address" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition" />
            <textarea rows={5} placeholder="How can we help you?" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none transition resize-none"></textarea>
            <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-5 rounded-sm uppercase tracking-[0.3em] hover:bg-emerald-800 transition shadow-xl">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  const CheckoutView = () => (
    <div className="bg-stone-50 animate-fade-in py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {orderSuccess ? (
          <div className="bg-white p-16 text-center shadow-2xl border border-stone-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Order Placed Successfully</h2>
            <p className="text-stone-500 mb-10 text-lg">Shukran! Your request NH-{Math.floor(10000+Math.random()*90000)} is being processed. Our team will contact you for verification shortly.</p>
            <button onClick={() => navigateTo('shop')} className="bg-emerald-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition">
              Browse More Panjabi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="bg-white p-12 shadow-xl">
              <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-10">Shipping Details</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                <input type="text" placeholder="Full Recipient Name" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none" />
                <input type="tel" placeholder="Active Mobile Number" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none" />
                <input type="text" placeholder="Detailed Address (Area, Road, House)" required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none" />
                <select required className="w-full border-b border-stone-200 py-3 focus:border-amber-500 outline-none bg-transparent">
                  <option value="">Select District</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
                <div className="bg-stone-50 p-6 border border-stone-100">
                  <p className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-4">Payment Method</p>
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <input type="radio" defaultChecked className="text-emerald-900" />
                    <span className="font-bold text-stone-800">Cash on Delivery (BDT)</span>
                  </label>
                </div>
                <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-6 uppercase tracking-[0.3em] shadow-2xl hover:bg-emerald-800 transition">
                  Confirm Order ৳{(cartTotal + 100).toLocaleString()}
                </button>
              </form>
            </div>

            <div className="space-y-10">
              <h2 className="text-2xl font-serif font-bold text-emerald-950 border-b border-stone-200 pb-4">Order Summary</h2>
              <div className="space-y-6 max-h-[450px] overflow-y-auto pr-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex space-x-6 items-center">
                    <img src={item.product.image} className="w-20 aspect-[3/4] object-cover" />
                    <div className="flex-grow">
                      <h4 className="font-serif font-bold text-stone-800">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest">{item.product.category} (x{item.quantity})</p>
                    </div>
                    <span className="font-bold text-emerald-900">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-stone-200 space-y-4">
                <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>৳{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-stone-500"><span>Shipping</span><span>৳100</span></div>
                <div className="flex justify-between text-xl font-serif font-bold text-emerald-950 pt-4 border-t border-stone-100">
                  <span>Grand Total</span>
                  <span>৳{(cartTotal + 100).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-emerald-900">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-emerald-900/95 backdrop-blur-md text-stone-50 shadow-2xl transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigateTo('home')}
          >
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-serif text-3xl font-bold text-emerald-950 group-hover:rotate-12 transition-transform duration-500">
              N
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-serif font-bold tracking-tighter">NOOR</h1>
              <p className="text-[9px] tracking-[0.4em] uppercase opacity-70 font-bold">Panjabi House</p>
            </div>
          </div>

          <div className="hidden lg:flex space-x-12 text-[11px] uppercase tracking-[0.3em] font-bold">
            <button onClick={() => navigateTo('home')} className={`hover:text-amber-400 transition-all ${currentView === 'home' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''}`}>Home</button>
            <button onClick={() => navigateTo('shop')} className={`hover:text-amber-400 transition-all ${currentView === 'shop' ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>Shop</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-amber-400 transition-all ${currentView === 'about' ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>Heritage</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-amber-400 transition-all ${currentView === 'contact' ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>Contact</button>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 hover:text-amber-400 transition transform hover:scale-110" onClick={() => setIsCartOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2 text-amber-500" onClick={() => setIsSidebarOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-black/80 z-[60] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
      <aside className={`fixed top-0 right-0 h-full w-80 bg-emerald-950 text-stone-50 z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-10">
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif font-bold text-2xl tracking-tight text-amber-500">Navigation</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white">✕</button>
          </div>
          <div className="flex flex-col space-y-8 text-lg uppercase tracking-[0.2em] font-medium">
            <button onClick={() => navigateTo('home')} className="text-left py-4 border-b border-white/5 hover:text-amber-400 transition-colors">Home</button>
            <button onClick={() => navigateTo('shop')} className="text-left py-4 border-b border-white/5 hover:text-amber-400 transition-colors">Shop Catalog</button>
            <button onClick={() => navigateTo('about')} className="text-left py-4 border-b border-white/5 hover:text-amber-400 transition-colors">Heritage</button>
            <button onClick={() => navigateTo('contact')} className="text-left py-4 border-b border-white/5 hover:text-amber-400 transition-colors">Contact</button>
          </div>
        </div>
      </aside>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed inset-0 bg-black/80 z-[60] transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)} />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white text-stone-900 z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-emerald-900 text-white">
            <h2 className="text-2xl font-serif font-bold tracking-tight">Shopping Cart ({cartCount})</h2>
            <button onClick={() => setIsCartOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition">✕</button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-6">
                <div className="text-7xl opacity-20">🛍️</div>
                <p className="font-medium tracking-widest uppercase text-xs">Your cart is empty</p>
                <button onClick={() => { setIsCartOpen(false); navigateTo('shop'); }} className="text-emerald-900 font-bold border-b-2 border-amber-500 pb-1">Start Shopping</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="flex space-x-6 animate-fade-in">
                  <div className="w-24 aspect-[3/4] bg-stone-100 overflow-hidden shrink-0 shadow-md">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-stone-800 tracking-tight">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-stone-300 hover:text-red-500 transition">✕</button>
                      </div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-2">{item.product.category}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-stone-200 rounded-sm">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="px-3 py-1 hover:bg-stone-50 text-stone-500">-</button>
                        <span className="px-4 text-xs font-bold text-stone-700">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="px-3 py-1 hover:bg-stone-50 text-stone-500">+</button>
                      </div>
                      <p className="font-bold text-emerald-950 text-lg">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-8 border-t border-stone-100 bg-stone-50 shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-400 uppercase tracking-[0.2em] text-[10px] font-black">Subtotal</span>
                <span className="text-3xl font-serif font-bold text-emerald-950">৳{cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); navigateTo('checkout'); }}
                className="w-full bg-emerald-900 text-white font-bold py-5 rounded-sm uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-800 transition transform active:scale-95"
              >
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-grow">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'checkout' && <CheckoutView />}
      </main>

      {/* Elegant Footer */}
      <footer className="bg-emerald-950 text-stone-100 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-emerald-950">N</div>
              <h1 className="text-2xl font-serif font-bold tracking-tighter text-white">NOOR</h1>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Crafting premium traditional wear since 2012. Our mission is to preserve the rich heritage of Bangladeshi textiles while providing a modern shopping experience.
            </p>
          </div>
          
          <div>
            <h6 className="font-serif font-bold text-lg mb-8 text-amber-500 tracking-wide">Quick Links</h6>
            <ul className="space-y-5 text-stone-400 text-xs uppercase tracking-widest font-bold">
              <li><button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('shop')} className="hover:text-amber-400 transition-colors">The Shop</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors">About Noor</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">Get Help</button></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-serif font-bold text-lg mb-8 text-amber-500 tracking-wide">Policies</h6>
            <ul className="space-y-5 text-stone-400 text-xs uppercase tracking-widest font-bold">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Return & Refund</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h6 className="font-serif font-bold text-lg mb-2 text-amber-500 tracking-wide">Join Our World</h6>
            <p className="text-stone-400 text-xs font-light leading-relaxed">Subscribe to receive updates, access to exclusive deals, and styling tips.</p>
            <form className="flex group" onSubmit={e => { e.preventDefault(); alert("Subscribed! Shukran."); }}>
              <input type="email" placeholder="Email Address" className="bg-emerald-900 border-b border-white/10 px-0 py-3 w-full text-stone-100 focus:border-amber-500 outline-none text-sm transition-colors" required />
              <button className="bg-amber-500 text-emerald-950 px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-amber-400 transition transform active:scale-95">Join</button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-stone-500 text-[10px] uppercase tracking-[0.3em]">
          <p>© 2025 Noor Panjabi House. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <button 
        onClick={() => {
          setShowAI(!showAI);
          if (!showAI && chatHistory.length === 0) {
            setChatHistory([{ role: 'model', text: 'Salam! I am your Noor Style Consultant. I can help you find the perfect Panjabi for Eid, Weddings, or Casual wear. What occasion are you shopping for?' }]);
          }
        }}
        className={`fixed bottom-8 right-8 bg-amber-500 text-emerald-950 p-5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${showAI ? 'rotate-90' : ''}`}
        aria-label="Toggle AI Stylist"
      >
        {showAI ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex items-center space-x-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="hidden md:block font-black uppercase text-[10px] tracking-widest">Style AI</span>
          </div>
        )}
      </button>

      {/* AI Chat Window */}
      {showAI && (
        <div className="fixed bottom-28 right-8 w-[400px] max-w-[90vw] bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border border-stone-100 z-50 overflow-hidden flex flex-col h-[600px] animate-fade-in-up">
          <div className="bg-emerald-900 text-white p-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-emerald-900 font-black text-lg">N</div>
              <div>
                <p className="font-serif font-bold text-lg leading-none">Style Consultant</p>
                <p className="text-[9px] uppercase tracking-widest opacity-60 mt-1">AI-Powered Expertise</p>
              </div>
            </div>
            <button onClick={() => setShowAI(false)} className="opacity-60 hover:opacity-100 transition">✕</button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-stone-50/50 custom-scrollbar">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-900 text-white rounded-br-none' 
                    : 'bg-white text-stone-800 rounded-bl-none border border-stone-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-stone-100 rounded-2xl px-5 py-3 flex space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleAISubmit} className="p-6 bg-white border-t border-stone-100 flex items-center space-x-3">
            <input 
              type="text" 
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="E.g., I need a Panjabi for a wedding..." 
              className="flex-grow bg-stone-50 border border-stone-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-emerald-900 transition-colors"
            />
            <button type="submit" className="bg-emerald-900 text-white p-3 rounded-full hover:bg-emerald-800 transition shadow-lg transform active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
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
