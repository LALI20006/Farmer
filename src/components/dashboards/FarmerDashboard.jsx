import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  PlusCircle, 
  DollarSign, 
  PackageCheck, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Edit,
  Trash2,
  Image as ImageIcon,
  MessageSquare,
  Bell,
  Settings,
  Wallet,
  Building,
  UserCheck
} from 'lucide-react';

export const FarmerDashboard = () => {
  const { 
    user, 
    products, 
    addFarmerProduct, 
    updateProductStock, 
    orders, 
    setOrders, 
    addToast,
    messages,
    setActiveChat
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'add-product', 'orders', 'earnings', 'messages', 'settings'
  
  // Add Product Form State
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('vegetables');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDiscount, setProdDiscount] = useState('10');
  const [prodStock, setProdStock] = useState('100');
  const [prodUnit, setProdUnit] = useState('per kg');
  const [prodMoq, setProdMoq] = useState('2 kg');
  const [prodLocation, setProdLocation] = useState(user?.farmLocation || 'Nashik, Maharashtra');
  const [prodHarvestDate, setProdHarvestDate] = useState('Harvested Today');
  const [prodIsOrganic, setProdIsOrganic] = useState(true);
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80');
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80');

  const myFarmId = user?.farmId || 'farmer-1';
  const myProducts = products.filter(p => p.farmId === myFarmId);

  const totalSalesAmount = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.statusText !== 'Delivered');
  const completedOrders = orders.filter(o => o.statusText === 'Delivered');

  const handlePublishProduct = (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;

    addFarmerProduct({
      name: prodName,
      farmId: myFarmId,
      farmerName: user?.name || "Rameshwar Patil",
      farmerLocation: prodLocation,
      category: prodCategory,
      price: parseFloat(prodPrice),
      discount: parseInt(prodDiscount) || 0,
      unit: prodUnit,
      stock: parseInt(prodStock) || 50,
      moq: prodMoq,
      harvestDate: prodHarvestDate,
      image: prodImage,
      description: prodDesc || "Freshly harvested from organic soil using zero chemical pesticides.",
      certifications: prodIsOrganic ? ["100% NPOP Organic", "Zero Chemical Spray"] : ["FSSAI Food Grade"],
      isOrganic: prodIsOrganic,
      isFeatured: true,
      seasonalBadge: "New Harvest"
    });

    // Reset Form
    setProdName('');
    setProdPrice('');
    setProdDesc('');
    setActiveTab('products');
  };

  const handleUpdateOrderStatus = (orderId, newStatusText, newStepIndex) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          statusText: newStatusText,
          statusIndex: newStepIndex,
          trackingHistory: order.trackingHistory.map(step => {
            if (step.step <= newStepIndex) return { ...step, completed: true };
            return step;
          })
        };
      }
      return order;
    }));
    addToast("Order Status Updated!", `Order #${orderId} marked as "${newStatusText}"`, "success");
  };

  return (
    <div className="py-8 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Farmer Portal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
              alt="Farmer avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/60 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                  Farmer Producer Portal
                </span>
                <span className="text-xs text-emerald-300 font-semibold">Verified Seller ID #829</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display">
                {user?.farmName || "Sahyadri Organic Orchards"}
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">Managed by {user?.name || "Rameshwar Patil"} • {user?.farmLocation || "Nashik, Maharashtra"}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('add-product')}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish New Product</span>
          </button>
        </div>

        {/* 5 Stats KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Products</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{myProducts.length}</span>
              <span className="text-xs font-bold text-emerald-700">Active</span>
            </div>
            <p className="text-[10px] text-stone-500">Live on Marketplace</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Orders</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{orders.length + 18}</span>
            </div>
            <p className="text-[10px] text-emerald-700 font-bold">+12% this month</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Sales (₹)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-800 font-display">₹{totalSalesAmount + 42500}</span>
            </div>
            <p className="text-[10px] text-stone-500">Direct to bank account</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pending Orders</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-display">{pendingOrders.length}</span>
            </div>
            <p className="text-[10px] text-stone-500">To pack & dispatch</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Completed Orders</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-stone-900 font-display">{completedOrders.length + 18}</span>
            </div>
            <p className="text-[10px] text-emerald-700 font-bold">100% Fulfilled</p>
          </div>
        </div>

        {/* Dashboard Menu Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
            { id: 'products', label: `My Products (${myProducts.length})`, icon: Sprout },
            { id: 'add-product', label: '+ Add Product', icon: PlusCircle },
            { id: 'orders', label: `Orders & Fulfillment (${orders.length})`, icon: PackageCheck },
            { id: 'earnings', label: 'Earnings & Payouts', icon: Wallet },
            { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-extrabold text-stone-900 text-base">Recent Order Activity</h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-emerald-800 hover:underline">
                  View All Orders →
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 2).map((order) => (
                  <div key={order.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">Order #{order.id}</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {order.statusText}
                        </span>
                      </div>
                      <p className="text-stone-500 mt-1">
                        {order.items.length} items • Destination: {order.shippingAddress?.city || 'Pune'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-stone-900 text-sm">₹{order.total}</span>
                      <p className="text-[10px] text-stone-400">{order.paymentMethod}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-stone-900 text-base">Farmer Quick Actions</h3>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setActiveTab('add-product')}
                  className="w-full p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-left transition-colors flex items-center justify-between"
                >
                  <span>+ List New Harvest Crop</span>
                  <PlusCircle className="w-4 h-4 text-emerald-700" />
                </button>
                <button
                  onClick={() => setActiveTab('earnings')}
                  className="w-full p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-left transition-colors flex items-center justify-between"
                >
                  <span>Check Bank Payout Status</span>
                  <Wallet className="w-4 h-4 text-stone-500" />
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="w-full p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-left transition-colors flex items-center justify-between"
                >
                  <span>Respond to Customer Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-stone-500" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY PRODUCTS */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">Your Active Crop Catalog ({myProducts.length})</h3>
                <p className="text-xs text-stone-500">Update stock quantities, prices, and harvest availability in real time.</p>
              </div>
              <button
                onClick={() => setActiveTab('add-product')}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
              >
                + Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-50 text-stone-800 uppercase font-bold border-b border-stone-100">
                  <tr>
                    <th className="px-6 py-3.5">Product</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Price</th>
                    <th className="px-6 py-3.5">Stock</th>
                    <th className="px-6 py-3.5">Min. Order</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Stock Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {myProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-stone-900">{p.name}</p>
                          <p className="text-[10px] text-stone-400">{p.unit}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize font-semibold">{p.category}</td>
                      <td className="px-6 py-4 font-black text-stone-900">₹{p.price}</td>
                      <td className="px-6 py-4">
                        <span className={`font-bold px-2 py-0.5 rounded-full ${p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{p.moq || '1 Unit'}</td>
                      <td className="px-6 py-4">
                        <span className="text-emerald-700 font-bold">{p.harvestDate}</span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => updateProductStock(p.id, p.stock + 10)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 font-bold"
                        >
                          +10 Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADD PRODUCT FORM */}
        {activeTab === 'add-product' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Direct Marketplace Listing</span>
              <h2 className="text-2xl font-black text-stone-900 font-display mt-0.5">Publish New Agricultural Product</h2>
              <p className="text-xs text-stone-500">Provide accurate crop specifications and upload image URLs for instant listing.</p>
            </div>

            <form onSubmit={handlePublishProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Devgad Alphonso Mangoes Grade-A"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Product Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value="vegetables">Fresh Vegetables</option>
                    <option value="fruits">Fresh Fruits</option>
                    <option value="grains">Grains & Cereals</option>
                    <option value="pulses">Pulses & Lentils</option>
                    <option value="spices">Spices & Herbs</option>
                    <option value="organic">Organic Products</option>
                    <option value="seeds">Agricultural Seeds</option>
                    <option value="dairy">Dairy & Eggs</option>
                    <option value="supplies">Farm Supplies & Tools</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Selling Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Selling Unit *</label>
                  <input
                    type="text"
                    placeholder="e.g. per kg, per dozen, per 5kg bag"
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Minimum Order (MOQ) *</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 kg, 1 Dozen Peti"
                    value={prodMoq}
                    onChange={(e) => setProdMoq(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Available Quantity (Stock) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 200"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Discount %</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={prodDiscount}
                    onChange={(e) => setProdDiscount(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Harvest Date / Freshness *</label>
                  <input
                    type="text"
                    placeholder="e.g. Harvested Today at Dawn"
                    value={prodHarvestDate}
                    onChange={(e) => setProdHarvestDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe your soil, harvest freshness, taste notes, and storage tips..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Image (Select Preset or Paste URL)</label>
                
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    { label: '🍅 Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
                    { label: '🥔 Potatoes', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80' },
                    { label: '🥭 Mangoes', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80' },
                    { label: '🌾 Basmati Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
                    { label: '🍯 Pure Honey', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
                    { label: '🥛 Desi Ghee', url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80' },
                    { label: '🌶️ Spices', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80' },
                    { label: '🌱 Seeds', url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80' }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => { setProdImage(preset.url); setImagePreview(preset.url); }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                        prodImage === preset.url
                          ? 'bg-emerald-800 text-white font-bold'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={prodImage}
                    onChange={(e) => { setProdImage(e.target.value); setImagePreview(e.target.value); }}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-[11px]"
                  />
                  {imagePreview && (
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={prodIsOrganic}
                    onChange={(e) => setProdIsOrganic(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-stone-800">🌿 100% Certified Organic (Zero Chemical Pesticides)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Sprout className="w-4 h-4" />
                <span>Publish Product to Marketplace</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ORDERS & FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Consumer Orders to Fulfill</h3>
              <p className="text-xs text-stone-500">Update order fulfillment status across the 7 delivery tracking stages.</p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                    <div>
                      <span className="font-black text-stone-900 text-sm">Order #{order.id}</span>
                      <span className="text-xs text-stone-400 ml-2">• {new Date(order.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-600">Update Status:</span>
                      <select
                        value={order.statusText}
                        onChange={(e) => {
                          const statusMap = {
                            "Order Placed": 0,
                            "Confirmed by Farmer": 1,
                            "Being Prepared": 2,
                            "Packed": 3,
                            "Shipped": 4,
                            "Out for Delivery": 5,
                            "Delivered": 6
                          };
                          handleUpdateOrderStatus(order.id, e.target.value, statusMap[e.target.value] || 1);
                        }}
                        className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Confirmed by Farmer">1. Confirmed by Farmer</option>
                        <option value="Being Prepared">2. Being Prepared (Harvesting)</option>
                        <option value="Packed">3. Packed in Crates</option>
                        <option value="Shipped">4. Shipped (Van Dispatched)</option>
                        <option value="Out for Delivery">5. Out for Delivery</option>
                        <option value="Delivered">6. Delivered Fresh</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-stone-700 mb-1">Ordered Items:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-stone-600 flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-bold">₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-stone-700 mb-1">Delivery Destination:</p>
                      <p className="text-stone-600">{order.shippingAddress?.name || 'Customer'}</p>
                      <p className="text-stone-500 text-[11px]">{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                      <p className="text-xs font-black text-stone-900 mt-2">Total Amount: ₹{order.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EARNINGS & PAYOUTS */}
        {activeTab === 'earnings' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            <h3 className="font-extrabold text-stone-900 text-lg">Bank Payouts & Settlement</h3>
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Settled Bank Account:</span>
              <p className="text-sm font-bold text-stone-900">State Bank of India (SBI) - A/C No: •••• •••• 8492</p>
              <p className="text-xs text-stone-500">IFSC: SBIN0001842 • Dindori Branch</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between font-medium">
                <span>Available Settlement Balance:</span>
                <span className="font-black text-emerald-800 text-sm">₹{totalSalesAmount}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Auto-payout schedule:</span>
                <span>Every Monday Morning</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-4">
            <h3 className="font-extrabold text-stone-900 text-base">Customer Inquiries & Chat Threads</h3>
            {messages.map((thread) => (
              <div
                key={thread.id}
                onClick={() => setActiveChat(thread)}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-400 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <h4 className="font-bold text-stone-900 text-xs">{thread.farmerName}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{thread.lastMessage}</p>
                </div>
                <span className="text-xs font-bold text-emerald-800">Open Chat →</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
