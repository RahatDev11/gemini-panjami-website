
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Search, Truck, CheckCircle2, Clock, Calendar, Hash, User as UserIcon } from 'lucide-react';
import { dbService } from '../services/dbService';
import { Order } from '../types';
import { User as FirebaseUser } from 'firebase/auth';
import { cn } from '../lib/utils';

interface OrderStatusProps {
  user: FirebaseUser | null;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ user }) => {
  const [orderSearchId, setOrderSearchId] = useState('');
  const [focusedOrder, setFocusedOrder] = useState<Order | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const loadUserOrders = async () => {
        const orders = await dbService.fetchUserOrders(user.uid);
        setUserOrders(orders);
      };
      loadUserOrders();
    }
  }, [user]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderSearchId.trim()) return;
    
    setIsSearching(true);
    setError(null);
    try {
      // We can search through all user orders or fetch all and filter for demo
      // In a real app we'd have a specific getOrderById
      const found = await dbService.fetchOrderById(orderSearchId.trim());
      if (found) {
        setFocusedOrder(found);
      } else {
        setError("অর্ডারটি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি দিন।");
        setFocusedOrder(null);
      }
    } catch (err) {
      setError("সার্ভার সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return 0;
      default: return 1;
    }
  };

  return (
    <div className="bg-background-soft min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-stone-900"
          >
            অর্ডার ট্র্যাকিং
          </motion.h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            আপনার অর্ডারের বর্তমান অবস্থা জানতে অর্ডার আইডি দিয়ে সার্চ করুন অথবা আপনার পূর্ববর্তী অর্ডারগুলো দেখুন।
          </p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-lipstick/5 border border-lipstick/10"
        >
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-lipstick-dark w-5 h-5" />
              <input 
                type="text" 
                placeholder="অর্ডার আইডি (যেমন: ANY-2024...)" 
                value={orderSearchId}
                onChange={e => setOrderSearchId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-lipstick/10 rounded-2xl focus:border-lipstick-dark outline-none transition-all font-bold"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching}
              className="bg-lipstick-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-lipstick transition-all active:scale-95 disabled:opacity-50"
            >
              {isSearching ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Search className="w-5 h-5" />}
              ট্র্যাক করুন
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-sm font-bold text-center">{error}</p>}
        </motion.div>

        {/* Search Result */}
        <AnimatePresence>
          {focusedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border-l-[12px] border-lipstick-dark"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <span className="text-[10px] font-bold text-lipstick-dark uppercase tracking-widest bg-lipstick/10 px-3 py-1 rounded-full">Order #{focusedOrder.orderId}</span>
                        <h2 className="text-2xl font-black text-stone-800 mt-2">অর্ডারের ফলাফল</h2>
                    </div>
                    <div className="flex items-center gap-2 text-stone-500 text-sm font-bold">
                        <Calendar className="w-4 h-4" />
                        {new Date(focusedOrder.orderDate).toLocaleDateString()}
                    </div>
                </div>

                <div className="relative py-12 px-4">
                  <div className="absolute top-0 bottom-0 left-[21px] md:left-1/2 md:-translate-x-1/2 w-1 bg-stone-100 rounded-full" />
                  
                  {[
                    { label: 'অর্ডার প্লেস করা হয়েছে', icon: CheckCircle2, status: 'pending', step: 1 },
                    { label: 'প্রসেসিং হচ্ছে', icon: Clock, status: 'processing', step: 2 },
                    { label: 'শিপমেন্টে পাঠানো হয়েছে', icon: Truck, status: 'shipped', step: 3 },
                    { label: 'ডেলিভারি সফল', icon: Package, status: 'delivered', step: 4 }
                  ].map((s, idx) => {
                    const currentStep = getStatusStep(focusedOrder.status);
                    const isActive = currentStep >= s.step;
                    const isUpcoming = currentStep < s.step;
                    
                    return (
                      <div key={idx} className={cn(
                        "relative flex items-center gap-6 mb-12 last:mb-0",
                        idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      )}>
                        <div className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-500",
                          isActive ? "bg-lipstick-dark text-white scale-110 shadow-lg" : "bg-stone-200 text-stone-400"
                        )}>
                          <s.icon className="w-6 h-6" />
                        </div>
                        <div className={cn(
                          "bg-white p-4 rounded-2xl border-2 transition-all flex-grow md:w-1/2",
                          isActive ? "border-lipstick/30 shadow-md" : "border-stone-50 text-stone-300"
                        )}>
                          <h4 className={cn("font-bold text-sm md:text-base", isActive ? "text-stone-800" : "text-stone-300")}>{s.label}</h4>
                          <p className="text-xs mt-1">{isActive ? (s.status === focusedOrder.status ? "এখন এখানে আছে" : "সম্পন্ন") : "অপেক্ষমান"}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Orders History */}
        {user && userOrders.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-lipstick-dark" />
              আপনার পূর্ববর্তী অর্ডারসমূহ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userOrders.map((order) => (
                <motion.div 
                  key={order.orderId}
                  whileHover={{ y: -5 }}
                  onClick={() => { setOrderSearchId(order.orderId); setFocusedOrder(order); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                  className="bg-white p-5 rounded-2xl border-2 border-lipstick/5 shadow-sm hover:shadow-xl hover:border-lipstick/20 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-bold text-stone-800 text-sm">#{order.orderId}</span>
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full",
                        order.status === 'delivered' ? "bg-green-100 text-green-700" : 
                        order.status === 'cancelled' ? "bg-red-100 text-red-700" : "bg-lipstick/10 text-lipstick-dark"
                    )}>
                        {order.status === 'pending' ? 'অপেক্ষমান' : 
                         order.status === 'processing' ? 'প্রসেসিং' :
                         order.status === 'shipped' ? 'শিপিং' : 
                         order.status === 'delivered' ? 'ডেলিভারিড' : 'বাতিল'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-lipstick-dark mb-4 group-hover:scale-105 transition-transform">
                      <Hash className="w-4 h-4" />
                      <span className="font-black text-lg">৳{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase">
                      <span className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {order.items.length} Items
                      </span>
                      <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
