import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Sprout, 
  Heart, 
  MessageSquare, 
  ArrowRight, 
  Users 
} from 'lucide-react';

export const FarmerDirectoryView = () => {
  const { 
    farmers, 
    setSelectedFarmer, 
    setCurrentView, 
    sendMessage 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const filteredFarmers = (farmers || []).filter((farmer) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (farmer.name || '').toLowerCase().includes(q);
      const matchFarm = (farmer.farmName || '').toLowerCase().includes(q);
      const matchLoc = (farmer.location || '').toLowerCase().includes(q);
      const matchState = (farmer.state || '').toLowerCase().includes(q);
      if (!matchName && !matchFarm && !matchLoc && !matchState) return false;
    }

    if (selectedState !== 'all') {
      if ((farmer.state || '').toLowerCase() !== selectedState.toLowerCase()) return false;
    }

    return true;
  });

  const handleOpenProfile = (farmer) => {
    setSelectedFarmer(farmer);
    setCurrentView(`farmers/${farmer.id}`);
  };

  return (
    <div className="py-10 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Direct Agricultural Producers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            Meet Verified Indian Farmers
          </h1>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Discover the independent family growers, organic orchards, seed banks, and pasture dairies behind your food. Connect directly, inquire about bulk harvests, or browse their fresh crops.
          </p>
        </div>

        {/* Search & State Filter */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by farmer name, farm, district, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-stone-500 mr-1">Filter State:</span>
            {['all', 'Maharashtra', 'Punjab', 'Andhra Pradesh', 'Kerala', 'Rajasthan', 'Karnataka', 'Madhya Pradesh'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedState === st
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {st === 'all' ? 'All India' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => handleOpenProfile(farmer)}
              className="group bg-white rounded-3xl border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={farmer.coverImage}
                    alt={farmer.farmName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{farmer.rating}</span>
                    <span className="text-stone-400 font-normal">({farmer.reviewsCount})</span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-white text-xs font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{farmer.location}, {farmer.state}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md -mt-10 relative z-10"
                    />
                    <div>
                      <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                        {farmer.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 font-medium">{farmer.acreage} • {farmer.experience} Exp.</p>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-emerald-900">{farmer.farmName}</h4>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {farmer.about}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {farmer.certifications?.slice(0, 2).map((cert, idx) => (
                      <span key={idx} className="text-[9px] bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendMessage(farmer.id, `Hello ${farmer.name}, I am interested in your agricultural crops.`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 text-stone-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Enquiry</span>
                </button>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
