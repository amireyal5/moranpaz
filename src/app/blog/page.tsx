
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useFirestore, useCollection } from '@/firebase';
import { query, collection, orderBy } from 'firebase/firestore';

export default function BlogPage() {
  const heroDesktop = PlaceHolderImages.find(img => img.id === 'hero-blog-desktop');
  const heroMobile = PlaceHolderImages.find(img => img.id === 'hero-blog-mobile');
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const revealRef = useReveal();
  const introReveal = useReveal();
  const db = useFirestore();

  const postsQuery = db ? query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc')) : null;
  const { data: posts, loading } = useCollection(postsQuery);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroDesktop && (
            <div className="hidden md:block absolute inset-0">
              <Image 
                src={heroDesktop.imageUrl} 
                alt="Points of Light" 
                fill 
                className="object-cover opacity-60"
                priority
                data-ai-hint={heroDesktop.imageHint}
              />
            </div>
          )}
          {heroMobile && (
            <div className="md:hidden absolute inset-0">
              <Image 
                src={heroMobile.imageUrl} 
                alt="Points of Light Mobile" 
                fill 
                className="object-cover opacity-60"
                priority
                data-ai-hint={heroMobile.imageHint}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">The Wisdom</span>
           <h1 className="text-5xl md:text-8xl xl:text-[140px] font-handwriting text-white mb-8 font-bold hero-title-shadow">נקודות של אור</h1>
           <p className="text-xl md:text-3xl xl:text-[50px] font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">ידע, תובנות והשראה למסע הפנימי</p>
        </div>
      </section>

      {/* Personal Introduction Section */}
      <section ref={introReveal} className="py-20 md:py-32 bg-stone-50 border-b border-stone-100 px-6 reveal">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 text-right">
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative rounded-full overflow-hidden border-4 border-white shadow-xl">
            {portraitImg && (
              <Image 
                src={portraitImg.imageUrl} 
                alt="מורן פז" 
                fill 
                className="object-cover"
              />
            )}
          </div>
          <div className="space-y-6 flex-1">
            <h2 className="text-3xl md:text-5xl font-handwriting text-accent font-bold">ברוכים הבאים ל&quot;נקודות של אור&quot;</h2>
            <div className="boutique-para !text-lg md:!text-xl !mr-0 !max-w-none italic text-stone-600 leading-relaxed">
              &quot;אני מאמינה שהמסע אל עצמנו רצוף ברגעים של גילוי, לחישות של הלב ותובנות שמבקשות לצאת לאור. המרחב הזה נועד להיות בית למחשבות, השראה וידע המשלבים גוף, נפש ורוח – כלים שנועדו להאיר את הדרך חזרה אל המהות האמיתית שלנו. אני מזמינה אתכם לקרוא, לנשום ולמצוא כאן נקודה של אור עבור המסע האישי שלכם.&quot;
            </div>
            <span className="boutique-label text-primary block mt-4">— מורן פז</span>
          </div>
        </div>
      </section>

      <section ref={revealRef} className="py-24 md:py-32 xl:py-40 px-6 md:px-12 xl:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Journal" title="השראה ושיתופים" className="flex flex-col items-center text-center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-16 mt-20 md:mt-32">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="animate-spin text-primary size-12" />
              </div>
            ) : posts?.length === 0 ? (
              <p className="col-span-full text-center text-stone-400 text-xl font-light font-headline">בקרוב יעלו תכנים חדשים ומאירי פנים...</p>
            ) : (
              posts?.map((post: any) => (
                <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="group cursor-pointer">
                  <div className="bg-stone-50 aspect-video mb-8 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-700">
                     {post.heroImageUrlDesktop ? (
                       <>
                         <div className="hidden md:block absolute inset-0">
                           <Image 
                             src={post.heroImageUrlDesktop} 
                             alt={post.title} 
                             fill 
                             className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                           />
                         </div>
                         <div className="md:hidden absolute inset-0">
                           <Image 
                             src={post.heroImageUrlMobile || post.heroImageUrlDesktop} 
                             alt={post.title} 
                             fill 
                             className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                           />
                         </div>
                       </>
                     ) : (
                       <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                          <span className="font-handwriting text-4xl text-stone-300">BeinMe</span>
                       </div>
                     )}
                     <div className="absolute top-4 right-4 boutique-label text-[10px] bg-white px-3 py-1 shadow-sm">{post.category}</div>
                  </div>
                  <div className="space-y-4">
                    <span className="boutique-label text-stone-400 block">{formatDisplayDate(post.date)}</span>
                    <h3 className="text-2xl md:text-3xl font-headline font-bold text-accent group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                    <p className="text-lg font-light text-stone-500 leading-relaxed line-clamp-3 font-headline italic">
                      {post.summary || post.subtitle || "לחצו לקריאת המאמר המלא..."}
                    </p>
                    <div className="flex items-center gap-4 text-primary boutique-label text-[10px] pt-4 font-bold">
                      קריאת המאמר <ArrowLeft size={14} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
