import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  ShieldCheck, 
  Target, 
  Eye, 
  CheckCircle2, 
  Heart, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export const AboutView = () => {
  const { setCurrentView } = useApp();

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>

          <div className="text-xs font-semibold text-stone-500">
            <span>AgroConnect</span> / <span className="text-emerald-800 font-bold">About Us</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-emerald-950 text-white p-8 sm:p-14 border border-emerald-800/40">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80"
            alt="Lush agricultural farmland"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Farm-to-Table Exchange</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              About AgroConnect
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              AgroConnect is a digital agricultural marketplace that connects farmers directly with customers. We empower producers with fair prices, eliminate unnecessary middlemen markups, and bring wholesome dawn-harvest food directly to Indian homes.
            </p>
          </div>
        </div>

        {/* Core Mission Points */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Our Core Purpose</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-1">
              Our Mission at AgroConnect
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Transforming agricultural trade across India by prioritizing farmer dignity and consumer health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Help Farmers Reach More Customers",
                desc: "Provide smallholder rural farmers with instant access to high-demand urban markets across India.",
                icon: Users,
                color: "bg-blue-100 text-blue-800 border-blue-200"
              },
              {
                title: "Support Direct Farm-to-Consumer Selling",
                desc: "Bypass multiple exploitative wholesale commission agents so farmers retain up to 90% of retail value.",
                icon: TrendingUp,
                color: "bg-emerald-100 text-emerald-800 border-emerald-200"
              },
              {
                title: "Make Agricultural Products Easier to Discover",
                desc: "Catalog 100+ native heirloom crops, certified organic staples, and fresh seasonal harvests in one place.",
                icon: Sprout,
                color: "bg-amber-100 text-amber-800 border-amber-200"
              },
              {
                title: "Create a Simple Digital Marketplace",
                desc: "Build an accessible, mobile-first platform enabling seamless ordering, fair trade, and secure payment.",
                icon: ShieldCheck,
                color: "bg-purple-100 text-purple-800 border-purple-200"
              }
            ].map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">{m.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission & Vision Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Our Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 font-display">Our Mission</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To build India's most trusted, farmer-centric digital food exchange. We strive to guarantee that every agrarian family receives a fair return for their labor and stewardship of the soil, while delivering unadulterated, wholesome food to every conscious household within 24 to 48 hours of harvest.
            </p>
          </div>

          {/* Our Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 font-display">Our Vision</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              A thriving rural economy where agricultural producers are celebrated as entrepreneurs. We envision a future where food supply chains are 100% transparent, organic regenerative farming is standard practice, and consumers know exactly which family farm grew the food on their table.
            </p>
          </div>

        </div>

        {/* Why Choose AgroConnect */}
        <div className="bg-gradient-to-br from-[#064e3b] via-[#054432] to-[#043d2e] text-white rounded-[32px] p-8 sm:p-12 shadow-xl space-y-8 border border-emerald-800/40">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              The Direct Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Why Choose AgroConnect
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              Why thousands of conscious families and hundreds of growers trust our platform daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-extrabold text-white text-base">Zero Middleman Deductions</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Traditional supply chains pass produce through 5 to 7 middlemen, taking up to 70% of crop value. AgroConnect ensures 100% direct pricing to the grower.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-extrabold text-white text-base">Audited Farm Gate Purity</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Every participating farmer passes our GPS land verification and NABL accredited soil audit to confirm zero toxic chemical residues.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-extrabold text-white text-base">Cold-Chain Freshness</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Crops harvested at 5:00 AM are chilled in regional solar cold-hubs and dispatched directly, arriving fresher and lasting longer in your home.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Guiding Principles</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-1">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-extrabold text-stone-900 text-sm">🌾 Farmer First</h4>
              <p className="text-xs text-stone-600">Every decision we make starts with whether it improves the farmer's livelihood.</p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-extrabold text-stone-900 text-sm">🔍 Total Transparency</h4>
              <p className="text-xs text-stone-600">Know exactly where your food was grown, who grew it, and the date it was harvested.</p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-extrabold text-stone-900 text-sm">🌱 Ecological Care</h4>
              <p className="text-xs text-stone-600">We prioritize regenerative soil farming, native seed conservation, and water stewardship.</p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-extrabold text-stone-900 text-sm">🤝 Community Trust</h4>
              <p className="text-xs text-stone-600">Fostering lasting direct relationships between consumers and family farmers.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-4">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <span>Explore 110+ Farm Harvests</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
