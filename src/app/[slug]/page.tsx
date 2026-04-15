
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
import { PortraitImage } from '@/components/shared/PortraitImage';
import { useReveal } from '@/hooks/use-reveal';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Heart, Sparkles, Orbit, Compass, Users, Star, MessageSquare, HelpCircle
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

  const heroDesktopSrc = pageContent?.heroImageUrlDesktop;
  const heroMobileSrc = pageContent?.heroImageUrlMobile || pageContent?.heroImageUrlDesktop;
  const heroHeight = pageContent?.heroHeight || '70vh';
  const heroTextAlign = pageContent?.heroTextAlign || 'center';
  const heroBgColor = pageContent?.heroBgColor || 'bg-stone-900';
  const sectionBg = pageContent?.sectionBg || 'white';

  const sectionBgClass =
    sectionBg === 'stone-50' ? 'bg-stone-50' :
    sectionBg === 'stone-100' ? 'bg-stone-100' :
    sectionBg === 'primary' ? 'bg-primary/10' :
    'bg-white';

  const heroAlignClass =
    heroTextAlign === 'right' ? 'text-right items-end' :
    heroTextAlign === 'left' ? 'text-left items-start' :
    'text-center items-center';

  const order = pageContent?.sectionOrder || ['hero', 'intro', 'dynamic', 'features', 'testimonials', 'faqs', 'cta', 'contact'];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden" style={{ '--primary': pageContent?.primaryColor } as any}>
      <Navbar />
      
      {order.map((secId: string) => {
        switch (secId) {
          case 'hero':
            return (
              <section
                key="hero"
                className={`relative w-full flex flex-col justify-center px-6 overflow-hidden ${heroBgColor.startsWith('#') || heroBgColor.startsWith('rgb') ? '' : heroBgColor.startsWith('bg-') ? heroBgColor : 'bg-stone-900'}`}
                style={{
                  height: heroHeight,
                  ...(heroBgColor.startsWith('#') || heroBgColor.startsWith('rgb') ? { backgroundColor: heroBgColor } : {})
                }}
              >
                <div className="absolute inset-0">
                  {heroDesktopSrc && (
                    <div className="hidden md:block absolute inset-0">
                      <Image 
                        src={heroDesktopSrc} 
                        alt={pageContent?.heroTitle || "Hero"} 
                        fill 
                        className="object-cover opacity-60 brightness-[0.7]"
                        priority
                      />
                    </div>
                  )}
                  {heroMobileSrc && (
                    <div className="md:hidden absolute inset-0">
                      <Image 
                        src={heroMobileSrc} 
                        alt={pageContent?.heroTitle || "Hero Mobile"} 
                        fill 
                        className="object-cover opacity-60 brightness-[0.7]"
                        priority
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
                  {/* Decorative "Cloud" / Mist at the bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent z-0 pointer-events-none"
                    style={{ opacity: (pageContent?.heroCloudiness ?? 30) / 100 }}
                  />
                </div>
                <div className={`relative z-10 flex flex-col ${heroAlignClass} w-full max-w-5xl mx-auto px-4`}>
                  <h1 className={`font-bold hero-title-shadow leading-tight mb-8 ${pageContent?.heroTitleSettings?.fontFamily || 'font-handwriting'} ${pageContent?.heroTitleSettings?.fontSize || 'text-7xl md:text-9xl'}`}
                      style={{ color: pageContent?.heroTitleSettings?.color || '#ffffff' }}>
                    {pageContent?.heroTitleSettings?.text || pageContent?.heroTitle || ""}
                  </h1>
                  <p className={`italic leading-relaxed font-light hero-para-shadow ${pageContent?.heroSubtitleSettings?.fontFamily || 'font-headline'} ${pageContent?.heroSubtitleSettings?.fontSize || 'text-2xl md:text-4xl'}`}
                      style={{ color: pageContent?.heroSubtitleSettings?.color || '#f5f5f5' }}>
                    {pageContent?.heroSubtitleSettings?.text || pageContent?.heroSubtitle || ""}
                  </p>
                </div>
              </section>
            );

          case 'intro':
            return (
              <section key="intro" className={`pt-32 pb-16 px-4 md:px-8 xl:px-24 ${sectionBgClass}`}>
                <div className="max-w-5xl mx-auto">
                  {pageContent?.portraitImageUrl ? (
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center`}>
                      <div className={`lg:col-span-5 ${pageContent?.portraitPosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                        <PortraitImage
                          src={pageContent.portraitImageUrl}
                          loading={false}
                          shape={(pageContent?.portraitShape as any) || 'circle'}
                          alt="Portrait"
                          className="max-w-md mx-auto lg:max-w-none"
                        />
                      </div>
                      <div className={`lg:col-span-7 ${pageContent?.portraitPosition === 'right' ? 'lg:order-1' : 'lg:order-2'} space-y-10`}>
                        {pageContent?.introTitle && (
                          <SectionTitle 
                            subtitle={pageContent.introTitleSettings?.subtitle || "Information"} 
                            title={pageContent.introTitleSettings?.text || pageContent.introTitle} 
                            fontSize={pageContent.introTitleSettings?.fontSize}
                            fontFamily={pageContent.introTitleSettings?.fontFamily}
                            color={pageContent.introTitleSettings?.color}
                            align={pageContent.introTitleSettings?.align || 'right'}
                          />
                        )}
                        <div ref={contentReveal} className="reveal space-y-12">
                          <div className="boutique-para space-y-8 text-stone-600">
                            {pageContent?.introContent ? (
                              <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                            ) : (
                              <p className="text-center italic opacity-30">אין תוכן להצגה בעמוד זה.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {pageContent?.introTitle && (
                        <SectionTitle 
                          subtitle={pageContent.introTitleSettings?.subtitle || "Information"} 
                          title={pageContent.introTitleSettings?.text || pageContent.introTitle} 
                          fontSize={pageContent.introTitleSettings?.fontSize}
                          fontFamily={pageContent.introTitleSettings?.fontFamily}
                          color={pageContent.introTitleSettings?.color}
                          align={pageContent.introTitleSettings?.align || 'right'}
                        />
                      )}
                      <div ref={contentReveal} className="reveal space-y-12">
                        <div className="boutique-para space-y-8 text-stone-600">
                          {pageContent?.introContent ? (
                            <div className="page-content-container" dangerouslySetInnerHTML={{ __html: pageContent.introContent.replace(/&nbsp;|\u00A0/g, ' ') }} />
                          ) : (
                            <p className="text-center italic opacity-30">אין תוכן להצגה בעמוד זה.</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {pageContent?.clinicImageUrl && (
                    <div className="mt-16 relative aspect-video shadow-2xl overflow-hidden">
                      <Image src={pageContent.clinicImageUrl} alt="Clinic" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </section>
            );

          case 'dynamic':
            return (
              <section key="dynamic" className="py-8 px-4 md:px-8 xl:px-24">
                <div className="max-w-5xl mx-auto">
                {pageContent?.dynamicSections?.map((sec: any, i: number) => {
                  const bgClass = sec.bg === 'stone-50' ? 'bg-stone-50' : sec.bg === 'stone-100' ? 'bg-stone-100' : sec.bg === 'primary' ? 'bg-primary/10' : 'bg-transparent';
                  return (
                    <div key={sec.id || i} className={`mt-8 p-8 md:p-12 rounded-sm ${bgClass}`}>
                      {sec.title && (
                        <h3 className="text-4xl font-headline text-accent mb-8">{sec.title}</h3>
                      )}
                      {sec.type === 'image-text' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                          <div className={`${sec.imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}`}>
                            {sec.imageUrl && (
                              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden shadow-lg">
                                <Image src={sec.imageUrl} alt={sec.title || "Section image"} fill className="object-cover" />
                              </div>
                            )}
                          </div>
                          <div className={`${sec.imagePosition === 'left' ? 'md:order-2' : 'md:order-1'} boutique-para text-stone-600`}>
                            <div dangerouslySetInnerHTML={{ __html: sec.content || '' }} />
                          </div>
                        </div>
                      ) : (
                        <div className="boutique-para text-stone-600">
                          <div dangerouslySetInnerHTML={{ __html: sec.content || '' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              </section>
            );

          case 'features':
            return pageContent?.features?.length > 0 ? (
              <section key="features" className="py-24 px-4 md:px-8 xl:px-24">
                <div className="max-w-5xl mx-auto">
                  <SectionTitle 
                    subtitle={pageContent.featuresTitle?.subtitle || "Our Approach"} 
                    title={pageContent.featuresTitle?.text || "מרחבי הטיפול והליווי שלי"} 
                    className="flex flex-col items-center text-center"
                    fontSize={pageContent.featuresTitle?.fontSize}
                    fontFamily={pageContent.featuresTitle?.fontFamily}
                    color={pageContent.featuresTitle?.color}
                    align={pageContent.featuresTitle?.align || 'center'}
                  />
                  <div ref={featuresReveal} className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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
                </div>
              </section>
            ) : null;

          case 'testimonials':
            return pageContent?.testimonials?.length > 0 ? (
              <div key="testimonials">
                <TestimonialsSection 
                  customTestimonials={pageContent.testimonials} 
                  titleSettings={pageContent.testimonialsTitle}
                />
              </div>
            ) : null;

          case 'faqs':
            return pageContent?.faqs?.length > 0 ? (
              <div key="faqs">
                <FaqSection 
                  items={pageContent.faqs} 
                  titleSettings={pageContent.faqsTitle}
                />
              </div>
            ) : null;

          case 'cta':
            return (
              <div key="cta" className="py-16 px-4 md:px-8 xl:px-24">
                <div className="max-w-5xl mx-auto">
                  <CtaButtons buttons={pageContent?.ctaButtons} align={pageContent?.ctaAlign} />
                </div>
              </div>
            );

          case 'contact':
            return (
              <div key="contact" className="py-16 px-4 md:px-8 xl:px-24 bg-stone-50">
                <div className="max-w-5xl mx-auto text-center">
                   <SectionTitle 
                     subtitle={pageContent.contactTitleSettings?.subtitle || "Contact"} 
                     title={pageContent.contactTitleSettings?.text || "מחכה לשמוע ממך"} 
                     fontSize={pageContent.contactTitleSettings?.fontSize}
                     fontFamily={pageContent.contactTitleSettings?.fontFamily}
                     color={pageContent.contactTitleSettings?.color}
                     align={pageContent.contactTitleSettings?.align || 'center'}
                   />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}

      <Footer />
    </main>
  );
}
