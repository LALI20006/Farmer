import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Bell, 
  MessageSquare, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Store, 
  LayoutDashboard,
  Sparkles,
  MapPin,
  ArrowRight,
  Activity,
  Users
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartItemCount, 
    setIsCartOpen, 
    user, 
    logout, 
    searchQuery,
    setSearchQuery,
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    setActiveChat,
    messages
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      setCurrentView('marketplace');
      setMobileMenuOpen(false);
    }
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Info Ribbon */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AgroConnect National Agriculture Exchange</span>
            </span>
            <span className="hidden md:inline text-emerald-600">•</span>
            <span className="hidden md:inline text-emerald-300">Connecting 980+ Verified Indian Farms Directly with Consumers</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-emerald-300 font-medium ml-auto">
            <span>🇮🇳 Direct Farm Gate Fair Pricing</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Zero Middleman Deductions</span>
          </div>
        </div>
      </div>

      {/* Main Frosted Glass Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
            
            {/* Logo with Tagline */}
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
                    Agro<span className="text-amber-600">Connect</span>
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 font-bold tracking-tight hidden sm:block">
                  Connecting Farms, Markets and People
                </p>
              </div>
            </div>

            {/* Navigation Links (Categories, Farmers, How It Works, About, Contact) - Always Visible & Clickable */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { id: 'marketplace', label: 'Marketplace (100+)' },
                { id: 'categories', label: 'Categories' },
                { id: 'farmers', label: 'Farmers' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentView === link.id
                      ? 'text-emerald-900 bg-emerald-100/70 shadow-xs'
                      : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Action Icons & Auth Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                <>
                  {/* Central Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-sm relative">
                    <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search fruits, vegetables, grains, spices..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full bg-stone-100/90 border border-stone-300 rounded-full pl-10 pr-4 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all shadow-inner"
                    />
                  </form>
                  
                  {/* Messages Trigger */}
                  <button
                    onClick={() => navigateTo('messages')}
                    className={`relative p-2.5 rounded-2xl transition-all hover:scale-105 hidden sm:block ${
                      currentView === 'messages' ? 'bg-emerald-100 text-emerald-950 font-black' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                    title="Direct Farmer Messages"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-800" />
                  </button>

                  {/* Notifications Trigger */}
                  <button
                    onClick={() => navigateTo('notifications')}
                    className={`relative p-2.5 rounded-2xl transition-all hover:scale-105 ${
                      currentView === 'notifications' ? 'bg-emerald-100 text-emerald-950 font-black' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4 text-emerald-800" />
                    {unreadNotifs > 0 && (
                      <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                        {unreadNotifs}
                      </span>
                    )}
                  </button>

                  {/* Cart Trigger */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white hover:from-emerald-700 hover:to-emerald-900 transition-all shadow-md shadow-emerald-900/20 hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-extrabold hidden sm:inline">Cart</span>
                    <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {cartItemCount}
                    </span>
                  </button>

                  {/* User Profile Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border border-stone-200 hover:border-emerald-700/50 bg-stone-50 hover:bg-emerald-50/50 transition-all"
                    >
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-7 h-7 rounded-xl object-cover border border-emerald-600" 
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-xl bg-emerald-800 text-amber-300 font-extrabold text-xs flex items-center justify-center shadow-xs">
                          {user.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                      <div className="text-left hidden sm:block">
                        <p className="text-xs font-bold text-stone-900 leading-tight">{user.name ? user.name.split(' ')[0] : 'Account'}</p>
                        <p className="text-[9px] uppercase font-bold text-emerald-700 leading-none">{user.role}</p>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    {userDropdownOpen && (
                      <div 
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                        onMouseLeave={() => setUserDropdownOpen(false)}
                      >
                        <div className="px-3 py-2 border-b border-stone-100 mb-1">
                          <p className="text-xs font-bold text-stone-900">{user.name}</p>
                          <p className="text-[10px] text-stone-500 truncate">{user.email || user.mobile}</p>
                        </div>

                        {user.role === 'farmer' && (
                          <button
                            onClick={() => { navigateTo('farmer-dashboard'); setUserDropdownOpen(false); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors"
                          >
                            <Store className="w-4 h-4 text-emerald-700" />
                            Farmer Dashboard
                          </button>
                        )}

                        {user.role === 'customer' && (
                          <>
                            <button
                              onClick={() => { navigateTo('marketplace'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors"
                            >
                              <ShoppingBag className="w-4 h-4 text-emerald-700" />
                              Browse Marketplace
                            </button>
                            <button
                              onClick={() => { navigateTo('customer-dashboard'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                              My Orders & Wishlist
                            </button>
                          </>
                        )}

                        {user.role === 'admin' && (
                          <>
                            <button
                              onClick={() => { navigateTo('admin-dashboard'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-purple-50 hover:text-purple-900 rounded-xl transition-colors cursor-pointer"
                            >
                              <ShieldCheck className="w-4 h-4 text-purple-700" />
                              Admin Panel
                            </button>
                            <button
                              onClick={() => { navigateTo('admin-users'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-purple-50 hover:text-purple-900 rounded-xl transition-colors cursor-pointer"
                            >
                              <Users className="w-4 h-4 text-blue-700" />
                              User Management
                            </button>
                            <button
                              onClick={() => { navigateTo('admin-login-activity'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-purple-50 hover:text-purple-900 rounded-xl transition-colors cursor-pointer"
                            >
                              <Activity className="w-4 h-4 text-emerald-700" />
                              Login Activity
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1 border-t border-stone-100 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : null}

              {/* Mobile Burger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search fruits, vegetables, spices..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-stone-100 border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900"
              />
            </form>

            <button
              onClick={() => navigateTo('home')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'home' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('marketplace')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'marketplace' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              Marketplace (100+ Products)
            </button>
            <button
              onClick={() => navigateTo('categories')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'categories' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              Browse Categories
            </button>
            <button
              onClick={() => navigateTo('farmers')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'farmers' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              Meet Verified Farmers
            </button>
            <button
              onClick={() => navigateTo('how-it-works')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'how-it-works' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              How It Works
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'about' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              About AgroConnect
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'contact' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'}`}
            >
              Contact & Support
            </button>
            <button
              onClick={() => navigateTo('messages')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'messages' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'} flex items-center justify-between`}
            >
              <span>Messages & Farm Inquiries</span>
              <MessageSquare className="w-4 h-4 text-emerald-800" />
            </button>
            <button
              onClick={() => navigateTo('notifications')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs ${currentView === 'notifications' ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700'} flex items-center justify-between`}
            >
              <span>Notifications & Alerts</span>
              {unreadNotifs > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {unreadNotifs} New
                </span>
              )}
            </button>

            {user ? (
              <div className="pt-2 border-t border-stone-200 mt-2 space-y-1">
                <button
                  onClick={() => navigateTo(user.role === 'farmer' ? 'farmer-dashboard' : user.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard')}
                  className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-900 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Dashboard ({user.name})</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs text-rose-600 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-stone-200 mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="w-full text-center py-2.5 rounded-xl border border-stone-300 font-bold text-xs text-stone-700"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="w-full text-center py-2.5 rounded-xl bg-emerald-800 font-bold text-xs text-white"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
