import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  ArrowLeft, 
  CheckCheck, 
  Trash2, 
  ShoppingBag, 
  MessageSquare, 
  Sparkles, 
  Tag, 
  Clock, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export const NotificationsView = () => {
  const { notifications = [], setNotifications, setCurrentView } = useApp();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'unread' | 'order' | 'message' | 'offer'

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) => 
      prev.map(n => n.id === id ? { ...n, isRead: true, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => 
      prev.map(n => ({ ...n, isRead: true, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'unread') return !n.isRead && !n.read;
    if (filterType === 'order') return n.type === 'order' || (n.title || '').toLowerCase().includes('order');
    if (filterType === 'message') return n.type === 'message' || (n.title || '').toLowerCase().includes('message');
    if (filterType === 'offer') return n.type === 'offer' || (n.title || '').toLowerCase().includes('offer') || (n.title || '').toLowerCase().includes('discount');
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead && !n.read).length;

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>

          <div className="text-xs font-semibold text-stone-500">
            <span>AgroConnect</span> / <span className="text-emerald-800 font-bold">Alerts & Updates</span>
          </div>
        </div>

        {/* Page Title & Stats */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-emerald-800/40">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700/30 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
              <Bell className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-[10px] font-extrabold uppercase tracking-wider">
                Account Activity
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white mt-1">
                Notifications & Alerts
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">
                Stay updated with harvest dispatches, order statuses, direct farmer messages, and special seasonal offers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCheck className="w-4 h-4 text-emerald-300" />
                <span>Mark All Read</span>
              </button>
            )}

            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-rose-500/20 text-stone-300 hover:text-rose-200 font-bold text-xs border border-white/10 transition-all flex items-center gap-1 cursor-pointer"
                title="Clear all notifications"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'all', label: `All Alerts (${notifications.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'order', label: 'Order Updates' },
            { id: 'message', label: 'Farmer Messages' },
            { id: 'offer', label: 'Special Offers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden divide-y divide-stone-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-16 text-center text-stone-400 space-y-3">
              <Bell className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-stone-800 text-base">No notifications in this category</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                You're all caught up! New order updates, direct messages, and harvest announcements will appear here.
              </p>
            </div>
          ) : (
            filteredNotifications.map((n) => {
              const isUnread = !n.isRead && !n.read;
              return (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                    isUnread ? 'bg-emerald-50/50 hover:bg-emerald-50/80' : 'hover:bg-stone-50/70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      n.type === 'order' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      n.type === 'message' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      n.type === 'offer' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {n.type === 'order' && <ShoppingBag className="w-5 h-5" />}
                      {n.type === 'message' && <MessageSquare className="w-5 h-5" />}
                      {n.type === 'offer' && <Tag className="w-5 h-5" />}
                      {!['order', 'message', 'offer'].includes(n.type) && <Sparkles className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold ${isUnread ? 'text-stone-900 font-extrabold' : 'text-stone-700'}`}>
                          {n.title}
                        </h4>
                        {isUnread && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] uppercase">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600 text-xs leading-relaxed font-normal">
                        {n.message}
                      </p>
                      <p className="text-stone-400 text-[10px] font-medium pt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{n.time || n.timestamp || 'Today'}</span>
                      </p>
                    </div>
                  </div>

                  {isUnread && (
                    <button
                      onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                      className="text-emerald-700 hover:text-emerald-900 text-xs font-bold shrink-0 p-1 cursor-pointer"
                      title="Mark as read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
