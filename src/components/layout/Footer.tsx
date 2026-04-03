
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, ExternalLink, Facebook, Instagram } from 'lucide-react';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const wazeLink = "https://waze.com/ul?ll=32.723342373686044,35.14095372397462&navigate=yes";

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-accent text-white pt-32 pb-12 px-8 md:px-20 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Mashrabiya Texture */}
      <div className="absolute inset-0 mashrabiya-divider opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-24 text-right">
          
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-headline tracking-[0.4em] font-light mb-4 text-white">MORAN PAZ</h3>
            <span className="text-white font-handwriting text-5xl block mb-8 opacity-100">BeinMe — להיות אני בתוכי</span>
            <p className="text-white/80 font-light leading-relaxed max-w-md mr-0 text-xl">
              פסיכותרפיה הוליסטית וליווי רגשי המשלב גוף, נפש ורוח. מרחב בטוח לגילוי, ריפוי וחיבור לסמכות הפנימית בטבעון ובאונליין.
            </p>
          </div>
          
          {/* Navigation Section */}
          <div className="lg:col-span-2">
             <h4 className="boutique-label !text-white border-b border-white/20 pb-2 mb-10 inline-block opacity-100">ניווט מהיר</h4>
             <nav className="flex flex-col space-y-4 text-lg font-light">
                <Link href="/" className="text-white/90 hover:text-white transition-colors duration-500">דף הבית</Link>
                <Link href="/about" className="text-white/90 hover:text-white transition-colors duration-500">אודות</Link>
                <Link href="/practice" className="text-white/90 hover:text-white transition-colors duration-500">התהליך הטיפולי</Link>
                <Link href="/online-therapy" className="text-white/90 hover:text-white transition-colors duration-500">טיפול אונליין</Link>
                <Link href="/blog" className="text-white/90 hover:text-white transition-colors duration-500">נקודות של אור</Link>
             </nav>
          </div>

          {/* Social Section */}
          <div className="lg:col-span-2">
             <h4 className="boutique-label !text-white border-b border-white/20 pb-2 mb-10 inline-block opacity-100">רשתות חברתיות</h4>
             <nav className="flex flex-col space-y-6">
                <a 
                  href="https://www.facebook.com/profile.php?id=100063529346610" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-light text-white/90 hover:text-white transition-colors duration-500"
                >
                  <Facebook size={20} strokeWidth={1} />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/beinme_moranpaz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-light text-white/90 hover:text-white transition-colors duration-500"
                >
                  <Instagram size={20} strokeWidth={1} />
                  <span>Instagram</span>
                </a>
             </nav>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
             <h4 className="boutique-label !text-white border-b border-white/20 pb-2 mb-10 inline-block opacity-100">יצירת קשר</h4>
             <div className="space-y-6">
                <a href="mailto:moraniva5@gmail.com" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-white transition-colors duration-500">
                  <Mail size={18} className="opacity-80" />
                  <span>moraniva5@gmail.com</span>
                </a>
                <a href="tel:0507817338" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light text-white/90 hover:text-white transition-colors duration-500">
                  <Phone size={18} className="opacity-80" />
                  <span>050-781-7338</span>
                </a>
                
                <div className="pt-8 border-t border-white/10 mt-8">
                  <a 
                    href="https://www.nefeshnet.co.il/p/moran-paz-vaknin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 text-white/80 hover:text-white transition-all text-sm tracking-widest border border-white/20 px-6 py-3 hover:bg-white/5"
                  >
                    <span>הפרופיל בנפש-נט</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-[11px] uppercase tracking-[0.3em] text-white/60 font-bold">
          <p>© {year} BEINME — מורן פז — כל הזכויות שמורות</p>
          
          <div className="flex items-center space-x-reverse space-x-12">
            <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
            <Link href="/terms" className="hover:text-white transition-colors">תנאים</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">נגישות</Link>
          </div>

          <div className="flex items-center space-x-reverse space-x-6">
            <span className="opacity-80 hidden sm:block">BOUTIQUE HOLISTIC CARE</span>
            
            <div className="flex items-center space-x-reverse space-x-6">
              <a 
                href="https://wa.me/972507817338" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <WhatsAppIcon size={18} className="text-slate-400" /> WHATSAPP
              </a>
              <a 
                href={wazeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:opacity-70 transition-opacity flex items-center gap-2 md:hidden"
              >
                <WazeIcon size={24} /> WAZE
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
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path fill="#33CCFF" d="M388.6 114.3C344.2 69.8 285.2 45.4 222.6 45.4c-62.6 0-121.6 24.4-165.9 68.9-44.4 44.4-68.8 103.4-68.8 166 0 55.4 19.3 108.3 55.5 150.3 3.9 4.6 9.7 7.3 15.8 7.3h3.5c4.7 0 9.2-1.6 12.8-4.5 14.5-11.4 32.2-17.7 51.1-17.7 10.3 0 20.3 1.9 29.8 5.6 10.5 4.1 16.5 14.9 14.5 25.8-1.5 8.1-1.3 16.5.6 24.5 4.7 19.5 22.3 33.3 42.4 33.3h106c20.1 0 37.7-13.8 42.4-33.3 1.9-8 2.1-16.4.6-24.5-2-10.9 4-21.7 14.5-25.8 9.5-3.7 19.5-5.6 29.8-5.6 18.9 0 36.6 6.3 51.1 17.7 3.6 2.9 8.1 4.5 12.8 4.5h3.5c6.1 0 11.9-2.7 15.8-7.3 36.2-42 55.5-94.9 55.5-150.3 0-62.6-24.4-121.6-68.9-166z"/>
      <path fill="#FFFFFF" d="M388.6 114.3c-41-41-94.8-64.2-152.6-67.4v42.1c47.1 2.8 91.1 22 124.1 54.1s53.8 75.3 58.7 121.3c.7 6.4 6 11.2 12.4 11.2 1.3 0 2.6-.2 3.9-.6 7.4-2.4 11.5-10.4 9.1-17.8-6.1-56.7-32.3-109-75.6-142.9z" opacity=".2"/>
      <circle fill="#000000" cx="178.6" cy="235.3" r="28.4"/>
      <circle fill="#000000" cx="333.4" cy="235.3" r="28.4"/>
      <path fill="#000000" d="M256 364.5c-44.5 0-82.6-27.1-98.3-65.7-2.1-5.2-7.1-8.5-12.7-8.5-1.5 0-3 .2-4.5.8-7.2 2.7-10.8 10.8-8.1 18 21.6 52.8 73.1 89.9 133.6 89.9s112-37.1 133.6-89.9c2.7-7.2-.9-15.3-8.1-18-7.2-2.7-15.3.9-18 8.1-15.7 38.6-53.8 65.7-98.3 65.7z"/>
      <circle fill="#FFFFFF" stroke="#000000" strokeWidth="12" cx="152.6" cy="426.7" r="32"/>
      <circle fill="#FFFFFF" stroke="#000000" strokeWidth="12" cx="359.4" cy="426.7" r="32"/>
    </svg>
  );
}
