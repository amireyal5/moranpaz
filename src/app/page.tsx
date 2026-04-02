
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { useReveal } from '@/hooks/use-reveal';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroReveal = useReveal();
  const aboutReveal = useReveal();
  const contactReveal = useReveal();

  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt={heroImg.description} 
              fill
              className="object-cover opacity-60 grayscale brightness-50"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
        <div ref={heroReveal} className="relative z-10 text-center px-6 reveal">
           <span className="block text-primary text-xs md:text-sm uppercase tracking-[0.5em] mb-6 font-extrabold bg-white/10 backdrop-blur-md inline-block px-4 py-1 rounded-full">מטפלת רגשית בעמק יזרעאל</span>
           <h1 className="text-[12vw] md:text-[9vw] font-headline leading-none tracking-tighter text-white mb-12">
             להתחבר | לגלות | <span className="italic font-light text-primary">להשתנות</span>
           </h1>
           <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="#contact" className="bg-primary text-white px-12 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-primary/90 hover:scale-105 transition-all shadow-2xl">
                צרו קשר
              </Link>
              <Link href="/practice" className="text-white text-xs uppercase tracking-widest font-bold border-b border-white/40 pb-1 hover:border-white transition-all">
                מה אני מציעה?
              </Link>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-20 bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div ref={aboutReveal} className="lg:col-span-7 text-right reveal">
             <SectionTitle subtitle="About Moran" title="נעים מאוד, מורן פז" number="01" />
             <p className="text-2xl md:text-4xl font-headline italic mb-10 text-accent leading-snug">
               "אנחנו לא רק מה שהיינו – אנחנו גם מה שנהיה."
             </p>
             <div className="space-y-8 text-lg md:text-xl font-light text-stone-700 leading-relaxed">
                <p>פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב.</p>
                <p>בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. אני מאמינה בפוטנציאל הנשמתי של כל אדם לממש את עצמו ולהעניק לעולם את המתנות שלו.</p>
                <div className="p-6 bg-secondary rounded-3xl border-r-8 border-primary">
                  <p className="font-bold text-accent">בעשור האחרון עברתי מסע אישי מרפא וכיום אני מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם – ולחיות את חייהם דרך אותו החיבור.</p>
                </div>
                <p className="text-stone-500 italic text-base">התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, ביטוי אותנטי, בריאות נפשית ופיזית גבוהה יותר.</p>
             </div>
          </div>
          <div className="lg:col-span-5 relative">
             <div className="aspect-[3/4] rounded-[3rem] overflow-hidden grayscale shadow-2xl relative z-10 border-4 border-white">
                {portraitImg && (
                  <Image 
                    src={portraitImg.imageUrl} 
                    alt={portraitImg.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={portraitImg.imageHint}
                  />
                )}
             </div>
             <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
             <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Unified Contact */}
      <section id="contact" className="py-32 px-6 md:px-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle subtitle="Contact" title="בואו נדבר" isLight={true} number="C" />
          <p className="text-2xl md:text-3xl font-headline italic mb-16 text-center text-stone-400">
            שיחת ייעוץ ראשונית – ללא עלות וללא התחייבות.
          </p>
          <ContactForm isLight={true} />
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
             <a href="https://wa.me/972500000000" className="flex flex-col items-center space-y-3 group">
                <div className="p-5 border border-primary/40 rounded-full group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-2">
                  <MessageCircle size={24} />
                </div>
                <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Whatsapp</span>
             </a>
             <a href="mailto:contact@moranpaz.com" className="flex flex-col items-center space-y-3 group">
                <div className="p-5 border border-primary/40 rounded-full group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-2">
                  <Mail size={24} />
                </div>
                <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Email</span>
             </a>
             <a href="tel:0500000000" className="flex flex-col items-center space-y-3 group">
                <div className="p-5 border border-primary/40 rounded-full group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-2">
                  <Phone size={24} />
                </div>
                <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Call Me</span>
             </a>
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
