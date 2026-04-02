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
        "max-w-4xl mx-auto text-right reveal transition-all duration-1000",
        isLight ? 'text-white' : 'text-accent'
      )}
    >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="border-b border-border/60 focus-within:border-primary transition-colors pb-5">
          <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-50">שם מלא</label>
          <input 
            type="text" 
            required
            className="bg-transparent w-full focus:outline-none text-xl font-headline font-light placeholder:opacity-10" 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-border/60 focus-within:border-primary transition-colors pb-5">
          <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-50">מייל</label>
          <input 
            type="email" 
            required
            className="bg-transparent w-full focus:outline-none text-xl font-headline font-light placeholder:opacity-10" 
            placeholder="example@email.com" 
          />
        </div>
        <div className="md:col-span-2 border-b border-border/60 focus-within:border-primary transition-colors pb-5">
          <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-50">טלפון</label>
          <input 
            type="tel" 
            required
            className="bg-transparent w-full focus:outline-none text-xl font-headline font-light placeholder:opacity-10" 
            placeholder="050 000 0000" 
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-5 opacity-50">
           <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer border-border" id="mkt" />
           <label htmlFor="mkt" className="text-[11px] uppercase tracking-[0.2em] cursor-pointer">אני מאשר/ת קבלת חומר שיווקי ממורן פז</label>
        </div>
        
        <div className="md:col-span-2 text-center pt-12">
          <button 
            type="submit"
            className={cn(
              "px-24 py-6 text-[11px] uppercase tracking-[0.8em] font-bold transition-all border",
              isLight 
                ? 'border-white text-white hover:bg-white hover:text-accent' 
                : 'border-accent text-accent hover:bg-accent hover:text-white'
            )}
          >
            שליחה
          </button>
        </div>
      </form>
    </div>
  );
}
