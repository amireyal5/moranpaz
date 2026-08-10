'use client';

import React, { useState, useEffect } from 'react';
import { useCookieConsent } from './CookieConsent';
import { Settings, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CookieConsentBanner() {
  const {
    preferences,
    showBanner,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useCookieConsent();

  const [mounted, setMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Custom preferences states for toggling
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Sync state with preferences when banner opens
  useEffect(() => {
    setMounted(true);
    setAnalyticsConsent(preferences.analytics);
    setMarketingConsent(preferences.marketing);
  }, [preferences, showBanner]);

  if (!mounted || !showBanner) return null;

  const handleSaveCustom = () => {
    savePreferences({
      essential: true,
      analytics: analyticsConsent,
      marketing: marketingConsent,
    });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-[200] bg-white/95 backdrop-blur-md border-t border-stone-100 text-foreground shadow-[0_-10px_40px_rgba(0,0,0,0.06)] p-6 md:py-8 md:px-12 text-right transition-all duration-500 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-10">
          {/* Information Section */}
          <div className="flex-grow space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-accent/10 text-accent rounded-sm">
                <Shield size={18} strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-headline font-bold text-accent">שימוש בקובצי עוגיות (Cookies)</h4>
            </div>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-4xl">
              אתר זה עושה שימוש בקובצי עוגיות כדי להבטיח את חוויית הגלישה הטובה ביותר. 
              בהתאם לתיקון 13 לחוק הגנת הפרטיות, עוגיות שאינן חיוניות חסומות כברירת מחדל עד לקבלת הסכמתך. 
              באפשרותך לאשר את כולן, לדחות את כולן או להתאים את העדפותיך באופן אישי. לפרטים נוספים, קרא/י את{' '}
              <Link href="/privacy" className="text-primary underline hover:text-accent transition-colors font-medium">
                מדיניות הפרטיות
              </Link>{' '}
              שלנו.
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:shrink-0">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-stone-500 hover:text-stone-800 transition-colors text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 px-4 py-3"
            >
              <Settings size={14} />
              <span>התאמה אישית</span>
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <button
              onClick={rejectAll}
              className="px-8 py-3.5 border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all text-xs font-bold uppercase tracking-[0.2em]"
            >
              דחה הכל
            </button>

            <button
              onClick={acceptAll}
              className="px-8 py-3.5 bg-primary text-white hover:bg-accent border border-primary hover:border-accent transition-all text-xs font-bold uppercase tracking-[0.2em]"
            >
              אשר הכל
            </button>
          </div>
        </div>

        {/* Detailed Options Drawer */}
        {showDetails && (
          <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
            
            {/* Essential Category */}
            <div className="bg-stone-50/50 p-6 border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">חיוניות (חובה)</span>
                  <div className="w-10 h-6 bg-stone-200 rounded-full p-1 cursor-not-allowed opacity-60">
                    <div className="w-4 h-4 bg-white rounded-full translate-x-4"></div>
                  </div>
                </div>
                <h5 className="text-base font-headline font-bold text-stone-800 mb-2">עוגיות מערכת הכרחיות</h5>
                <p className="text-stone-500 text-xs font-light leading-relaxed">
                  קובצי עוגיות הנדרשים לפעילותו התקינה והבטוחה של האתר, כגון ניהול מצב הגלישה שלך, זכירת העדפות אלו, וכניסת מנהל לאתר. קבצים אלו מופעלים תמיד ולא ניתן לכבותם.
                </p>
              </div>
            </div>

            {/* Analytics Category */}
            <div className={cn(
              "p-6 border transition-all duration-300 flex flex-col justify-between",
              analyticsConsent ? "bg-primary/5 border-primary/20" : "bg-stone-50/50 border-stone-100"
            )}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">אנליטיקה וסטטיסטיקה</span>
                  <button
                    onClick={() => setAnalyticsConsent(!analyticsConsent)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20",
                      analyticsConsent ? "bg-primary" : "bg-stone-200"
                    )}
                    role="switch"
                    aria-checked={analyticsConsent}
                  >
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full transition-all duration-300",
                      analyticsConsent ? "-translate-x-4" : "translate-x-0"
                    )}></div>
                  </button>
                </div>
                <h5 className="text-base font-headline font-bold text-stone-800 mb-2">עוגיות סטטיסטיקה ושיפור האתר</h5>
                <p className="text-stone-500 text-xs font-light leading-relaxed">
                  קובצי עוגיות המסייעים לנו להבין כיצד גולשים מקיימים אינטראקציה עם האתר (לדוגמה, אילו דפים פופולריים יותר וכמה זמן שהו בהם). המידע נאסף ונשמר באופן אנונימי לחלוטין.
                </p>
              </div>
            </div>

            {/* Marketing Category */}
            <div className={cn(
              "p-6 border transition-all duration-300 flex flex-col justify-between",
              marketingConsent ? "bg-accent/5 border-accent/20" : "bg-stone-50/50 border-stone-100"
            )}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">שיווק וצד שלישי</span>
                  <button
                    onClick={() => setMarketingConsent(!marketingConsent)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20",
                      marketingConsent ? "bg-accent" : "bg-stone-200"
                    )}
                    role="switch"
                    aria-checked={marketingConsent}
                  >
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full transition-all duration-300",
                      marketingConsent ? "-translate-x-4" : "translate-x-0"
                    )}></div>
                  </button>
                </div>
                <h5 className="text-base font-headline font-bold text-stone-800 mb-2">עוגיות פרסום ומעקב</h5>
                <p className="text-stone-500 text-xs font-light leading-relaxed">
                  קבצים המשמשים למעקב אחר גולשים ברשת על מנת לאפשר הצגת פרסומים מותאמים אישית בפלטפורמות חיצוניות (כמו פייסבוק, אינסטגרם או גוגל) ומדידת האפקטיביות שלהם.
                </p>
              </div>
            </div>

            {/* Save Button for Drawer */}
            <div className="md:col-span-3 flex justify-end pt-4">
              <button
                onClick={handleSaveCustom}
                className="px-10 py-3 bg-accent text-white hover:bg-primary transition-all text-xs font-bold uppercase tracking-[0.2em]"
              >
                שמור העדפות
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
