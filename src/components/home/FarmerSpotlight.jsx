import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Star, Sparkles, ArrowRight, Award } from 'lucide-react';

export const FarmerSpotlight = () => {
  const { farms, setSelectedFarm, setCurrentView } = useApp();

  return (
    <section className="py-16 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Direct Farm Transparency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Meet the Regenerative Farmers
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Every crop, honey jar, and wheel of artisan cheese is traceable directly to the family farm who cultivated it with love and care.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('farmers')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors"
          >
            <span>View All {farms.length} Verified Farms</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Farm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farms.slice(0, 3).map((farm) => (
            <div
              key={farm.id}
              onClick={() => setSelectedFarm(farm)}
              className="group bg-stone-50 rounded-3xl border border-stone-200 hover:border-emerald-400/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Cover Image & Avatar */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={farm.coverImage}
                    alt={farm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{farm.rating}</span>
                    <span className="text-slate-400 font-normal">({farm.reviewsCount})</span>
                  </div>

                  {/* Location in Cover */}
                  <div className="absolute bottom-3 left-4 text-white text-xs font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{farm.location}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={farm.avatar}
                      alt={farm.owner}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md -mt-10 relative z-10"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {farm.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">Owned by {farm.owner} • Est. {farm.establishedYear}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {farm.story}
                  </p>

                  {/* Certifications Badge Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {farm.certifications.slice(0, 3).map((cert, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-emerald-800 text-[10px] font-bold shadow-xs"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0 border-t border-stone-200/60 mt-3 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span>Explore Farm & Harvests</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
