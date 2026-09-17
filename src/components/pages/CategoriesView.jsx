import React, { useEffect } from 'react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sprout, Sparkles } from 'lucide-react';

export const CategoriesView = () => {
  const { setSelectedCategoryFilter, setCurrentView } = useApp();

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const handleSelectCategory = (cat) => {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setSelectedCategoryFilter(cat.id);
    setCurrentView(`categories/${slug}`);
  };

  return (
    <div className="py-12 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>9 Agricultural Categories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            Explore Farm Categories
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            Browse our full catalog of 100+ authentic agricultural products grouped by crop variety and farming specialty. Click any category to view its direct harvests.
          </p>
        </div>

        {/* Categories Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat)}
              className="group bg-white rounded-3xl border border-stone-200 hover:border-emerald-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.bannerImage || cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-emerald-950 shadow-md">
                    {cat.itemCount}
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h2 className="text-xl sm:text-2xl font-black font-display">{cat.name}</h2>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-emerald-800 border-t border-stone-100 mt-2">
                <span>View {cat.name} Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-emerald-700" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
