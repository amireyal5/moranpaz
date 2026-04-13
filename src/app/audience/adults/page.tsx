
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2, Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function AdultsPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'adults') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const personalCtaReveal = useReveal();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20למבוגרים";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {pageContent?.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={pageContent.heroImageUrlDesktop}
                alt="Therapy for Adults"
                fill
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image
                src={pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop}
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
          {pageLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 w-24 bg-white/20 rounded mx-auto" />
              <div className="h-24 w-96 bg-white/20 rounded mx-auto" />
              <div className="h-8 w-72 bg-white/10 rounded mx-auto" />
            </div>
          ) : (
            <>
              <span className="boutique-label text-white/80 mb-8 block uppercase">Adult Care</span>
              <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold">
                {pageContent?.heroTitle}
              </h1>
              <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">
                {pageContent?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="pt-32 pb-32 px-4 md:px-8 xl:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title={pageContent?.introTitle ?? "טיפול רגשי למבוגרים"} />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <div className="boutique-para space-y-8">
              {pageContent?.introContent != null ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
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

      {/* Dynamic Features */}
      {pageContent?.features?.length > 0 && (
        <section className="py-24 px-4 md:px-8 xl:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageContent.features.map((feat: any, i: number) => {
                const IconMap: Record<string, React.ElementType> = { Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle };
                const Icon = IconMap[feat.icon] || Heart;
                return (
                  <div key={i} className="boutique-card group border border-stone-100 hover:border-primary/20">
                    <div className="text-primary mb-6 group-hover:scale-110 transition-transform"><Icon size={40} strokeWidth={0.2} /></div>
                    <h3 className="text-2xl font-headline font-bold text-accent mb-4">{feat.title}</h3>
                    <p className="text-lg font-light text-stone-600 leading-relaxed">{feat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic CTA Buttons */}
      {pageContent?.ctaButtons?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <CtaButtons buttons={pageContent.ctaButtons} align={pageContent?.ctaAlign} />
          </div>
        </section>
      )}

      {/* Dynamic Testimonials */}
      <TestimonialsSection customTestimonials={pageContent?.testimonials} />

      {/* Dynamic FAQs */}
      {pageContent?.faqs?.length > 0 && (
        <FaqSection items={pageContent.faqs} />
      )}

      <Footer />
    </main>
  );
}
