"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';

export default function BlogPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-blog');
  const revealRef = useReveal();

  const articles = [
    {
      title: "גוף-נפש-רוח: השפה השלמה",
      excerpt: "איך נוכל להתחיל להקשיב למסרים שהגוף שלנו שולח לנו ביומיום?",
      date: "מרץ 2024",
      category: "מודעות"
    },
    {
      title: "לקבל את הצל: המפגש עם הלא נודע",
      excerpt: "מדוע דווקא בחלקים המפחידים שלנו נמצא המפתח לחופש האמיתי?",
      date: "פברואר 2024",
      category: "קבלה עצמית"
    },
    {
      title: "הסמכות הפנימית: למצוא את המצפן",
      excerpt: "כך תלמדי להפסיק לחפש תשובות בחוץ ולהתחיל להקשיב פנימה.",
      date: "ינואר 2024",
      category: "סמכות פנימית"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Points of Light" 
              fill 
              className="object-cover opacity-60"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block">The Wisdom</span>
           <h1 className="text-8xl md:text-[140px] font-handwriting text-white mb-8 font-bold">נקודות של אור</h1>
           <p className="text-2xl md:text-5xl font-headline italic text-white/90 leading-relaxed font-light">ידע, תובנות והשראה למסע הפנימי</p>
        </div>
      </section>

      <section ref={revealRef} className="py-32 md:py-56 px-8 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Journal" title="השראה ושיתופים" className="flex flex-col items-center text-center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-32">
            {articles.map((article, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-stone-50 aspect-video mb-10 overflow-hidden relative">
                   <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                   <div className="absolute top-6 right-6 boutique-label text-[10px] bg-white px-3 py-1 shadow-sm">{article.category}</div>
                </div>
                <div className="space-y-6">
                  <span className="boutique-label text-stone-400">{article.date}</span>
                  <h3 className="text-3xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-lg font-light text-stone-500 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-primary boutique-label text-[10px] pt-4">
                    קריאת המאמר <ArrowLeft size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}