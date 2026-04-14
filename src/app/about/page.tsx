
"use client";

import React from 'react';
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
import { usePageContent } from '@/hooks/use-page-content';

const ICON_MAP: Record<string, React.ElementType> = { 
  Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle, GraduationCap, Briefcase 
};

export default function AboutPage() {
  const { content: mergedContent, loading, error } = usePageContent('about');
  const introReveal = useReveal();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary size-12" />
          <p className="boutique-label text-stone-400">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-destructive font-bold">Error loading content: {error.message}</div>;
  }

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
      <section className="py-20 md:py-32 xl:py-56 px-6 md:px-12 xl:px-24 bg-white overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Title moved OUT of the grid to ensure it's always visible and balanced */}
          <div className="mb-20">
             <SectionTitle 
               subtitle="About me" 
               title={mergedContent.introTitle || "נעים להכיר, אני מורן"} 
               className="text-right" 
             />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 xl:gap-24 items-start">
            <div className={mergedContent.portraitPosition === 'right' ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'}>
               <PortraitImage
                 src={mergedContent.portraitImageUrl}
                 loading={loading}
                 shape={mergedContent.portraitShape as any || 'circle'}
                 alt="מורן פז"
               />
            </div>

            <div ref={introReveal} className={mergedContent.portraitPosition === 'right' ? 'lg:col-span-7 reveal space-y-8 lg:order-1' : 'lg:col-span-7 reveal space-y-8 lg:order-2'}>
               <div className="space-y-10 boutique-para text-stone-600 !text-right">
                  {mergedContent.introContent ? (
                    <div className="page-content-container" dangerouslySetInnerHTML={{ __html: mergedContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                  ) : (
                    <p>בתוך המרחב הטיפולי, המטרה שלי היא לעזור לך להדליק את האור.</p>
                  )}
               </div>
               
               {/* Credentials - Show fixed and then dynamic ones */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                    <GraduationCap className="text-primary size-10" strokeWidth={1} />
                    <div className="text-right">
                      <h4 className="font-bold text-accent text-xl">M.A ייעוץ ארגוני</h4>
                      <p className="text-sm opacity-60">אוניברסיטת חיפה</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-24">
            {mergedContent.features && mergedContent.features.length > 0 ? (
              mergedContent.features.map((point: any, i: number) => {
                const Icon = ICON_MAP[point.icon] || Heart;
                return (
                  <div key={i} className="bg-white p-12 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <Icon size={32} strokeWidth={1} />
                    </div>
                    <h4 className="text-3xl font-headline text-accent mb-6 font-bold leading-tight">{point.title}</h4>
                    <p className="text-stone-500 font-light leading-relaxed text-lg">{point.description}</p>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-stone-400 italic py-12">עדיין לא הוגדרו קוביות תוכן נוספות עבור דף זה.</p>
            )}
          </div>
        </div>
      </section>

      {/* Clinic Image Section if exists */}
      {mergedContent.clinicImageUrl && (
        <section className="py-24 px-6 md:px-12 xl:px-24 bg-white border-b border-stone-100">
           <div className="max-w-7xl mx-auto">
             <div className="relative aspect-[21/9] w-full overflow-hidden shadow-2xl">
               <Image src={mergedContent.clinicImageUrl} alt="Clinic" fill className="object-cover" />
             </div>
           </div>
        </section>
      )}

      {/* Dynamic CTA Buttons */}
      {mergedContent.ctaButtons && mergedContent.ctaButtons.length > 0 && (
        <section className="py-24 px-6 bg-white border-b border-stone-100">
          <div className="max-w-5xl mx-auto">
            <CtaButtons buttons={mergedContent.ctaButtons} align={mergedContent.ctaAlign} />
          </div>
        </section>
      )}

      {/* Dynamic Testimonials */}
      {mergedContent.testimonials && mergedContent.testimonials.length > 0 && (
        <TestimonialsSection customTestimonials={mergedContent.testimonials} />
      )}

      {/* Dynamic FAQs */}
      {mergedContent.faqs && mergedContent.faqs.length > 0 && (
        <FaqSection items={mergedContent.faqs} />
      )}

      <Footer />
    </main>
  );
}
