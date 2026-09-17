import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { 
  Package, 
  Heart, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Leaf, 
  MapPin, 
  Store,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

export const BuyerDashboard = () => {
  const { 
    user, 
    orders, 
    wishlist, 
    savedFarms, 
    farms, 
    products, 
    setSelectedFarm,
    setCurrentView,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'farmbox', 'wishlist', 'farms'
  const [boxFrequency, setBoxFrequency] = useState('Weekly (Every Tuesday)');
  const [boxSize, setBoxSize] = useState('Family Harvest Box (12-14 items)');
  const [boxActive, setBoxActive] = useState(true);

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));
  const followedFarms = farms.filter(f => savedFarms.includes(f.id));

  const handleUpdateSubscription = () => {
    addToast("Farm Box Subscription Updated! 📦", `Scheduled for ${boxFrequency}`, "success");
  };

  return (
    <div className="py-8 bg-stone-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Buyer Hub Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt="Buyer avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/60 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 text-white text-[10px] font-bold uppercase tracking-wider">
                  Conscious Eater Hub
                </span>
                <span className="text-xs text-emerald-300 font-semibold">Eco Champion Tier</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                Welcome, {user?.name || "Maya Patel"}!
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">{user?.address || "San Francisco, CA"}</p>
            </div>
          </div>

          {/* Quick Stats in Header */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 self-start md:self-auto">
            <div>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">CO₂ Saved</span>
              <p className="text-lg font-bold text-amber-300 font-display">~28.5 kg</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Local Farms Supported</span>
              <p className="text-lg font-bold text-emerald-300 font-display">4 Farms</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('farmbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'farmbox'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            Weekly Farm Box Subscription
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            Harvest Wishlist ({wishlistedProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('farms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'farms'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            Followed Farms ({followedFarms.length})
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-3">
                <Package className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-900 text-base">No orders placed yet</h3>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Browse Fresh Harvests
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
                  
                  {/* Order header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">Order #{order.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Placed on {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 font-medium">Order Total:</span>
                      <p className="text-xl font-black text-slate-900 font-display">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                          <p className="text-[11px] text-slate-500">{item.quantity}x • ${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-[10px] text-emerald-700 truncate">{item.farmName}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Stepper */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Live Delivery Status</span>
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {order.trackingSteps?.map((step, sIdx) => (
                        <div key={sIdx} className="text-xs space-y-1">
                          <div className={`h-1.5 rounded-full ${step.completed ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
                          <p className={`font-bold text-[11px] ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                          <p className="text-[10px] text-slate-500">{step.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Weekly Farm Box Customizer */}
        {activeTab === 'farmbox' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Automated Seasonal Subscription</span>
                <h3 className="text-xl font-bold text-slate-900 font-display">Custom Weekly Farm Box</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${boxActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-slate-500'}`}>
                {boxActive ? 'Active Subscription' : 'Paused'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Curated directly from nearby farms every week based on what is ripe and sweetest in the soil. Customize your preferences or pause anytime with zero cancellation fees.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Box Size & Portion</label>
                <select
                  value={boxSize}
                  onChange={(e) => setBoxSize(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Solo Harvest Box (6-8 items)">Solo Harvest Box (6-8 items) - $28/delivery</option>
                  <option value="Couple Harvest Box (8-10 items)">Couple Harvest Box (8-10 items) - $38/delivery</option>
                  <option value="Family Harvest Box (12-14 items)">Family Harvest Box (12-14 items) - $52/delivery</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Cadence</label>
                <select
                  value={boxFrequency}
                  onChange={(e) => setBoxFrequency(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Weekly (Every Tuesday)">Weekly (Every Tuesday Morning)</option>
                  <option value="Weekly (Every Friday)">Weekly (Every Friday Morning)</option>
                  <option value="Bi-Weekly (Every 2 Weeks)">Bi-Weekly (Every 2 Weeks)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                <p className="font-bold text-emerald-900">Next Upcoming Harvest Box:</p>
                <p className="text-slate-600 text-[11px]">
                  Heirloom rainbow tomatoes, sweet Italian basil, Haas avocados, grass-fed Gouda wedge, and mountain blackberry jam.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleUpdateSubscription}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md transition-all text-center"
                >
                  Save Subscription Settings
                </button>
                <button
                  onClick={() => { setBoxActive(!boxActive); addToast("Subscription Status Changed", boxActive ? "Paused" : "Resumed", "info"); }}
                  className="px-5 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold transition-colors"
                >
                  {boxActive ? 'Pause Box' : 'Resume Box'}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Your Saved Harvest Wishlist</h3>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-2">
                <p className="text-xs text-slate-500">You haven't saved any harvests to your wishlist yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Followed Farms */}
        {activeTab === 'farms' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Farms You Follow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {followedFarms.map(f => (
                <div
                  key={f.id}
                  onClick={() => setSelectedFarm(f)}
                  className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={f.avatar} alt={f.owner} className="w-12 h-12 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                      <p className="text-[11px] text-slate-500">{f.location}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{f.story}</p>
                  <span className="text-xs font-bold text-emerald-700 block">Explore Farm Harvests →</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
