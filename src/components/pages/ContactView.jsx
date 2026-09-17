import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AgroDatabase } from '../../db/agroDatabase';
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Send, 
  Headphones, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-react';

export const ContactView = () => {
  const { addToast, setCurrentView } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guarantee view starts at top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !mobileNumber.trim() || !message.trim()) {
      addToast("Missing Fields", "Please complete all required fields.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Store message in real database
      AgroDatabase.saveContactMessage({
        name: fullName,
        email,
        mobile: mobileNumber,
        subject: subject || "General Inquiry",
        message
      });

      // 2. Set success state & toast
      setSubmittedSuccess(true);
      addToast(
        "Message Received! 📨", 
        "Thank you! Your message has been received. We will contact you soon.", 
        "success"
      );

      // 3. Clear form inputs
      setFullName('');
      setEmail('');
      setMobileNumber('');
      setSubject('');
      setMessage('');
    } catch (err) {
      addToast("Submission Error", "Failed to save message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-emerald-900 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>

          <div className="text-xs font-semibold text-stone-500">
            <span>AgroConnect</span> / <span className="text-emerald-800 font-bold">Contact Support</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5 text-emerald-700" />
            <span>24/7 Dedicated Agriculture Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Have questions about ordering, cold-hub deliveries, or registering your farm? Our dedicated support team is ready to help.
          </p>
        </div>

        {/* Two Column Layout: Support Info + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Support Information Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-[32px] p-8 sm:p-10 shadow-xl space-y-8 border border-emerald-800/40 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                  Customer Support Information
                </span>
                <h2 className="text-2xl font-black font-display text-white mt-1">
                  We're Here for You
                </h2>
                <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                  Connect directly with our dedicated agri-desk for assistance with orders, farm testing, or seller registration.
                </p>
              </div>

              {/* Support Details */}
              <div className="space-y-5 text-xs">
                
                {/* Support Phone Number */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Support Phone Number</p>
                    <p className="text-emerald-300 font-mono mt-0.5 font-bold text-xs">+91 1800-AGRO-CONNECT</p>
                    <p className="text-[10px] text-stone-400 font-medium">Toll-Free Customer Care</p>
                  </div>
                </div>

                {/* Support Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Support Email</p>
                    <p className="text-emerald-300 font-mono mt-0.5 font-bold text-xs">support@agroconnect.in</p>
                    <p className="text-[10px] text-stone-400 font-medium">Guaranteed response within 24 hours</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Business Hours</p>
                    <p className="text-stone-300 mt-0.5 font-medium">Monday to Saturday: 7:00 AM – 9:00 PM IST</p>
                    <p className="text-stone-400 text-[10px]">Sunday: 8:00 AM – 2:00 PM IST (Harvest Dispatches)</p>
                  </div>
                </div>

                {/* Physical Hubs */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Regional Cold Hubs</p>
                    <p className="text-stone-300 mt-0.5 font-medium">Nashik Agri-Tech Hub, Maharashtra</p>
                    <p className="text-stone-300 font-medium">Guntur Spice Exchange Hub, Andhra Pradesh</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-emerald-200 space-y-1">
              <p className="font-bold text-white">Direct Farm Assistance Guarantee</p>
              <p className="text-stone-300">All submitted inquiries are tracked directly in our database and routed to our regional field managers.</p>
            </div>
          </div>

          {/* Contact Us Form */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-10 border border-stone-200 shadow-xl space-y-6">
            
            <div>
              <h2 className="text-2xl font-black text-stone-900 font-display">
                Send Us a Message
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            {/* Success Message Alert */}
            {submittedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-black text-sm text-emerald-950">
                    Thank you! Your message has been received. We will contact you soon.
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    Our team will contact you via email or mobile number within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 font-medium"
                />
              </div>

              {/* Email Address & Mobile Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 font-medium"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Bulk Order / Farmer Registration Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 font-medium"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our agriculture support team assist you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 font-medium resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/10 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>{isSubmitting ? "Submitting..." : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
