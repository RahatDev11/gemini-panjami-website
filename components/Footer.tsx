
import React from 'react';
import { View } from '../App';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lipstick text-gray-800 pt-16 pb-8 border-t border-lipstick-dark/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src="https://picsum.photos/seed/anybeauty/100/100" 
              alt="Any's Beauty Corner" 
              className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold text-gray-900 group-hover:text-lipstick-dark transition-colors">Any's Beauty Corner</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            আপনার সৌন্দর্য চর্চার বিশ্বস্ত সঙ্গী। প্রিমিয়াম মেকআপ এবং স্কিনকেয়ার প্রোডাক্টের নির্ভরযোগ্য গন্তব্য।
          </p>
          <div className="flex justify-center md:justify-start space-x-4 pt-2">
             {[
               { icon: Facebook, href: "https://www.facebook.com/Anysbeautycorner" },
               { icon: Instagram, href: "https://www.instagram.com/anysbeautycorner" },
               { icon: Youtube, href: "https://www.youtube.com/anysbeautycorner" }
             ].map((social, idx) => (
               <a 
                 key={idx} 
                 href={social.href} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-white/50 hover:bg-white p-2 rounded-full text-gray-800 hover:text-lipstick-dark transition-all duration-300 shadow-sm"
               >
                 <social.icon className="h-5 w-5" />
               </a>
             ))}
          </div>
        </div>
        
        {/* Useful Links */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-gray-900 border-b border-white/30 pb-2 mb-6 uppercase tracking-wider text-sm">দরকারি লিংক</h4>
          <ul className="space-y-3">
            <li><button onClick={() => navigateTo('home')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">হোম</button></li>
            <li><button onClick={() => navigateTo('order-status')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">অর্ডার ট্র্যাকিং</button></li>
            <li><button onClick={() => navigateTo('shop')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">সকল প্রোডাক্ট</button></li>
            <li><button onClick={() => navigateTo('returns')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">রিটার্ন পলিসি</button></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-gray-900 border-b border-white/30 pb-2 mb-6 uppercase tracking-wider text-sm">ক্যাটাগরি</h4>
          <ul className="space-y-3">
            <li><button onClick={() => navigateTo('shop')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">মেকআপ</button></li>
            <li><button onClick={() => navigateTo('shop')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">স্কিনকেয়ার</button></li>
            <li><button onClick={() => navigateTo('shop')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">হেয়ারকেয়ার</button></li>
            <li><button onClick={() => navigateTo('shop')} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">মেহেদী</button></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div className="text-center md:text-left space-y-6">
          <h4 className="font-bold text-gray-900 border-b border-white/30 pb-2 mb-6 uppercase tracking-wider text-sm">যোগাযোগ</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start justify-center md:justify-start text-gray-700">
              <MapPin className="mr-3 h-5 w-5 text-lipstick-dark shrink-0" />
              <span>মিরপুর ১০, ঢাকা</span>
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-700">
              <Phone className="mr-3 h-5 w-5 text-lipstick-dark shrink-0" />
              <a href="tel:+8801931866636" className="hover:text-gray-900">+৮৮০ ১৯৩১-৮৬৬৬৩৬</a>
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-700">
              <Mail className="mr-3 h-5 w-5 text-lipstick-dark shrink-0" />
              <a href="mailto:info@anysbeautycorner.com" className="hover:text-gray-900 break-all">info@anysbeautycorner.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs text-center md:text-left">
        <p className="mb-2 md:mb-0">© {currentYear} Any's Beauty Corner. সর্বস্বত্ব সংরক্ষিত।</p>
        <div className="flex items-center space-x-1">
          <span>ডেভেলপ করেছে:</span>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-900 font-semibold hover:text-lipstick-dark flex items-center transition-colors"
          >
            Nahid <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
