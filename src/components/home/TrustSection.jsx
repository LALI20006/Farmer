import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Award, Heart, CheckCircle2 } from 'lucide-react';

export const TrustSection = () => {
  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>The AgroConnect Guarantee</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            Uncompromising Standards for Pure Food
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Strict Farm Audits</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every farm undergoes soil testing, water purity certification, and animal welfare audits before listing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Cold-Chain Assurance</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Maintained at optimal micro-climate humidity and temperature from the farm gate right to your door.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">100% Freshness Guarantee</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              If any fruit or vegetable isn't at peak sweetness and crispness, instant 1-click refund or replacement.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Living Wage Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Empowering multi-generational family farms to stay independent, regenerative, and thriving.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
