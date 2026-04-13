
"use client";

import React, { useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { Heart, CheckCircle2, Quote, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function YouthPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'youth') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const youthInviteReveal = useReveal();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20לנוער";

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
                alt="Therapy for Youth"
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
                alt="Therapy for Youth Mobile"
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
              <span className="boutique-label text-white/80 mb-8 block">Youth Empowerment</span>
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
          <SectionTitle subtitle="Audience" title={pageContent?.introTitle ?? "טיפול וליווי לנוער"} />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <div className="boutique-para space-y-8 text-stone-600">
              {pageContent?.introContent != null ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
              ) : (
                <>
                  <p>גיל ההתבגרות הוא תקופה של שינויים מרגשים אך גם מאתגרים מאוד. זהו שלב של חיפוש זהות והתמודדות עם לחצים שונים.</p>
                  <p>בטיפול רגשי לנוער, אני מציעה מרחב שבו אפשר לדבר על הכל – בלי שיפוטיות, בגובה העיניים ובסודיות מלאה.</p>
                </>
              )}
            </div>

            <div className="relative pr-12 py-8 my-16 border-r-[3px] border-primary/20">
               <Quote className="absolute -top-10 -right-4 text-primary/5 w-48 h-48 rotate-180 pointer-events-none" />
               <p className="text-3xl md:text-4xl font-headline text-accent italic font-light leading-snug relative z-10">
                 המטרה היא לעזור לך לגלות את הסיפור שאתה מספר לעצמך ולהתחבר לסמכות הפנימית שלך.
               </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={youthInviteReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50 px-8">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h3 className="text-6xl md:text-8xl font-handwriting text-accent leading-none">מרחב בטוח לצמוח בו</h3>
            <p className="boutique-para text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              הורים יקרים, אני כאן כדי להעניק לילדיכם את המרחב המכיל והמקצועי לו הם זקוקים. בואו נתאם שיחת ייעוץ ראשונית לבדיקת התאמה.
            </p>
            <div className="pt-8">
               <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
              >
                פנייה לשיחת ייעוץ והתאמה
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
