"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle, ExternalLink, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

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
            <h3 className="text-3xl font-headline tracking-[0.4em] font-light mb-4">MORAN PAZ</h3>
            <span className="text-primary font-handwriting text-3xl block mb-8">BeinMe — להיות אני בתוכי</span>
            <p className="text-stone-400 font-light leading-relaxed max-w-md mr-0 text-xl">
              פסיכותרפיה הוליסטית וליווי רגשי המשלב גוף, נפש ורוח. מרחב בטוח לגילוי, ריפוי וחיבור לסמכות הפנימית בטבעון ובאונליין.
            </p>
          </div>
          
          {/* Navigation Section */}
          <div className="lg:col-span-2">
             <h4 className="boutique-label text-primary mb-10 block opacity-100">ניווט מהיר</h4>
             <nav className="flex flex-col space-y-4 text-lg font-light">
                <Link href="/" className="hover:text-primary transition-colors duration-500">דף הבית</Link>
                <Link href="/about" className="hover:text-primary transition-colors duration-500">אודות</Link>
                <Link href="/practice" className="hover:text-primary transition-colors duration-500">התהליך הטיפולי</Link>
                <Link href="/online-therapy" className="hover:text-primary transition-colors duration-500">טיפול אונליין</Link>
                <Link href="/blog" className="hover:text-primary transition-colors duration-500">נקודות של אור</Link>
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
                  className="flex items-center gap-4 text-xl font-light hover:text-primary transition-colors duration-500"
                >
                  <Facebook size={20} strokeWidth={1} className="text-primary/60" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/beinme_moranpaz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-light hover:text-primary transition-colors duration-500"
                >
                  <Instagram size={20} strokeWidth={1} className="text-primary/60" />
                  <span>Instagram</span>
                </a>
             </nav>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
             <h4 className="boutique-label text-primary mb-10 block opacity-100">יצירת קשר</h4>
             <div className="space-y-6">
                <a href="mailto:moraniva5@gmail.com" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light hover:text-primary transition-colors duration-500">
                  <Mail size={18} className="text-primary/60" />
                  <span>moraniva5@gmail.com</span>
                </a>
                <a href="tel:0507817338" className="flex items-center justify-start space-x-reverse space-x-4 text-xl font-light hover:text-primary transition-colors duration-500">
                  <Phone size={18} className="text-primary/60" />
                  <span>050-781-7338</span>
                </a>
                
                <div className="pt-8 border-t border-white/10 mt-8">
                  <a 
                    href="https://www.nefeshnet.co.il/p/moran-paz-vaknin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 text-stone-400 hover:text-primary transition-all text-sm tracking-widest border border-white/10 px-6 py-3 hover:bg-white/5"
                  >
                    <span>הפרופיל בנפש-נט</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-[11px] uppercase tracking-[0.3em] text-stone-500 font-bold">
          <p>© {year} BEINME — מורן פז — כל הזכויות שמורות</p>
          
          <div className="flex items-center space-x-reverse space-x-12">
            <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
            <Link href="/terms" className="hover:text-white transition-colors">תנאים</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">נגישות</Link>
          </div>

          <div className="flex items-center space-x-reverse space-x-6">
            <span className="opacity-40">BOUTIQUE HOLISTIC CARE</span>
            <a 
              href="https://wa.me/972507817338" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-white transition-colors flex items-center gap-2"
            >
              <MessageCircle size={16} /> WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}