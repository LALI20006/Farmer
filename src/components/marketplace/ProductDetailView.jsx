import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Truck, 
  Plus, 
  Minus, 
  Share2, 
  CheckCircle2, 
  User, 
  MessageSquare,
  ArrowRight,
  Send
} from 'lucide-react';

export const ProductDetailView = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setSelectedFarmer,
    farmers,
    products,
    setCurrentView,
    addToast,
    sendMessage
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [localReviews, setLocalReviews] = useState([
    { id: 1, author: "Aakash Deshmukh", rating: 5, date: "2 days ago", comment: "Outstanding fresh quality! The taste and aroma are incomparable to supermarket produce.", verified: true },
    { id: 2, author: "Meera Krishnan", rating: 5, date: "1 week ago", comment: "Arrived in chilled eco-packaging directly from the farm gate. Will definitely subscribe weekly.", verified: true }
  ]);

  // Reset active image on product change
  React.useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [selectedProduct?.id]);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const farmer = farmers.find(f => f.id === selectedProduct.farmId) || farmers[0];
  const origPrice = Math.round(selectedProduct.price / (1 - (selectedProduct.discount || 10) / 100));
  
  // Build product photo gallery
  const productGallery = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [
        selectedProduct.image,
        farmer.coverImage || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
      ];
  
  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setCurrentView('checkout');
  };

  const handleOpenFarmerProfile = () => {
    if (farmer) {
      setSelectedFarmer(farmer);
      setSelectedProduct(null);
      setCurrentView('farmer-profile');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Buy ${selectedProduct.name} directly from ${selectedProduct.farmerName} on AgroConnect!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      addToast("Product Link Copied! 📋", "Share with friends and family.", "success");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: reviewAuthor.trim() || "Verified Buyer",
      rating: reviewRating,
      date: "Just now",
      comment: reviewComment.trim(),
      verified: true
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewComment('');
    setReviewAuthor('');
    addToast("Review Submitted! 🌟", "Thank you for supporting local farmers.", "success");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 shadow-md backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Left: Product Image & Interactive Multi-Angle Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 group">
              <img
                src={productGallery[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                {selectedProduct.discount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                    {selectedProduct.discount}% OFF
                  </span>
                )}
                {selectedProduct.isOrganic && (
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-md">
                    🌿 Certified Organic
                  </span>
                )}
              </div>

              {/* Photo Angle Badge */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                📸 Photo {activeImageIndex + 1} of {productGallery.length}
              </div>
            </div>

            {/* Gallery Thumbnail Selector Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {productGallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-emerald-600 ring-2 ring-emerald-400/40 scale-105 shadow-md' 
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[8px] font-bold py-0.5 text-center">
                    {idx === 0 ? 'Produce' : idx === 1 ? 'Farm Gate' : 'Quality'}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick badges */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-stone-700 font-medium">Refrigerated Delivery</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-stone-700 font-medium">{selectedProduct.harvestDate}</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-3.5">
              
              {/* Farmer Origin Pill */}
              <button
                onClick={handleOpenFarmerProfile}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-xl transition-colors self-start"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selectedProduct.farmerName} • {selectedProduct.farmerLocation}</span>
              </button>

              {/* Title & Rating */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-stone-900">{selectedProduct.rating}</span>
                  <span className="text-xs text-stone-400">({selectedProduct.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-stone-900 font-display">₹{selectedProduct.price}</span>
                {selectedProduct.discount > 0 && (
                  <span className="text-base text-stone-400 line-through font-semibold">₹{origPrice}</span>
                )}
                <span className="text-xs text-stone-500 font-medium">({selectedProduct.unit})</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Stock & MOQ Info */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Stock Availability:</span>
                  <span className="font-extrabold text-emerald-800">{selectedProduct.stock} Units Available</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Minimum Order (MOQ):</span>
                  <span className="font-extrabold text-stone-900">{selectedProduct.moq || '1 Unit'}</span>
                </div>
              </div>

              {/* Certifications List */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Verified Certifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.certifications?.map((c, i) => (
                    <span key={i} className="text-[10px] bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Quantity Stepper, Add to Cart & Buy Now */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center border border-stone-200 bg-stone-50 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center shadow-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-black text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-lg shadow-emerald-800/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ₹{selectedProduct.price * quantity}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-white border-stone-200 text-stone-500 hover:text-rose-600'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
                  title="Share Harvest"
                >
                  <Share2 className="w-4 h-4" />
                </button>

              </div>

              {/* Buy Now Direct */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Instant Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Meet the Farmer Section Card */}
        <div className="p-6 sm:p-8 bg-stone-50 border-t border-stone-200">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-md shrink-0"
              />
              <div>
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">Meet the Farmer</span>
                <h3 className="text-lg font-black text-stone-900 font-display">{farmer.name}</h3>
                <p className="text-xs text-stone-500">{farmer.farmName} • {farmer.location}, {farmer.state}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                    ✓ Verified Producer
                  </span>
                  <span className="text-[10px] text-stone-500 font-semibold">{farmer.experience} Experience</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleOpenFarmerProfile}
                className="px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all"
              >
                View Farmer Profile
              </button>
              <button
                onClick={() => {
                  sendMessage(farmer.id, `Hello ${farmer.name}, I would like to inquire about ${selectedProduct.name}.`);
                }}
                className="px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Enquire</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Write a Review Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="text-xl font-black text-stone-900 font-display">Customer Reviews & Ratings</h3>
              <p className="text-xs text-stone-500">Verified buyers share their farm-fresh experiences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Reviews List */}
            <div className="space-y-3">
              {localReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          ✓ Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="bg-stone-50 p-5 rounded-3xl border border-stone-200 space-y-3 text-xs">
              <h4 className="font-extrabold text-stone-900 text-sm">Write a Customer Review</h4>
              
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Your Rating</label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya S."
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe harvest freshness, taste, and packaging..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="p-6 sm:p-8 bg-stone-50 border-t border-stone-200 space-y-4">
            <h3 className="text-lg font-black text-stone-900 font-display">Related Agricultural Harvests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
