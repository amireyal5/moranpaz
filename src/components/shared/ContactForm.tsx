
"use client";

import React, { useState } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function ContactForm({ isLight = false }: { isLight?: boolean }) {
  const revealRef = useReveal();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/maqlpnkl", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error("שליחת הטופס נכשלה");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in duration-1000">
        <div className="flex justify-center mb-12">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-primary w-12 h-12" strokeWidth={1} />
          </div>
        </div>
        <h3 className="text-6xl md:text-8xl font-handwriting text-accent mb-8">ההודעה נשלחה בהצלחה!</h3>
        <p className="boutique-para text-2xl font-light mb-12 max-w-lg mx-auto leading-relaxed">
          תודה שפנית אליי. קיבלתי את הפרטים שלך ואחזור אלייך בהקדם האפשרי לתיאום שיחה.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="boutique-label text-primary border-b border-primary/20 pb-2 hover:border-primary transition-all text-sm font-bold inline-flex items-center gap-4"
        >
          חזרה לטופס
          <ArrowLeft size={16} />
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={revealRef} 
      className={cn(
        "max-w-4xl mx-auto text-right reveal transition-all duration-1000 w-full",
        isLight ? 'text-white' : 'text-foreground'
      )}
    >
      <div className="w-full h-[300px] sm:h-[450px] bg-stone-100 mb-12 sm:mb-20 relative overflow-hidden group shadow-inner border border-stone-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.5967185150766!2d35.14095372397462!3d32.723342373686044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151db3dc82aa8355%3A0x440bbae69a04c650!2z16fXodedINeU16jXmdek15XXmQ!5e0!3m2!1siw!2sil!4v1775216405358!5m2!1siw!2sil" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          title="מיקום הקליניקה בטבעון"
        ></iframe>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16"
      >
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">שם מלא</label>
          <input 
            type="text" 
            name="name"
            required
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1" 
            placeholder="השם שלך" 
          />
        </div>
        <div className="border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">מייל</label>
          <input 
            type="email" 
            name="email"
            required
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1" 
            placeholder="example@email.com" 
          />
        </div>
        <div className="md:col-span-2 border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">טלפון</label>
          <input 
            type="tel" 
            name="phone"
            required
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1" 
            placeholder="050 000 0000" 
          />
        </div>

        <div className="md:col-span-2 border-b border-border focus-within:border-primary transition-colors pb-4">
          <label className="boutique-label block mb-4">איך אוכל לעזור?</label>
          <textarea 
            name="message"
            required
            rows={4}
            className="bg-transparent w-full focus:outline-none text-xl sm:text-2xl font-headline font-light placeholder:opacity-10 py-1 resize-none" 
            placeholder="ספרי לי קצת..." 
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-reverse space-x-4 opacity-70">
           <input type="checkbox" name="marketing" className="w-5 h-5 accent-primary cursor-pointer border-border" id="mkt" />
           <label htmlFor="mkt" className="text-sm sm:text-base cursor-pointer">אני מאשר/ת קבלת חומר שיווקי ממורן פז</label>
        </div>

        {status === 'error' && (
          <div className="md:col-span-2 flex items-center gap-4 text-destructive bg-destructive/5 p-4 rounded-sm animate-in fade-in">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">סליחה, אירעה שגיאה בשליחה. אנא נסה שוב או פנה אליי בוואטסאפ.</p>
          </div>
        )}
        
        <div className="md:col-span-2 text-center pt-8">
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className={cn(
              "w-full md:w-auto px-12 sm:px-20 py-4 sm:py-5 text-sm uppercase tracking-[0.3em] font-bold transition-all border disabled:opacity-50 disabled:cursor-not-allowed",
              isLight 
                ? 'border-white !text-white hover:bg-white hover:!text-black' 
                : 'border-accent bg-accent !text-white hover:bg-primary hover:border-primary'
            )}
          >
            {status === 'submitting' ? 'שולח...' : 'שליחת פנייה'}
          </button>
        </div>
      </form>
    </div>
  );
}
