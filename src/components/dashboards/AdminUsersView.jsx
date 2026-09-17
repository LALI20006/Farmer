import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AgroDatabase, formatReadableDateTime } from '../../db/agroDatabase';
import { 
  Users, 
  ArrowLeft, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Shield, 
  Sprout, 
  ShoppingBag, 
  RefreshCw, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Eye, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const AdminUsersView = () => {
  const { setCurrentView, user: currentAdmin, addToast } = useApp();

  const [usersList, setUsersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all' | 'Customer' | 'Farmer' | 'Admin'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserFarm, setSelectedUserFarm] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const loadUsers = () => {
    const list = AgroDatabase.getAllUsers();
    setUsersList(list);
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleStatus = (targetUser) => {
    if (targetUser.id === currentAdmin?.id) {
      addToast("Action Blocked", "You cannot deactivate your own administrative account.", "error");
      return;
    }

    try {
      const updated = AgroDatabase.toggleUserStatus(targetUser.id);
      loadUsers();
      const statusText = updated.is_active ? "activated" : "deactivated";
      addToast(
        `Account ${statusText.toUpperCase()}`,
        `User ${targetUser.fullName} has been ${statusText}.`,
        updated.is_active ? "success" : "info"
      );
      if (selectedUser?.id === targetUser.id) {
        setSelectedUser(prev => ({ ...prev, isActive: updated.is_active }));
      }
    } catch (err) {
      addToast("Error", err.message, "error");
    }
  };

  const handleViewDetails = (u) => {
    setSelectedUser(u);
    if (u.role === 'Farmer') {
      const farm = AgroDatabase.getFarmerProfile(u.id);
      setSelectedUserFarm(farm);
    } else {
      setSelectedUserFarm(null);
    }
  };

  // Filtering
  const filteredUsers = usersList.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter === 'active' && !u.isActive) return false;
    if (statusFilter === 'inactive' && u.isActive) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (u.fullName || '').toLowerCase().includes(q);
      const matchEmail = (u.email || '').toLowerCase().includes(q);
      const matchMobile = (u.mobileNumber || '').includes(q);
      if (!matchName && !matchEmail && !matchMobile) return false;
    }
    return true;
  });

  const totalUsers = usersList.length;
  const activeUsers = usersList.filter(u => u.isActive).length;
  const inactiveUsers = usersList.filter(u => !u.isActive).length;
  const farmersCount = usersList.filter(u => u.role === 'Farmer').length;
  const customersCount = usersList.filter(u => u.role === 'Customer').length;

  return (
    <div className="py-8 bg-stone-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Breadcrumb & Controls */}
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
              onClick={() => setCurrentView('admin-login-activity')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-stone-200 text-purple-900 font-bold text-xs hover:bg-purple-50 transition-all cursor-pointer"
            >
              <span>View Login Activity →</span>
            </button>

            <button
              onClick={loadUsers}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-purple-900/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0 shadow-inner">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-200 text-[10px] font-extrabold uppercase tracking-wider">
                Database Governance
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight mt-1 text-white">
                Registered Users Management
              </h1>
              <p className="text-xs text-stone-300 mt-1 max-w-xl">
                Inspect all registered customer, farmer, and admin accounts, track registration dates, last login timestamps, and manage account statuses.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Registered Users</span>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{totalUsers}</p>
            <p className="text-[10px] text-stone-500">{activeUsers} Active • {inactiveUsers} Inactive</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Customer Accounts</span>
            <p className="text-2xl sm:text-3xl font-black text-blue-700 font-display">{customersCount}</p>
            <p className="text-[10px] text-blue-600 font-semibold">Direct Farm Buyers</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Farmer Accounts</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-display">{farmersCount}</p>
            <p className="text-[10px] text-emerald-600 font-semibold">Verified Growers</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">System Status</span>
            <p className="text-2xl sm:text-3xl font-black text-purple-700 font-display">100%</p>
            <p className="text-[10px] text-purple-600 font-semibold">Pass Hashing Active</p>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-700/30 focus:border-purple-700 transition-all font-medium"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3">
            {/* Role Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-xs font-bold whitespace-nowrap">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-bold focus:outline-none focus:ring-2 focus:ring-purple-700/30"
              >
                <option value="all">All Roles</option>
                <option value="Customer">Customer</option>
                <option value="Farmer">Farmer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-xs font-bold whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-bold focus:outline-none focus:ring-2 focus:ring-purple-700/30"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive / Deactivated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              {/* Header */}
              <thead className="bg-stone-50 text-stone-600 font-extrabold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Mobile</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Created Date</th>
                  <th className="py-4 px-6">Last Login</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-stone-100 font-medium">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-stone-400">
                      No registered user accounts found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50/80 transition-colors">
                      
                      {/* Name */}
                      <td className="py-4 px-6 font-bold text-stone-900 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                            u.role === 'Admin' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                            u.role === 'Farmer' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                            'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            {u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">{u.fullName}</p>
                            <p className="text-[10px] text-stone-400 font-mono">{u.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 text-stone-600 font-mono text-[11px] whitespace-nowrap">
                        {u.email || '—'}
                      </td>

                      {/* Mobile */}
                      <td className="py-4 px-6 text-stone-600 font-mono text-[11px] whitespace-nowrap">
                        {u.mobileNumber || '—'}
                      </td>

                      {/* Role */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] uppercase border ${
                          u.role === 'Admin' ? 'bg-purple-100 text-purple-900 border-purple-200' :
                          u.role === 'Farmer' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                          'bg-blue-100 text-blue-900 border-blue-200'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-6 text-stone-600 whitespace-nowrap">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric'
                        }) : '—'}
                      </td>

                      {/* Last Login */}
                      <td className="py-4 px-6 text-stone-700 whitespace-nowrap">
                        {u.lastLoginAt ? formatReadableDateTime(u.lastLoginAt) : (
                          <span className="text-stone-400 italic">Never</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {u.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-[11px] border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 font-extrabold text-[11px] border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>Inactive</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(u)}
                            className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                            title="View Full Profile Details"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </button>

                          {u.id !== currentAdmin?.id && (
                            <button
                              onClick={() => handleToggleStatus(u)}
                              className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer border ${
                                u.isActive
                                  ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                                  : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              }`}
                            >
                              {u.isActive ? (
                                <>
                                  <UserX className="w-3 h-3" />
                                  <span>Deactivate</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3 h-3" />
                                  <span>Activate</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-950 to-slate-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-purple-200 font-bold">
                  {selectedUser.fullName?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedUser.fullName}</h3>
                  <p className="text-xs text-purple-200">Database Record • {selectedUser.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              
              {/* Account Overview Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Account Role</span>
                  <p className="font-extrabold text-stone-900 text-sm">{selectedUser.role}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Status</span>
                  <p className={`font-extrabold text-sm ${selectedUser.isActive ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {selectedUser.isActive ? 'Active' : 'Deactivated'}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Created Date</span>
                  <p className="font-medium text-stone-700">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString('en-IN') : '—'}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Last Login</span>
                  <p className="font-medium text-stone-700">
                    {selectedUser.lastLoginAt ? formatReadableDateTime(selectedUser.lastLoginAt) : 'Never logged in'}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-xs">Contact & Location</h4>
                <div className="space-y-1.5 text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-mono">{selectedUser.email || 'No email registered'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-mono">{selectedUser.mobileNumber || 'No mobile registered'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>
                      {selectedUser.address ? `${selectedUser.address}, ` : ''}
                      {selectedUser.city || ''} {selectedUser.district ? `(${selectedUser.district}), ` : ''}
                      {selectedUser.state || ''} {selectedUser.pincode ? `- ${selectedUser.pincode}` : ''}
                    </span>
                  </p>
                </div>
              </div>

              {/* Farmer Details Table Integration */}
              {selectedUser.role === 'Farmer' && selectedUserFarm && (
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Linked Farmer Profile (`farmer_profiles` table)</span>
                  </h4>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1 text-emerald-950">
                    <p><span className="font-bold">Farm Name:</span> {selectedUserFarm.farm_name}</p>
                    <p><span className="font-bold">Location:</span> {selectedUserFarm.village_or_city}, {selectedUserFarm.district}, {selectedUserFarm.state}</p>
                    <p><span className="font-bold">Produce Category:</span> {selectedUserFarm.farm_category}</p>
                    <p><span className="font-bold">Verification:</span> {selectedUserFarm.verification_status}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>

                {selectedUser.id !== currentAdmin?.id && (
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(selectedUser)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer ${
                      selectedUser.isActive
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {selectedUser.isActive ? "Deactivate Account" : "Activate Account"}
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
