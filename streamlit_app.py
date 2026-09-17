import streamlit as st
import streamlit.components.v1 as components
import os

# ==============================================================================
# 🌿 AgroConnect — Professional Cloud Hub & Telemetry Dashboard
# ==============================================================================

st.set_page_config(
    page_title="AgroConnect — Farm-to-Table Marketplace Hub",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Executive-Grade Styling
st.markdown("""
<style>
    /* Google Fonts typography integration */
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* Container padding adjustments */
    .block-container {
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
        padding-left: 1.25rem !important;
        padding-right: 1.25rem !important;
        max-width: 100% !important;
    }
    
    /* Top Enterprise Header */
    .agro-hero {
        background: linear-gradient(135deg, #042f2e 0%, #064e3b 45%, #065f46 75%, #047857 100%);
        padding: 20px 24px;
        border-radius: 14px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        box-shadow: 0 10px 25px -5px rgba(6, 78, 59, 0.3);
        border: 1px solid rgba(52, 211, 153, 0.25);
    }
    
    .agro-brand {
        display: flex;
        align-items: center;
        gap: 14px;
    }
    
    .agro-logo-icon {
        width: 44px;
        height: 44px;
        background: #10b981;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
    
    .agro-title {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0;
        line-height: 1.2;
    }
    
    .agro-subtitle {
        font-size: 0.85rem;
        color: #a7f3d0;
        margin: 2px 0 0 0;
        font-weight: 500;
    }
    
    .agro-pills {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .pill-badge {
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 5px 12px;
        border-radius: 9999px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #ffffff;
    }
    
    .status-live {
        background: rgba(16, 185, 129, 0.2);
        color: #34d399;
        border: 1px solid rgba(52, 211, 153, 0.5);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 14px;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .pulse-dot {
        width: 8px;
        height: 8px;
        background-color: #34d399;
        border-radius: 50%;
        box-shadow: 0 0 10px #34d399;
    }
    
    /* Metrics Row */
    .metric-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .metric-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }
    
    .metric-number {
        font-size: 1.75rem;
        font-weight: 800;
        color: #064e3b;
        line-height: 1.1;
    }
    
    .metric-label {
        font-size: 0.8rem;
        color: #64748b;
        font-weight: 600;
        margin-top: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Iframe Wrapper */
    .app-frame-container {
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid #cbd5e1;
        box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.08);
        background: #ffffff;
    }
</style>
""", unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 🧭 Sidebar: Configuration & Quick Access
# ------------------------------------------------------------------------------
with st.sidebar:
    st.image(
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
        use_container_width=True,
        caption="Direct Farm-to-Table Marketplace"
    )
    
    st.markdown("### 🌾 Platform Controls")
    
    # Deployment Source Radio
    source_choice = st.radio(
        "Target Endpoint:",
        options=[
            "Cloud Production (Surge Edge CDN)",
            "Local Development (localhost:5173)",
            "Custom URL"
        ],
        index=0,
        help="Select which instance of the AgroConnect application to run."
    )
    
    if source_choice == "Cloud Production (Surge Edge CDN)":
        app_url = "https://agroconnect-marketplace.surge.sh"
    elif source_choice == "Local Development (localhost:5173)":
        app_url = "http://localhost:5173"
        st.caption("💡 Run `npm run dev` in your local terminal.")
    else:
        app_url = st.text_input("Custom endpoint:", value="https://agroconnect-marketplace.surge.sh")

    # Height Slider
    iframe_height = st.slider(
        "Viewport Height (px):",
        min_value=700,
        max_value=1600,
        value=950,
        step=50,
        help="Scale the application viewport for your display."
    )

    st.markdown("---")

    # Quick Demo Credentials
    st.markdown("### 🔑 Demo Credentials")
    with st.expander("🛡️ Admin Login", expanded=True):
        st.code("admin@agroconnect.in\nadmin123", language="text")
        st.caption("Permissions: User management, live login audit logs, dispute governance.")

    with st.expander("🚜 Farmer & Buyer Accounts", expanded=False):
        st.markdown("""
        **Farmer Portal**:
        - Create account via *Register* page
        - Access: Add Harvests, Pricing, Order Dispatch
        
        **Buyer Portal**:
        - Access: Browse 100+ items, Cart, UPI/COD Checkout
        """)

    st.markdown("---")
    
    # External Links
    st.link_button("🚀 Open in New Tab", app_url, use_container_width=True)
    st.link_button("📦 GitHub Repository", "https://github.com/LALI20006/Farmer", use_container_width=True)


# ------------------------------------------------------------------------------
# 🖥️ Main Dashboard Viewport
# ------------------------------------------------------------------------------

# Top Executive Banner
st.markdown("""
<div class="agro-hero">
    <div class="agro-brand">
        <div class="agro-logo-icon">🌱</div>
        <div>
            <div class="agro-title">AgroConnect Enterprise Hub</div>
            <div class="agro-subtitle">Direct Farm-to-Table Agricultural Marketplace & Traceability Network</div>
        </div>
    </div>
    <div class="agro-pills">
        <span class="pill-badge">React 18 + Vite SPA</span>
        <span class="pill-badge">WebCrypto SHA-256</span>
        <div class="status-live">
            <span class="pulse-dot"></span>
            <span>Production Operational</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Executive Metric KPI Strip
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.markdown("""
    <div class="metric-card">
        <div class="metric-number">100+</div>
        <div class="metric-label">Verified Farm Crops</div>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="metric-card">
        <div class="metric-number">8 States</div>
        <div class="metric-label">Regional Indian Origins</div>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class="metric-card">
        <div class="metric-number">0% Fee</div>
        <div class="metric-label">Middleman Commission</div>
    </div>
    """, unsafe_allow_html=True)

with col4:
    st.markdown("""
    <div class="metric-card">
        <div class="metric-number">100%</div>
        <div class="metric-label">Farm Traceability</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<br />", unsafe_allow_html=True)

# Navigation Tabs
tab1, tab2, tab3 = st.tabs([
    "🛒 Live Agricultural Marketplace",
    "📊 Sourcing & Category Telemetry",
    "🏛️ Architecture & Security Specification"
])

with tab1:
    components.iframe(
        src=app_url,
        height=iframe_height,
        scrolling=True
    )

with tab2:
    st.subheader("🌾 Agricultural Sourcing Telemetry")
    tcol1, tcol2 = st.columns(2)
    
    with tcol1:
        st.markdown("#### 📦 Produce Distribution by Category")
        category_data = {
            "Fresh Vegetables": 24,
            "Fresh Fruits": 18,
            "Heirloom Grains": 15,
            "Pulses & Desi Dals": 14,
            "Spices & Herbs": 12,
            "Certified Organic": 10,
            "Dairy & Farm Fresh Eggs": 8
        }
        st.bar_chart(category_data)
        
    with tcol2:
        st.markdown("#### 🗺️ Regional State Coverage")
        st.markdown("""
        - 🌾 **Andhra Pradesh**: Banganapalli Mangoes, Sona Masoori Rice, Guntur Mirchi
        - 🏔️ **Himachal Pradesh**: Kinnauri Apples, Himalayan Wild Honey
        - 🌴 **Kerala**: Wayanad Black Pepper, Malabar Cardamom, Coconut Oil
        - 🚜 **Punjab**: Sharbati Wheat, Mustard Greens, Desi Ghee
        - 🍇 **Maharashtra**: Alphonso Mangoes, Nashik Table Grapes, Tur Dal
        - 🌿 **Karnataka**: Coorg Arabica Coffee, Mysore Betel Leaves
        """)
        st.info("Direct logistics ensure farm-to-doorstep dispatch within 24–48 hours of harvest.")

with tab3:
    st.subheader("🏛️ Enterprise Security & Relational Data Engine")
    st.markdown("""
    AgroConnect operates a full zero-trust, client-side relational storage system paired with standard SQL schemas:
    
    - **🔐 Web Crypto API (`window.crypto.subtle`)**:
      - Passwords hashed with 16-byte random cryptographic salts.
      - SHA-256 algorithm with constant-time verification.
      - Zero plaintext storage in memory or storage layers.
    - **🗄️ Relational Entities**:
      - `users`: Core authentication, verification state, phone, and role.
      - `farmer_profiles`: Linked 1:1 with farm acreage, certifications, and awards.
      - `login_activity`: Audit log tracking login timestamps, session IDs, and status.
      - `orders`: Order line items, payment methods (COD, UPI, NetBanking), and shipping tracking.
    - **📄 PostgreSQL / Supabase Schema**:
      - Full DDL schema provided in `database/schema.sql` for turnkey backend migration.
    """)
