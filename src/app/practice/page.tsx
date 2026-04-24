
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { DynamicSections } from '@/components/shared/DynamicSections';

export default function PracticePage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'practice') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const introReveal = useReveal();
  const stepsReveal = useReveal();

  const categories = [
    { title: "תקיעות בחיים", desc: "שחרור חסמים ויצירת תנועה חדשה." },
    { title: "חרדה ומתח", desc: "כלים לוויסות רגשי ומרחב לנשימה." },
    { title: "מערכות יחסים", desc: "שיפור הקשר עם עצמך ועם הסביבה." },
    { title: "דימוי עצמי", desc: "בניית ערך פנימי וחיבור לקול האותנטי." }
  ];

  const sectionOrder = pageContent?.sectionOrder || ['intro', 'features', 'cta', 'journey', 'testimonials', 'faqs', 'dynamic'];

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'intro':
        return (
          <div key="intro" ref={introReveal} className="reveal mb-32 max-w-5xl">
            <SectionTitle 
              subtitle={pageContent?.introTitleSettings?.subtitle || "Integrated Care"} 
              title={pageContent?.introTitleSettings?.text || pageContent?.introTitle || "העבודה הטיפולית משלבת כלים מעולמות הפסיכולוגיה והרוח."} 
              fontSize={pageContent?.introTitleSettings?.fontSize}
              fontFamily={pageContent?.introTitleSettings?.fontFamily}
              color={pageContent?.introTitleSettings?.color}
              align={pageContent?.introTitleSettings?.align || 'right'}
            />
            <div className="space-y-8 boutique-para text-stone-600">
              {pageContent?.introContent != null && (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
              )}
            </div>
            <div className="mashrabiya-divider max-w-[300px]"></div>
          </div>
        );

      case 'features':
        if (!pageContent?.features?.length) return null;
        return (
          <div key="features" className="mb-48 reveal">
            <div className="mb-16">
              <SectionTitle 
                title={pageContent?.featuresTitle?.text || "בטיפול אנחנו עובדים על -"} 
                subtitle={pageContent?.featuresTitle?.subtitle}
                fontSize={pageContent?.featuresTitle?.fontSize}
                fontFamily={pageContent?.featuresTitle?.fontFamily}
                color={pageContent?.featuresTitle?.color}
                align={pageContent?.featuresTitle?.align || 'right'}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageContent.features.map((item: any, i: number) => {
                const IconMap: Record<string, React.ElementType> = { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle };
                const Icon = IconMap[item.icon] || Compass;
                return (
                  <div key={i} className={cn(
                    "boutique-card group border border-stone-100 hover:border-primary/20",
                    item.bg
                  )}>
                    <h3 className={cn("text-4xl font-headline mb-8 text-accent", item.titleColor)}>{item.title}</h3>
                    <p className="text-xl font-light opacity-80 leading-relaxed">{item.description}</p>
                    <div className="absolute bottom-8 right-8 text-primary/10 group-hover:text-primary/40 transition-colors">
                      <Icon size={40} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div key="cta" className="mb-32">
            <CtaButtons buttons={pageContent?.ctaButtons} align={pageContent?.ctaAlign} />
          </div>
        );

      case 'journey':
        const steps = pageContent?.journeySteps || [];
        if (steps.length === 0) return null;
        return (
          <div key="journey" ref={stepsReveal} className="reveal space-y-24 mb-32">
            <SectionTitle 
              subtitle={pageContent?.journeyTitleSettings?.subtitle || "How it works"} 
              title={pageContent?.journeyTitleSettings?.text || "שלבי המסע שלנו"} 
              className="flex flex-col items-center text-center"
              fontSize={pageContent?.journeyTitleSettings?.fontSize}
              fontFamily={pageContent?.journeyTitleSettings?.fontFamily}
              color={pageContent?.journeyTitleSettings?.color}
              align={pageContent?.journeyTitleSettings?.align || 'center'}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
              {steps.map((step: any, i: number) => {
                const IconMap: Record<string, React.ElementType> = { Orbit, Heart, Sparkles, Compass, Users, Star, MessageSquare, HelpCircle };
                const Icon = IconMap[step.icon] || Orbit;
                return (
                  <div key={i} className="flex flex-col items-center text-center space-y-10 group">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                      <Icon size={60} strokeWidth={0.2} />
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-3xl font-headline font-bold text-accent">{step.title}</h4>
                      <p className="text-xl font-light text-stone-600 leading-relaxed max-w-[280px]">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <TestimonialsSection 
            key="testimonials"
            customTestimonials={pageContent?.testimonials} 
            titleSettings={pageContent?.testimonialsTitle}
          />
        );

      case 'faqs':
        if (!pageContent?.faqs?.length) return null;
        return (
          <FaqSection 
            key="faqs"
            items={pageContent.faqs} 
            titleSettings={pageContent.faqsTitle}
          />
        );

      case 'dynamic':
        return <DynamicSections key="dynamic" sections={pageContent?.dynamicSections} className="mb-24" />;

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic Hero */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {pageContent?.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={pageContent.heroImageUrlDesktop}
                alt="The Journey"
                fill
                className="object-cover opacity-50"
                priority
              />
            </div>
          )}
          {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image
                src={pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop}
                alt="The Journey Mobile"
                fill
                className="object-cover opacity-60"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
          {/* Decorative "Cloud" / Mist at the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent z-0 pointer-events-none"
            style={{ opacity: (pageContent?.heroCloudiness ?? 30) / 100 }}
          />
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
              <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">The Journey</span>
              <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold hero-title-shadow">
                {pageContent?.heroTitle}
              </h1>
              <p className="text-2xl md:text-[50px] font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
                {pageContent?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="py-32 md:py-56 px-4 md:px-8 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {(sectionOrder as string[]).map((id: string) => renderSection(id))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
