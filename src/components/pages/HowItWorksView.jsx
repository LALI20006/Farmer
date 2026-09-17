import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserPlus, 
  LogIn, 
  Search, 
  ShoppingCart, 
  CreditCard, 
  PackageCheck, 
  Sprout, 
  Upload, 
  Inbox, 
  ClipboardList, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';

export const HowItWorksView = () => {
  const { setCurrentView, user } = useApp();
  const [activeTab, setActiveTab] = useState('customers'); // 'customers' | 'farmers'

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const customerSteps = [
    {
      step: 1,
      title: "Step 1 – Create an Account",
      subtitle: "Create a customer account.",
      desc: "Register in under 60 seconds with your full name, mobile number, and delivery city to unlock direct farm gate wholesale pricing.",
      icon: UserPlus,
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      step: 2,
      title: "Step 2 – Sign In",
      subtitle: "Log in using your registered credentials.",
      desc: "Access your personalized marketplace dashboard, track order dispatches, and save favorite certified growers.",
      icon: LogIn,
      color: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      step: 3,
      title: "Step 3 – Browse Products",
      subtitle: "Explore agricultural products.",
      desc: "Discover over 100+ fresh vegetables, seasonal orchard fruits, heirloom grains, unpolished pulses, and pure spices.",
      icon: Search,
      color: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      step: 4,
      title: "Step 4 – Add to Cart",
      subtitle: "Select products and add them to your cart.",
      desc: "Pick desired quantities in kilograms or packs directly from verified growers with full soil test and pesticide certification.",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      step: 5,
      title: "Step 5 – Checkout",
      subtitle: "Enter delivery details and complete payment.",
      desc: "Provide your delivery address and choose secure UPI, card, netbanking, or Cash on Delivery with transparent farm pricing.",
      icon: CreditCard,
      color: "bg-rose-100 text-rose-800 border-rose-200"
    },
    {
      step: 6,
      title: "Step 6 – Receive Your Order",
      subtitle: "Track and receive your products.",
      desc: "Track the 7-step temperature-monitored cold chain dispatch from the farm gate right to your kitchen doorstep.",
      icon: PackageCheck,
      color: "bg-emerald-100 text-emerald-900 border-emerald-300"
    }
  ];

  const farmerSteps = [
    {
      step: 1,
      title: "Step 1 – Create Farmer Account",
      subtitle: "Register as a farmer.",
      desc: "Sign up with your farm name, acreage, district, state, and primary crop categories with zero upfront listing fees.",
      icon: Sprout,
      color: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      step: 2,
      title: "Step 2 – Sign In",
      subtitle: "Log in to your farmer account.",
      desc: "Log in using your verified credentials to access your dedicated Farmer Portal, stock tracker, and earnings analytics.",
      icon: LogIn,
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      step: 3,
      title: "Step 3 – Add Products",
      subtitle: "Upload products with details, prices, and images.",
      desc: "Set your own fair farm-gate selling price, specify stock quantities, harvest dates, and upload real crop photographs.",
      icon: Upload,
      color: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      step: 4,
      title: "Step 4 – Receive Orders",
      subtitle: "Customers can place orders.",
      desc: "Receive instant notifications when conscious consumers and cooperative bulk buyers purchase your harvest crops.",
      icon: Inbox,
      color: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      step: 5,
      title: "Step 5 – Manage Orders",
      subtitle: "Accept and manage customer orders.",
      desc: "Harvest fresh at dawn, pack in provided eco-friendly crates, and hand over to our regional AgroConnect cold-hub collection vehicles.",
      icon: ClipboardList,
      color: "bg-rose-100 text-rose-800 border-rose-200"
    },
    {
      step: 6,
      title: "Step 6 – Earn",
      subtitle: "Track earnings from your dashboard.",
      desc: "Receive 100% direct bank transfers within 24 hours of dispatch with transparent statements and zero middleman commissions.",
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-900 border-emerald-300"
    }
  ];

  const stepsToDisplay = activeTab === 'customers' ? customerSteps : farmerSteps;

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>

          <div className="text-xs font-semibold text-stone-500">
            <span>AgroConnect</span> / <span className="text-emerald-800 font-bold">How It Works</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-[32px] p-8 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-4 border border-emerald-800/40">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fair Agricultural Trade Process</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            How AgroConnect Works
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            A transparent 6-step digital pathway connecting honest Indian family farmers directly with conscious consumers.
          </p>

          {/* Interactive Role Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-6 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-md ${
                activeTab === 'customers'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              🛒 FOR CUSTOMERS (6 Steps)
            </button>

            <button
              onClick={() => setActiveTab('farmers')}
              className={`px-6 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-md ${
                activeTab === 'farmers'
                  ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/20 scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              🌾 FOR FARMERS (6 Steps)
            </button>
          </div>
        </div>

        {/* Dynamic Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            {activeTab === 'customers' ? 'Customer Buying Journey' : 'Farmer Selling Journey'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {activeTab === 'customers' 
              ? 'From crop discovery to dawn-harvest cold-chain doorstep delivery.' 
              : 'From farm registration to same-day direct bank earnings.'}
          </p>
        </div>

        {/* 6 Grid Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stepsToDisplay.map((st) => {
            const IconComponent = st.icon;
            return (
              <div
                key={st.step}
                className="bg-white rounded-3xl p-7 border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:border-emerald-500"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${st.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-stone-300 font-display group-hover:text-emerald-700 transition-colors">
                      0{st.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-stone-900 font-display">
                      {st.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                      {st.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified AgroConnect Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Bar */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-emerald-800">
          <div className="space-y-1">
            <h3 className="text-xl font-black font-display text-white">
              {activeTab === 'customers' ? 'Ready to Taste Direct Farm Freshness?' : 'Ready to Sell Your Harvest Directly?'}
            </h3>
            <p className="text-xs text-emerald-200">
              {activeTab === 'customers' 
                ? 'Explore 110+ seasonal harvests with certified farm-origin traceability.' 
                : 'Join 980+ verified growers across India with 100% fair price realization.'}
            </p>
          </div>

          <button
            onClick={() => setCurrentView(activeTab === 'customers' ? 'marketplace' : (user ? 'farmer-dashboard' : 'create-account'))}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer shrink-0"
          >
            <span>{activeTab === 'customers' ? 'Explore 100+ Products' : 'Join as a Verified Farmer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
