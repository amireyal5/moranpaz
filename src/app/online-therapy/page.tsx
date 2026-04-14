
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { PortraitImage } from '@/components/shared/PortraitImage';
import { Globe, ShieldCheck, Clock, Infinity, Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageContent } from '@/hooks/use-page-content';

export default function OnlineTherapyPage() {
  const { content: mergedContent, loading, error } = usePageContent('online-therapy');

  const introReveal = useReveal();
  
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20אשמח%20לפרטים%20על%20טיפול%20אונליין%20לישראלים%20בחו%22ל";

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="animate-spin text-primary size-12" /></div>;
  }

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900 shadow-2xl">
        <div className="absolute inset-0">
          {mergedContent.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={mergedContent.heroImageUrlDesktop}
                alt="Online Therapy Hero"
                fill
                className="object-cover opacity-70 brightness-[0.8]"
                priority
              />
            </div>
          )}
          {(mergedContent.heroImageUrlMobile || mergedContent.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image
                src={mergedContent.heroImageUrlMobile || mergedContent.heroImageUrlDesktop}
                alt="Online Therapy Hero Mobile"
                fill
                className="object-cover opacity-70 brightness-[0.8]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
            <span className="boutique-label text-white/90 mb-8 block drop-shadow-md">Global Connection</span>
            <h1 className="text-6xl md:text-8xl xl:text-[140px] font-handwriting text-white mb-8 font-bold hero-title-shadow leading-none">
              {mergedContent.heroTitle}
            </h1>
            <p className="text-2xl md:text-4xl font-headline italic text-white/95 leading-relaxed font-light hero-para-shadow">
              {mergedContent.heroSubtitle}
            </p>
        </div>
      </section>

      <section className="py-32 px-4 md:px-8 xl:px-24 border-b border-stone-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div ref={introReveal} className="lg:col-span-7 reveal">
            <span className="boutique-label block mb-8 text-primary">Global Care</span>
            <h2 className="text-5xl md:text-7xl font-headline text-accent mb-12 font-bold leading-tight">
              {mergedContent.introTitle || "טיפול בעברית לישראלים בחו\"ל"}
            </h2>
            <div className="boutique-para mb-16 space-y-10 leading-relaxed text-xl text-stone-600">
              {mergedContent.introContent ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: mergedContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
              ) : (
                <>
                  <p>פסיכותרפיה הוליסטית אונליין מאפשרת לנו להיפגש בתוך מרחב דיגיטלי בטוח ומכיל.</p>
                  <p>אני מלווה ישראלים ורילוקיישניסטים ברחבי העולם בתהליכי עומק רגשיים של 60 דקות.</p>
                </>
              )}
            </div>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-8 px-16 py-4 bg-primary text-white boutique-label hover:bg-accent transition-all duration-700 shadow-2xl rounded-sm !opacity-100"
            >
              תאום פגישת היכרות אונליין
            </a>
          </div>
          
          <div className="lg:col-span-5 flex justify-center">
            <PortraitImage
              src={mergedContent.portraitImageUrl}
              loading={loading}
              shape={mergedContent.portraitShape as any || 'circle'}
              alt="מורן פז"
            />
          </div>
        </div>
      </section>

      {/* Dynamic Features / Benefits */}
      {mergedContent.features.length > 0 && (
        <section className="py-32 md:py-56 bg-stone-50 px-4 md:px-8 xl:px-24 border-b border-stone-100">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              subtitle="The Advantages" 
              title="למה לבחור בטיפול אונליין?" 
              className="flex flex-col items-center text-center"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-32">
              {mergedContent.features.map((benefit: any, i: number) => {
                const IconMap: Record<string, React.ElementType> = { Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle, Globe, ShieldCheck, Clock, Infinity };
                const Icon = IconMap[benefit.icon] || Heart;
                return (
                  <div key={i} className={cn("boutique-card group !min-h-[400px] backdrop-blur-md bg-white/90 shadow-sm hover:shadow-2xl transition-all duration-700", `stagger-${i+1}`)}>
                    <div className="art-icon !top-10 !right-10 opacity-30 text-primary group-hover:opacity-100 transition-opacity">
                      <Icon size={40} strokeWidth={0.2} />
                    </div>
                    <div className="relative z-10 text-right w-full">
                      <h3 className="text-3xl font-headline font-bold mb-8 text-accent">{benefit.title}</h3>
                      <p className="opacity-80 font-light text-xl leading-relaxed text-stone-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic CTA Buttons */}
      {mergedContent.ctaButtons.length > 0 && (
        <section className="py-24 px-6 bg-white border-b border-stone-100">
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
