
"use client";

import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { cn } from '@/lib/utils';

export function FloatingWhatsApp() {
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20מהאתר%20ואשמח%20לפרטים%20על%20תהליך%20טיפולי";

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-24 left-6 sm:bottom-8 sm:left-8 z-[140]",
        "opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-700 group flex items-center justify-center"
      )}
      aria-label="WhatsApp"
    >
      <WhatsAppIcon 
        size={40} 
        variant="outline" 
        className="group-hover:rotate-12 transition-transform text-slate-400" 
      />
      <span className="absolute left-full ml-4 bg-white/90 backdrop-blur-sm text-accent px-4 py-2 rounded-sm text-[10px] font-bold tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none hidden sm:block border border-primary/10">
        דברו איתי בוואטסאפ
      </span>
    </a>
  );
}
