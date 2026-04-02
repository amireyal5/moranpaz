
"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 md:px-20 border-t border-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-10 md:space-y-0 text-center md:text-right">
          <div className="max-w-xs">
            <h3 className="text-2xl font-headline font-bold text-foreground mb-4">MORAN PAZ</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              מלווה אנשים למצוא את הדרך שלהם פנימה - לחיבור העמוק והאותנטי עם עצמם.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4 text-sm font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">בית</Link>
            <Link href="/practice" className="hover:text-primary transition-colors">התהליך הטיפולי</Link>
            <Link href="/workshop" className="hover:text-primary transition-colors">סדנת BEINME</Link>
            <Link href="/tivon" className="hover:text-primary transition-colors">טיפול בטבעון</Link>
          </div>

          <div className="flex space-x-reverse space-x-4">
            <a href="https://wa.me/972500000000" className="p-3 bg-secondary rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <MessageCircle size={20} />
            </a>
            <a href="tel:0500000000" className="p-3 bg-secondary rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Phone size={20} />
            </a>
            <a href="mailto:contact@moranpaz.com" className="p-3 bg-secondary rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-[0.2em] text-stone-400">
          <p>© 2024 מורן פז - פסיכותרפיה הוליסטית</p>
          <p>נבנה באהבה | עוזרת וירטואלית מבוססת AI</p>
        </div>
      </div>
    </footer>
  );
}
