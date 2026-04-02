
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
    <footer className="bg-accent text-background pt-24 pb-12 px-8 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20 text-right">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-headline tracking-[0.3em] font-light mb-6">MORAN PAZ</h3>
            <p className="text-stone-400 font-light leading-relaxed max-w-sm mr-0 text-lg">
              פסיכותרפיה הוליסטית וליווי רגשי חווייתי. מרחב בטוח לגילוי, ריפוי וחיבור אותנטי לעצמך בטבעון ובעמק יזרעאל.
            </p>
          </div>
          
          {/* Navigation Section */}
          <div className="lg:col-span-2">
             <h4 className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold opacity-80">ניווט מהיר</h4>
             <nav className="flex flex-col space-y-3 text-base font-light">
                <Link href="/" className="hover:text-primary transition-colors duration-500">דף הבית</Link>
                <Link href="/about" className="hover:text-primary transition-colors duration-500">אודות</Link>
                <Link href="/practice" className="hover:text-primary transition-colors duration-500">התהליך הטיפולי</Link>
                <Link href="/workshop" className="hover:text-primary transition-colors duration-500">קורס BEINME</Link>
                <Link href="/tivon" className="hover:text-primary transition-colors duration-500">טבעון</Link>
             </nav>
          </div>

          {/* Social & Contact Section */}
          <div className="lg:col-span-2">
             <h4 className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold opacity-80">רשתות חברתיות</h4>
             <nav className="flex flex-col space-y-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100063529346610" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg font-light hover:text-primary transition-colors duration-500"
                >
                  <Facebook size={18} strokeWidth={1} className="text-primary/60" />
                  <span>BeinMe - Moran Paz</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 text-lg font-light hover:text-primary transition-colors duration-500 opacity-40 cursor-not-allowed"
                >
                  <Instagram size={18} strokeWidth={1} className="text-primary/60" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://wa.me/972507817338" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg font-light hover:text-primary transition-colors duration-500"
                >
                  <MessageCircle size={18} strokeWidth={1} className="text-primary/60" />
                  <span>WhatsApp</span>
                </a>
             </nav>
          </div>

          {/* Contact & Links Section */}
          <div className="lg:col-span-4">
             <h4 className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold opacity-80">קשר וקישורים</h4>
             <div className="space-y-4">
                <a href="mailto:moraniva5@gmail.com" className="flex items-center justify-start space-x-reverse space-x-3 text-lg font-light hover:text-primary transition-colors duration-500">
                  <Mail size={16} className="text-primary/60" />
                  <span>moraniva5@gmail.com</span>
                </a>
                <a href="tel:0507817338" className="flex items-center justify-start space-x-reverse space-x-3 text-lg font-light hover:text-primary transition-colors duration-500">
                  <Phone size={16} className="text-primary/60" />
                  <span>050-781-7338</span>
                </a>
                
                <div className="pt-4 border-t border-white/10 mt-6">
                  <a 
                    href="https://www.nefeshnet.co.il/p/moran-paz-vaknin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-stone-400 hover:text-primary transition-all text-sm tracking-wide border border-white/10 px-4 py-2 hover:bg-white/5"
                  >
                    <span>הפרופיל שלי בנפש-נט</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">
          <p>© {year} MORAN PAZ — כל הזכויות שמורות</p>
          
          <div className="flex items-center space-x-reverse space-x-8">
            <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
            <Link href="/terms" className="hover:text-white transition-colors">תנאים</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">נגישות</Link>
          </div>

          <div className="flex items-center space-x-reverse space-x-4">
            <span className="opacity-40">BOUTIQUE HOLISTIC CARE</span>
            <a 
              href="https://wa.me/972507817338" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-2 text-primary"
            >
              <MessageCircle size={14} /> WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
