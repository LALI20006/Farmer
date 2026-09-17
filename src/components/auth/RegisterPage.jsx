import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, MapPin, Store, User, Lock, Mail, Phone } from 'lucide-react';

export const RegisterPage = () => {
  const { setCurrentView, registerAccount, addToast } = useApp();

  // Farmer Form State
  const [farmerName, setFarmerName] = useState('');
  const [farmerEmail, setFarmerEmail] = useState('');
  const [farmerMobile, setFarmerMobile] = useState('');
  const [farmerPassword, setFarmerPassword] = useState('');
  const [farmerConfirmPassword, setFarmerConfirmPassword] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmerVillageCity, setFarmerVillageCity] = useState('');
  const [farmerDistrict, setFarmerDistrict] = useState('');
  const [farmerState, setFarmerState] = useState('Maharashtra');

  // Customer Form State
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custMobile, setCustMobile] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [custConfirmPassword, setCustConfirmPassword] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custCity, setCustCity] = useState('');
  const [custState, setCustState] = useState('Maharashtra');
  const [custPincode, setCustPincode] = useState('');

  const indianStates = [
    'Maharashtra', 'Punjab', 'Karnataka', 'Gujarat', 'Madhya Pradesh', 
    'Andhra Pradesh', 'Tamil Nadu', 'Uttar Pradesh', 'Rajasthan', 'Kerala', 
    'Haryana', 'Himachal Pradesh', 'Telangana', 'West Bengal', 'Bihar'
  ];

  // Submit Farmer Registration
  const handleFarmerRegister = (e) => {
    e.preventDefault();

    if (!farmerName.trim() || !farmerMobile.trim() || !farmerPassword.trim()) {
      addToast("Missing Details", "Please fill in all required fields.", "error");
      return;
    }

    if (farmerPassword !== farmerConfirmPassword) {
      addToast("Password Mismatch", "Passwords do not match. Please verify your password.", "error");
      return;
    }

    if (farmerPassword.length < 4) {
      addToast("Weak Password", "Password must be at least 4 characters long.", "error");
      return;
    }

    const newFarmer = {
      id: `farmer-${Date.now()}`,
      name: farmerName.trim(),
      email: farmerEmail.trim().toLowerCase(),
      mobile: farmerMobile.trim(),
      password: farmerPassword,
      role: "farmer",
      farmId: `farm-${Date.now()}`,
      farmName: farmName.trim() || `${farmerName}'s Natural Farm`,
      farmLocation: `${farmerVillageCity.trim() ? farmerVillageCity.trim() + ', ' : ''}${farmerDistrict.trim() ? farmerDistrict.trim() + ', ' : ''}${farmerState}`,
      district: farmerDistrict.trim() || "Nashik",
      state: farmerState,
      villageCity: farmerVillageCity.trim(),
      verifiedBadge: true
    };

    registerAccount(newFarmer);
  };

  // Submit Customer Registration
  const handleCustomerRegister = (e) => {
    e.preventDefault();

    if (!custName.trim() || !custMobile.trim() || !custPassword.trim()) {
      addToast("Missing Details", "Please fill in all required fields.", "error");
      return;
    }

    if (custPassword !== custConfirmPassword) {
      addToast("Password Mismatch", "Passwords do not match. Please verify your password.", "error");
      return;
    }

    if (custPassword.length < 4) {
      addToast("Weak Password", "Password must be at least 4 characters long.", "error");
      return;
    }

    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: custName.trim(),
      email: custEmail.trim().toLowerCase(),
      mobile: custMobile.trim(),
      password: custPassword,
      role: "customer",
      address: custAddress.trim(),
      city: custCity.trim(),
      state: custState,
      pincode: custPincode.trim(),
      savedAddresses: custAddress.trim() ? [
        {
          id: `addr-${Date.now()}`,
          label: "Home Address",
          street: custAddress.trim(),
          city: custCity.trim() || "Pune",
          state: custState,
          pincode: custPincode.trim() || "411001",
          isDefault: true
        }
      ] : []
    };

    registerAccount(newCustomer);
  };

  return (
    <div className="py-12 sm:py-16 bg-stone-100/70 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>Join India's Leading Farm-to-Table Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display tracking-tight">
            Create Your AgroConnect Account
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Select your account type below. Fill in your details to register as a Farmer or a Customer.
          </p>
        </div>

        {/* Two Separate Registration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* CARD 1: CREATE ACCOUNT AS FARMER */}
          <div className="bg-white rounded-[32px] shadow-xl border border-stone-200/90 overflow-hidden flex flex-col transition-all hover:shadow-2xl">
            
            {/* Farmer Card Header */}
            <div className="bg-gradient-to-br from-[#064e3b] via-[#054432] to-[#043d2e] p-6 text-white relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">Seller Account</span>
                  <h2 className="text-xl font-black font-display text-white">Create Account as Farmer</h2>
                  <p className="text-[11px] text-emerald-200 mt-0.5">Sell directly to households with zero broker deductions</p>
                </div>
              </div>
            </div>

            {/* Farmer Registration Form */}
            <form onSubmit={handleFarmerRegister} className="p-6 sm:p-7 space-y-4 text-xs text-left">
              
              {/* Full Name */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Patil"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                />
              </div>

              {/* Email Address & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="farmer@example.com"
                    value={farmerEmail}
                    onChange={(e) => setFarmerEmail(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9823045671"
                    value={farmerMobile}
                    onChange={(e) => setFarmerMobile(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 4 characters"
                    value={farmerPassword}
                    onChange={(e) => setFarmerPassword(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={farmerConfirmPassword}
                    onChange={(e) => setFarmerConfirmPassword(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Farm Name */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Farm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sahyadri Organic Orchards"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                />
              </div>

              {/* Village / City, District, State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Village / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Dindori"
                    value={farmerVillageCity}
                    onChange={(e) => setFarmerVillageCity(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">District</label>
                  <input
                    type="text"
                    placeholder="e.g. Nashik"
                    value={farmerDistrict}
                    onChange={(e) => setFarmerDistrict(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">State</label>
                  <select
                    value={farmerState}
                    onChange={(e) => setFarmerState(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-3 py-3.5 px-4 rounded-2xl bg-[#064e3b] hover:bg-[#053f30] active:scale-[0.99] text-white font-bold text-sm shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Farmer Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>

          {/* CARD 2: CREATE ACCOUNT AS CUSTOMER */}
          <div className="bg-white rounded-[32px] shadow-xl border border-stone-200/90 overflow-hidden flex flex-col transition-all hover:shadow-2xl">
            
            {/* Customer Card Header */}
            <div className="bg-gradient-to-br from-[#065f46] via-[#047857] to-[#064e3b] p-6 text-white relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 text-white border border-white/30 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-200">Buyer Account</span>
                  <h2 className="text-xl font-black font-display text-white">Create Account as Customer</h2>
                  <p className="text-[11px] text-emerald-100 mt-0.5">Order 100% farm-traceable harvest delivered directly to your doorstep</p>
                </div>
              </div>
            </div>

            {/* Customer Registration Form */}
            <form onSubmit={handleCustomerRegister} className="p-6 sm:p-7 space-y-4 text-xs text-left">
              
              {/* Full Name */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                />
              </div>

              {/* Email Address & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9819012345"
                    value={custMobile}
                    onChange={(e) => setCustMobile(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 4 characters"
                    value={custPassword}
                    onChange={(e) => setCustPassword(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={custConfirmPassword}
                    onChange={(e) => setCustConfirmPassword(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Flat No, Building Name, Street / Area"
                  value={custAddress}
                  onChange={(e) => setCustAddress(e.target.value)}
                  className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                />
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune"
                    value={custCity}
                    onChange={(e) => setCustCity(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">State</label>
                  <select
                    value={custState}
                    onChange={(e) => setCustState(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 font-medium"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Pincode</label>
                  <input
                    type="text"
                    placeholder="e.g. 411001"
                    value={custPincode}
                    onChange={(e) => setCustPincode(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-3 py-3.5 px-4 rounded-2xl bg-[#047857] hover:bg-[#065f46] active:scale-[0.99] text-white font-bold text-sm shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Customer Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>

        </div>

        {/* Bottom Switch back to Sign In */}
        <div className="text-center mt-10 text-xs sm:text-sm text-stone-600">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => setCurrentView('signin')}
            className="font-bold text-[#065f46] underline underline-offset-2 hover:text-emerald-950 transition-colors ml-1 cursor-pointer"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};
