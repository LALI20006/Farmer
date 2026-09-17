import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, UserCheck, PlusCircle, PackageCheck, Wallet, Search, ShoppingBag, CreditCard, Truck, ArrowRight, Sprout, Users } from 'lucide-react';

export const HowItWorksSection = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('farmers'); // 'farmers' | 'customers'

  const farmerSteps = [
    { step: "01", title: "Create an Account", desc: "Register as a verified farmer with your farm name and location.", icon: UserPlus },
    { step: "02", title: "Build Your Profile", desc: "Showcase your acreage, soil practices, experience, and organic certificates.", icon: UserCheck },
    { step: "03", title: "Add Agricultural Products", desc: "List harvest crops with real-time stock, pricing, MOQ, and photos.", icon: PlusCircle },
    { step: "04", title: "Receive Customer Orders", desc: "Get instant order notifications for direct packing and van dispatch.", icon: PackageCheck },
    { step: "05", title: "Sell & Manage Earnings", desc: "Receive 90%+ payouts directly to your bank account with zero middleman deductions.", icon: Wallet },
  ];

  const customerSteps = [
    { step: "01", title: "Create an Account", desc: "Sign up free in seconds as a buyer to unlock direct farm gate prices.", icon: UserPlus },
    { step: "02", title: "Search Products", desc: "Explore 100+ fresh vegetables, tree-ripe fruits, grains, and spices.", icon: Search },
    { step: "03", title: "Add Products to Cart", desc: "Group items from multiple local farms in a single seamless basket.", icon: ShoppingBag },
    { step: "04", title: "Complete Payment", desc: "Pay securely via instant UPI (Google Pay, PhonePe), Cards, or COD.", icon: CreditCard },
    { step: "05", title: "Track Your Delivery", desc: "Follow live 7-step cold-chain delivery tracker to your doorstep.", icon: Truck },
  ];

  const steps = activeTab === 'farmers' ? farmerSteps : customerSteps;

  return (
    <section className="py-16 bg-stone-50/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Sprout className="w-3.5 h-3.5 text-amber-700" />
            <span>Simple 5-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            How AgroConnect Works
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            A transparent direct-to-consumer agriculture exchange built for growers and food lovers.
          </p>
        </div>

        {/* Audience Toggle */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('farmers')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'farmers'
                ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sprout className="w-4 h-4 text-amber-400" />
            <span>🌾 For Farmers & Producers</span>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'customers'
                ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>🛒 For Consumers & Buyers</span>
          </button>
        </div>

        {/* 5-Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-500 font-display">{s.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA at Bottom */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentView('register')}
            className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-900/20 transition-all inline-flex items-center gap-2"
          >
            <span>{activeTab === 'farmers' ? 'Join as a Verified Farmer' : 'Start Shopping Fresh Harvests'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
