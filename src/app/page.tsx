
"use client";

import React from 'react';
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
import { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageContent } from '@/hooks/use-page-content';

const ICON_MAP: Record<string, React.ElementType> = { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle };

export default function Home() {
  const { content: pageContent, loading } = usePageContent('home');

  const heroReveal = useReveal();
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20BeinMe%20ואשמח%20לפרטים%20נוספים";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary size-12" />
          <p className="boutique-label text-stone-400">BeinMe טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-stone-900 shadow-2xl">
        <div className="absolute inset-0 z-0">
          {pageContent.heroImageUrlDesktop && (
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
          {(pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop) && (
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
          {/* Decorative "Cloud" / Mist at the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent z-0 pointer-events-none"
            style={{ opacity: (pageContent?.heroCloudiness ?? 30) / 100 }}
          />
        </div>

        <div ref={heroReveal} className="relative z-10 text-center reveal flex flex-col items-center w-full max-w-5xl mx-auto px-6">
            <span className="boutique-label text-white/90 mb-6 sm:mb-8 block drop-shadow-md stagger-1">Moran Paz • BeinMe</span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[90px] 2xl:text-[110px] font-bold leading-tight font-handwriting text-white mb-6 sm:mb-8 hero-title-shadow stagger-2 break-words w-full">
              {pageContent.heroTitle}
            </h1>
            <h2 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-headline italic mb-10 sm:mb-12 text-white/95 font-light max-w-2xl xl:max-w-3xl leading-relaxed hero-para-shadow stagger-3">
              {pageContent.heroSubtitle}
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
        </div>
      </section>

      {/* Intro Agenda Section */}
      <section className="py-24 md:py-32 xl:py-40 px-6 md:px-12 xl:px-24 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">
            <div className={cn("lg:col-span-5 order-2 lg:order-1", pageContent.portraitPosition === 'right' ? 'lg:order-2' : 'lg:order-1')}>
              <PortraitImage
                src={pageContent.portraitImageUrl}
                loading={loading}
                shape={(pageContent.portraitShape as any) || 'rectangle'}
                alt="מורן פז"
                className="image-zoom-container max-w-md mx-auto lg:max-w-none shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div ref={introReveal} className={cn("lg:col-span-7 order-1 lg:order-2 space-y-10 sm:space-y-16 reveal", pageContent.portraitPosition === 'right' ? 'lg:order-1' : 'lg:order-2')}>
                <div className="relative">
                  <SectionTitle 
                    subtitle={pageContent.introTitleSettings?.subtitle || "The Agenda"} 
                    title={pageContent.introTitleSettings?.text || pageContent.introTitle || "נעים להכיר"} 
                    fontSize={pageContent.introTitleSettings?.fontSize}
                    fontFamily={pageContent.introTitleSettings?.fontFamily}
                    color={pageContent.introTitleSettings?.color}
                    align={pageContent.introTitleSettings?.align || 'right'}
                  />
                  <div className="mashrabiya-divider max-w-[150px] sm:max-w-[200px] -mt-10 mb-10"></div>
                </div>
                {pageContent.introContent && (
                  <div className="space-y-8 sm:space-y-12 boutique-para text-stone-600 !text-right">
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
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Grid — dynamic from Firestore */}
      <section className="py-24 md:py-40 xl:py-48 px-6 md:px-12 xl:px-24 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle={pageContent.featuresTitle?.subtitle || "Core Pillars"} 
            title={pageContent.featuresTitle?.text || "הכלים שלי"} 
            className="flex flex-col items-center text-center"
            fontSize={pageContent.featuresTitle?.fontSize}
            fontFamily={pageContent.featuresTitle?.fontFamily}
            color={pageContent.featuresTitle?.color}
            align={pageContent.featuresTitle?.align || 'center'}
          />
          <div ref={uniquenessReveal} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mt-20 sm:mt-32 reveal">
            {(pageContent.features || []).map((point: any, i: number) => {
              const Icon = ICON_MAP[point.icon] || Heart;
              return (
                <div key={i} className={cn("boutique-card group !min-min-h-[350px] backdrop-blur-md bg-white/90 shadow-sm hover:shadow-2xl transition-all duration-700", `stagger-${(i%3)+1}`)}>
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

      {/* Clinic Image Section if exists */}
      {pageContent.clinicImageUrl && (
        <section className="py-24 px-6 md:px-12 xl:px-24 bg-white border-b border-stone-100">
           <div className="max-w-7xl mx-auto">
             <div className="relative aspect-[21/9] w-full overflow-hidden shadow-2xl">
               <Image src={pageContent.clinicImageUrl} alt="Clinic" fill className="object-cover" />
             </div>
           </div>
        </section>
      )}

      {pageContent.testimonials && pageContent.testimonials.length > 0 && (
        <TestimonialsSection 
          customTestimonials={pageContent.testimonials} 
          titleSettings={pageContent.testimonialsTitle}
        />
      )}

      {pageContent.faqs && pageContent.faqs.length > 0 && (
        <FaqSection 
          items={pageContent.faqs} 
          titleSettings={pageContent.faqsTitle}
        />
      )}

      {/* Dynamic CTA Buttons */}
      {pageContent.ctaButtons && pageContent.ctaButtons.length > 0 && (
        <section className="py-24 px-6 bg-white border-b border-stone-100">
          <div className="max-w-5xl mx-auto">
            <CtaButtons buttons={pageContent.ctaButtons} align={pageContent.ctaAlign} />
          </div>
        </section>
      )}

      <section id="contact" className="py-24 md:py-48 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle 
            subtitle={pageContent.contactTitleSettings?.subtitle || "Connect"} 
            title={pageContent.contactTitleSettings?.text || "צרו קשר"} 
            className="flex flex-col items-center" 
            fontSize={pageContent.contactTitleSettings?.fontSize}
            fontFamily={pageContent.contactTitleSettings?.fontFamily}
            color={pageContent.contactTitleSettings?.color}
            align={pageContent.contactTitleSettings?.align || 'center'}
          />
          <p className="boutique-para mb-12 sm:mb-20 font-medium !text-xl text-center">אני כאן עבורכם לתיאום שיחת היכרות ללא עלות.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
