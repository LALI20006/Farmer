import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Info, 
  Plus, 
  Minus,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setSelectedFarm,
    farms
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const farm = farms.find(f => f.id === selectedProduct.farmId);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  const handleOpenFarm = () => {
    if (farm) {
      setSelectedFarm(farm);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 shadow-md backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image & Badges */}
          <div className="relative aspect-square md:aspect-auto h-full min-h-[300px] bg-stone-100 overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-[11px] font-bold">
                  ✨ {selectedProduct.freshnessIndex}% Peak Freshness
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium">
                  {selectedProduct.harvestDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Farm Badge */}
              <button
                onClick={handleOpenFarm}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-xl transition-colors self-start"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selectedProduct.farmName}</span>
                <span className="text-slate-400 font-normal">({selectedProduct.farmLocation})</span>
              </button>

              {/* Title & Rating */}
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{selectedProduct.rating}</span>
                  <span className="text-xs text-slate-400">({selectedProduct.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Price & Unit */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-display">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedProduct.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Certifications Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Certifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.certifications?.map((c, i) => (
                    <span key={i} className="text-[10px] bg-stone-100 text-slate-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition & Storage Tips */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nutrition: {selectedProduct.nutritionHighlights?.join(', ')}</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-500 text-[11px]">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Storage Tip: {selectedProduct.storageTip}</span>
                </div>
              </div>

            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-4">
                
                {/* Stepper */}
                <div className="flex items-center border border-stone-200 rounded-2xl p-1 bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-stone-100 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-stone-100 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Basket CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket • ${(selectedProduct.price * quantity).toFixed(2)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-white border-stone-200 text-slate-500 hover:text-rose-600'
                  }`}
                  title={isWishlisted ? "Wishlisted" : "Save for later"}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
