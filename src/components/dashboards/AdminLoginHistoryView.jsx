import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AgroDatabase } from '../../db/agroDatabase';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  Search, 
  Filter, 
  Activity, 
  LogOut, 
  UserCheck, 
  RefreshCw,
  Database,
  Calendar,
  Phone,
  Mail,
  Shield
} from 'lucide-react';

export const AdminLoginHistoryView = () => {
  const { setCurrentView, user } = useApp();

  const [historyList, setHistoryList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'users'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Active' | 'Logged Out'
  const [roleFilter, setRoleFilter] = useState('all'); // 'all' | 'customer' | 'farmer' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const loadData = () => {
    const history = AgroDatabase.getLoginHistory();
    const users = AgroDatabase.getAllUsers();
    setHistoryList(history);
    setUsersList(users);
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Auto-refresh every 5s for live tracking
    return () => clearInterval(interval);
  }, []);

  // Filter History Records
  const filteredHistory = historyList.filter((item) => {
    if (statusFilter !== 'all' && item.login_status !== statusFilter) return false;
    if (roleFilter !== 'all' && item.user_role !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.full_name || '').toLowerCase().includes(q);
      const matchEmail = (item.email || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    return true;
  });

  // Filter Registered Users
  const filteredUsers = usersList.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (u.name || '').toLowerCase().includes(q);
      const matchEmail = (u.email || '').toLowerCase().includes(q);
      const matchMobile = (u.mobile || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchMobile) return false;
    }
    return true;
  });

  const activeSessionsCount = historyList.filter(h => h.login_status === 'Active').length;

  return (
    <div className="py-8 bg-stone-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Breadcrumb & Return to Dashboard */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('admin-dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Dashboard</span>
          </button>

          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            title="Refresh login records"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
            <span>Live Sync ({lastRefreshed.toLocaleTimeString()})</span>
          </button>
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
                  Security & Audit
                </span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Real-Time Monitoring
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight mt-1 text-white">
                User Login Activity & Session Tracker
              </h1>
              <p className="text-xs text-stone-300 mt-1 max-w-xl">
                Cryptographically secure database tracking of all user sign-ins, active authenticated sessions, and logout events across Customers, Farmers, and Admins.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Currently Active Users</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-display mt-0.5 flex items-center gap-2">
                <span>{activeSessionsCount}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">Online</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Logins Logged</span>
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-0.5">
                {historyList.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Registered Accounts DB</span>
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-0.5">
                {usersList.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Switcher & Filter Controls */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            {/* View Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                Login History Activity ({historyList.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'users'
                    ? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                Registered Users Database ({usersList.length})
              </button>
            </div>

            {/* Status Quick Filters (For History) */}
            {activeTab === 'history' && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-stone-400 font-bold text-[11px] mr-1">Status:</span>
                {['all', 'Active', 'Logged Out'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st === 'all' ? 'All' : st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search and Role Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder={activeTab === 'history' ? "Search by user name or email..." : "Search by name, email, or mobile..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-700/30 focus:border-purple-700 transition-all font-medium"
              />
            </div>

            {/* Role Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 text-xs font-bold whitespace-nowrap">Filter Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-bold focus:outline-none focus:ring-2 focus:ring-purple-700/30"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

          </div>

        </div>

        {/* TAB 1: LOGIN HISTORY TABLE */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                {/* Table Header */}
                <thead className="bg-stone-50 text-stone-600 font-extrabold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">User Name</th>
                    <th className="py-4 px-6">Email / Mobile</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Login Time</th>
                    <th className="py-4 px-6">Logout Time</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-stone-100 font-medium">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-stone-400">
                        No login activity records found matching the current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                        
                        {/* User Name */}
                        <td className="py-4 px-6 font-bold text-stone-900 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 font-black text-[11px] flex items-center justify-center">
                              {item.full_name ? item.full_name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span>{item.full_name}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6 text-stone-600 font-mono text-[11px] whitespace-nowrap">
                          {item.email}
                        </td>

                        {/* Role */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          {item.user_role === 'admin' && (
                            <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 font-extrabold text-[10px] uppercase border border-purple-200">
                              Admin
                            </span>
                          )}
                          {item.user_role === 'farmer' && (
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[10px] uppercase border border-emerald-200">
                              Farmer
                            </span>
                          )}
                          {item.user_role === 'customer' && (
                            <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-[10px] uppercase border border-blue-200">
                              Customer
                            </span>
                          )}
                        </td>

                        {/* Login Time */}
                        <td className="py-4 px-6 text-stone-700 whitespace-nowrap">
                          <span className="font-semibold">{item.login_time}</span>
                        </td>

                        {/* Logout Time */}
                        <td className="py-4 px-6 text-stone-500 whitespace-nowrap">
                          {item.logout_time ? (
                            <span className="font-semibold text-stone-700">{item.logout_time}</span>
                          ) : (
                            <span className="text-emerald-700 font-bold italic">— (Session Active)</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6 text-center whitespace-nowrap">
                          {item.login_status === 'Active' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-[11px] border border-emerald-200 shadow-xs">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-bold text-[11px] border border-stone-200">
                              <span>Logged Out</span>
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
        )}

        {/* TAB 2: REGISTERED USERS DATABASE DIRECTORY */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                <thead className="bg-stone-50 text-stone-600 font-extrabold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">User ID & Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Mobile Number</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Registered Date</th>
                    <th className="py-4 px-6">Last Login</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100 font-medium">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-stone-400">
                        No registered users found matching the query.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50/80 transition-colors">
                        
                        <td className="py-4 px-6">
                          <p className="font-bold text-stone-900">{u.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono">{u.id}</p>
                        </td>

                        <td className="py-4 px-6 text-stone-700 font-mono text-[11px]">
                          {u.email || '—'}
                        </td>

                        <td className="py-4 px-6 text-stone-700 font-mono text-[11px]">
                          {u.mobile || '—'}
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] uppercase border ${
                            u.role === 'farmer' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                            u.role === 'admin' ? 'bg-purple-100 text-purple-900 border-purple-200' :
                            'bg-blue-100 text-blue-900 border-blue-200'
                          }`}>
                            {u.role}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-stone-600">
                          {u.city ? `${u.city}, ${u.state || ''}` : (u.state || 'India')}
                        </td>

                        <td className="py-4 px-6 text-stone-500 text-[11px] whitespace-nowrap">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>

                        <td className="py-4 px-6 text-stone-500 text-[11px] whitespace-nowrap">
                          {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never'}
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
