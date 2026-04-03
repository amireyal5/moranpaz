
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DynamicPage() {
  const { slug } = useParams();
  const db = useFirestore();
  const contentRef = db && slug ? doc(db, 'siteContent', slug as string) : null;
  const { data: pageContent, loading } = useDoc<any>(contentRef);

  const contentReveal = useReveal();
  const heroImgFallback = PlaceHolderImages.find(img => img.id === 'hero-practice');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-primary size-12" />
      </div>
    );
  }

  // If no content found for this slug, we can redirect or show 404
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
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
