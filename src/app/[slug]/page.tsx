
"use client";

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, Heart, Sparkles, Orbit, Compass, Users, Star } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Heart, Sparkles, Orbit, Compass, Users, Star
};

export default function DynamicPage() {
  const { slug } = useParams();
  const db = useFirestore();
  
  const contentRef = useMemo(() => {
    if (!db || !slug) return null;
    return doc(db, 'siteContent', slug as string);
  }, [db, slug]);

  const { data: pageContent, loading } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const featuresReveal = useReveal();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-primary size-12" />
      </div>
    );
  }

  if (!pageContent && slug) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-right p-8">
        <Navbar />
        <h1 className="text-4xl font-headline text-accent mb-6">העמוד לא נמצא</h1>
        <p className="boutique-para">ייתכן שהקישור שבור או שהעמוד הוסר.</p>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden" style={{ '--primary': pageContent?.primaryColor } as any}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <div className="hidden md:block absolute inset-0">
            {pageContent?.heroImageUrlDesktop && (
              <Image 
                src={pageContent.heroImageUrlDesktop} 
                alt={pageContent?.heroTitle || "Hero"} 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            )}
          </div>
          <div className="md:hidden absolute inset-0">
            {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
              <Image 
                src={pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop} 
                alt={pageContent?.heroTitle || "Hero Mobile"} 
                fill 
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <h1 className="text-7xl md:text-9xl font-handwriting text-white mb-8 font-bold hero-title-shadow">
             {pageContent?.heroTitle || ""}
           </h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">
             {pageContent?.heroSubtitle || ""}
           </p>
        </div>
      </section>

      <section className="pt-32 pb-32 px-8 md:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          {pageContent?.introTitle && (
            <SectionTitle subtitle="Information" title={pageContent.introTitle} />
          )}
          
          <div ref={contentReveal} className="reveal space-y-12">
            <div className="boutique-para space-y-8 text-stone-600">
              {pageContent?.introContent ? (
                <div className="blog-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent }} />
              ) : (
                <p className="text-center italic opacity-30">אין תוכן להצגה בעמוד זה.</p>
              )}
            </div>

            {/* Structured Features Grid */}
            {pageContent?.features?.length > 0 && (
              <div ref={featuresReveal} className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
                {pageContent.features.map((feat: any, i: number) => {
                  const Icon = ICON_MAP[feat.icon] || Heart;
                  return (
                    <div key={i} className="boutique-card group border border-stone-100 hover:border-primary/20">
                      <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
                        <Icon size={40} strokeWidth={0.2} />
                      </div>
                      <h3 className="text-2xl font-headline font-bold text-accent mb-4">{feat.title}</h3>
                      <p className="text-lg font-light text-stone-600 leading-relaxed">{feat.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <CtaButtons buttons={pageContent?.ctaButtons} />
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials */}
      {pageContent?.testimonials?.length > 0 && (
        <TestimonialsSection customTestimonials={pageContent.testimonials} />
      )}

      {/* Dynamic FAQs */}
      {pageContent?.faqs?.length > 0 && (
        <FaqSection items={pageContent.faqs} />
      )}

      <Footer />
    </main>
  );
}
