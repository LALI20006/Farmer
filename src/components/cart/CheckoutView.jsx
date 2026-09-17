import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Receipt,
  Smartphone,
  Building,
  Banknote
} from 'lucide-react';

export const CheckoutView = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartSavings, 
    placeOrder, 
    user,
    setCurrentView 
  } = useApp();

  const [fullName, setFullName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [state, setState] = useState(user?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [paymentOption, setPaymentOption] = useState('upi'); // 'upi', 'credit', 'debit', 'netbanking', 'cod'
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const FREE_THRESHOLD = 500;
  const deliveryCharge = cartSubtotal >= FREE_THRESHOLD ? 0 : 50;
  const discountAmount = Math.round(cartSavings * 0.5);
  const finalTotal = cartSubtotal + deliveryCharge - discountAmount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder({
        deliveryCharge,
        discount: discountAmount,
        total: finalTotal,
        paymentMethod: paymentOption === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentOption.toUpperCase(),
        shippingAddress: {
          name: fullName,
          mobile,
          address,
          city,
          state,
          pincode
        }
      });
      setIsProcessing(false);
      setPlacedOrder(order);
    }, 1000);
  };

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Your shopping cart is empty</h2>
        <button
          onClick={() => setCurrentView('marketplace')}
          className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
        >
          Explore 100+ Products
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 bg-stone-100/60 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {placedOrder ? (
          /* Order Confirmation View */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                Order Confirmed!
              </span>
              <h1 className="text-3xl font-black text-stone-900 font-display mt-2">
                Thank You for Supporting Local Indian Farmers!
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Order Reference ID: <strong className="text-stone-900">{placedOrder.id}</strong>
              </p>
            </div>

            {/* 7-Step Live Order Tracking Stepper */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-left space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>7-Step Visual Order Progress</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-800">Stage 1 of 7: Confirmed</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 pt-2">
                {placedOrder.trackingHistory.map((step) => (
                  <div key={step.step} className="space-y-1">
                    <div className={`h-2 rounded-full ${step.completed ? 'bg-emerald-600' : 'bg-stone-200'}`} />
                    <p className={`text-[10px] font-bold ${step.completed ? 'text-emerald-950' : 'text-stone-400'}`}>
                      {step.step}. {step.title}
                    </p>
                    <p className="text-[9px] text-stone-500">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>₹{(finalTotal * 0.9).toFixed(0)} will be transferred directly to the farmers' bank accounts.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentView('customer-dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>Track in Customer Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('marketplace')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">AgroConnect Checkout</span>
              <h1 className="text-3xl font-black text-stone-900 font-display mt-0.5">
                Delivery Address & Payment
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Details Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Delivery Address Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4 text-xs">
                  <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>1. Delivery Address</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Full Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Options Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4 text-xs">
                  <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <span>2. Select Payment Option</span>
                  </h3>

                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: '⚡ Instant UPI (Google Pay, PhonePe, Paytm, BHIM)', icon: Smartphone },
                      { id: 'credit', label: '💳 Credit Card (Visa, Mastercard, RuPay)', icon: CreditCard },
                      { id: 'debit', label: '🏦 Debit Card (Instant Online OTP)', icon: CreditCard },
                      { id: 'netbanking', label: '🏛️ Net Banking (All Major Indian Banks)', icon: Building },
                      { id: 'cod', label: '💵 Cash on Delivery (Pay upon fresh delivery)', icon: Banknote }
                    ].map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <label
                          key={opt.id}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            paymentOption === opt.id
                              ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 shadow-xs'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentOption === opt.id}
                              onChange={() => setPaymentOption(opt.id)}
                              className="text-emerald-700 focus:ring-emerald-500"
                            />
                            <span>{opt.label}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Order Summary Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4 text-xs sticky top-28">
                  <h3 className="font-extrabold text-stone-900 text-base pb-3 border-b border-stone-100">
                    Order Summary ({cart.length} Harvests)
                  </h3>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between text-stone-600">
                        <span className="truncate max-w-[180px]">
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="font-bold text-stone-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span className="font-bold text-stone-900">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery Charge</span>
                      <span className="font-bold text-stone-900">
                        {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-800 font-bold">
                        <span>Direct Farm Discount</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                      <span>Total Amount</span>
                      <span className="text-emerald-900 font-display">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isProcessing ? 'Processing Order...' : `Place Order • ₹${finalTotal}`}</span>
                  </button>

                  <div className="text-center pt-2 text-[10px] text-stone-400">
                    🔒 256-Bit SSL Encrypted Direct Farm Checkout
                  </div>
                </div>
              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};
