"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-accent text-background pt-32 pb-16 px-8 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 text-right">
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-headline tracking-widest font-light mb-8">MORAN PAZ</h3>
            <p className="text-stone-400 font-light leading-relaxed max-w-sm mr-0">
              פסיכותרפיה הוליסטית וליווי רגשי. מקום שקט לנשימה, גילוי וחיבור עמוק לעצמך.
            </p>
          </div>
          
          <div className="lg:col-span-3">
             <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary mb-8">ניווט</h4>
             <div className="flex flex-col space-y-4 text-sm font-light">
                <Link href="/" className="hover:text-primary transition-colors">דף הבית</Link>
                <Link href="/practice" className="hover:text-primary transition-colors">התהליך הטיפולי</Link>
                <Link href="/workshop" className="hover:text-primary transition-colors">סדנת BEINME</Link>
                <Link href="/tivon" className="hover:text-primary transition-colors">טיפול בטבעון</Link>
             </div>
          </div>

          <div className="lg:col-span-4">
             <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary mb-8">קשר</h4>
             <div className="space-y-6">
                <a href="mailto:contact@moranpaz.com" className="block text-xl font-headline font-light hover:text-primary transition-colors">contact@moranpaz.com</a>
                <a href="tel:0500000000" className="block text-xl font-headline font-light hover:text-primary transition-colors">050-000-0000</a>
                <div className="flex space-x-reverse space-x-6 pt-4">
                  <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><MessageCircle size={18} /></a>
                  <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><Phone size={18} /></a>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[9px] uppercase tracking-[0.3em] text-stone-500">
          <p>© 2024 MORAN PAZ — HOLISTIC THERAPY</p>
          <div className="flex space-x-reverse space-x-10">
            <span>Built by AI Studio</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}