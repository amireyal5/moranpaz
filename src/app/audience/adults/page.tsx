
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function AdultsPage() {
  const db = useFirestore();
  const contentRef = db ? doc(db, 'siteContent', 'adults') : null;
  const { data: pageContent } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const personalCtaReveal = useReveal();
  const heroImgFallback = PlaceHolderImages.find(img => img.id === 'hero-practice');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20למבוגרים";

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
                alt="Therapy for Adults" 
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
                alt="Therapy for Adults Mobile" 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block uppercase">Adult Care</span>
           <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold">
             {pageContent?.heroTitle || "טיפול למבוגרים"}
           </h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">
             {pageContent?.heroSubtitle || "למצוא עוגן בתוך סערות החיים"}
           </p>
        </div>
      </section>

      <section className="pt-32 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title={pageContent?.introTitle || "טיפול רגשי למבוגרים"} />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <div className="boutique-para space-y-8">
              {pageContent?.introContent ? (
                <div className="blog-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              ) : (
                <>
                  <p>החיים הבוגרים מזמנים לנו אינסוף אתגרים – בקריירה, בזוגיות, בהורות ובמפגש היומיומי עם עצמנו.</p>
                  <p>הטיפול למבוגרים בקליניקה הוא מרחב שקט ומכיל, שבו נוכל יחד לעבד את החוויות ולייצר שינוי אמיתי.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Adults Personal Appeal */}
      <section ref={personalCtaReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className="text-6xl md:text-8xl font-handwriting text-accent leading-none">הגיע הזמן שלך להרגיש חופשי</h3>
          <p className="boutique-para text-2xl font-light leading-relaxed">
            אני מזמינה אותך ליצור עבורך את המרחב לשקט פנימי וצמיחה. בואי נתחיל בשיחת היכרות פשוטה שבה נבדוק איך אני יכולה ללוות אותך.
          </p>
          <div className="pt-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
            >
              תאום שיחת היכרות אישית
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
