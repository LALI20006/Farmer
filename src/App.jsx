import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Homepage Components
import { Hero } from './components/home/Hero';
import { CategoryBrowseSection } from './components/home/CategoryBrowseSection';
import { FreshPicksSection } from './components/home/FreshPicksSection';
import { BestSellersSection } from './components/home/BestSellersSection';
import { SeasonalHarvestSection } from './components/home/SeasonalHarvestSection';
import { FeaturedFarmersSection } from './components/home/FeaturedFarmersSection';
import { SpecialOffersSection } from './components/home/SpecialOffersSection';
import { WhyAgroConnectSection } from './components/home/WhyAgroConnectSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';

// Views & Pages
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetailView } from './components/marketplace/ProductDetailView';
import { FarmerDirectoryView } from './components/farmer/FarmerDirectoryView';
import { FarmerProfileView } from './components/farmer/FarmerProfileView';
import { RegisterPage } from './components/auth/RegisterPage';
import { LoginPage } from './components/auth/LoginPage';
import { FarmerDashboard } from './components/dashboards/FarmerDashboard';
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { AdminUsersView } from './components/dashboards/AdminUsersView';
import { AdminLoginActivityView } from './components/dashboards/AdminLoginActivityView';
import { AdminLoginHistoryView } from './components/dashboards/AdminLoginHistoryView';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutView } from './components/cart/CheckoutView';
import { CategoriesView } from './components/pages/CategoriesView';
import { CategoryDetailView } from './components/pages/CategoryDetailView';
import { HowItWorksView } from './components/pages/HowItWorksView';
import { AboutView } from './components/pages/AboutView';
import { ContactView } from './components/pages/ContactView';
import { MessagesView } from './components/chat/MessagesView';
import { NotificationsView } from './components/pages/NotificationsView';
import { MessagingModal } from './components/chat/MessagingModal';

import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function App() {
  const { currentView, toasts, removeToast, user, currentCategorySlug } = useApp();

  // Scroll to top immediately whenever currentView or auth changes
  // Ensures user always lands at the top of the new page (header & welcome banner first, never the footer)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, user]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Toast Notification Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-slate-950/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-stone-800 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200"
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            
            <div className="flex-1 text-xs">
              <p className="font-extrabold text-white">{t.title}</p>
              <p className="text-stone-300 mt-0.5 text-[11px] leading-tight">{t.message}</p>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {!user ? (
          // Unauthenticated Flow
          <>
            {(currentView === 'create-account' || currentView === 'register') && <RegisterPage />}
            {currentView === 'how-it-works' && <HowItWorksView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'contact' && <ContactView />}
            {currentView === 'categories' && <CategoriesView />}
            {currentView === 'category-detail' && <CategoryDetailView categoryId={currentCategorySlug} />}
            {currentView === 'farmers' && <FarmerDirectoryView />}
            {currentView === 'farmer-profile' && <FarmerProfileView />}
            {(currentView === 'signin' || currentView === 'login' || !['create-account', 'register', 'how-it-works', 'about', 'contact', 'categories', 'category-detail', 'farmers', 'farmer-profile'].includes(currentView)) && (
              <LoginPage />
            )}
          </>
        ) : (
          // Authenticated Views
          <>
            {(currentView === 'marketplace' || currentView === 'home') && <MarketplaceView />}
            {currentView === 'categories' && <CategoriesView />}
            {currentView === 'category-detail' && <CategoryDetailView categoryId={currentCategorySlug} />}
            {currentView === 'farmers' && <FarmerDirectoryView />}
            {currentView === 'farmer-profile' && <FarmerProfileView />}
            {currentView === 'how-it-works' && <HowItWorksView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'contact' && <ContactView />}
            {currentView === 'messages' && <MessagesView />}
            {currentView === 'notifications' && <NotificationsView />}
            {currentView === 'farmer-dashboard' && <FarmerDashboard />}
            {currentView === 'customer-dashboard' && <CustomerDashboard />}
            {currentView === 'admin-dashboard' && <AdminDashboard />}
            {currentView === 'admin-users' && <AdminUsersView />}
            {(currentView === 'admin-login-activity' || currentView === 'admin-login-history') && <AdminLoginActivityView />}
            {currentView === 'checkout' && <CheckoutView />}
          </>
        )}
      </main>

      {/* Global Drawers & Modals (Authenticated Only) */}
      {user && (
        <>
          <ProductDetailView />
          <CartDrawer />
          <MessagingModal />
        </>
      )}

      {/* Global Footer (Only on Customer Marketplace/Browsing pages, hidden on dashboards so dashboard content comes first) */}
      {user && !['admin-dashboard', 'admin-users', 'admin-login-activity', 'admin-login-history', 'farmer-dashboard'].includes(currentView) && (
        <Footer />
      )}

    </div>
  );
}

export default App;
