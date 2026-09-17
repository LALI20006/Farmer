import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Sprout, 
  Heart, 
  MessageCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const FarmerProfileModal = () => {
  const { 
    selectedFarm, 
    setSelectedFarm, 
    products, 
    setContactFarm, 
    savedFarms, 
    toggleSaveFarm 
  } = useApp();

  if (!selectedFarm) return null;

  const farmProducts = products.filter(p => p.farmId === selectedFarm.id);
  const isFollowed = savedFarms.includes(selectedFarm.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedFarm(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 shadow-md backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={selectedFarm.coverImage}
            alt={selectedFarm.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20" />

          {/* Farm Main Header Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedFarm.avatar}
                alt={selectedFarm.owner}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider">
                    Verified Producer
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedFarm.rating} ({selectedFarm.reviewsCount} reviews)</span>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">{selectedFarm.name}</h2>
                <p className="text-xs text-stone-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {selectedFarm.location} • Est. {selectedFarm.establishedYear} ({selectedFarm.acreage} Acres)
                </p>
              </div>
            </div>

            {/* Farm Header Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setContactFarm(selectedFarm)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Grower</span>
              </button>
              <button
                onClick={() => toggleSaveFarm(selectedFarm.id)}
                className={`p-2.5 rounded-2xl border transition-all ${
                  isFollowed 
                    ? 'bg-rose-50 border-rose-200 text-rose-600' 
                    : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
                }`}
                title={isFollowed ? "Unfollow farm" : "Follow farm"}
              >
                <Heart className={`w-4 h-4 ${isFollowed ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Farm Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Farm Story & Philosophy */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>Our Soil, Heritage & Practices</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedFarm.story}
            </p>
          </div>

          {/* Badges & Sustainable Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Certifications */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Certifications</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedFarm.certifications?.map((c, i) => (
                  <span key={i} className="text-xs bg-white text-emerald-900 border border-emerald-200 px-3 py-1 rounded-xl font-semibold shadow-xs">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Practices */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Ecological Farming Methods</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedFarm.practices?.map((p, i) => (
                  <span key={i} className="text-xs bg-white text-slate-800 border border-stone-200 px-3 py-1 rounded-xl font-semibold shadow-xs">
                    🌱 {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Farm Visiting & Contact Bar */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span><strong>Farm Stand Hours:</strong> {selectedFarm.contact?.visitingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-700" />
              <span>{selectedFarm.contact?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{selectedFarm.contact?.phone}</span>
            </div>
          </div>

          {/* Farm's Current Available Harvests */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Available Harvests from {selectedFarm.name} ({farmProducts.length})
              </h3>
            </div>

            {farmProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">
                This farm currently has all crops reserved for the morning harvest. Check back tomorrow!
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
