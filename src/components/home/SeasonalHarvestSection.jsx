import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { Calendar, Sprout, ArrowRight } from 'lucide-react';

export const SeasonalHarvestSection = () => {
  const { products, setCurrentView } = useApp();
  const [activeSeason, setActiveSeason] = useState('rabi'); // 'rabi' | 'kharif' | 'zaid'

  const seasonalProducts = products.filter(p => {
    if (activeSeason === 'rabi') return ['grains', 'spices', 'vegetables'].includes(p.category);
    if (activeSeason === 'kharif') return ['fruits', 'pulses', 'organic'].includes(p.category);
    return ['dairy', 'supplies', 'seeds'].includes(p.category);
  }).slice(0, 4);

  return (
    <section className="py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Indian Crop Seasons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            Seasonal Harvest Calendar
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Eating in season delivers maximum nutrient density, superior aroma, and lowest food miles.
          </p>
        </div>

        {/* Season Tabs */}
        <div className="flex justify-center gap-2.5 mb-10">
          {[
            { id: 'rabi', label: '🌾 Rabi Winter Harvest (Wheat, Mustard, Vegetables)' },
            { id: 'kharif', label: '🌧️ Kharif Monsoon Bounty (Paddy, Pulses, Fruits)' },
            { id: 'zaid', label: '☀️ Summer Zaid Crops (Melons, Ghee, Seeds)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSeason(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeSeason === tab.id
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
