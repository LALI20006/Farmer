import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  MapPin, 
  Leaf, 
  Sparkles 
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartSubtotal, 
    cartItemCount, 
    cartSavings,
    removeFromCart, 
    updateCartQty, 
    setCurrentView 
  } = useApp();

  if (!isCartOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 500;
  const deliveryCharge = cartSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 50;
  const discountAmount = Math.round(cartSavings * 0.5);
  const finalTotal = cartSubtotal + deliveryCharge - discountAmount;
  const amountNeeded = Math.max(0, FREE_DELIVERY_THRESHOLD - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">Your Shopping Cart</h3>
                <p className="text-[11px] text-stone-500 font-medium">{cartItemCount} fresh harvest items</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-950 mb-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  {amountNeeded === 0 ? "Unlocked Free Delivery! 🚚" : `Add ₹${amountNeeded} more for Free Delivery`}
                </span>
                <span className="text-[11px] text-emerald-800">{deliveryProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-emerald-200/70 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                  style={{ width: `${deliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-stone-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore over 100+ fresh agricultural products from verified farmers and add them to your cart.
                </p>
                <button
                  onClick={() => { setIsCartOpen(false); setCurrentView('marketplace'); }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all"
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-stone-500">
                      ₹{item.product.price} / {item.product.unit.split(' ')[0]} • <span className="text-emerald-800 font-semibold">{item.product.farmerName}</span>
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-stone-200 bg-white rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQty(item.product.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-stone-900 ml-auto">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-stone-900">
                    {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryCharge}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-bold">
                    <span>Special Farm Discount</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Final Total</span>
                  <span className="text-emerald-900 text-base font-display">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
