import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { Flame, ArrowRight } from 'lucide-react';

export const BestSellersSection = () => {
  const { products, setCurrentView } = useApp();

  // Top reviewed / rated products
  const bestSellers = [...products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Highest Rated by 40,000+ Customers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Best Selling Farm Products
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              From GI-tagged Devgad Alphonso mangoes and aged Basmati to Vedic Gir Cow Bilona Ghee.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('marketplace')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-bold text-xs transition-all group"
          >
            <span>View Top Sellers</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
