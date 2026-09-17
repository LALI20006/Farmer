import React from 'react';
import { Sprout, Sparkles, ShieldCheck, ShoppingCart, Lock, Headphones, CheckCircle2 } from 'lucide-react';

export const WhyAgroConnectSection = () => {
  const benefits = [
    {
      title: "Direct From Farmers",
      desc: "Buy directly from agricultural producers with zero distributor cuts or retail store markups.",
      icon: Sprout,
      color: "bg-emerald-100 text-emerald-800"
    },
    {
      title: "Fresh Products",
      desc: "Discover fresh agricultural products harvested within 24-48 hours with peak crispness and vitamins.",
      icon: Sparkles,
      color: "bg-amber-100 text-amber-800"
    },
    {
      title: "Verified Sellers",
      desc: "Every grower has a verified farmer profile with audited soil health, water purity, and practices.",
      icon: ShieldCheck,
      color: "bg-emerald-100 text-emerald-800"
    },
    {
      title: "Easy Ordering",
      desc: "Simple, transparent ordering process with flexible units, direct farmer chats, and quick checkout.",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Secure Payments",
      desc: "Multiple secure payment options including instant UPI (Google Pay/PhonePe/Paytm), Cards, and COD.",
      icon: Lock,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Customer Support",
      desc: "Dedicated help for both consumers and farmers with live order tracking and satisfaction guarantee.",
      icon: Headphones,
      color: "bg-rose-100 text-rose-800"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>The AgroConnect Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            Why Choose AgroConnect?
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Transforming Indian agriculture by closing the bridge between rural family producers and urban conscious households.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-stone-50 border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 shadow-xs hover:shadow-md space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center font-bold`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">{b.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
