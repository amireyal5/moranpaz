
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { PortraitImage } from '@/components/shared/PortraitImage';
import { GraduationCap, Briefcase, Sparkles, Heart, Orbit, Users, Star, Compass, MessageSquare, HelpCircle, ArrowLeft } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

const ICON_MAP: Record<string, React.ElementType> = { 
  Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle, GraduationCap, Briefcase 
};

export default function AboutPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'about') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const uniquenessReveal = useReveal();

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {pageContent?.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image src={pageContent.heroImageUrlDesktop} alt="About" fill className="object-cover opacity-60" priority />
            </div>
          )}
          {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image src={pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop} alt="About" fill className="object-cover opacity-60" priority />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
          {pageLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 w-32 bg-white/20 rounded mx-auto" />
              <div className="h-24 w-96 bg-white/20 rounded mx-auto" />
            </div>
          ) : (
            <>
              <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">About Moran Paz</span>
              <h1 className="text-6xl md:text-8xl xl:text-[110px] font-handwriting text-white mb-8 font-bold hero-title-shadow">
                {pageContent?.heroTitle ?? "נעים להכיר"}
              </h1>
              <p className="text-2xl md:text-4xl xl:text-5xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
                {pageContent?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Personal Introduction Section */}
      <section className="py-20 md:py-32 xl:py-56 px-6 md:px-12 xl:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 xl:gap-24 items-start">
            <div className="lg:col-span-5 min-w-0">
               <PortraitImage
                 src={pageContent?.portraitImageUrl}
                 loading={pageLoading}
                 shape={pageContent?.portraitShape as any || 'circle'}
                 alt="מורן פז"
               />
            </div>

            <div ref={introReveal} className="lg:col-span-7 reveal space-y-8 min-w-0 overflow-hidden">
               <div className="relative pr-6 md:pr-10 xl:pr-12 border-r-[3px] border-primary/20 overflow-hidden">
                  <h3 className="text-2xl md:text-4xl xl:text-5xl font-headline text-accent italic font-light leading-snug break-words">
                    {pageContent?.introTitle ?? "אני מאמינה ששינוי – כל שינוי – מתחיל קודם כל במפגש."}
                  </h3>
               </div>
               
               <div className="space-y-10 boutique-para text-stone-600">
                  {pageContent?.introContent != null ? (
                    <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                  ) : (
                    <p>בתוך המרחב הטיפולי, המטרה שלי היא לעזור לך להדליק את האור.</p>
                  )}
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100">
                    <GraduationCap className="text-primary size-10" strokeWidth={1} />
                    <div>
                      <h4 className="font-bold text-accent text-xl">M.A ייעוץ ארגוני</h4>
                      <p className="text-sm opacity-60">אוניברסיטת חיפה</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100">
                    <Briefcase className="text-primary size-10" strokeWidth={1} />
                    <div>
                      <h4 className="font-bold text-accent text-xl">פסיכותרפיה הוליסטית</h4>
                      <p className="text-sm opacity-60">הכשרה מקצועית מעמיקה</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Blocks (קוביות מידע) */}
      {pageContent?.features?.length > 0 && (
        <section ref={uniquenessReveal} className="py-32 md:py-48 px-4 md:px-8 xl:px-24 bg-stone-50 border-y border-stone-100 reveal">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Approach & Expertise" title={pageContent?.featuresTitle ?? "מרחבי הטיפול והליווי שלי"} className="flex flex-col items-center text-center" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
              {pageContent.features.map((point: any, i: number) => {
                const Icon = ICON_MAP[point.icon] || Heart;
                return (
                  <div key={i} className="bg-white p-12 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <Icon size={32} strokeWidth={1} />
                    </div>
                    <h4 className="text-3xl font-headline text-accent mb-6 font-bold">{point.title}</h4>
                    <p className="text-stone-500 font-light leading-relaxed text-lg">{point.description}</p>
                    {point.link && (
                       <Link href={point.link} className="mt-8 flex items-center gap-3 text-primary boutique-label font-bold text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                         לפרטים נוספים <ArrowLeft size={14} />
                       </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic CTA Buttons */}
      {pageContent?.ctaButtons?.length > 0 && (
        <section className="py-24 px-6 bg-white">
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
