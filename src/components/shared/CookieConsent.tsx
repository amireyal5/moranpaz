'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Cookie preference categories
export interface CookiePreferences {
  essential: boolean;   // Necessary for website core functionality (always true)
  analytics: boolean;   // Google Analytics, site statistics, etc.
  marketing: boolean;   // Facebook Pixel, marketing tracking, etc.
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasChoice: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'moranpaz-cookie-consent';
const COOKIE_NAME = 'moranpaz_cookie_consent';

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

// Helper to set a cookie on the client side
function setClientCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax; Secure`;
}

// Helper to delete specific cookie categories
function clearCategoryCookies(category: 'analytics' | 'marketing') {
  if (typeof document === 'undefined') return;

  const cookieNames: Record<'analytics' | 'marketing', string[]> = {
    analytics: ['_ga', '_gid', '_gat', '_ga_'],
    marketing: ['_fbp', 'fr', 'tr'],
  };

  const targets = cookieNames[category] || [];
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const domainList = [
    hostname,
    '.' + hostname,
  ];
  
  // Also try wildcard root domain if we are on a subdomain (e.g. www.moranpaz.co.il -> .moranpaz.co.il)
  if (parts.length >= 2) {
    const rootDomain = '.' + parts.slice(-2).join('.');
    domainList.push(rootDomain);
    domainList.push(parts.slice(-2).join('.'));
  }

  targets.forEach((name) => {
    domainList.forEach((domain) => {
      // Set expiry in the past to delete the cookie
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  });
}

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasChoice, setHasChoice] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Initialize and load preferences from localStorage/cookies on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setPreferences({
          essential: true, // Always true
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
        setHasChoice(true);
      } else {
        // First visit - show banner
        setHasChoice(false);
        setShowBanner(true);
      }
    } catch (e) {
      console.error('Failed to load cookie preferences', e);
      setHasChoice(false);
      setShowBanner(true);
    }

    // Listen to external trigger events to open settings (e.g. from footer)
    const handleOpenSettings = () => {
      setShowBanner(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, []);

  const savePreferencesState = (newPrefs: CookiePreferences) => {
    setPreferences(newPrefs);
    setHasChoice(true);
    setShowBanner(false);

    try {
      // 1. Save to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPrefs));

      // 2. Save to a cookie so server side can read it if needed
      setClientCookie(COOKIE_NAME, JSON.stringify(newPrefs), 365);

      // 3. Clean cookies if user opted out
      if (!newPrefs.analytics) clearCategoryCookies('analytics');
      if (!newPrefs.marketing) clearCategoryCookies('marketing');

      // 4. Dispatch global custom event for external scripts/trackers to listen to
      const event = new CustomEvent('cookieConsentChanged', { detail: newPrefs });
      window.dispatchEvent(event);
      
      // Also update standard window data layers if they exist
      (window as any).cookieConsent = newPrefs;
    } catch (e) {
      console.error('Failed to save cookie preferences', e);
    }
  };

  const acceptAll = () => {
    savePreferencesState({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    savePreferencesState({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  const savePreferences = (prefs: Partial<CookiePreferences>) => {
    savePreferencesState({
      essential: true,
      analytics: prefs.analytics ?? false,
      marketing: prefs.marketing ?? false,
    });
  };

  const openSettings = () => setShowBanner(true);
  const closeSettings = () => {
    if (hasChoice) {
      setShowBanner(false);
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasChoice,
        showBanner,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
