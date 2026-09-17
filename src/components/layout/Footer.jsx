import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Mail, Send, MapPin, Phone, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { setCurrentView, setSelectedCategoryFilter, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast("Subscribed! 🌾", "You will receive seasonal harvest updates and farmer stories.", "success");
    setNewsletterEmail('');
  };

  const handleCategoryNav = (catId) => {
    setSelectedCategoryFilter(catId);
    setCurrentView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewNav = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-stone-300 border-t border-emerald-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Bar */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-3xl p-8 border border-emerald-800/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Farm Gate Dispatches</span>
            </span>
            <h3 className="text-2xl font-black text-white font-display">
              Subscribe to Seasonal Harvest Alerts
            </h3>
            <p className="text-xs text-emerald-200">
              Get notified when fresh Devgad Mangoes, A2 Ghee batches, or Kashmir Walnuts are freshly harvested.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full lg:w-auto flex items-center gap-2 max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-emerald-950 border border-emerald-700 rounded-2xl px-4 py-3 text-xs text-white placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>Join</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 5 Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <div 
              onClick={() => handleViewNav('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-black font-display text-white">
                Agro<span className="text-amber-400">Connect</span>
              </span>
            </div>
            
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              Connecting Farms, Markets and People. Empowering Indian family farmers with fair direct pricing, cold-chain distribution, and transparent food systems.
            </p>

            <div className="text-[11px] text-stone-400 space-y-1">
              <p>📍 Nashik & Guntur Agritech Hubs</p>
              <p>📞 1800-AGRO-CONNECT (Toll Free)</p>
            </div>
          </div>

          {/* Col 2: Marketplace Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => handleCategoryNav('vegetables')} className="hover:text-amber-400 transition-colors">Fresh Vegetables</button></li>
              <li><button onClick={() => handleCategoryNav('fruits')} className="hover:text-amber-400 transition-colors">Fresh Fruits</button></li>
              <li><button onClick={() => handleCategoryNav('grains')} className="hover:text-amber-400 transition-colors">Grains & Cereals</button></li>
              <li><button onClick={() => handleCategoryNav('pulses')} className="hover:text-amber-400 transition-colors">Pulses & Lentils</button></li>
              <li><button onClick={() => handleCategoryNav('spices')} className="hover:text-amber-400 transition-colors">Spices & Herbs</button></li>
              <li><button onClick={() => handleCategoryNav('dairy')} className="hover:text-amber-400 transition-colors">Dairy & Country Eggs</button></li>
            </ul>
          </div>

          {/* Col 3: For Farmers */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">For Farmers</h4>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => handleViewNav('register')} className="hover:text-amber-400 transition-colors font-bold text-amber-400">Become a Seller</button></li>
              <li><button onClick={() => handleViewNav('farmer-dashboard')} className="hover:text-amber-400 transition-colors">Farmer Portal</button></li>
              <li><button onClick={() => handleViewNav('how-it-works')} className="hover:text-amber-400 transition-colors">Zero Commission Model</button></li>
              <li><button onClick={() => handleViewNav('farmers')} className="hover:text-amber-400 transition-colors">Verified Producer Directory</button></li>
              <li><button onClick={() => handleViewNav('contact')} className="hover:text-amber-400 transition-colors">Soil Testing Support</button></li>
            </ul>
          </div>

          {/* Col 4: For Buyers */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">For Consumers</h4>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => handleViewNav('marketplace')} className="hover:text-amber-400 transition-colors">100+ Products Catalog</button></li>
              <li><button onClick={() => handleViewNav('customer-dashboard')} className="hover:text-amber-400 transition-colors">7-Step Order Tracking</button></li>
              <li><button onClick={() => handleViewNav('about')} className="hover:text-amber-400 transition-colors">Quality Guarantee</button></li>
              <li><button onClick={() => handleViewNav('login')} className="hover:text-amber-400 transition-colors">Customer Login</button></li>
              <li><button onClick={() => handleViewNav('contact')} className="hover:text-amber-400 transition-colors">Help & FAQ Desk</button></li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => handleViewNav('about')} className="hover:text-amber-400 transition-colors">About AgroConnect</button></li>
              <li><button onClick={() => handleViewNav('how-it-works')} className="hover:text-amber-400 transition-colors">How It Works</button></li>
              <li><button onClick={() => handleViewNav('contact')} className="hover:text-amber-400 transition-colors">Contact Us</button></li>
              <li><span className="text-stone-500">Privacy Policy</span></li>
              <li><span className="text-stone-500">Terms of Agriculture Trade</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Trust Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} AgroConnect Marketplace Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-300 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Direct Farm Food</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
