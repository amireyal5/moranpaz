"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Orbit, Waves, Infinity, Compass, Quote, GraduationCap, Briefcase, Sparkles, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const personalInviteReveal = useReveal();
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-about');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20קראתי%20עליך%20באתר%20ואשמח%20לפרטים%20על%20תהליך%20טיפולי";

  const credentials = [
    {
      title: "M.A ייעוץ ארגוני",
      subtitle: "אוניברסיטת חיפה",
      icon: <GraduationCap size={24} />
    },
    {
      title: "פסיכותרפיה הוליסטית",
      subtitle: "הכשרה מקצועית מעמיקה",
      icon: <Briefcase size={24} />
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="About Moran Paz" 
              fill 
              className="object-cover opacity-50 brightness-[0.8]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">About Moran Paz</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold">נעים מאוד, מורן פז</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">להיות אני בתוכי — לגלות את הסמכות הפנימית שלך</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-8 border-stone-50">
                  {portraitImg && (
                    <Image 
                      src={portraitImg.imageUrl} 
                      alt="מורן פז" 
                      fill 
                      className="object-cover"
                      data-ai-hint={portraitImg.imageHint}
                    />
                  )}
               </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
               <div ref={introReveal} className="relative reveal pr-12 py-4">
                  <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
                  <div className="border-r-[3px] border-primary/20 pr-10 py-1">
                    <p className="text-3xl md:text-5xl font-headline text-accent italic font-light leading-snug relative z-10">
                      שינוי מתחיל מפגישה וקבלה של חלקים שבנו.
                    </p>
                  </div>
               </div>
               <div className="space-y-10 boutique-para text-stone-600 leading-relaxed">
                  <p>
                    פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. 
                    אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב. 
                  </p>
                  <p>
                    בעבודתי אני משלבת הכרות מעמיקה עם מגוון אוכלוסיות יחד עם גישה אנושית חמה ובגובה העיניים. אני כאן ללוות אותך במסע לגילוי מפת הדרכים הפנימית שלך.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                    {credentials.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 bg-stone-50 border border-stone-100">
                        <div className="text-primary">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-accent">{item.title}</h4>
                          <p className="text-sm opacity-60">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="pt-12">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-16 py-4 bg-primary text-white boutique-label hover:bg-accent transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[220px] justify-center"
                  >
                    תאום שיחת היכרות
                  </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-56 px-8 md:px-24 bg-stone-50 reveal border-y border-stone-100">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Philosophy" title="השילוב בין גוף, נפש ורוח" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32">
            {[
              { title: "גוף", icon: <Orbit />, desc: "הקשבה לתחושות הפיזיות כפתח לעולם הרגשי." },
              { title: "נפש", icon: <Heart />, desc: "עיבוד רגשות, דפוסים והסיפור שאנחנו מספרים לעצמנו." },
              { title: "רוח", icon: <Sparkles />, desc: "חיבור לסמכות הפנימית, למודעות ולאור שבתוכנו." }
            ].map((point, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-8 group">
                <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                   {React.cloneElement(point.icon as React.ReactElement, { size: 48, strokeWidth: 0.2 })}
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-headline font-bold text-accent">{point.title}</h4>
                  <p className="text-xl font-light text-stone-500 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
