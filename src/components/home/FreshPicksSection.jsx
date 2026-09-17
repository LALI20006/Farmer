import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { Clock, ArrowRight, Sun } from 'lucide-react';

export const FreshPicksSection = () => {
  const { products, setCurrentView } = useApp();

  // Fresh picks: products harvested today or marked with fresh badges
  const freshPicks = (products || [])
    .filter(p => (p?.harvestDate && p.harvestDate.toLowerCase().includes('today')) || p?.freshnessIndex === 100)
    .slice(0, 4);

  return (
    <section className="py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Harvested at Dawn • 100% Crisp & Sweet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Fresh Picks Today
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Harvested this morning from local Nashik, Indore, and Guntur fields, sorted and dispatched straight to you.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('marketplace')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 text-stone-800 hover:text-emerald-900 font-bold text-xs shadow-xs transition-all group"
          >
            <span>Explore All Fresh Picks</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
