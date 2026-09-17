import streamlit as st
import streamlit.components.v1 as components

# ==========================================
# 🌿 AgroConnect Streamlit Deployment Hub
# ==========================================

st.set_page_config(
    page_title="AgroConnect — Farm-to-Table Marketplace",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling for Streamlit Shell
st.markdown("""
<style>
    /* Remove excessive default Streamlit padding */
    .block-container {
        padding-top: 0.8rem !important;
        padding-bottom: 0.5rem !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        max-width: 100% !important;
    }
    
    /* Header banner styling */
    .agro-header {
        background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%);
        padding: 14px 20px;
        border-radius: 12px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        box-shadow: 0 4px 15px -3px rgba(16, 185, 129, 0.25);
    }
    
    .agro-title {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0;
    }
    
    .agro-badge {
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        font-size: 0.78rem;
        padding: 4px 10px;
        border-radius: 9999px;
        font-weight: 600;
    }
    
    .agro-status {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        background: rgba(16, 185, 129, 0.2);
        color: #d1fae5;
        border: 1px solid rgba(52, 211, 153, 0.4);
        padding: 4px 12px;
        border-radius: 20px;
    }
    
    .status-dot {
        width: 8px;
        height: 8px;
        background-color: #34d399;
        border-radius: 50%;
        box-shadow: 0 0 8px #34d399;
    }
    
    /* Marketplace Iframe container */
    .iframe-wrapper {
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.06);
    }
    
    /* Credentials card */
    .cred-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px 14px;
        margin-bottom: 10px;
    }
</style>
""", unsafe_allow_html=True)

# ------------------------------------------
# 🧭 Sidebar Controls & Documentation
# ------------------------------------------
with st.sidebar:
    st.image("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80", use_container_width=True)
    st.title("🌱 AgroConnect Hub")
    st.caption("Direct Farm-to-Table Agricultural Marketplace")

    st.markdown("---")
    
    # Target Source Selector
    st.subheader("⚙️ Deployment Source")
    source_choice = st.radio(
        "Application Endpoint:",
        options=[
            "Cloud Production (Surge.sh)",
            "Local Vite Dev Server (localhost:5173)",
            "Custom URL"
        ],
        index=0,
        help="Select which instance of AgroConnect to embed inside Streamlit."
    )
    
    if source_choice == "Cloud Production (Surge.sh)":
        app_url = "https://agroconnect-marketplace.surge.sh"
    elif source_choice == "Local Vite Dev Server (localhost:5173)":
        app_url = "http://localhost:5173"
        st.info("💡 Ensure `npm run dev` is actively running in your terminal.")
    else:
        app_url = st.text_input("Enter custom URL:", value="https://agroconnect-marketplace.surge.sh")

    # Viewport Height Slider
    iframe_height = st.slider(
        "Viewport Height (px):",
        min_value=650,
        max_value=1600,
        value=920,
        step=40,
        help="Adjust the display height for optimal browsing on your screen."
    )

    st.markdown("---")

    # Quick Demo Credentials Expander
    st.subheader("🔑 Demo Credentials")
    with st.expander("View Login Accounts", expanded=True):
        st.markdown("""
        **🛡️ Administrator**
        - **Email**: `admin@agroconnect.in`
        - **Password**: `admin123`
        
        ---
        **🚜 Verified Farmer**
        - **Account**: Register in Register Page or enter email
        - **Role**: Add Produce, Track Orders, Farm Profile
        
        ---
        **🛒 Consumer / Buyer**
        - **Account**: Register in Register Page or enter email
        - **Role**: Browse 100+ items, Cart, Secure Checkout
        """)

    st.markdown("---")
    
    # Capabilities List
    st.subheader("✨ Core Capabilities")
    st.markdown("""
    - 🌾 **100+ Curated Products** across 8 core categories
    - 📍 **Origin Traceability**: Verified farms & harvest dates
    - 🔐 **WebCrypto Security**: Salted SHA-256 password hashing
    - 💳 **Payment Modes**: COD, UPI Instant QR, Net Banking
    - 📊 **Farmer & Admin Portals**: Analytics & Session Auditing
    """)
    
    st.markdown("---")
    st.link_button("🌐 Open in Standalone Tab", app_url, use_container_width=True)


# ------------------------------------------
# 🖥️ Main Viewport & Embedded Application
# ------------------------------------------

# Header Bar
st.markdown(f"""
<div class="agro-header">
    <div class="agro-title">
        <span>🌱 AgroConnect Marketplace</span>
        <span class="agro-badge">React 18 + Vite SPA</span>
    </div>
    <div class="agro-status">
        <span class="status-dot"></span>
        <span>Streamlit Live Bridge</span>
    </div>
</div>
""", unsafe_allow_html=True)

# Main Application Iframe
components.iframe(
    src=app_url,
    height=iframe_height,
    scrolling=True
)
