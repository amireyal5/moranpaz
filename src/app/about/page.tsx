
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
import { GraduationCap, Briefcase, Sparkles, Heart, Orbit, Users, Star, Compass, MessageSquare, HelpCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { getInitialPageContent } from '@/config/page-defaults';


const ICON_MAP: Record<string, React.ElementType> = { 
  Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle, GraduationCap, Briefcase 
};

export default function AboutPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => {
    console.log("About page: db exists?", !!db);
    return db ? doc(db, 'siteContent', 'about') : null;
  }, [db]);
  const { data: pageContent, loading: pageLoading, error: pageError } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const uniquenessReveal = useReveal();

  const mergedContent = useMemo(() => {
    const defaults = getInitialPageContent('about');
    if (!pageContent) return defaults;
    return {
      ...defaults,
      ...pageContent,
      // Ensure arrays are never undefined
      features:     Array.isArray(pageContent.features)     ? pageContent.features     : defaults.features,
      ctaButtons:   Array.isArray(pageContent.ctaButtons)   ? pageContent.ctaButtons   : defaults.ctaButtons,
      testimonials: Array.isArray(pageContent.testimonials) ? pageContent.testimonials : defaults.testimonials,
      faqs:         Array.isArray(pageContent.faqs)         ? pageContent.faqs         : defaults.faqs,
    };
  }, [pageContent]);

  if (pageLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="animate-spin text-primary size-12" /></div>;
  }

  if (pageError) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-destructive font-bold">Error: {pageError.message}</div>;
  }

  console.log("About page merged content:", mergedContent);

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900 border-b border-white/5">
        <div className="absolute inset-0">
          {mergedContent.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image src={mergedContent.heroImageUrlDesktop} alt="About" fill className="object-cover opacity-60" priority />
            </div>
          )}
          {(mergedContent.heroImageUrlMobile || mergedContent.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image src={mergedContent.heroImageUrlMobile || mergedContent.heroImageUrlDesktop} alt="About" fill className="object-cover opacity-60" priority />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">About Moran Paz</span>
          <h1 className="text-6xl md:text-8xl xl:text-[110px] font-handwriting text-white mb-8 font-bold hero-title-shadow leading-tight">
            {mergedContent.heroTitle || "נעים להכיר"}
          </h1>
          <p className="text-2xl md:text-4xl xl:text-5xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
            {mergedContent.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Personal Introduction Section */}
      <section className="py-20 md:py-32 xl:py-56 px-6 md:px-12 xl:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 xl:gap-24 items-start">
            <div className="lg:col-span-5 min-w-0">
               <PortraitImage
                 src={mergedContent.portraitImageUrl}
                 loading={pageLoading}
                 shape={mergedContent.portraitShape as any || 'circle'}
                 alt="מורן פז"
               />
            </div>

            <div ref={introReveal} className="lg:col-span-7 reveal space-y-8 min-w-0 overflow-hidden">
               <div className="relative pr-6 md:pr-10 xl:pr-12 border-r-[3px] border-primary/20 overflow-hidden">
                  <h3 className="text-2xl md:text-4xl xl:text-5xl font-headline text-accent italic font-light leading-snug break-words">
                    {mergedContent.introTitle || "אני מאמינה ששינוי – כל שינוי – מתחיל קודם כל במפגש."}
                  </h3>
               </div>
               
               <div className="space-y-10 boutique-para text-stone-600">
                  {mergedContent.introContent ? (
                    <div className="page-content-container" dangerouslySetInnerHTML={{ __html: mergedContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                  ) : (
                    <p>בתוך המרחב הטיפולי, המטרה שלי היא לעזור לך להדליק את האור.</p>
                  )}
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100 shadow-sm">
                    <GraduationCap className="text-primary size-10" strokeWidth={1} />
                    <div className="text-right">
                      <h4 className="font-bold text-accent text-xl">M.A ייעוץ ארגוני</h4>
                      <p className="text-sm opacity-60">אוניברסיטת חיפה</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100 shadow-sm">
                    <Briefcase className="text-primary size-10" strokeWidth={1} />
                    <div className="text-right">
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
      <section className="py-32 md:py-48 px-4 md:px-8 xl:px-24 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Approach & Expertise" title={"מרחבי הטיפול והליווי שלי"} className="flex flex-col items-center text-center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
            {mergedContent.features.length > 0 ? (
              mergedContent.features.map((point: any, i: number) => {
                const Icon = ICON_MAP[point.icon] || Heart;
                return (
                  <div key={i} className="bg-white p-12 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <Icon size={32} strokeWidth={1} />
                    </div>
                    <h4 className="text-3xl font-headline text-accent mb-6 font-bold leading-tight">{point.title}</h4>
                    <p className="text-stone-500 font-light leading-relaxed text-lg">{point.description}</p>
                    {point.link && (
                       <Link href={point.link} className="mt-8 flex items-center gap-3 text-primary boutique-label font-bold text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                         לפרטים נוספים <ArrowLeft size={14} className="mr-2" />
                       </Link>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-stone-400 italic py-12">עדיין לא הוגדרו קוביות תוכן עבור דף זה.</p>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic CTA Buttons */}
      {mergedContent.ctaButtons.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <CtaButtons buttons={mergedContent.ctaButtons} align={mergedContent.ctaAlign} />
          </div>
        </section>
      )}

      {/* Dynamic Testimonials */}
      {mergedContent.testimonials.length > 0 && (
        <TestimonialsSection customTestimonials={mergedContent.testimonials} />
      )}

      {/* Dynamic FAQs */}
      {mergedContent.faqs.length > 0 && (
        <FaqSection items={mergedContent.faqs} />
      )}

      <Footer />
    </main>
  );
}
