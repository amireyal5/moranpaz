
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, ExternalLink, Facebook, Instagram, Lock } from 'lucide-react';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const wazeLink = "https://waze.com/ul?ll=32.723342373686044,35.14095372397462&navigate=yes";
  const facebookLink = "https://www.facebook.com/share/18MjZEfzgv/?mibextid=wwXIfr";

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-accent text-white pt-32 pb-12 px-8 md:px-20 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Mashrabiya Texture */}
      <div className="absolute inset-0 mashrabiya-divider opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-24 mb-24 text-right">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-headline tracking-[0.4em] font-light mb-4 text-white">MORAN PAZ</h3>
            <span className="text-white font-handwriting text-6xl block mb-8">BeinMe — להיות אני בתוכי</span>
            <p className="text-white/80 font-light leading-relaxed max-w-md mr-0 text-xl">
              פסיכותרפיה הוליסטית וליווי רגשי המשלב גוף, נפש ורוח. מרחב בטוח לגילוי, ריפוי וחיבור לסמכות הפנימית בטבעון ובאונליין.
            </p>
          </div>
          
          {/* Quick Navigation */}
          <div className="lg:col-span-2">
             <h4 className="boutique-label text-white border-b border-white/20 pb-2 mb-10 inline-block">ניווט מהיר</h4>
             <nav className="flex flex-col space-y-4 text-lg font-light">
                <Link href="/" className="text-white/90 hover:text-white transition-colors duration-500">דף הבית</Link>
                <Link href="/about" className="text-white/90 hover:text-white transition-colors duration-500">אודות</Link>
                <Link href="/practice" className="text-white/90 hover:text-white transition-colors duration-500">התהליך הטיפולי</Link>
                <Link href="/blog" className="text-white/90 hover:text-white transition-colors duration-500">נקודות של אור</Link>
                <Link href="/contact" className="text-white/90 hover:text-white transition-colors duration-500">צור קשר</Link>
             </nav>
          </div>

          {/* Landing Pages & Services */}
          <div className="lg:col-span-3">
             <h4 className="boutique-label text-white border-b border-white/20 pb-2 mb-10 inline-block">שירותים ומיקומים</h4>
             <nav className="flex flex-col space-y-4 text-lg font-light">
                <Link href="/online-therapy" className="text-white/90 hover:text-white transition-colors duration-500">טיפול רגשי אונליין</Link>
                <Link href="/tivon" className="text-white/90 hover:text-white transition-colors duration-500">טיפול רגשי בטבעון</Link>
                <Link href="/emeq-izrael" className="text-white/90 hover:text-white transition-colors duration-500">טיפול בעמק יזרעאל</Link>
                <Link href="/audience/women" className="text-white/90 hover:text-white transition-colors duration-500">ליווי רגשי לנשים</Link>
                <Link href="/audience/youth" className="text-white/90 hover:text-white transition-colors duration-500">טיפול רגשי לנוער</Link>
             </nav>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
             <h4 className="boutique-label text-white border-b border-white/20 pb-2 mb-10 inline-block">יצירת קשר</h4>
             <div className="space-y-6">
                <a href="tel:0507817338" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-white transition-colors duration-500">
                  <Phone size={18} className="opacity-80" />
                  <span>050-781-7338</span>
                </a>
                <a href="mailto:moraniva5@gmail.com" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-white transition-colors duration-500">
                  <Mail size={18} className="opacity-80" />
                  <span>moraniva5@gmail.com</span>
                </a>
                
                <div className="flex gap-6 pt-6">
                  <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all">
                    <Facebook size={24} strokeWidth={1} />
                  </a>
                  <a href="https://www.instagram.com/beinme_moranpaz" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all">
                    <Instagram size={24} strokeWidth={1} />
                  </a>
                  <a href="https://wa.me/972507817338" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all">
                    <WhatsAppIcon size={24} variant="outline" />
                  </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 text-[11px] uppercase tracking-[0.3em] text-white/60 font-bold text-center md:text-right">
          <p className="order-1">© {year} BEINME — מורן פז — כל הזכויות שמורות</p>
          
          <div className="order-2 flex flex-col items-center gap-6">
            {/* Mobile-only prominent management link, placed above legal links */}
            <Link 
              href="/admin/login" 
              className="md:hidden flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-all text-white/80"
            >
              <Lock size={12} />
              <span>כניסת ניהול</span>
            </Link>

            <div className="flex items-center space-x-reverse space-x-8 md:space-x-12">
              <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
              <Link href="/terms" className="hover:text-white transition-colors">תנאים</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">נגישות</Link>
              {/* Desktop-only management link */}
              <Link href="/admin/login" className="hidden md:flex hover:text-white transition-colors items-center gap-2">
                <Lock size={10} /> ניהול
              </Link>
            </div>
          </div>

          <div className="order-3 flex items-center space-x-reverse space-x-6">
            <span className="opacity-80 hidden sm:block">BOUTIQUE HOLISTIC CARE</span>
            <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity flex items-center gap-2">
              WAZE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
