import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Sprout, 
  DollarSign, 
  Package, 
  FileText, 
  Check, 
  X,
  AlertTriangle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { AgroDatabase } from '../../db/agroDatabase';

export const AdminDashboard = () => {
  const { farmers, products, orders = [], addToast, setCurrentView } = useApp();
  const allUsers = AgroDatabase.getAllUsers();
  const activeSessionsCount = AgroDatabase.getLoginHistory().filter(h => h.login_status === 'Active').length;
  const totalLoginsCount = AgroDatabase.getLoginHistory().length;
  const totalFarmers = allUsers.filter(u => u.role === 'farmer').length;
  const totalCustomers = allUsers.filter(u => u.role === 'customer').length;
  const totalOrders = orders.length;
  const totalGmv = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const [pendingFarms, setPendingFarms] = useState([]);

  const handleApprove = (id, name) => {
    setPendingFarms(prev => prev.filter(f => f.id !== id));
    addToast("Farmer Approved & Verified! 🌟", `${name} is now certified to publish crops on AgroConnect.`, "success");
  };

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/30 border border-purple-400/40 text-purple-300 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/80 text-white text-[10px] font-bold uppercase tracking-wider">
                Platform Governance
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display mt-1">
                AgroConnect National Admin Panel
              </h1>
              <p className="text-xs text-stone-300">Overseeing 980+ verified Indian farms, 100+ harvest crops, and GMV.</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-purple-200">System Status</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              All 18 Cold Hubs Operational
            </p>
          </div>
        </div>

        {/* 5 Admin Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Farmers</span>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{totalFarmers}</p>
            <p className="text-[10px] text-emerald-700 font-bold">In Database</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Customers</span>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{totalCustomers}</p>
            <p className="text-[10px] text-emerald-700 font-bold">Registered</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Products</span>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{products.length}</p>
            <p className="text-[10px] text-stone-500">Across 9 Categories</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Orders</span>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{totalOrders}</p>
            <p className="text-[10px] text-stone-500">Zero Middlemen</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Platform GMV (Revenue)</span>
            <p className="text-2xl sm:text-3xl font-black text-purple-700 font-display">₹{totalGmv.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-emerald-700 font-bold">100% direct to farmers</p>
          </div>
        </div>

        {/* Database Governance Quick Action Panel */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-purple-800/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase">
                  {activeSessionsCount} Active {activeSessionsCount === 1 ? 'Session' : 'Sessions'}
                </span>
                <span className="text-xs text-stone-300">• {allUsers.length} Registered Accounts</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-display text-white mt-1">
                Database Governance: User Accounts & Login Activity
              </h3>
              <p className="text-xs text-stone-300">
                Inspect registered Customer & Farmer accounts, manage active statuses, and audit real-time login and logout timestamps.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('admin-users')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer"
            >
              <Users className="w-4 h-4 text-purple-300" />
              <span>User Management</span>
            </button>

            <button
              onClick={() => setCurrentView('admin-login-activity')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer"
            >
              <span>Login Activity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verification Queue Section */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-700" />
                <span>Farmer Verification & Soil Purity Queue ({pendingFarms.length})</span>
              </h3>
              <p className="text-xs text-stone-500">Review lab certificates, water tests, and GPS land records before granting the Verified Farmer Badge.</p>
            </div>
          </div>

          {pendingFarms.length === 0 ? (
            <div className="text-center py-10 text-stone-500 text-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              All pending farmer verification applications have been reviewed!
            </div>
          ) : (
            <div className="space-y-4">
              {pendingFarms.map((farm) => (
                <div key={farm.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-stone-900 text-sm">{farm.name}</h4>
                      <span className="text-stone-400">• Lead: {farm.applicant}</span>
                    </div>
                    <p className="text-stone-600">{farm.location} • Crops: {farm.crops}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                        ✓ {farm.soilAudit}
                      </span>
                      <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                        💧 {farm.waterTest}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(farm.id, farm.name)}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                    <button
                      onClick={() => addToast("Lab Tests Opened", `Viewing full NABL lab report for ${farm.name}`, "info")}
                      className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-100 transition-colors"
                    >
                      View Lab Tests
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
