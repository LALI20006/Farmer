import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { ProductCard } from '../marketplace/ProductCard';
import { 
  ArrowLeft, 
  Sprout, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Filter 
} from 'lucide-react';

export const CategoryDetailView = ({ categoryId }) => {
  const { products, setCurrentView, setSelectedCategoryFilter } = useApp();

  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Find category metadata
  const currentCategory = useMemo(() => {
    if (!categoryId) return CATEGORIES_DATA[0];
    const cleanId = categoryId.toLowerCase().replace(/^(fresh-|agricultural-|farm-)/, '').replace(/-products$/, '').replace(/-cereals$/, '').replace(/-lentils$/, '').replace(/-herbs$/, '').replace(/-country-eggs$/, '').replace(/-tools$/, '');
    
    return CATEGORIES_DATA.find(c => 
      c.id === categoryId || 
      c.id === cleanId ||
      c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categoryId.toLowerCase()
    ) || CATEGORIES_DATA[0];
  }, [categoryId]);

  // Guarantee view always starts at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [categoryId]);

  // Filter products strictly belonging to this category
  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];
    return products.filter((p) => {
      if (p.category !== currentCategory.id) return false;
      if (onlyOrganic && !p.isOrganic) return false;
      if (p.price > maxPrice) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchFarmer = (p.farmerName || '').toLowerCase().includes(q);
        if (!matchName && !matchFarmer) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  }, [products, currentCategory, onlyOrganic, maxPrice, searchQuery, sortBy]);

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('categories')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </button>

          <div className="text-xs font-semibold text-stone-500">
            <span>Categories</span> / <span className="text-emerald-800 font-bold">{currentCategory.name}</span>
          </div>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-emerald-950 text-white min-h-[220px] flex items-center p-8 sm:p-12 border border-emerald-800/40">
          <img
            src={currentCategory.bannerImage || currentCategory.image}
            alt={currentCategory.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <Sprout className="w-3.5 h-3.5" />
              <span>Direct Farm Gate Category</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              {currentCategory.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              {currentCategory.tagline || `Browse 100% farm-direct fresh ${currentCategory.name.toLowerCase()} sourced with transparent origin verification.`}
            </p>
            <div className="pt-1 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
                {categoryProducts.length} Products Available
              </span>
            </div>
          </div>
        </div>

        {/* Filters and Controls Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search inside this category */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search in ${currentCategory.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setOnlyOrganic(!onlyOrganic)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                onlyOrganic 
                  ? 'bg-emerald-800 text-white shadow-xs' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>🌿 Organic Only</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
              >
                <option value="popular">Popular & Top Reviewed</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">No products match your current filters in this category.</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">Try clearing your search query or resetting the organic filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setOnlyOrganic(false); setMaxPrice(20000); }}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-xs hover:bg-emerald-900 transition-colors"
            >
              Reset Category Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
