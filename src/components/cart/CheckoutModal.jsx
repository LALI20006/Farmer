import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Store, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Receipt
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    placeOrder, 
    user,
    setCurrentView 
  } = useApp();

  const [deliveryType, setDeliveryType] = useState('Farm-to-Doorstep'); // 'Farm-to-Doorstep' | 'Farm-Pickup'
  const [deliverySlot, setDeliverySlot] = useState('Tomorrow Morning (8:00 AM - 12:00 PM)');
  const [fullName, setFullName] = useState(user?.name || 'Maya Patel');
  const [email, setEmail] = useState(user?.email || 'maya.patel@example.com');
  const [address, setAddress] = useState(user?.address || '742 Evergreen Terrace, San Francisco, CA 94107');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const FREE_THRESHOLD = 35.00;
  const shippingFee = deliveryType === 'Farm-Pickup' ? 0 : (cartTotal >= FREE_THRESHOLD ? 0 : 4.50);
  const finalTotal = cartTotal + shippingFee;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        total: finalTotal,
        address: deliveryType === 'Farm-Pickup' ? 'Farm Stand Pickup (Valley Orchard)' : address,
        deliverySlot,
        deliveryType,
        paymentMethod: paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod.toUpperCase()
      });
      setIsProcessing(false);
      setPlacedOrder(order);
    }, 1000);
  };

  const handleCloseAndGoToDashboard = () => {
    setPlacedOrder(null);
    setIsCheckoutOpen(false);
    setCurrentView('buyer-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {placedOrder ? (
          /* Order Confirmation View */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Harvest Order Confirmed!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
                Thank you for supporting local farmers!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Order Reference: <span className="font-bold text-slate-900">{placedOrder.id}</span>
              </p>
            </div>

            {/* Live Tracking Stepper */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Live Harvest & Delivery Tracker</span>
              </h4>

              <div className="space-y-3">
                {placedOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      step.completed ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-slate-400'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <span className={`font-semibold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                      <span className="text-[11px] text-slate-400">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metric */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>You just saved ~{placedOrder.carbonSavedKg} kg CO₂ and sent 90%+ directly to family farms!</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCloseAndGoToDashboard}
                className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>View Order in Buyer Dashboard</span>
              </button>
              <button
                onClick={() => { setPlacedOrder(null); setIsCheckoutOpen(false); setCurrentView('marketplace'); }}
                className="w-full py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
            
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Direct Farm Checkout</span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Delivery & Payment Details
              </h2>
            </div>

            {/* Delivery Mode Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('Farm-to-Doorstep')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  deliveryType === 'Farm-to-Doorstep'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100'
                }`}
              >
                <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold">Eco Van Delivery</div>
                  <div className="text-[10px] text-slate-500 font-normal">To your doorstep</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('Farm-Pickup')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  deliveryType === 'Farm-Pickup'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100'
                }`}
              >
                <Store className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold">Farm Stand Pickup</div>
                  <div className="text-[10px] text-slate-500 font-normal">Free local pickup</div>
                </div>
              </button>
            </div>

            {/* Contact & Address Inputs */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Receipt</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {deliveryType === 'Farm-to-Doorstep' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Preferred Harvest Slot</label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Tomorrow Morning (8:00 AM - 12:00 PM)">Tomorrow Morning (8:00 AM - 12:00 PM) - Freshest</option>
                  <option value="Tomorrow Afternoon (1:00 PM - 5:00 PM)">Tomorrow Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Weekend Special Harvest (Saturday 9:00 AM)">Weekend Special Harvest (Saturday 9:00 AM)</option>
                </select>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: '💳 Credit / Debit' },
                  { id: 'apple', label: ' Apple Pay' },
                  { id: 'cod', label: '💵 Cash / UPI' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === m.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items ({cart.length})</span>
                <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-bold text-emerald-700">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-emerald-800 text-base font-display">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-xl shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isProcessing ? 'Processing Secure Order...' : `Authorize & Place Order • $${finalTotal.toFixed(2)}`}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
