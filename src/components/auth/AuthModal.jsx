import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Sprout, 
  ShieldCheck, 
  ShoppingBag, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, addToast } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('buyer'); // 'buyer' | 'farmer'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [farmName, setFarmName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    const userData = {
      id: `user-${Date.now()}`,
      name: name || (role === 'farmer' ? 'Organic Grower' : 'Farm Enthusiast'),
      email,
      role,
      farmName: role === 'farmer' ? (farmName || "Green Acres Organic Farm") : undefined,
      avatar: role === 'farmer' 
        ? "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=300&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    };

    login(userData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">AgroConnect Portal</span>
          </div>

          <h3 className="text-xl font-extrabold font-display">
            {isRegister ? 'Join the Farm Community' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isRegister ? 'Create an account as a conscious buyer or producer.' : 'Sign in to manage orders, farm box, or crop inventory.'}
          </p>
        </div>

        {/* Custom Auth Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Account Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`py-2 px-3 rounded-xl border font-bold transition-all text-center ${
                    role === 'buyer' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-stone-50 text-slate-700 border-stone-200'
                  }`}
                >
                  Consumer / Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`py-2 px-3 rounded-xl border font-bold transition-all text-center ${
                    role === 'farmer' ? 'bg-amber-600 text-white border-amber-600' : 'bg-stone-50 text-slate-700 border-stone-200'
                  }`}
                >
                  Farmer / Producer
                </button>
              </div>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}

          {isRegister && role === 'farmer' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Farm / Orchard Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sunburst Organic Orchard"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{isRegister ? 'Create AgroConnect Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-slate-500 hover:text-emerald-700 font-semibold text-[11px]"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one free"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
