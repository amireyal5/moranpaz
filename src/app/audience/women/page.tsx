
"use client";

import React, { useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { Sparkles, Heart, Quote } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function WomenPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'women') : null, [db]);
  const { data: pageContent } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const personalAppealReveal = useReveal();
  const heroImgFallback = PlaceHolderImages.find(img => img.id === 'hero-women') || PlaceHolderImages.find(img => img.id === 'hero-about-desktop');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20ליווי%20רגשי%20לנשים";

  const heroDesktopSrc = pageContent?.heroImageUrlDesktop || heroImgFallback?.imageUrl;
  const heroMobileSrc = pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop || heroImgFallback?.imageUrl;

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroDesktopSrc && (
            <div className="hidden md:block absolute inset-0">
              <Image 
                src={heroDesktopSrc} 
                alt="Therapy for Women" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          {heroMobileSrc && (
            <div className="md:hidden absolute inset-0">
              <Image 
                src={heroMobileSrc} 
                alt="Therapy for Women Mobile" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block uppercase tracking-[0.4em]">Women Empowerment</span>
           <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold">
             {pageContent?.heroTitle || "ליווי רגשי לנשים"}
           </h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">
             {pageContent?.heroSubtitle || "לחזור אל הבית הפנימי שלך"}
           </p>
        </div>
      </section>

      <section className="pt-32 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title={pageContent?.introTitle || "טיפול וליווי לנשים"} />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <div className="boutique-para space-y-8 text-stone-600">
              {pageContent?.introContent ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              ) : (
                <>
                  <p>כאישה, את ודאי חווה עומס רגשי ופיזי כבד, כשאת מתמרנת בין שלל תפקידים ומנסה להחזיק הכל.</p>
                  <p>הטיפול והליווי לנשים בקליניקה שלי הוא הזמנה עבורך לעצור ולהקשיב למה שמבקש ביטוי בתוכך.</p>
                </>
              )}
            </div>

            <div className="relative pr-12 py-12 my-16">
              <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
              <div className="border-r-[3px] border-primary/20 pr-10 py-1">
                <p className="text-3xl md:text-5xl font-headline text-accent italic font-light leading-snug relative z-10">
                  הרגשות שלך הם המצפן ולכל אחת מאיתנו יש את מפת הדרכים הפנימית שלה לחייה.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={personalAppealReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className="text-6xl md:text-8xl font-handwriting text-accent leading-none">הגיע הזמן לפגוש את עצמך</h3>
          <p className="boutique-para text-2xl font-light leading-relaxed">
            אנשים כאן כדי לספק לך את המקום בו תוכלי להניח הכל ולחזור לעצמך. פני אליי לשיחת היכרות אישית ונתחיל את המסע שלך פנימה.
          </p>
          <div className="pt-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
            >
              תאום פגישת היכרות לנשים
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
