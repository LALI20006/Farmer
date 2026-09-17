import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Sprout, 
  Heart, 
  MessageSquare,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const FarmerProfileView = () => {
  const { 
    selectedFarmer, 
    setSelectedFarmer, 
    products, 
    setCurrentView, 
    sendMessage 
  } = useApp();

  if (!selectedFarmer) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-stone-500">No farmer selected.</p>
        <button
          onClick={() => setCurrentView('farmers')}
          className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
        >
          View Farmer Directory
        </button>
      </div>
    );
  }

  // All products sold by this specific farmer
  const farmerProducts = products.filter(p => p.farmId === selectedFarmer.id);

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Navigation Button */}
        <button
          onClick={() => setCurrentView('farmers')}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-emerald-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Farmers</span>
        </button>

        {/* Farmer Header Cover Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
            <img
              src={selectedFarmer.coverImage}
              alt={selectedFarmer.farmName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedFarmer.avatar}
                  alt={selectedFarmer.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                      Verified Producer
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{selectedFarmer.rating} ({selectedFarmer.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-display leading-tight">{selectedFarmer.name}</h1>
                  <p className="text-xs text-stone-200 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {selectedFarmer.location}, {selectedFarmer.state} • {selectedFarmer.acreage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sendMessage(selectedFarmer.id, `Hello ${selectedFarmer.name}, I am visiting your profile and want to enquire about crops.`);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Farmer Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* About the Farmer */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-stone-900 font-display flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-700" />
                <span>About {selectedFarmer.farmName}</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedFarmer.about}
              </p>
            </div>

            {/* Certifications & Practices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Certifications</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFarmer.certifications?.map((c, i) => (
                    <span key={i} className="text-xs bg-white text-emerald-900 border border-emerald-200 px-3 py-1 rounded-xl font-bold shadow-xs">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Farming & Soil Practices</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFarmer.practices?.map((p, i) => (
                    <span key={i} className="text-xs bg-white text-stone-800 border border-stone-200 px-3 py-1 rounded-xl font-semibold shadow-xs">
                      🌱 {p}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Contact Information Bar */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-800" />
                <span><strong>Phone:</strong> {selectedFarmer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-800" />
                <span><strong>Email:</strong> {selectedFarmer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-800" />
                <span><strong>Experience:</strong> {selectedFarmer.experience} (Est. {selectedFarmer.establishedYear})</span>
              </div>
            </div>

          </div>
        </div>

        {/* Farmer's Listed Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-black text-stone-900 font-display">
                Harvests from {selectedFarmer.name} ({farmerProducts.length})
              </h2>
              <p className="text-xs text-stone-500">Direct-to-consumer harvests grown on this farm.</p>
            </div>
          </div>

          {farmerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {farmerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500 py-8 text-center bg-white rounded-3xl border border-stone-200">
              This farmer is currently preparing the next morning crop harvest. Check back soon!
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
