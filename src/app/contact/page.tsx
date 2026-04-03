
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-contact');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20ואשמח%20לקבוע%20שיחת%20היכרות";

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Contact Moran Paz" 
              fill 
              className="object-cover opacity-60 brightness-[0.7]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          {/* Reduced Bottom Gradient by 50% */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20"></div>
        </div>
        <div className="relative z-10 text-center">
           <span className="boutique-label text-white/80 mb-8 block drop-shadow-md">Get in Touch</span>
           <h1 className="text-8xl md:text-[120px] font-handwriting text-white mb-8 font-bold hero-title-shadow">צור קשר</h1>
           <p className="text-2xl md:text-4xl font-headline italic text-white/90 leading-relaxed font-light hero-para-shadow">אני כאן עבורך לכל שאלה או תיאום</p>
        </div>
      </section>

      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-16">
              <SectionTitle subtitle="Information" title="איך משיגים אותי?" />
              
              <div className="space-y-12">
                <a href="tel:0507817338" className="flex items-center gap-8 group">
                  <div className="p-4 bg-stone-50 border border-stone-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Phone size={28} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="boutique-label text-stone-400 mb-1">טלפון</h4>
                    <p className="text-xl sm:text-2xl md:text-[30px] font-headline text-accent font-bold">050-781-7338</p>
                  </div>
                </a>

                <a href="mailto:moraniva5@gmail.com" className="flex items-center gap-8 group">
                  <div className="p-4 bg-stone-50 border border-stone-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Mail size={28} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="boutique-label text-stone-400 mb-1">מייל</h4>
                    <p className="text-xl sm:text-2xl md:text-[30px] font-headline text-accent font-bold break-all">moraniva5@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-8">
                  <div className="p-4 bg-stone-50 border border-stone-100">
                    <MapPin size={28} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="boutique-label text-stone-400 mb-1">מיקום הקליניקה</h4>
                    <p className="text-xl sm:text-2xl md:text-[30px] font-headline text-accent font-bold">קריית טבעון</p>
                  </div>
                </div>

                <div className="pt-12">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-6 px-12 py-5 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100"
                  >
                    <MessageSquare size={18} />
                    שיחה ישירה בוואטסאפ
                  </a>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-7 bg-white p-6 md:p-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
