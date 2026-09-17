import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Sprout, 
  TrendingUp, 
  MapPin,
  Award,
  Truck
} from 'lucide-react';

export const Hero = () => {
  const { setCurrentView, setSearchQuery, setSelectedCategoryFilter } = useApp();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch.trim());
      setCurrentView('marketplace');
    }
  };

  const handleQuickCategory = (catId) => {
    setSelectedCategoryFilter(catId);
    setCurrentView('marketplace');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-8 pb-16 lg:py-24">
      {/* Background Graphic Pattern */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')` }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wide shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Direct From 980+ Verified Indian Farms</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            {/* Exact Requested Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.12]">
              Fresh From Farmers. <br />
              <span className="text-amber-400 underline decoration-emerald-500 decoration-wavy decoration-2">
                Delivered With Trust.
              </span>
            </h1>

            {/* Exact Requested Description */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              AgroConnect helps farmers reach more customers while making fresh and quality agricultural products easily accessible to buyers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={() => setCurrentView('marketplace')}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Explore Products (100+)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('register')}
                className="px-6 py-3.5 rounded-2xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm border border-emerald-600/60 shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                <Sprout className="w-4 h-4 text-amber-400" />
                <span>Become a Seller (Farmer)</span>
              </button>
            </div>

            {/* Large Requested Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto lg:mx-0 bg-white p-2 rounded-2xl shadow-2xl flex items-center gap-2 text-stone-800 mt-4">
              <div className="pl-3 text-emerald-800">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search fruits, vegetables, grains, spices and more..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="flex-1 bg-transparent py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Popular Categories Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs">
              <span className="text-emerald-300 font-medium">Trending:</span>
              <button onClick={() => handleQuickCategory('vegetables')} className="px-3 py-1 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors">
                🍅 Fresh Vegetables
              </button>
              <button onClick={() => handleQuickCategory('fruits')} className="px-3 py-1 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors">
                🥭 Devgad Mangoes
              </button>
              <button onClick={() => handleQuickCategory('grains')} className="px-3 py-1 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors">
                🌾 Basmati Rice
              </button>
              <button onClick={() => handleQuickCategory('dairy')} className="px-3 py-1 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors">
                🥛 Gir Cow Ghee
              </button>
            </div>

          </div>

          {/* Right Visual Layer Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Visual Picture Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/80 bg-emerald-900 group">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
                  alt="Indian farmers marketplace fresh harvest"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-transparent to-black/20" />
                
                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      Verified Farm Gate
                    </span>
                    <span className="text-xs text-emerald-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> Nashik & Guntur Hubs
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display">100% Direct From Indian Growers</h3>
                  <p className="text-xs text-emerald-300 mt-1">Zero middlemen, guaranteed fair price for growers & lowest prices for consumers.</p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -left-6 bg-white p-3.5 rounded-2xl shadow-2xl border border-stone-200 flex items-center gap-3 text-stone-900 animate-bounce">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-stone-900">0% Middlemen Markup</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Fair Indian Farmer Prices</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-5 -right-4 bg-white p-3.5 rounded-2xl shadow-2xl border border-stone-200 flex items-center gap-3 text-stone-900">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-stone-900">100+ Unique Products</p>
                  <p className="text-[10px] text-stone-500 font-semibold">Quality & Lab Tested</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
