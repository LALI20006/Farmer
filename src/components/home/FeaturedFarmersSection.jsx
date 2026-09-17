import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Star, ArrowRight, Award } from 'lucide-react';

export const FeaturedFarmersSection = () => {
  const { farmers, setSelectedFarmer, setCurrentView } = useApp();

  const handleFarmerClick = (farmer) => {
    setSelectedFarmer(farmer);
    setCurrentView('farmer-profile');
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Direct Producer Transparency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Featured Farmers & Growers
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Meet the hardworking agrarian families cultivating pure, authentic food across India.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('farmers')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-bold text-xs transition-all group"
          >
            <span>Meet All Verified Farmers</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmers.slice(0, 4).map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => handleFarmerClick(farmer)}
              className="group bg-stone-50 rounded-3xl border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={farmer.coverImage}
                    alt={farmer.farmName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-stone-900 flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{farmer.rating}</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span className="truncate">{farmer.location}, {farmer.state}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md -mt-9 relative z-10"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-800 transition-colors">
                        {farmer.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-semibold">{farmer.experience} Experience</p>
                    </div>
                  </div>

                  <h5 className="text-xs font-bold text-emerald-900">{farmer.farmName}</h5>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {farmer.about}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {farmer.certifications?.slice(0, 2).map((cert, idx) => (
                      <span key={idx} className="text-[9px] bg-white border border-stone-200 text-emerald-800 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 mt-1 flex items-center justify-between text-xs font-bold text-emerald-800 border-t border-stone-100">
                <span>View Farmer Profile & Crops</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
