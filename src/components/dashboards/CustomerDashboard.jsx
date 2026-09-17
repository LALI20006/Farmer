import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { 
  Package, 
  Heart, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  Bell, 
  User, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogOut,
  Phone,
  Mail
} from 'lucide-react';

export const CustomerDashboard = () => {
  const { 
    user, 
    orders, 
    wishlist, 
    products, 
    setCurrentView,
    logout,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'wishlist', 'addresses', 'profile'

  // Filter user's specific orders
  const userOrders = orders.filter(o => !o.customerId || o.customerId === user?.id || o.shippingAddress?.name === user?.name);
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));
  const recommendedProducts = products.filter(p => p.isFeatured).slice(0, 4);

  const getInitialLetter = (name) => {
    if (!name) return 'U';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Customer Hub Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || "Customer avatar"}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/60 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center border-2 border-white/20 shadow-md">
                {getInitialLetter(user?.name)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                  Customer Account
                </span>
                <span className="text-xs text-emerald-300 font-semibold">Registered Member</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display">
                Namaste, {user?.name || "Customer"}!
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">
                {user?.address ? `${user.address}, ` : ''}{user?.city || ''}{user?.state ? `, ${user.state}` : ''}{user?.pincode ? ` - ${user.pincode}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setCurrentView('marketplace')}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-white/10"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: `My Orders (${userOrders.length})`, icon: Package },
            { id: 'wishlist', label: `Wishlist (${wishlistedProducts.length})`, icon: Heart },
            { id: 'addresses', label: 'Saved Delivery Address', icon: MapPin },
            { id: 'profile', label: 'My Profile', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: MY ORDERS WITH 7-STEP PROGRESSION */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-lg">No orders placed yet</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                    You have not placed any orders yet. Explore 100+ farm-fresh harvests directly from verified Indian growers!
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Browse Fresh Harvests</span>
                </button>
              </div>
            ) : (
              userOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
                  
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-stone-900 text-base">Order #{order.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                          {order.statusText}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Payment: {order.paymentMethod}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500 font-medium">Order Total:</span>
                      <p className="text-xl font-black text-stone-900 font-display">₹{order.total}</p>
                    </div>
                  </div>

                  {/* Ordered Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-stone-900 truncate">{item.name}</h5>
                          <p className="text-[11px] text-stone-500 font-semibold">{item.quantity}x • ₹{item.price * item.quantity}</p>
                          <p className="text-[10px] text-emerald-800 truncate">{item.farmerName}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 7-Step Visual Order Tracking Timeline */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-emerald-700" />
                        <span>7-Stage Live Order Tracking</span>
                      </h4>
                      <span className="text-[11px] font-bold text-emerald-800">Stage {order.statusIndex + 1} of 7</span>
                    </div>

                    {/* Progress Bar & Steps */}
                    <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 pt-2">
                      {order.trackingHistory?.map((step) => (
                        <div key={step.step} className="space-y-1.5">
                          <div className={`h-2 rounded-full transition-all ${
                            step.completed ? 'bg-emerald-600' : 'bg-stone-200'
                          }`} />
                          <div>
                            <p className={`text-[11px] font-extrabold leading-tight ${
                              step.completed ? 'text-emerald-950' : 'text-stone-400'
                            }`}>
                              {step.step}. {step.title}
                            </p>
                            <p className="text-[9px] text-stone-500 mt-0.5">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-stone-900 text-lg">Your Saved Farm Favorites</h3>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="font-bold text-stone-800 text-base">Your wishlist is currently empty</h4>
                <p className="text-xs text-stone-500">Click the heart icon on any product in the marketplace to bookmark it for quick ordering.</p>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs mt-2"
                >
                  Browse Marketplace
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-extrabold text-stone-900 text-lg">Registered Delivery Address</h3>
            </div>
            
            {user?.address ? (
              <div className="space-y-3 text-xs">
                <div className="p-5 rounded-2xl bg-stone-50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-[10px]">
                      Primary Delivery Address
                    </span>
                    <span className="text-emerald-700 font-bold text-[11px]">✓ Default</span>
                  </div>
                  <p className="font-extrabold text-stone-900 text-sm">{user.name} • {user.mobile}</p>
                  <p className="text-stone-600 leading-relaxed">
                    {user.address}, {user.city}, {user.state} - {user.pincode}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-xs text-stone-600">No primary address registered.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6 max-w-2xl mx-auto text-xs">
            <h3 className="font-extrabold text-stone-900 text-lg pb-3 border-b border-stone-100">My Account Details</h3>
            <div className="space-y-4">
              <div>
                <label className="font-bold text-stone-500 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  readOnly 
                  value={user?.name || ""} 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-bold text-stone-900" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-500 block mb-1">Mobile Number</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={user?.mobile || ""} 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium text-stone-900" 
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-500 block mb-1">Email Address</label>
                  <input 
                    type="email" 
                    readOnly 
                    value={user?.email || ""} 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium text-stone-900" 
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-stone-500 block mb-1">Delivery Address</label>
                <input 
                  type="text" 
                  readOnly 
                  value={user?.address ? `${user.address}, ${user.city}, ${user.state} - ${user.pincode}` : "No address provided"} 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium text-stone-900" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products for Customer */}
        <div className="space-y-4 pt-6 border-t border-stone-200">
          <h3 className="text-xl font-black text-stone-900 font-display">Recommended Fresh Picks For You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
