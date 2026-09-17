import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageCircle, CheckCircle2, User, Mail, HelpCircle } from 'lucide-react';

export const ContactFarmerModal = () => {
  const { contactFarm, setContactFarm, addToast, user } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [topic, setTopic] = useState('Crop Question / Bulk Order');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!contactFarm) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast(
        "Message Sent to Farmer! ✉️",
        `Marcus & the team at ${contactFarm.name} will reply within 24 hours.`,
        "success"
      );
      setContactFarm(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white relative">
          <button
            onClick={() => setContactFarm(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={contactFarm.avatar}
              alt={contactFarm.owner}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white/60"
            />
            <div>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Direct Message</span>
              <h3 className="text-lg font-bold font-display">{contactFarm.name}</h3>
              <p className="text-xs text-stone-300">Managed by {contactFarm.owner}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Your Email</label>
            <input
              type="email"
              required
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Subject / Inquiry Type</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            >
              <option value="Crop Question / Bulk Order">Crop Freshness & Bulk Order</option>
              <option value="Schedule Farm Tour Visit">Schedule Farm Tour / Visit</option>
              <option value="Restaurant Wholesale Supply">Restaurant / Commercial Wholesale Supply</option>
              <option value="General Growing Practice Question">General Soil & Growing Practice Question</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Your Message</label>
            <textarea
              required
              rows={4}
              placeholder={`Hi ${contactFarm.owner}, I'd love to ask about...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSending ? 'Sending to Farm...' : 'Send Message to Farmer'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
