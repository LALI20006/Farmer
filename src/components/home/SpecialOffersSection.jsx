import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

export const SpecialOffersSection = () => {
  const { products, setCurrentView } = useApp();

  // Discounted products >= 15%
  const discounted = products.filter(p => (p.discount || 0) >= 15).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/50 via-white to-stone-50/50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Tag className="w-4 h-4 text-amber-600" />
              <span>Direct Farm Bounties & Seasonal Deals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Special Offers & Bulk Savings
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Enjoy up to 25% discounts directly from producers on seasonal surpluses without middleman cuts.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('marketplace')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all group"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discounted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
