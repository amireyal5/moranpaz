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
        isLight ? 'text-white' : 'text-foreground'
      )}
    >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="border-b border-border focus-within:border-primary transition-colors pb-6">
          <label className="block text-[12px] uppercase tracking-[0.4em] mb-6 opacity-60 font-bold">שם מלא</label>
          <input 
            type="text" 
            required
            className="bg-transparent w-full focus:outline-none text-2xl font-headline font-light placeholder:opacity-10 py-2" 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-border focus-within:border-primary transition-colors pb-6">
          <label className="block text-[12px] uppercase tracking-[0.4em] mb-6 opacity-60 font-bold">מייל</label>
          <input 
            type="email" 
            required
            className="bg-transparent w-full focus:outline-none text-2xl font-headline font-light placeholder:opacity-10 py-2" 
            placeholder="example@email.com" 
          />
        </div>
        <div className="md:col-span-2 border-b border-border focus-within:border-primary transition-colors pb-6">
          <label className="block text-[12px] uppercase tracking-[0.4em] mb-6 opacity-60 font-bold">טלפון</label>
          <input 
            type="tel" 
            required
            className="bg-transparent w-full focus:outline-none text-2xl font-headline font-light placeholder:opacity-10 py-2" 
            placeholder="050 000 0000" 
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-6 opacity-70">
           <input type="checkbox" className="w-6 h-6 accent-primary cursor-pointer border-border" id="mkt" />
           <label htmlFor="mkt" className="text-[13px] uppercase tracking-[0.2em] cursor-pointer">אני מאשר/ת קבלת חומר שיווקי ממורן פז</label>
        </div>
        
        <div className="md:col-span-2 text-center pt-16">
          <button 
            type="submit"
            className={cn(
              "px-24 py-8 text-[14px] uppercase tracking-[0.8em] font-bold transition-all border",
              isLight 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-foreground text-foreground hover:bg-foreground hover:text-white'
            )}
          >
            שליחה
          </button>
        </div>
      </form>
    </div>
  );
}