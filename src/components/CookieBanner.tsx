import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sgrcr_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sgrcr_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('sgrcr_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Privacy notice" className="bg-[#231510] text-[#fffaf4] py-2.5 px-4 border-b border-[#3d271e] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Shield className="w-4 h-4 text-[#c69470] shrink-0 hidden sm:block" />
          <p className="text-[#dfc7b2] leading-snug">
            We value scholarly privacy and research integrity. By continuing to explore SGRCR, you agree to our academic usage, open access, and data privacy policies.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3 py-1 rounded-full border border-[#c69470] text-[11px] font-bold text-[#f4e5d7] hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-3.5 py-1 rounded-full bg-[#c69470] text-[#2f1d16] text-[11px] font-bold hover:bg-[#d9a985] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
};
