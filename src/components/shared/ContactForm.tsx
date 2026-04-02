"use client";

import React from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

export function ContactForm({ isLight = false }: { isLight?: boolean }) {
  const revealRef = useReveal();

  return (
    <div 
      ref={revealRef} 
      className={cn(
        "max-w-4xl mx-auto text-right reveal transition-all duration-700",
        isLight ? 'text-white' : 'text-accent'
      )}
    >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="block text-[9px] uppercase tracking-widest mb-3 opacity-60">שם מלא</label>
          <input 
            type="text" 
            required
            className="bg-transparent w-full focus:outline-none text-xl font-headline font-light placeholder:opacity-20" 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="block text-[9px] uppercase tracking-widest mb-3 opacity-60">טלפון</label>
          <input 
            type="tel" 
            required
            className="bg-transparent w-full focus:outline-none text-xl font-headline font-light placeholder:opacity-20" 
            placeholder="050 000 0000" 
          />
        </div>
        <div className="md:col-span-2 border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="block text-[9px] uppercase tracking-widest mb-3 opacity-60">הודעה (אופציונלי)</label>
          <input 
            type="text" 
            className="bg-transparent w-full focus:outline-none text-xl font-headline font-light placeholder:opacity-20" 
            placeholder="ספרי לי קצת..." 
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-4 opacity-60">
           <input type="checkbox" className="w-4 h-4 accent-primary cursor-pointer border-border" id="mkt" />
           <label htmlFor="mkt" className="text-[10px] uppercase tracking-wider cursor-pointer">אני מאשר/ת קבלת עדכונים</label>
        </div>
        
        <div className="md:col-span-2 text-center pt-8">
          <button 
            type="submit"
            className={cn(
              "px-16 py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all border",
              isLight 
                ? 'border-white text-white hover:bg-white hover:text-accent' 
                : 'border-accent text-accent hover:bg-accent hover:text-white'
            )}
          >
            שלחי הודעה
          </button>
        </div>
      </form>
    </div>
  );
}