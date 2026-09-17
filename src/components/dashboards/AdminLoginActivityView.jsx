import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AgroDatabase, formatReadableDateTime } from '../../db/agroDatabase';
import { 
  Activity, 
  ArrowLeft, 
  Search, 
  RefreshCw, 
  UserCheck, 
  Clock, 
  LogOut, 
  Users, 
  Shield 
} from 'lucide-react';

export const AdminLoginActivityView = () => {
  const { setCurrentView } = useApp();

  const [activityList, setActivityList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Active' | 'Logged Out' | 'Expired'
  const [roleFilter, setRoleFilter] = useState('all'); // 'all' | 'Customer' | 'Farmer' | 'Admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const loadActivity = () => {
    const records = AgroDatabase.getLoginActivity();
    setActivityList(records);
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    loadActivity();
    const interval = setInterval(loadActivity, 5000); // Live sync every 5s
    return () => clearInterval(interval);
  }, []);

  const filteredActivity = activityList.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (roleFilter !== 'all' && item.role !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.user_name || '').toLowerCase().includes(q);
      const matchEmail = (item.email || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    return true;
  });

  const activeCount = activityList.filter(a => a.status === 'Active').length;
  const loggedOutCount = activityList.filter(a => a.status === 'Logged Out').length;
  const expiredCount = activityList.filter(a => a.status === 'Expired').length;

  return (
    <div className="py-8 bg-stone-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('admin-dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('admin-users')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-stone-200 text-purple-900 font-bold text-xs hover:bg-purple-50 transition-all cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Manage Registered Users →</span>
            </button>

            <button
              onClick={loadActivity}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              title="Refresh login records"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
              <span>Live Sync ({lastRefreshed.toLocaleTimeString()})</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-purple-900/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0 shadow-inner">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-200 text-[10px] font-extrabold uppercase tracking-wider">
                  Real-Time Audit
                </span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Activity Monitoring
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight mt-1 text-white">
                Admin Login Activity (`login_activity`)
              </h1>
              <p className="text-xs text-stone-300 mt-1 max-w-xl">
                Tracks successful sign-in timestamps, logout events, active session tokens, and security audits across Customer, Farmer, and Admin roles without exposing passwords.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Active Sessions</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-display mt-0.5 flex items-center gap-2">
                <span>{activeCount}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">Online</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Activity Events</span>
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-0.5">
                {activityList.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Logged Out / Expired</span>
              <p className="text-2xl sm:text-3xl font-black text-stone-700 font-display mt-0.5">
                {loggedOutCount + expiredCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by user name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-700/30 font-medium"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Status Filter */}
            <div className="flex items-center gap-1">
              <span className="text-stone-400 font-bold text-[11px]">Status:</span>
              {['all', 'Active', 'Logged Out', 'Expired'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st === 'all' ? 'All' : st}
                </button>
              ))}
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200">
              <span className="text-stone-500 font-bold text-[11px]">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 font-bold focus:outline-none focus:ring-2 focus:ring-purple-700/30"
              >
                <option value="all">All Roles</option>
                <option value="Customer">Customer</option>
                <option value="Farmer">Farmer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

        </div>

        {/* Table: User | Role | Login Time | Logout Time | Status */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              {/* Header */}
              <thead className="bg-stone-50 text-stone-600 font-extrabold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Login Time</th>
                  <th className="py-4 px-6">Logout Time</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-stone-100 font-medium">
                {filteredActivity.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-stone-400">
                      No login activity records found matching the query.
                    </td>
                  </tr>
                ) : (
                  filteredActivity.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                      
                      {/* User (Name + Email) */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                            item.role === 'Admin' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                            item.role === 'Farmer' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                            'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            {item.user_name ? item.user_name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-stone-900 text-xs">{item.user_name}</p>
                            <p className="text-[11px] text-stone-500 font-mono">{item.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] uppercase border ${
                          item.role === 'Admin' ? 'bg-purple-100 text-purple-900 border-purple-200' :
                          item.role === 'Farmer' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                          'bg-blue-100 text-blue-900 border-blue-200'
                        }`}>
                          {item.role || 'Customer'}
                        </span>
                      </td>

                      {/* Login Time */}
                      <td className="py-4 px-6 text-stone-700 whitespace-nowrap">
                        <span className="font-semibold">{formatReadableDateTime(item.login_at)}</span>
                      </td>

                      {/* Logout Time */}
                      <td className="py-4 px-6 text-stone-600 whitespace-nowrap">
                        {item.logout_at ? (
                          <span className="font-semibold">{formatReadableDateTime(item.logout_at)}</span>
                        ) : (
                          <span className="text-emerald-700 font-bold italic">— (Session Active)</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {item.status === 'Active' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-[11px] border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Active</span>
                          </span>
                        )}
                        {item.status === 'Logged Out' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-bold text-[11px] border border-stone-200">
                            <span>Logged Out</span>
                          </span>
                        )}
                        {item.status === 'Expired' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-[11px] border border-amber-200">
                            <span>Expired</span>
                          </span>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
