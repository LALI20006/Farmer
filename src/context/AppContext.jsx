import React, { createContext, useContext, useState, useEffect } from 'react';
import { FARMERS_DATA } from '../data/farmersData';
import { FULL_100_PRODUCTS } from '../data/productsDataExtended';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { AgroDatabase } from '../db/agroDatabase';

const AppContext = createContext();

export const INITIAL_ORDERS = [];
export const INITIAL_NOTIFICATIONS = [];
export const INITIAL_MESSAGES = [];

export const AppProvider = ({ children }) => {
  // User State - Defaults to null (Guest mode - not signed in before)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Navigation State - First page is strictly 'signin' if not authenticated!
  const [currentCategorySlug, setCurrentCategorySlug] = useState('vegetables');

  // Views: 'signin', 'create-account', 'marketplace', 'categories', 'category-detail', 'farmers', 'farmer-profile', 'product-detail', 'how-it-works', 'about', 'contact', 'messages', 'notifications', 'farmer-dashboard', 'customer-dashboard', 'admin-dashboard', 'admin-users', 'admin-login-activity', 'checkout'
  const [currentView, setCurrentViewState] = useState(() => {
    const p = window.location.pathname;
    if (p === '/create-account' || p === '/register') return 'create-account';
    if (p === '/categories') return 'categories';
    if (p.startsWith('/categories/')) return 'category-detail';
    if (p === '/farmers') return 'farmers';
    if (p.startsWith('/farmers/')) return 'farmer-profile';
    if (p === '/how-it-works') return 'how-it-works';
    if (p === '/about') return 'about';
    if (p === '/contact') return 'contact';
    try {
      const saved = localStorage.getItem('agro_current_user');
      const parsed = saved ? JSON.parse(saved) : null;
      if (!parsed) {
        if (['/how-it-works', '/about', '/contact', '/categories', '/farmers'].includes(p)) return p.substring(1);
        if (p.startsWith('/categories/')) return 'category-detail';
        if (p.startsWith('/farmers/')) return 'farmer-profile';
        return 'signin';
      }
      if (p === '/customer/dashboard') return 'customer-dashboard';
      if (p === '/farmer/dashboard') return 'farmer-dashboard';
      if (p === '/admin/dashboard') return 'admin-dashboard';
      if (p === '/admin/users' && parsed.role === 'admin') return 'admin-users';
      if ((p === '/admin/login-activity' || p === '/admin/login-history') && parsed.role === 'admin') return 'admin-login-activity';
      if (p === '/categories') return 'categories';
      if (p.startsWith('/categories/')) return 'category-detail';
      if (p === '/farmers') return 'farmers';
      if (p.startsWith('/farmers/')) return 'farmer-profile';
      if (p === '/how-it-works') return 'how-it-works';
      if (p === '/about') return 'about';
      if (p === '/contact') return 'contact';
      if (p === '/messages') return 'messages';
      if (p === '/notifications') return 'notifications';
      if (p === '/checkout') return 'checkout';
      return 'marketplace';
    } catch (e) {
      return 'signin';
    }
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  // Registered Accounts DB
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Data Collections
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('agro_all_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const customAdded = parsed.filter(p => p.id.startsWith('prod-custom-') || !FULL_100_PRODUCTS.some(fp => fp.id === p.id));
        return [...FULL_100_PRODUCTS, ...customAdded];
      } catch (e) {
        return FULL_100_PRODUCTS;
      }
    }
    return FULL_100_PRODUCTS;
  });

  const [farmers, setFarmers] = useState(() => {
    const saved = localStorage.getItem('agro_all_farmers');
    return saved ? JSON.parse(saved) : FARMERS_DATA;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('agro_active_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('agro_active_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('agro_active_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('agro_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('agro_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [toasts, setToasts] = useState([]);

  // Persistence
  useEffect(() => {
    localStorage.setItem('agro_current_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agro_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('agro_all_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('agro_all_farmers', JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem('agro_active_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('agro_active_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('agro_active_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('agro_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('agro_messages', JSON.stringify(messages));
  }, [messages]);

  // On Mount: Validate active session from AgroDatabase
  useEffect(() => {
    const restoreSession = async () => {
      const activeSessionId = localStorage.getItem('agro_active_session_id');
      if (activeSessionId) {
        const validatedUser = await AgroDatabase.validateSession(activeSessionId);
        if (validatedUser) {
          setUser(validatedUser);
        } else {
          localStorage.removeItem('agro_active_session_id');
          localStorage.removeItem('agro_current_user');
          setUser(null);
        }
      }
    };
    restoreSession();
  }, []);

  // Toast Helper
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Route Navigation with Access Control Guard & URL Sync
  const setCurrentView = (newView, replace = false) => {
    let finalView = newView;
    if (finalView === 'login') finalView = 'signin';
    if (finalView === 'register') finalView = 'create-account';

    let customPath = null;

    // Dynamic Route: /categories/[slug]
    if (typeof finalView === 'string' && finalView.startsWith('categories/')) {
      const slug = finalView.replace('categories/', '');
      setCurrentCategorySlug(slug);
      customPath = `/categories/${slug}`;
      finalView = 'category-detail';
    }

    // Dynamic Route: /farmers/[farmer-id]
    if (typeof finalView === 'string' && finalView.startsWith('farmers/')) {
      const farmerId = finalView.replace('farmers/', '');
      const found = (farmers || FARMERS_DATA).find(f => f.id === farmerId);
      if (found) setSelectedFarmer(found);
      customPath = `/farmers/${farmerId}`;
      finalView = 'farmer-profile';
    }

    // Access control guard: unauthenticated users cannot access protected views
    const publicViews = [
      'signin', 
      'create-account', 
      'forgot-password', 
      'verify-reset', 
      'reset-password', 
      'categories',
      'category-detail',
      'farmers',
      'farmer-profile',
      'how-it-works', 
      'about', 
      'contact'
    ];
    if (!user && !publicViews.includes(finalView)) {
      addToast("Access Restricted", "Please sign in to access this feature.", "info");
      finalView = 'signin';
    }

    // Role guard: Only admin can access admin views
    if ((finalView === 'admin-users' || finalView === 'admin-login-activity' || finalView === 'admin-login-history' || finalView === 'admin-dashboard') && user?.role !== 'admin') {
      addToast("Unauthorized", "Admin clearance required to access administration.", "error");
      finalView = user ? 'marketplace' : 'signin';
    }

    setCurrentViewState(finalView);

    // Always scroll to the top of the new page immediately
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } catch (e) {
      // ignore
    }

    // Sync with browser URL
    const pathMap = {
      'signin': '/signin',
      'create-account': '/create-account',
      'marketplace': '/marketplace',
      'home': '/marketplace',
      'categories': '/categories',
      'farmers': '/farmers',
      'how-it-works': '/how-it-works',
      'about': '/about',
      'contact': '/contact',
      'messages': '/messages',
      'notifications': '/notifications',
      'customer-dashboard': '/customer/dashboard',
      'farmer-dashboard': '/farmer/dashboard',
      'admin-dashboard': '/admin/dashboard',
      'admin-users': '/admin/users',
      'admin-login-activity': '/admin/login-activity',
      'admin-login-history': '/admin/login-activity',
      'checkout': '/checkout'
    };
    const targetPath = customPath || pathMap[finalView] || `/${finalView}`;
    try {
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ view: finalView }, '', targetPath);
        } else {
          window.history.pushState({ view: finalView }, '', targetPath);
        }
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p === '/create-account' || p === '/register') {
        setCurrentViewState('create-account');
      } else if (p === '/signin' || p === '/login') {
        setCurrentViewState('signin');
      } else if (p === '/categories') {
        setCurrentViewState('categories');
      } else if (p.startsWith('/categories/')) {
        const slug = p.replace('/categories/', '');
        setCurrentCategorySlug(slug);
        setCurrentViewState('category-detail');
      } else if (p === '/farmers') {
        setCurrentViewState('farmers');
      } else if (p.startsWith('/farmers/')) {
        const fId = p.replace('/farmers/', '');
        const found = (farmers || FARMERS_DATA).find(f => f.id === fId);
        if (found) setSelectedFarmer(found);
        setCurrentViewState('farmer-profile');
      } else if (p === '/how-it-works') {
        setCurrentViewState('how-it-works');
      } else if (p === '/about') {
        setCurrentViewState('about');
      } else if (p === '/contact') {
        setCurrentViewState('contact');
      } else if (p === '/messages') {
        if (!user) setCurrentViewState('signin');
        else setCurrentViewState('messages');
      } else if (p === '/notifications') {
        if (!user) setCurrentViewState('signin');
        else setCurrentViewState('notifications');
      } else if (p === '/admin/users') {
        if (!user || user.role !== 'admin') setCurrentViewState('signin');
        else setCurrentViewState('admin-users');
      } else if (p === '/admin/login-activity' || p === '/admin/login-history') {
        if (!user || user.role !== 'admin') setCurrentViewState('signin');
        else setCurrentViewState('admin-login-activity');
      } else if (p === '/admin/dashboard') {
        if (!user || user.role !== 'admin') setCurrentViewState('signin');
        else setCurrentViewState('admin-dashboard');
      } else if (p === '/customer/dashboard') {
        if (!user) setCurrentViewState('signin');
        else setCurrentViewState('customer-dashboard');
      } else if (p === '/farmer/dashboard') {
        if (!user) setCurrentViewState('signin');
        else setCurrentViewState('farmer-dashboard');
      } else if (p === '/marketplace' || p === '/') {
        if (!user) setCurrentViewState('signin');
        else setCurrentViewState('marketplace');
      } else {
        if (!user) setCurrentViewState('signin');
        else setCurrentViewState('marketplace');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user, farmers]);

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(
      "Added to Cart! 🛒",
      `${quantity}x ${product.name} (₹${product.price * quantity}) from ${product.farmerName}`,
      "success"
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast("Item Removed", "Product removed from cart.", "info");
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast("Removed from Wishlist", "Item removed from your favorites.", "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast("Added to Wishlist! ❤️", "Saved to your favorites for quick ordering.", "success");
        return [...prev, productId];
      }
    });
  };

  // Order Placement
  const placeOrder = (orderData) => {
    const trackingHistory = [
      { step: 1, title: "Order Placed", time: "Just Now", desc: `Payment confirmed via ${orderData.paymentMethod}`, completed: true },
      { step: 2, title: "Confirmed by Farmer", time: "Expected in 30 mins", desc: "Notification sent directly to local growers", completed: true },
      { step: 3, title: "Being Prepared", time: "In Progress", desc: "Harvesting & sorting at farm gate", completed: false },
      { step: 4, title: "Packed", time: "Scheduled for today", desc: "Packed in eco-friendly protective crates", completed: false },
      { step: 5, title: "Shipped", time: "Scheduled", desc: "AgroConnect Agri-Van pickup", completed: false },
      { step: 6, title: "Out for Delivery", time: "Tomorrow Morning", desc: "Last-mile courier assignment", completed: false },
      { step: 7, title: "Delivered", time: "Expected Tomorrow by 12 PM", desc: "Delivered fresh at doorstep", completed: false }
    ];

    const newOrder = {
      id: `AGRO-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      statusIndex: 1,
      statusText: "Confirmed by Farmer",
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        unit: item.product.unit,
        farmerName: item.product.farmerName,
        farmerLocation: item.product.farmerLocation,
        image: item.product.image
      })),
      deliveryCharge: orderData.deliveryCharge,
      discount: orderData.discount,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress,
      trackingHistory
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "New Order Placed! 🎉",
      message: `Your order #${newOrder.id} of ₹${newOrder.total} has been confirmed.`,
      time: "Just now",
      read: false,
      type: "order"
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast("Order Placed Successfully! 🌾", `Order #${newOrder.id} dispatched to local farmers.`, "success");
    return newOrder;
  };

  // Farmer Add / Edit Product
  const addFarmerProduct = (newProd) => {
    const created = {
      ...newProd,
      id: `p-custom-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      freshnessIndex: 100,
      harvestDate: newProd.harvestDate || "Harvested Today",
      inStock: true
    };
    setProducts((prev) => [created, ...prev]);
    addToast("Product Published to Marketplace! 🌾", `${created.name} is now live and visible to all buyers.`, "success");
  };

  const updateProductStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: newStock, inStock: newStock > 0 } : p
      )
    );
    addToast("Stock Updated", "Product inventory updated successfully.", "info");
  };

  // Send Direct Message
  const sendMessage = (farmerId, text, customerName = user?.name || "Buyer") => {
    const targetFarmer = farmers.find((f) => f.id === farmerId) || farmers[0];
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "customer",
      text,
      time: "Just now"
    };

    setMessages((prev) => {
      const existingThread = prev.find((t) => t.farmerId === farmerId);
      if (existingThread) {
        return prev.map((t) =>
          t.farmerId === farmerId
            ? {
                ...t,
                lastMessage: text,
                messages: [...t.messages, newMsg]
              }
            : t
        );
      }
      return [
        {
          id: `chat-${Date.now()}`,
          farmerId,
          farmerName: targetFarmer.name,
          farmerAvatar: targetFarmer.avatar,
          lastMessage: text,
          unreadCount: 0,
          messages: [newMsg]
        },
        ...prev
      ];
    });

    addToast("Message Sent to Farmer! ✉️", `${targetFarmer.name} will reply shortly.`, "success");
  };

  // Register Account using AgroDatabase
  const registerAccount = async (accountData) => {
    try {
      const dbUser = await AgroDatabase.registerUser({
        fullName: accountData.name,
        email: accountData.email,
        mobileNumber: accountData.mobile,
        password: accountData.password,
        userRole: accountData.role,
        address: accountData.address,
        city: accountData.city,
        district: accountData.district,
        state: accountData.state,
        pincode: accountData.pincode,
        profileImage: accountData.avatar,
        farmerData: accountData.role === 'farmer' ? {
          farmName: accountData.farmName,
          farmLocation: accountData.farmLocation,
          village: accountData.villageCity,
          district: accountData.district,
          state: accountData.state,
          category: accountData.category,
          experienceYears: 5
        } : null
      });

      // Sync state list
      setRegisteredUsers(AgroDatabase.getAllUsers());

      if (accountData.role === 'farmer') {
        setFarmers((prev) => {
          const exists = prev.find((f) => f.name === accountData.name);
          if (exists) return prev;
          const newFarmerProfile = {
            id: dbUser.id,
            name: accountData.name,
            farmName: accountData.farmName || `${accountData.name}'s Farm`,
            avatar: accountData.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
            location: accountData.farmLocation,
            district: accountData.district || "Nashik",
            state: accountData.state || "Maharashtra",
            experience: "Organic Grower",
            acreage: "Farmstead",
            rating: 5.0,
            reviewsCount: 1,
            verifiedBadge: true,
            about: `Natural and sustainable farm operated by ${accountData.name}. Specializing in fresh harvests with zero harmful chemical residues.`,
            practices: ["Natural Composting", "Drip Irrigation", "Soil Moisture Monitoring"],
            certifications: ["Registered AgroConnect Producer", "Quality Inspected"],
            phone: accountData.mobile,
            email: accountData.email,
            languages: ["Hindi", "English"],
            establishedYear: 2026
          };
          return [newFarmerProfile, ...prev];
        });
      }

      // Show success notification & redirect directly to Sign In page (no auto login!)
      addToast(
        "Account Created Successfully!",
        "Account Created Successfully! Please Sign In to Continue.",
        "success"
      );

      setCurrentView('signin');
      return { success: true, user: dbUser };
    } catch (err) {
      addToast("Registration Error", err.message || "Could not register account.", "error");
      return { success: false, error: err.message };
    }
  };

  // Login with Credentials via AgroDatabase
  const loginWithCredentials = async (identifier, password) => {
    try {
      const result = await AgroDatabase.authenticateUser(identifier, password);
      
      if (!result.success) {
        addToast(
          "Sign In Failed", 
          result.error || "Invalid email/mobile number or password.", 
          "error"
        );
        return { success: false, error: result.error || "Invalid email/mobile number or password." };
      }

      const activeUser = result.user;
      setUser(activeUser);
      localStorage.setItem('agro_active_session_id', result.sessionId);
      localStorage.setItem('agro_current_user', JSON.stringify(activeUser));

      addToast("Login Successful! 🌾", `Welcome back, ${activeUser.name}!`, "success");

      // Always direct users directly to the Marketplace page first after sign in
      setCurrentView('marketplace');

      return { success: true, user: activeUser };
    } catch (err) {
      addToast("Sign In Failed", "Invalid email/mobile number or password.", "error");
      return { success: false, error: "Invalid email/mobile number or password." };
    }
  };

  // Clear all cached local data
  const clearAllData = () => {
    localStorage.removeItem('agro_current_user');
    localStorage.removeItem('agro_active_session_id');
    localStorage.removeItem('agro_db_users');
    localStorage.removeItem('agro_db_login_history');
    localStorage.removeItem('agro_db_sessions');
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setCurrentView('signin');
    addToast("All Local Data Cleared! 🧹", "Fresh visitor session initialized.", "info");
  };

  const login = (userData) => {
    setUser(userData);
    addToast("Welcome!", `Logged in as ${userData.name}`, "success");
    if (userData.role === 'farmer') setCurrentView('farmer-dashboard');
    else if (userData.role === 'customer') setCurrentView('marketplace');
    else if (userData.role === 'admin') setCurrentView('admin-dashboard');
    else setCurrentView('marketplace');
  };

  const logout = async () => {
    const activeSessionId = localStorage.getItem('agro_active_session_id');
    if (activeSessionId) {
      await AgroDatabase.terminateSession(activeSessionId);
    }
    setUser(null);
    localStorage.removeItem('agro_active_session_id');
    localStorage.removeItem('agro_current_user');
    setCurrentView('signin');
    addToast("Signed Out", "You have been logged out. Please sign in to continue.", "info");
  };

  const cartSubtotal = (cart || []).reduce((acc, item) => {
    const price = item?.product?.price ?? item?.price ?? 0;
    const qty = item?.quantity ?? 1;
    return acc + price * qty;
  }, 0);
  const cartItemCount = (cart || []).reduce((acc, item) => acc + (item?.quantity ?? 1), 0);
  const cartSavings = (cart || []).reduce((acc, item) => {
    const price = item?.product?.price ?? item?.price ?? 0;
    const discount = item?.product?.discount ?? item?.discount ?? 10;
    const qty = item?.quantity ?? 1;
    const origPrice = price / (1 - discount / 100);
    return acc + (origPrice - price) * qty;
  }, 0);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        selectedFarmer,
        setSelectedFarmer,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        currentCategorySlug,
        setCurrentCategorySlug,
        selectedStateFilter,
        setSelectedStateFilter,
        isCartOpen,
        setIsCartOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        activeChat,
        setActiveChat,
        user,
        registeredUsers,
        registerAccount,
        loginWithCredentials,
        clearAllData,
        products,
        farmers,
        cart,
        cartSubtotal,
        cartItemCount,
        cartSavings,
        wishlist,
        orders,
        setOrders,
        notifications,
        setNotifications,
        messages,
        toasts,
        addToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        placeOrder,
        addFarmerProduct,
        updateProductStock,
        sendMessage,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
