"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { useReveal } from '@/hooks/use-reveal';
import { PortraitImage } from '@/components/shared/PortraitImage';
import { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function Home() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'home') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const heroReveal = useReveal();
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20BeinMe%20ואשמח%20לפרטים%20נוספים";

  const homeFaqs = pageContent?.faqs || [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים לנשים ונוער החווים עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמם. אני עובדת בטבעון ובאונליין."
    },
    {
      question: "מהי פסיכותרפיה הוליסטית ואיך היא עוזרת?",
      answer: "פסיכותרפיה הוליסטית רואה באדם שלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים (כמו מיינדפולנס, עבודת צללים ופוקוסינג) כדי לייצר שינוי עמוק ויציב."
    },
    {
      question: "איך מתחילים?",
      answer: "הצעד הראשון הוא שיחת היכרות קצרה שבה נבדוק את ההתאמה ונבין מה המטרה שלכם בתהליך."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden" style={{ '--primary': pageContent?.primaryColor } as any}>
      <Navbar />
      
      {/* Hero Section with Soft Reveal */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          {pageContent?.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={pageContent.heroImageUrlDesktop}
                alt="BeinMe - Moran Paz"
                fill
                className="object-cover opacity-60 brightness-[0.75]"
                priority
              />
            </div>
          )}
          {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image
                src={pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop}
                alt="BeinMe - Moran Paz"
                fill
                className="object-cover opacity-60 brightness-[0.75]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background/20"></div>
        </div>

        <div ref={heroReveal} className="relative z-10 text-center reveal flex flex-col items-center w-full max-w-5xl mx-auto px-6">
          {pageLoading ? (
            <div className="space-y-8 animate-pulse flex flex-col items-center w-full">
              <div className="h-3 w-40 bg-white/20 rounded" />
              <div className="h-20 w-3/4 bg-white/20 rounded" />
              <div className="h-8 w-1/2 bg-white/10 rounded" />
              <div className="h-12 w-52 bg-white/10 rounded" />
            </div>
          ) : (
            <>
              <span className="boutique-label text-white/90 mb-6 sm:mb-8 block drop-shadow-md stagger-1">Moran Paz • BeinMe</span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[90px] 2xl:text-[110px] font-bold leading-tight font-handwriting text-white mb-6 sm:mb-8 hero-title-shadow stagger-2 break-words w-full">
                {pageContent?.heroTitle}
              </h1>
              <h2 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-headline italic mb-10 sm:mb-12 text-white/95 font-light max-w-2xl xl:max-w-3xl leading-relaxed hero-para-shadow stagger-3">
                {pageContent?.heroSubtitle}
              </h2>
              <div className="pt-2 sm:pt-4 stagger-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 sm:px-20 py-4 sm:py-5 bg-primary !text-white boutique-label !text-[12px] sm:!text-[14px] hover:bg-white hover:!text-accent transition-all duration-700 shadow-2xl rounded-sm flex items-center justify-center whitespace-nowrap !opacity-100 min-w-[240px] sm:min-w-[300px]"
                >
                  קביעת פגישת היכרות
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Intro Agenda Section */}
      <section ref={introReveal} className="py-24 md:py-32 xl:py-40 px-6 md:px-12 xl:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <PortraitImage
                src={pageContent?.portraitImageUrl}
                loading={pageLoading}
                shape={(pageContent?.portraitShape as any) || 'rectangle'}
                alt="מורן פז"
                className="image-zoom-container max-w-md mx-auto lg:max-w-none"
              />
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-10 sm:space-y-16">
              {pageLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-3 w-24 bg-stone-200 rounded" />
                  <div className="h-16 w-5/6 bg-stone-200 rounded" />
                  <div className="h-4 w-full bg-stone-100 rounded" />
                  <div className="h-4 w-5/6 bg-stone-100 rounded" />
                  <div className="h-4 w-4/6 bg-stone-100 rounded" />
                </div>
              ) : (
                <>
                  <div className="relative">
                    <span className="boutique-label text-primary/70 mb-4 block">The Agenda</span>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-handwriting font-bold text-foreground leading-tight mb-8 break-words">
                      {pageContent?.introTitle}
                    </h2>
                    <div className="mashrabiya-divider max-w-[150px] sm:max-w-[200px]"></div>
                  </div>
                  {pageContent?.introContent && (
                    <div className="space-y-8 sm:space-y-12 boutique-para text-stone-600">
                      <div
                        className="page-content-container"
                        dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }}
                      />
                    </div>
                  )}
                  <div className="pt-6">
                    <Link href="/about" className="inline-flex items-center gap-6 boutique-label text-primary/70 border-b border-primary/20 hover:border-primary transition-all pb-3 font-bold text-sm sm:text-lg">
                      הכירו אותי ואת הגישה שלי
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Grid — dynamic from Firestore */}
      <section ref={uniquenessReveal} className="py-24 md:py-40 xl:py-48 px-6 md:px-12 xl:px-24 bg-stone-50 reveal border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Core Pillars" title="גוף • נפש • רוח" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-20 sm:mt-32">
            {pageLoading ? (
              [1,2,3].map(i => (
                <div key={i} className="boutique-card animate-pulse space-y-6">
                  <div className="w-16 h-16 bg-stone-200 rounded-full" />
                  <div className="h-6 w-24 bg-stone-200 rounded" />
                  <div className="h-4 w-full bg-stone-100 rounded" />
                  <div className="h-4 w-4/5 bg-stone-100 rounded" />
                </div>
              ))
            ) : (pageContent?.features || []).map((point: any, i: number) => {
              const IconMap: Record<string, React.ElementType> = { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle };
              const Icon = IconMap[point.icon] || Heart;
              return (
                <div key={i} className={cn("boutique-card group backdrop-blur-md bg-white/90", `stagger-${i+1}`)}>
                  <div className="text-primary mb-8 group-hover:scale-110 transition-transform duration-1000">
                    <Icon size={64} strokeWidth={0.1} />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-3xl sm:text-4xl font-headline font-bold text-accent">{point.title}</h3>
                    <p className="text-lg sm:text-xl font-light text-stone-600 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection customTestimonials={pageContent?.testimonials} />

      <FaqSection items={homeFaqs} />

      {/* Dynamic CTA Buttons */}
      {pageContent?.ctaButtons?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <CtaButtons buttons={pageContent.ctaButtons} align={pageContent?.ctaAlign} />
          </div>
        </section>
      )}

      <section id="contact" className="py-24 md:py-48 px-6 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="boutique-para mb-12 sm:mb-20 font-medium !text-xl">אני כאן עבורכם לתיאום שיחת היכרות ללא עלות.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
