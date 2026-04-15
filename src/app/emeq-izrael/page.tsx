
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { MapPin, Sparkles, ArrowLeft, Heart, Orbit, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EmeqIzraelPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'emeq-izrael') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20רגשי%20בעמק%20יזרעאל";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic Hero */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {/* Desktop Hero */}
          {pageContent?.heroImageUrlDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={pageContent.heroImageUrlDesktop}
                alt="טיפול רגשי בעמק יזרעאל - מורן פז"
                fill
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          {/* Mobile Hero */}
          {(pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop) && (
            <div className="md:hidden absolute inset-0">
              <Image
                src={pageContent.heroImageUrlMobile || pageContent.heroImageUrlDesktop}
                alt="טיפול רגשי בעמק יזרעאל - מורן פז"
                fill
                className="object-cover opacity-60 brightness-[0.7]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl">
          {pageLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 w-24 bg-white/20 rounded mx-auto" />
              <div className="h-24 w-96 bg-white/20 rounded mx-auto" />
              <div className="h-8 w-72 bg-white/10 rounded mx-auto" />
            </div>
          ) : (
            <>
              <span className="boutique-label text-white/80 mb-6 block uppercase">EMEQ IZRAEL CARE</span>
              <h1 className="text-6xl md:text-9xl font-handwriting text-white mb-8 font-light">
                {pageContent?.heroTitle}
              </h1>
              <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light">
                {pageContent?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="py-32 px-4 md:px-8 xl:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <SectionTitle
              subtitle={pageContent?.introTitleSettings?.subtitle || "Local Therapy"}
              title={pageContent?.introTitleSettings?.text || pageContent?.introTitle || "קרוב לבית, עמוק בלב"}
              fontSize={pageContent?.introTitleSettings?.fontSize}
              fontFamily={pageContent?.introTitleSettings?.fontFamily}
              color={pageContent?.introTitleSettings?.color}
              align={pageContent?.introTitleSettings?.align || 'right'}
            />
            <div className="boutique-para space-y-8 text-xl leading-relaxed text-stone-600">
              {pageContent?.introContent != null ? (
                <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
              ) : (
                <>
                  <p>תושבות ותושבי עמק יזרעאל והסביבה מחפשים לעיתים קרובות מרחב טיפולי שמאפשר התנתקות מהרעש החיצוני וחיבור פנימי עמוק.</p>
                  <p>בקליניקה שלי, במרחק נסיעה קצר מכל יישובי העמק, אני מציעה פסיכותרפיה הוליסטית המשלבת עבודה עם הגוף, הרגש והרוח.</p>
                </>
              )}
            </div>
            
            <ul className="space-y-6">
              {[
                "טיפול בחרדה וסטרס יומיומי",
                "ליווי רגשי לנשים בצמתים בחיים",
                "חיזוק חוסן נפשי לבני נוער",
                "מיינדפולנס וכלים חווייתיים לריפוי"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-2xl font-light text-accent">
                  <Sparkles size={20} className="text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative aspect-square shadow-2xl border-r-8 border-primary/10">
            {pageContent?.heroImageUrlDesktop && (
              <Image
                src={pageContent.heroImageUrlDesktop}
                alt="אווירה טיפולית בעמק"
                fill
                className="object-cover opacity-80"
              />
            )}
            <div className="absolute -bottom-10 -left-10 bg-accent text-white p-12 space-y-4 shadow-2xl hidden md:block">
               <MapPin className="text-primary mb-4" size={32} />
               <p className="text-xl font-bold">זמינות ביישובי העמק:</p>
               <p className="text-sm opacity-80 font-light">טבעון, עפולה, רמת ישי, נהלל ויישובי הסביבה.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Features */}
      {pageContent?.features?.length > 0 && (
        <section className="py-24 px-4 md:px-8 xl:px-24 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              subtitle={pageContent.featuresTitle?.subtitle || "Services"} 
              title={pageContent.featuresTitle?.text || "תחומי הטיפול"} 
              className="flex flex-col items-center text-center"
              fontSize={pageContent.featuresTitle?.fontSize}
              fontFamily={pageContent.featuresTitle?.fontFamily}
              color={pageContent.featuresTitle?.color}
              align={pageContent.featuresTitle?.align || 'center'}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {pageContent.features.map((feat: any, i: number) => {
                const IconMap: Record<string, React.ElementType> = { Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle };
                const Icon = IconMap[feat.icon] || Heart;
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
          </div>
        </section>
      )}

      {/* Dynamic Testimonials */}
      <TestimonialsSection 
        customTestimonials={pageContent?.testimonials} 
        titleSettings={pageContent?.testimonialsTitle}
      />

      {/* Dynamic FAQs */}
      {pageContent?.faqs?.length > 0 && (
        <FaqSection 
          items={pageContent.faqs} 
          titleSettings={pageContent.faqsTitle}
        />
      )}

      {/* Dynamic CTA Buttons */}
      {pageContent?.ctaButtons?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <CtaButtons buttons={pageContent.ctaButtons} align={pageContent?.ctaAlign} />
          </div>
        </section>
      )}

      <section className="py-32 bg-stone-50 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-6xl md:text-8xl font-handwriting text-accent">נתחיל את המסע שלך?</h2>
          <p className="boutique-para">
            אני מזמינה אותך לשיחת היכרות ראשונית ללא עלות, לבדיקת התאמה ולתחילת התהליך שלך בלב העמק.
          </p>
          <div className="pt-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-16 py-6 bg-primary text-white boutique-label !text-[13px] hover:bg-accent transition-all duration-700 shadow-xl rounded-sm !opacity-100"
            >
              תאום שיחת ייעוץ בעמק
              <ArrowLeft size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            subtitle={pageContent?.contactTitleSettings?.subtitle || "Connect"}
            title={pageContent?.contactTitleSettings?.text || "צרו קשר"}
            className="flex flex-col items-center"
            fontSize={pageContent?.contactTitleSettings?.fontSize}
            fontFamily={pageContent?.contactTitleSettings?.fontFamily}
            color={pageContent?.contactTitleSettings?.color}
            align={pageContent?.contactTitleSettings?.align || 'center'}
          />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
