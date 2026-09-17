import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquare, Sprout, User } from 'lucide-react';

export const MessagingModal = () => {
  const { activeChat, setActiveChat, sendMessage, user } = useApp();
  const [inputText, setInputText] = useState('');

  if (!activeChat) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(activeChat.farmerId, inputText.trim(), user?.name || "Customer");
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 flex flex-col h-[520px] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeChat.farmerAvatar}
              alt={activeChat.farmerName}
              className="w-10 h-10 rounded-xl object-cover border border-amber-400"
            />
            <div>
              <h3 className="font-extrabold text-sm leading-tight">{activeChat.farmerName}</h3>
              <p className="text-[10px] text-emerald-300">Direct Farm Producer • Online</p>
            </div>
          </div>

          <button
            onClick={() => setActiveChat(null)}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
          <div className="text-center py-2">
            <span className="text-[10px] bg-stone-200 text-stone-600 px-3 py-1 rounded-full font-bold">
              Direct AgroConnect Farmer-Buyer Channel
            </span>
          </div>

          {activeChat.messages?.map((m) => {
            const isMe = m.sender === 'customer';
            return (
              <div
                key={m.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`text-[9px] mt-1 block ${isMe ? 'text-emerald-200' : 'text-stone-400'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Question Prompts */}
        <div className="p-2 bg-stone-100 border-t border-stone-200 flex gap-2 overflow-x-auto no-scrollbar text-[10px]">
          <button
            onClick={() => setInputText("Is this batch freshly harvested today?")}
            className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 whitespace-nowrap hover:bg-emerald-50"
          >
            Fresh today?
          </button>
          <button
            onClick={() => setInputText("Can you do bulk discount for 50+ kg?")}
            className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 whitespace-nowrap hover:bg-emerald-50"
          >
            Bulk discount?
          </button>
          <button
            onClick={() => setInputText("What is the pesticide & soil testing certification?")}
            className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 whitespace-nowrap hover:bg-emerald-50"
          >
            Soil certification?
          </button>
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message to farmer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white shadow-md transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
