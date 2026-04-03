
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPostPage() {
  const { postId } = useParams();
  const router = useRouter();
  const db = useFirestore();
  
  const postRef = postId ? doc(db!, 'blogPosts', postId as string) : null;
  const { data: post, loading } = useDoc<any>(postRef);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-primary size-12" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-right p-8">
        <h1 className="text-4xl font-headline text-accent mb-8">המאמר לא נמצא</h1>
        <Button onClick={() => router.push('/blog')} className="bg-primary text-white">חזרה לבלוג</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image 
              src={post.heroImageUrlDesktop} 
              alt={post.title} 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </div>
          {/* Mobile Image */}
          <div className="md:hidden absolute inset-0">
            <Image 
              src={post.heroImageUrlMobile} 
              alt={post.title} 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl">
           <span className="boutique-label text-white/80 mb-6 block drop-shadow-md uppercase tracking-[0.4em]">{post.category}</span>
           <h1 className="text-5xl md:text-8xl font-handwriting text-white mb-8 font-bold hero-title-shadow leading-tight">{post.title}</h1>
           <p className="text-xl md:text-3xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">{post.subtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-24 md:py-32 px-6 md:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-8 mb-16 pb-8 border-b border-stone-100 text-stone-400 boutique-label !text-[10px]">
             <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{post.date}</span>
             </div>
             <div className="flex items-center gap-2">
                <Tag size={14} />
                <span>{post.category}</span>
             </div>
             <Button variant="ghost" size="sm" onClick={() => router.push('/blog')} className="mr-auto text-primary hover:text-accent font-bold">
               <ArrowRight size={16} className="ml-2" /> חזרה לכל המאמרים
             </Button>
          </div>

          <div 
            className="boutique-para !max-w-none text-stone-700 leading-[1.8] space-y-8 font-sans text-xl md:text-2xl"
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-24 pt-16 border-t border-stone-100 flex flex-col items-center text-center space-y-8">
             <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ArrowRight size={24} />
             </div>
             <h4 className="text-4xl font-handwriting text-accent">תודה שקראת. יש לך שאלות נוספות?</h4>
             <Button onClick={() => router.push('/contact')} className="bg-accent hover:bg-primary text-white h-14 px-12 boutique-label rounded-none shadow-xl transition-all duration-700">צרי קשר אישי</Button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
