
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle, ExternalLink, Facebook, Instagram, Navigation } from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const wazeLink = "https://waze.com/ul?ll=32.723342373686044,35.14095372397462&navigate=yes";

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-accent text-background pt-32 pb-12 px-8 md:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Mashrabiya Texture */}
      <div className="absolute inset-0 mashrabiya-divider opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-24 text-right">
          
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-headline tracking-[0.4em] font-light mb-4 text-white">MORAN PAZ</h3>
            <span className="text-primary font-handwriting text-3xl block mb-8">BeinMe — להיות אני בתוכי</span>
            <p className="text-white/70 font-light leading-relaxed max-w-md mr-0 text-xl">
              פסיכותרפיה הוליסטית וליווי רגשי המשלב גוף, נפש ורוח. מרחב בטוח לגילוי, ריפוי וחיבור לסמכות הפנימית בטבעון ובאונליין.
            </p>
          </div>
          
          {/* Navigation Section */}
          <div className="lg:col-span-2">
             <h4 className="boutique-label text-primary mb-10 block opacity-100">ניווט מהיר</h4>
             <nav className="flex flex-col space-y-4 text-lg font-light">
                <Link href="/" className="text-white/90 hover:text-primary transition-colors duration-500">דף הבית</Link>
                <Link href="/about" className="text-white/90 hover:text-primary transition-colors duration-500">אודות</Link>
                <Link href="/practice" className="text-white/90 hover:text-primary transition-colors duration-500">התהליך הטיפולי</Link>
                <Link href="/online-therapy" className="text-white/90 hover:text-primary transition-colors duration-500">טיפול אונליין</Link>
                <Link href="/blog" className="text-white/90 hover:text-primary transition-colors duration-500">נקודות של אור</Link>
             </nav>
          </div>

          {/* Social Section */}
          <div className="lg:col-span-2">
             <h4 className="boutique-label text-primary mb-10 block opacity-100">רשתות חברתיות</h4>
             <nav className="flex flex-col space-y-6">
                <a 
                  href="https://www.facebook.com/profile.php?id=100063529346610" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-light text-white/90 hover:text-primary transition-colors duration-500"
                >
                  <Facebook size={20} strokeWidth={1} className="text-primary/80" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/beinme_moranpaz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-light text-white/90 hover:text-primary transition-colors duration-500"
                >
                  <Instagram size={20} strokeWidth={1} className="text-primary/80" />
                  <span>Instagram</span>
                </a>
             </nav>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
             <h4 className="boutique-label text-primary mb-10 block opacity-100">יצירת קשר</h4>
             <div className="space-y-6">
                <a href="mailto:moraniva5@gmail.com" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-primary transition-colors duration-500">
                  <Mail size={18} className="text-primary/80" />
                  <span>moraniva5@gmail.com</span>
                </a>
                <a href="tel:0507817338" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-primary transition-colors duration-500">
                  <Phone size={18} className="text-primary/80" />
                  <span>050-781-7338</span>
                </a>
                
                {/* Waze Link for Mobile in Contact Area */}
                <a 
                  href={wazeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-primary transition-colors duration-500 md:hidden"
                >
                  <WazeIcon className="text-primary/80" />
                  <span>ניווט לקליניקה ב-Waze</span>
                </a>

                <div className="pt-8 border-t border-white/10 mt-8">
                  <a 
                    href="https://www.nefeshnet.co.il/p/moran-paz-vaknin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 text-white/60 hover:text-primary transition-all text-sm tracking-widest border border-white/10 px-6 py-3 hover:bg-white/5"
                  >
                    <span>הפרופיל בנפש-נט</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">
          <p>© {year} BEINME — מורן פז — כל הזכויות שמורות</p>
          
          <div className="flex items-center space-x-reverse space-x-12">
            <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
            <Link href="/terms" className="hover:text-white transition-colors">תנאים</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">נגישות</Link>
          </div>

          <div className="flex items-center space-x-reverse space-x-6">
            <span className="opacity-40 hidden sm:block">BOUTIQUE HOLISTIC CARE</span>
            
            <div className="flex items-center space-x-reverse space-x-6">
              <a 
                href="https://wa.me/972507817338" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-white transition-colors flex items-center gap-2"
              >
                <MessageCircle size={16} /> WHATSAPP
              </a>
              <a 
                href={wazeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-white transition-colors flex items-center gap-2 md:hidden"
              >
                <WazeIcon size={16} /> WAZE
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WazeIcon({ size = 18, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M19.1 11.1c.1.4.2.8.2 1.3 0 3.7-3 6.6-6.6 6.6-1.1 0-2-.3-2.9-.8l-2.4.7c-.4.1-.8-.3-.7-.7l.7-2.4c-.5-.9-.8-1.8-.8-2.9 0-3.7 3-6.6 6.6-6.6 3.7 0 6.6 3 6.6 6.6.1 1.1-.1 2-.7 2.8zm-1.8-1.7c-.4 0-.8.3-.8.8 0 .4.3.8.8.8s.8-.3.8-.8-.3-.8-.8-.8zm-4.7 0c-.4 0-.8.3-.8.8 0 .4.3.8.8.8s.8-.3.8-.8-.3-.8-.8-.8zm7.4 1.2c0-5.5-4.5-10-10-10S0 5.1 0 10.6c0 1.2.2 2.3.6 3.4l-2.1 5.5c-.3.7.4 1.4 1.1 1.1l5.5-2.1c1.1.4 2.2.6 3.4.6 5.5 0 10-4.5 10-10 0-1.2-.2-2.3-.6-3.4 2.7 1.5 4.7 4.2 4.7 7.3 0 2.6-1.2 5-3.1 6.5.4 1.1.7 2.3.7 3.5 0 3.1-2.5 5.6-5.6 5.6-1.2 0-2.4-.4-3.5-1.1-1.5 1.9-3.9 3.1-6.5 3.1-4.7 0-8.5-3.8-8.5-8.5 0-.4 0-.8.1-1.2-2.1-1.5-3.6-3.9-3.6-6.6 0-3.1 2-5.7 4.7-7.3z"/>
    </svg>
  );
}
