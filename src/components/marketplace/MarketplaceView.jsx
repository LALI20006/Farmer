import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  X, 
  Check, 
  MapPin, 
  RotateCcw,
  Leaf,
  Filter
} from 'lucide-react';

export const MarketplaceView = () => {
  const { 
    user,
    products, 
    searchQuery, 
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedStateFilter,
    setSelectedStateFilter
  } = useApp();

  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'newest', 'price-asc', 'price-desc', 'rating'
  const [maxPrice, setMaxPrice] = useState(20000);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const availableStates = ['all', 'Maharashtra', 'Punjab', 'Andhra Pradesh', 'Kerala', 'Rajasthan', 'Karnataka', 'Madhya Pradesh'];

  // Guarantee view always lands at the top so the Welcome Header and 110 Products are seen first
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchFarmer = (p.farmerName || '').toLowerCase().includes(q);
        const matchLoc = (p.farmerLocation || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        const matchCat = (p.category || '').toLowerCase().includes(q);
        if (!matchName && !matchFarmer && !matchLoc && !matchDesc && !matchCat) return false;
      }
      // State
      if (selectedStateFilter !== 'all' && !(p.farmerLocation || '').toLowerCase().includes(selectedStateFilter.toLowerCase())) {
        return false;
      }
      // Price
      if (p.price > maxPrice) return false;
      // Organic
      if (onlyOrganic && !p.isOrganic) return false;
      // In Stock
      if (onlyInStock && (!p.inStock || p.stock <= 0)) return false;
      // Rating
      if (p.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'newest') return b.freshnessIndex - a.freshnessIndex;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategoryFilter, searchQuery, selectedStateFilter, maxPrice, onlyOrganic, onlyInStock, minRating, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('all');
    setSelectedStateFilter('all');
    setMaxPrice(20000);
    setOnlyOrganic(false);
    setOnlyInStock(false);
    setMinRating(0);
    setSortBy('popular');
  };

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Welcome Header */}
        {user && (
          <div className="mb-8 p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#064e3b] via-[#054432] to-[#043d2e] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-emerald-800/40 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold backdrop-blur-sm border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Marketplace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium max-w-xl">
                Order directly from verified local growers with 100% farm-origin traceability and zero middleman markups.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-bold text-emerald-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Location: {user.city || user.district || user.state || 'All India'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Marketplace Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">National Agriculture Marketplace</span>
              <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display mt-0.5">
                All Agricultural Harvests ({products.length} Products)
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Explore authentic 100% farm-direct produce, spices, grains, seeds, dairy, and farm tools.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-white border border-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                <span>Filters & Sorting</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-5 no-scrollbar">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              🌱 All Products ({products.length})
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                  <span>Filter Products</span>
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Search Keywords
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="E.g. Alphonso, Bilona, Basmati..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* State / Origin Filter */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Farm State / Region
                </label>
                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {availableStates.map((st) => (
                    <option key={st} value={st}>
                      {st === 'all' ? 'All Indian States' : st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Price Range */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-xs font-black text-emerald-800">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="20000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
              </div>

              {/* Quick Checkbox Toggles */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyOrganic}
                    onChange={(e) => setOnlyOrganic(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-stone-800">🌿 100% Certified Organic</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-stone-800">📦 In Stock Only</span>
                </label>
              </div>

              {/* Minimum Rating Filter */}
              <div className="pt-2 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  Customer Rating
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { label: 'All', val: 0 },
                    { label: '4.8 ★+', val: 4.8 },
                    { label: '5.0 ★', val: 5.0 }
                  ].map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setMinRating(r.val)}
                      className={`py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
                        minRating === r.val
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-stone-500 font-medium">
                Showing <strong className="text-stone-900 font-extrabold">{filteredProducts.length}</strong> verified farm harvests
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="popular">Popular & Top Reviewed</option>
                  <option value="newest">Freshest Harvest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Product Catalog Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">No agricultural harvests match these filters</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your search keyword, adjusting your price range, or changing your state filter.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-md transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
