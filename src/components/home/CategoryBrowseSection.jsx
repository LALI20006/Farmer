import React from 'react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryBrowseSection = () => {
  const { setSelectedCategoryFilter, setCurrentView } = useApp();

  const handleCategorySelect = (catId) => {
    setSelectedCategoryFilter(catId);
    setCurrentView('marketplace');
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore Agriculture By Category</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Browse Popular Categories
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              From dawn-picked farm vegetables to heritage grains, spices, seeds, and irrigation tools.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('categories')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-bold text-xs transition-all group"
          >
            <span>View All 9 Categories</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 9 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group bg-stone-50 rounded-3xl border border-stone-200 hover:border-emerald-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Item count badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-emerald-950 shadow-sm">
                  {cat.itemCount}
                </div>

                {/* Title over image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-base sm:text-lg font-black font-display leading-tight">{cat.name}</h3>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs bg-white">
                <p className="text-stone-500 text-[11px] line-clamp-1">{cat.tagline}</p>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-700 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
