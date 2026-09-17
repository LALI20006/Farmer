import React, { useState } from 'react';
import { DollarSign, Leaf, Truck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ImpactCalculator = () => {
  const { setCurrentView } = useApp();
  const [weeklySpend, setWeeklySpend] = useState(75); // $ / week

  // Supermarket vs AgroConnect direct metrics
  const supermarketFarmerEarnings = (weeklySpend * 0.14).toFixed(0); // standard retail gives 14-16%
  const agroConnectFarmerEarnings = (weeklySpend * 0.90).toFixed(0); // 90% direct to farmer
  const directFarmerBenefitYearly = ((agroConnectFarmerEarnings - supermarketFarmerEarnings) * 52).toFixed(0);
  
  // CO2 food miles saved (average supermarket food travels 1,500 miles, AgroConnect average 22 miles)
  const co2SavedKg = ((weeklySpend * 0.45) * 52).toFixed(0);
  const treesEquivalent = (co2SavedKg / 21).toFixed(1);

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Community Impact</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Calculate Your Direct Farm & Climate Impact
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              When you buy groceries at big supermarket chains, less than 15 cents of every dollar reaches the farmer. With AgroConnect, over 90% goes straight to the grower, while cutting out 1,400+ food miles of refrigerated diesel freight.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Producer Prosperity</h4>
                  <p className="text-xs text-slate-400">Farmers set their own fair price, reinvesting in living soil and fair farm labor wages.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Hyper-Local Micro Cold-Chain</h4>
                  <p className="text-xs text-slate-400">Zero cross-country warehouses, no chemical preservation gases, minimal packaging.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Interactive Impact Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-6">
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Your Average Weekly Fresh Food Budget:
                  </label>
                  <span className="text-2xl font-black text-emerald-400 font-display">${weeklySpend} / wk</span>
                </div>

                <input
                  type="range"
                  min="20"
                  max="300"
                  step="5"
                  value={weeklySpend}
                  onChange={(e) => setWeeklySpend(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$20/wk</span>
                  <span>$150/wk</span>
                  <span>$300/wk</span>
                </div>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Supermarket */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] font-bold text-rose-400 uppercase">Supermarket Retail</span>
                  <p className="text-2xl font-black text-slate-200 mt-1">${supermarketFarmerEarnings}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">goes to farmer (14%)</p>
                  <p className="text-[10px] text-slate-500 mt-2">86% lost to middlemen, packaging & warehousing</p>
                </div>

                {/* AgroConnect */}
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 shadow-inner">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">With AgroConnect</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">${agroConnectFarmerEarnings}</p>
                  <p className="text-[11px] text-emerald-200 mt-0.5">goes directly to grower (90%)</p>
                  <p className="text-[10px] text-emerald-300/80 mt-2">✨ Direct farm support</p>
                </div>

              </div>

              {/* Annual Cumulative Stats Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 border border-emerald-500/40 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold text-emerald-200">Your Annual Direct Farmer Contribution:</p>
                  <p className="text-2xl font-black text-white font-display">+${directFarmerBenefitYearly} / year</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-emerald-200">CO2 Emissions Saved:</p>
                  <p className="text-2xl font-black text-amber-300 font-display">{co2SavedKg} kg CO₂</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('marketplace')}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all text-center"
              >
                Start Supporting Local Farmers Today
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
