
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { FaqSection } from '@/components/shared/FaqSection';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { ContactForm } from '@/components/shared/ContactForm';
import { MapPin, Trees, ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function TivonPage() {
  const clinicImg = PlaceHolderImages.find(img => img.id === 'clinic-tivon');

  const tivonFaqs = [
    {
      question: "למה כדאי להגיע לטיפול בטבעון?",
      answer: "הקליניקה בטבעון ממוקמת בלב הטבע הירוק, מה שמאפשר מרחב של שקט והתנתקות מהרעש החיצוני עוד לפני תחילת המפגש."
    },
    {
      question: "האם יש חניה בקרבת הקליניקה?",
      answer: "כן, יש חניה נוחה ובחינם ממש ליד הקליניקה לנוחיות המטופלים."
    },
    {
      question: "אילו טיפולים ניתן לקבל בטבעון?",
      answer: "בקליניקה בטבעון אני מקיימת פגישות פסיכותרפיה אישיות, טיפול רגשי חווייתי וליווי בתהליכי עומק."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative flex items-center justify-center bg-stone-900 overflow-hidden pt-20">
        <div className="absolute inset-0 grayscale brightness-[0.4]">
           {clinicImg && (
             <Image 
              src={clinicImg.imageUrl} 
              alt="טיפול בטבעון - קליניקה ירוקה ומזמינה" 
              fill 
              className="object-cover"
              priority
              data-ai-hint={clinicImg.imageHint}
             />
           )}
        </div>
        <div className="relative z-10 text-center px-6">
           <SectionTitle subtitle="Tivon Clinic" title="טיפול בטבעון" isLight={true} />
           <h1 className="text-2xl md:text-3xl font-headline italic text-white/90 mt-8 max-w-2xl mx-auto leading-relaxed">
             מרחב בטוח לנשימה ושינוי - טיפול רגשי ופסיכותרפיה בטבעון בלב הירוק.
           </h1>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-32 px-6 md:px-20 bg-background relative">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-right order-2 lg:order-1">
               <SectionTitle subtitle="Emotional Support" title="טיפול רגשי בטבעון" />
               <div className="space-y-8 boutique-para mb-12">
                  <p>
                    הקליניקה בטבעון טובלת בירוק ומציעה מרחב שקט ומכיל. השילוב בין <strong>פסיכותרפיה בטבעון</strong> לאנרגיה המרגיעה של הסביבה יוצר קרקע פורייה לצמיחה אישית וריפוי רגשי עמוק.
                  </p>
                  <p>
                    כאן, בין עצי האלון והאוויר הצלול, נוכל יחד לצלול אל עולמך הפנימי, לגלות את החלקים המבקשים ביטוי ולייצר שינוי משמעותי בחיי היום-יום.
                  </p>
               </div>
               
               <div className="space-y-8">
                  <div className="flex items-center justify-end space-x-reverse space-x-6 border-r-8 border-primary pr-8 py-6 bg-white shadow-xl transition-all hover:scale-[1.02]">
                     <div className="p-3 bg-secondary rounded-full text-primary">
                        <Trees size={24} />
                     </div>
                     <p className="text-2xl font-headline font-bold text-accent">פגישות אישיות פנים-אל-פנים</p>
                  </div>
                  <div className="flex items-center justify-end space-x-reverse space-x-6 border-r-8 border-stone-200 pr-8 py-6 bg-white/50 shadow-sm transition-all hover:scale-[1.02]">
                     <div className="p-3 bg-stone-100 rounded-full text-stone-400">
                        <MapPin size={24} />
                     </div>
                     <p className="text-2xl font-headline font-bold text-stone-700">ליווי רגשי ממוקד צמיחה</p>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="image-zoom-container aspect-[4/5] shadow-2xl relative border-8 border-white">
                  {clinicImg && (
                    <Image 
                      src={clinicImg.imageUrl} 
                      alt="פסיכותרפיה בטבעון - מורן פז" 
                      fill 
                      className="object-cover grayscale"
                      data-ai-hint={clinicImg.imageHint}
                    />
                  )}
               </div>
            </div>
         </div>
      </section>

      <TestimonialsSection />

      <FaqSection items={tivonFaqs} title="שאלות נפוצות על טיפול בטבעון" subtitle="Tivon FAQ" />

      {/* CTA Section */}
      <section className="py-32 bg-stone-50 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="נפגש בקליניקה בטבעון?" className="flex flex-col items-center" />
          <p className="boutique-para mb-12">ניתן לתאם פגישת הכרות ללא עלות עבור טיפול רגשי בטבעון. השאירי פרטים ואחזור אלייך בהקדם.</p>
          <div className="text-right">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
