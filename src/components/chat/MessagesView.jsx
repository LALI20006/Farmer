import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Search, 
  User, 
  Sprout, 
  ArrowLeft, 
  Check, 
  CheckCheck, 
  Clock 
} from 'lucide-react';

export const MessagesView = () => {
  const { messages, activeChat, setActiveChat, sendMessage, user, farmers, setCurrentView } = useApp();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Default to first chat if available
  useEffect(() => {
    if (!activeChat && messages.length > 0) {
      setActiveChat(messages[0]);
    }
  }, [messages, activeChat, setActiveChat]);

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    sendMessage(activeChat.farmerId, inputText.trim(), user?.name || "Customer");
    setInputText('');
  };

  const filteredConversations = (messages || []).filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (c.farmerName || '').toLowerCase().includes(q) || (c.lastMessage || '').toLowerCase().includes(q);
  });

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

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
            <span>AgroConnect</span> / <span className="text-emerald-800 font-bold">Direct Messaging Channel</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-[32px] p-6 sm:p-8 shadow-xl flex items-center justify-between border border-emerald-800/40">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700/30 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-[10px] font-extrabold uppercase tracking-wider">
                Direct Farm Gate Communications
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white mt-1">
                Messages & Farm Inquiries
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">
                Chat directly with verified Indian growers, check seasonal harvest timelines, and discuss custom orders with zero middlemen.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Layout: Left List + Right Conversation */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* Left: Conversation List */}
          <div className="md:col-span-4 border-r border-stone-200 flex flex-col bg-stone-50/50">
            
            {/* Search Box */}
            <div className="p-4 border-b border-stone-200 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-stone-400 space-y-3">
                  <MessageSquare className="w-8 h-8 mx-auto text-stone-300" />
                  <p className="text-xs font-semibold">No conversations yet.</p>
                  <button
                    onClick={() => setCurrentView('farmers')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
                  >
                    Browse Farmers to Message
                  </button>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isSelected = activeChat?.farmerId === conv.farmerId;
                  return (
                    <div
                      key={conv.farmerId}
                      onClick={() => setActiveChat(conv)}
                      className={`p-4 flex items-center gap-3.5 cursor-pointer transition-colors ${
                        isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'hover:bg-stone-100/70'
                      }`}
                    >
                      <img
                        src={conv.farmerAvatar}
                        alt={conv.farmerName}
                        className="w-11 h-11 rounded-2xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-stone-900 text-xs truncate">{conv.farmerName}</h4>
                          <span className="text-[10px] text-stone-400 font-medium">Active</span>
                        </div>
                        <p className="text-stone-500 text-[11px] truncate mt-0.5">{conv.lastMessage || 'Start conversation...'}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right: Message Area */}
          <div className="md:col-span-8 flex flex-col bg-white">
            {activeChat ? (
              <>
                {/* Chat Top Banner */}
                <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeChat.farmerAvatar}
                      alt={activeChat.farmerName}
                      className="w-10 h-10 rounded-2xl object-cover border border-emerald-600 shadow-xs"
                    />
                    <div>
                      <h3 className="font-extrabold text-stone-900 text-sm">{activeChat.farmerName}</h3>
                      <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Verified Farmer • Direct AgroConnect Channel</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('farmers')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 shadow-xs transition-all"
                  >
                    View Farm Profile
                  </button>
                </div>

                {/* Messages Thread */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/40">
                  <div className="text-center py-2">
                    <span className="text-[10px] bg-stone-200/80 text-stone-600 px-3 py-1 rounded-full font-bold">
                      Direct Farm-Gate Conversation Started
                    </span>
                  </div>

                  {activeChat.messages?.map((m) => {
                    const isMe = m.sender === 'customer' || m.sender === (user?.name || "Customer");
                    return (
                      <div
                        key={m.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-md p-3.5 rounded-2xl shadow-xs space-y-1 ${
                          isMe 
                            ? 'bg-emerald-800 text-white rounded-br-none' 
                            : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none'
                        }`}>
                          <p className="text-xs leading-relaxed font-medium">{m.text}</p>
                          <div className={`flex items-center justify-end gap-1 text-[9px] ${
                            isMe ? 'text-emerald-200' : 'text-stone-400'
                          }`}>
                            <span>{m.timestamp || 'Just now'}</span>
                            {isMe && <CheckCheck className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Send Input Bar */}
                <form onSubmit={handleSend} className="p-4 border-t border-stone-200 flex items-center gap-2 bg-white">
                  <input
                    type="text"
                    placeholder={`Write a message to ${activeChat.farmerName}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <MessageSquare className="w-12 h-12 text-stone-300" />
                <h3 className="font-bold text-stone-800 text-base">Select a conversation to begin</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Choose a farmer from the left panel or visit the Farmers directory to message any grower.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
