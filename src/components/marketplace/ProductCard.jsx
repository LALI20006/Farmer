import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Heart, Star, MapPin, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setSelectedFarmer,
    farmers,
    setIsCartOpen
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const origPrice = Math.round(product.price / (1 - (product.discount || 10) / 100));

  const handleFarmerClick = (e) => {
    e.stopPropagation();
    const farmer = farmers.find(f => f.id === product.farmId);
    if (farmer) setSelectedFarmer(farmer);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-3xl border border-stone-200/90 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
            }}
          />

          {/* Top Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Discount Badge & Organic Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.discount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase shadow-sm">
                {product.discount}% OFF
              </span>
            )}
            {product.isOrganic && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700/95 text-white text-[10px] font-bold shadow-sm">
                🌿 Certified Organic
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isWishlisted 
                ? 'bg-rose-50 text-rose-600 scale-110' 
                : 'bg-white/85 text-stone-600 hover:text-rose-600 hover:bg-white'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
          </button>

          {/* Bottom Harvest Info */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-medium flex items-center justify-between pointer-events-none">
            <span className="text-[10px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md font-semibold">
              🌱 {product.harvestDate}
            </span>
            <div className="flex items-center gap-1 text-[11px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-slate-950" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-4 sm:p-5 space-y-2.5">
          
          {/* Farmer Origin Pill */}
          <button
            onClick={handleFarmerClick}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 transition-colors group/farmer"
          >
            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[200px] underline decoration-emerald-300 group-hover/farmer:decoration-emerald-700">
              {product.farmerName} • {product.farmerLocation}
            </span>
          </button>

          {/* Title */}
          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-emerald-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* MOQ / Certifications */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
            <span className="bg-stone-100 px-2 py-0.5 rounded-md font-medium text-stone-700">
              Min. Order: <strong>{product.moq || '1 Unit'}</strong>
            </span>
            <span className="text-emerald-700 font-bold">
              {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
            </span>
          </div>

        </div>
      </div>

      {/* Bottom Price & Add to Cart Footer */}
      <div className="p-4 sm:p-5 pt-0 mt-1 flex items-center justify-between gap-2 border-t border-stone-100">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-stone-900 font-display">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="text-xs text-stone-400 line-through font-medium">₹{origPrice}</span>
            )}
          </div>
          <p className="text-[10px] text-stone-500 font-medium">
            {product.unit}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || product.stock <= 0}
            className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 active:scale-95 disabled:bg-stone-100 disabled:text-stone-400 text-stone-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock || product.stock <= 0}
            className="px-3 py-2 rounded-xl bg-[#064e3b] hover:bg-[#053f30] active:scale-95 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-xs shadow-md shadow-emerald-950/20 transition-all flex items-center gap-1 cursor-pointer"
            title="Buy Now Instantly"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

    </div>
  );
};
