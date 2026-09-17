import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ArrowRight, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const { setCurrentView, loginWithCredentials, addToast } = useApp();

  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem('agro_remember_me') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [identifier, setIdentifier] = useState(() => {
    try {
      if (localStorage.getItem('agro_remember_me') === 'true') {
        return localStorage.getItem('agro_remembered_identifier') || '';
      }
      return '';
    } catch (e) {
      return '';
    }
  });

  const [password, setPassword] = useState(() => {
    try {
      if (localStorage.getItem('agro_remember_me') === 'true') {
        return localStorage.getItem('agro_remembered_password') || '';
      }
      return '';
    } catch (e) {
      return '';
    }
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password;

    if (!cleanIdentifier || !cleanPassword) {
      setErrorMessage("Please enter your registered email or mobile number and password.");
      addToast("Missing Fields", "Please enter your registered email or mobile number and password.", "error");
      return;
    }

    // Persist remember me preferences
    try {
      if (rememberMe) {
        localStorage.setItem('agro_remember_me', 'true');
        localStorage.setItem('agro_remembered_identifier', cleanIdentifier);
        localStorage.setItem('agro_remembered_password', cleanPassword);
      } else {
        localStorage.removeItem('agro_remember_me');
        localStorage.removeItem('agro_remembered_identifier');
        localStorage.removeItem('agro_remembered_password');
      }
    } catch (err) {
      // ignore
    }

    setIsSubmitting(true);
    const result = await loginWithCredentials(cleanIdentifier, cleanPassword);
    setIsSubmitting(false);

    if (!result || result.success === false) {
      setErrorMessage(result?.error || "Invalid email/mobile number or password.");
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-stone-100/70 min-h-screen flex flex-col items-center justify-center p-4">
      
      {/* Centered Auth Card Matching Reference Screenshot */}
      <div className="bg-white rounded-[32px] max-w-md w-full shadow-2xl border border-stone-200/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Dark Emerald Header */}
        <div className="bg-gradient-to-b from-[#064e3b] to-[#043d2e] pt-10 pb-8 px-6 text-white text-center relative">
          
          {/* Sprout Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/15 shadow-inner">
            <Sprout className="w-7 h-7 text-[#eab308]" />
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-2xl sm:text-[26px] font-black font-display tracking-tight text-white">
            Sign In to AgroConnect
          </h1>
          <p className="text-xs text-emerald-200/90 mt-2 font-medium max-w-xs mx-auto">
            Access your orders, farmer dashboard, or account settings.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleCustomLogin} className="p-6 sm:p-8 space-y-5 text-xs text-left">
          
          {/* Inline Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-bold">{errorMessage}</span>
            </div>
          )}

          {/* Field 1: Email Address or Mobile Number */}
          <div>
            <label className="text-xs sm:text-[13px] font-bold text-stone-800 block mb-1.5">
              Email Address or Mobile Number
            </label>
            <input
              type="text"
              required
              placeholder="Enter your registered email or mobile"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 transition-all font-medium"
            />
          </div>

          {/* Field 2: Password & Forgot Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs sm:text-[13px] font-bold text-stone-800">
                Password
              </label>
              <button
                type="button"
                onClick={() => addToast("Password Assistance", "If you forgot your password, please register a new account.", "info")}
                className="text-xs font-bold text-[#065f46] hover:underline hover:text-emerald-900 transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full bg-[#fbfbfb] border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 transition-all"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-0.5">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => {
                const checked = e.target.checked;
                setRememberMe(checked);
                try {
                  if (checked) {
                    localStorage.setItem('agro_remember_me', 'true');
                    if (identifier.trim()) localStorage.setItem('agro_remembered_identifier', identifier.trim());
                    if (password) localStorage.setItem('agro_remembered_password', password);
                  } else {
                    localStorage.removeItem('agro_remember_me');
                    localStorage.removeItem('agro_remembered_identifier');
                    localStorage.removeItem('agro_remembered_password');
                  }
                } catch (err) {
                  // ignore
                }
              }}
              className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-600 cursor-pointer accent-[#064e3b]"
            />
            <label htmlFor="rememberMe" className="text-xs font-semibold text-stone-600 cursor-pointer select-none">
              Remember me on this device
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#064e3b] hover:bg-[#053f30] active:scale-[0.99] text-white font-bold text-sm shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Bottom Redirect to Create Account */}
          <div className="text-center pt-2 text-xs text-stone-600">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => setCurrentView('create-account')}
              className="font-bold text-[#065f46] underline underline-offset-2 hover:text-emerald-950 transition-colors cursor-pointer"
            >
              Create Account
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
