import React, { useState } from 'react';
import { SEASONAL_HARVESTS } from '../../data/seasonalCalendar';
import { Calendar, Sun, Snowflake, Sprout, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SeasonalCalendarSection = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-stone-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Nature's Clock</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Seasonal Harvest Calendar
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Eating in season guarantees peak vitamin density, rich natural aroma, and the lowest ecological footprint.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {SEASONAL_HARVESTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === idx
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {idx === 0 ? '☀️ In Season Right Now' : '🍂 Upcoming Autumn & Frost'}
            </button>
          ))}
        </div>

        {/* Harvest Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{SEASONAL_HARVESTS[activeTab].season}</h3>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">{SEASONAL_HARVESTS[activeTab].highlight}</p>
            </div>
            <button
              onClick={() => setCurrentView('marketplace')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              <span>Shop these crops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEASONAL_HARVESTS[activeTab].crops.map((crop, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-start gap-3.5"
              >
                <div className="text-2xl p-2 rounded-xl bg-white shadow-xs shrink-0">
                  {crop.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{crop.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {crop.status}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{crop.peak}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-snug">{crop.tip}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
