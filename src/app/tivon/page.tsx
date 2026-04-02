
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { MapPin, Trees } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TivonPage() {
  const clinicImg = PlaceHolderImages.find(img => img.id === 'clinic-tivon');

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="h-[70vh] relative flex items-center justify-center bg-stone-900 overflow-hidden pt-20">
        <div className="absolute inset-0 grayscale brightness-[0.4]">
           {clinicImg && (
             <Image 
              src={clinicImg.imageUrl} 
              alt={clinicImg.description} 
              fill 
              className="object-cover"
              data-ai-hint={clinicImg.imageHint}
             />
           )}
        </div>
        <div className="relative z-10 text-center px-6">
           <SectionTitle subtitle="Clinic" title="טיפול בטבעון" number="L" isLight={true} />
           <p className="text-2xl md:text-3xl font-headline italic text-white/90 mt-8 max-w-2xl mx-auto leading-relaxed">
             מרחב בטוח לנשימה ושינוי בלב הירוק של טבעון.
           </p>
        </div>
      </section>
      
      <section className="py-32 px-6 md:px-20 bg-background relative">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-right order-2 lg:order-1">
               <SectionTitle subtitle="The Setting" title="ריפוי בטבע" />
               <p className="text-xl font-light text-stone-600 leading-relaxed mb-12">
                  הקליניקה בטבעון טובלת בירוק ומציעה מרחב שקט ומכיל. השילוב בין פסיכותרפיה הוליסטית לאנרגיה המרגיעה של הסביבה יוצר קרקע פורייה לצמיחה אישית.
               </p>
               
               <div className="space-y-8">
                  <div className="flex items-center justify-end space-x-reverse space-x-6 border-r-8 border-primary pr-8 py-6 bg-white rounded-[2rem] shadow-xl transform transition-all hover:scale-105">
                     <div className="p-3 bg-secondary rounded-full text-primary">
                        <Trees size={24} />
                     </div>
                     <p className="text-2xl font-headline font-bold text-accent">פגישות אישיות פנים-אל-פנים</p>
                  </div>
                  <div className="flex items-center justify-end space-x-reverse space-x-6 border-r-8 border-stone-200 pr-8 py-6 bg-white/50 rounded-[2rem] shadow-sm transform transition-all hover:scale-105">
                     <div className="p-3 bg-stone-100 rounded-full text-stone-400">
                        <MapPin size={24} />
                     </div>
                     <p className="text-2xl font-headline font-bold text-stone-700">ליווי רגשי ממוקד צמיחה</p>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-white rotate-2 hover:rotate-0 transition-transform duration-700">
                  {clinicImg && (
                    <Image 
                      src={clinicImg.imageUrl} 
                      alt={clinicImg.description} 
                      fill 
                      className="object-cover grayscale"
                      data-ai-hint={clinicImg.imageHint}
                    />
                  )}
               </div>
            </div>
         </div>
      </section>

      <section className="py-32 bg-stone-100 px-6 md:px-20" id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground mb-8">נפגש בקליניקה?</h2>
          <p className="text-xl text-stone-600 mb-12">ניתן לתאם פגישת הכרות ללא עלות. השאירי פרטים ואחזור אלייך בהקדם.</p>
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
