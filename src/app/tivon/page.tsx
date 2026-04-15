
"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqSection } from '@/components/shared/FaqSection';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { CtaButtons } from '@/components/shared/CtaButtons';
import { ContactForm } from '@/components/shared/ContactForm';
import { MapPin, Trees, Coffee, Sun, Wind, ArrowLeft, Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function TivonPage() {
  const db = useFirestore();
  const contentRef = useMemo(() => db ? doc(db, 'siteContent', 'tivon') : null, [db]);
  const { data: pageContent, loading: pageLoading } = useDoc<any>(contentRef);

  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20טיפול%20בקליניקה%20בטבעון";

  const tivonFaqs = [
    {
      question: "למה כדאי להגיע לטיפול בטבעון?",
      answer: "הקליניקה בטבעון ממוקמת בלב הטבע הירוק, מה שמאפשר מרחב של שקט והתנתקות מהרעש החיצוני עוד לפני תחילת המפגש."
    },
    {
      question: "מהי פסיכותרפיה הוליסטית?",
      answer: "זוהי גישה טיפולית הרואה באדם שלם - גוף, נפש ורוח."
    }
  ];

  const highlights = [
    { title: "אווירה כפרית ושלווה", icon: <Trees size={24} />, desc: "מיקום שקט בלב הירוק של טבעון." },
    { title: "מרחב בטוח ומכיל", icon: <Wind size={24} />, desc: "עיצוב מינימליסטי המשרה רוגע וביטחון." },
    { title: "אירוח חם", icon: <Coffee size={24} />, desc: "פינת ישיבה נעימה ותה צמחים להרגעה." },
    { title: "אור טבעי", icon: <Sun size={24} />, desc: "חלונות גדולים הפונים לצמחייה ירוקה." }
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden text-right">
      <Navbar />
      
      {/* Dynamic Hero */}
      <section className="h-[75vh] relative flex items-center justify-center bg-stone-900 overflow-hidden pt-20">
        <div className="absolute inset-0">
           {pageContent?.heroImageUrlDesktop && (
             <div className="hidden md:block absolute inset-0">
               <Image
                src={pageContent.heroImageUrlDesktop}
                alt="טיפול רגשי בטבעון"
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
                alt="טיפול רגשי בטבעון"
                fill
                className="object-cover opacity-60 brightness-[0.7]"
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
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {pageLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 w-48 bg-white/20 rounded mx-auto" />
              <div className="h-24 w-96 bg-white/20 rounded mx-auto" />
              <div className="h-8 w-72 bg-white/10 rounded mx-auto" />
            </div>
          ) : (
            <>
              <span className="boutique-label text-white/80 mb-6 block uppercase">TIVON HOLISTIC THERAPY</span>
              <h1 className="text-6xl md:text-9xl font-handwriting text-white mb-8 font-light">
                {pageContent?.heroTitle}
              </h1>
              <p className="text-2xl md:text-3xl font-headline italic text-white/90 leading-relaxed font-light">
                {pageContent?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </section>
      
      {/* Dynamic Features/Highlights */}
      {pageContent?.features?.length > 0 && (
        <section className="py-32 px-6 md:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              subtitle={pageContent.featuresTitle?.subtitle || "Therapy in Nature"} 
              title={pageContent.featuresTitle?.text || "למה לבחור בטיפול בטבעון?"} 
              className="flex flex-col items-center text-center"
              fontSize={pageContent.featuresTitle?.fontSize}
              fontFamily={pageContent.featuresTitle?.fontFamily}
              color={pageContent.featuresTitle?.color}
              align={pageContent.featuresTitle?.align || 'center'}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
              {pageContent.features.map((item: any, i: number) => {
                const IconMap: Record<string, React.ElementType> = { Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle };
                const Icon = IconMap[item.icon] || Heart;
                return (
                  <div key={i} className="flex flex-col items-center text-center space-y-6 p-8 bg-stone-50 border border-border/10 hover:shadow-lg transition-all duration-700">
                    <div className="text-primary p-4 bg-white rounded-full shadow-sm"><Icon size={24} /></div>
                    <h3 className="text-2xl font-headline font-bold text-accent">{item.title}</h3>
                    <p className="text-lg font-light text-stone-500 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-right order-2 lg:order-1">
               <SectionTitle
                 subtitle={pageContent?.introTitleSettings?.subtitle || "Therapy"}
                 title={pageContent?.introTitleSettings?.text || pageContent?.introTitle || "טיפול רגשי קרוב לבית"}
                 fontSize={pageContent?.introTitleSettings?.fontSize}
                 fontFamily={pageContent?.introTitleSettings?.fontFamily}
                 color={pageContent?.introTitleSettings?.color}
                 align={pageContent?.introTitleSettings?.align || 'right'}
                 className="!mb-12"
               />
               <div className="space-y-8 boutique-para mb-12">
                  {pageContent?.introContent != null ? (
                    <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                  ) : (
                    <p>המרחב שבו מתקיים הטיפול הוא בעל משמעות אדירה. כשאנחנו יוצאים מהמרוץ ונכנסים אל תוך הירוק של טבעון, המערכת העצבית שלנו מתחילה להירגע.</p>
                  )}
               </div>
               
               <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-start space-x-reverse space-x-6 border-r-8 border-primary pr-8 pl-12 py-6 bg-white shadow-xl w-fit mr-0 transition-all duration-700 hover:shadow-2xl">
                     <MapPin size={24} className="text-primary" />
                     <p className="text-2xl font-headline font-bold text-accent whitespace-nowrap">מיקום נגיש בלב טבעון</p>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="image-zoom-container aspect-[4/5] shadow-2xl relative border-8 border-white">
                  {pageContent?.clinicImageUrl && (
                    <Image
                      src={pageContent.clinicImageUrl}
                      alt="פסיכותרפיה בטבעון"
                      fill
                      className="object-cover"
                    />
                  )}
               </div>
            </div>
         </div>
      </section>

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

      <section className="py-32 bg-stone-50 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            subtitle={pageContent?.contactTitleSettings?.subtitle || "Connect"}
            title={pageContent?.contactTitleSettings?.text || "נפגש בקליניקה בטבעון?"}
            className="flex flex-col items-center"
            fontSize={pageContent?.contactTitleSettings?.fontSize}
            fontFamily={pageContent?.contactTitleSettings?.fontFamily}
            color={pageContent?.contactTitleSettings?.color}
            align={pageContent?.contactTitleSettings?.align || 'center'}
          />
          <p className="boutique-para mb-12">ניתן לתאם פגישת הכרות ללא עלות עבור טיפול רגשי בטבעון.</p>
          <div className="flex justify-center mb-16">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-12 py-4 bg-primary text-white boutique-label !text-[13px] !opacity-100 hover:bg-accent transition-all rounded-sm shadow-xl"
            >
              תאום פגישה בטבעון
              <ArrowLeft size={18} />
            </a>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
