"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqSection } from '@/components/shared/FaqSection';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { ContactForm } from '@/components/shared/ContactForm';
import { MapPin, Trees, Coffee, Sun, Wind, ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TivonPage() {
  const clinicImg = PlaceHolderImages.find(img => img.id === 'clinic-tivon');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20על%20טיפול%20בקליניקה%20בטבעון";

  const tivonFaqs = [
    {
      question: "למה כדאי להגיע לטיפול בטבעון?",
      answer: "הקליניקה בטבעון ממוקמת בלב הטבע הירוק, מה שמאפשר מרחב של שקט והתנתקות מהרעש החיצוני עוד לפני תחילת המפגש. השקט הזה הוא חלק בלתי נפרד מהתהליך הטיפולי."
    },
    {
      question: "האם יש חניה בקרבת הקליניקה?",
      answer: "כן, יש חניה נוחה ובחינם ממש ליד הקליניקה לנוחיות המטופלים."
    },
    {
      question: "האם הקליניקה נגישה?",
      answer: "הקליניקה נגישה ונוחה להגעה. אם יש דרישות נגישות ספציפיות, אנא צייני זאת בשיחת התיאום כדי שאוכל להיערך בהתאם."
    }
  ];

  const highlights = [
    { title: "אווירה כפרית ושלווה", icon: <Trees size={24} />, desc: "מיקום שקט בלב הירוק של טבעון." },
    { title: "מרחב בטוח ומכיל", icon: <Wind size={24} />, desc: "עיצוב מינימליסטי המשרה רוגע וביטחון." },
    { title: "אירוח חם", icon: <Coffee size={24} />, desc: "פינת ישיבה נעימה ותה צמחים להרגעה." },
    { title: "אור טבעי", icon: <Sun size={24} />, desc: "חלונות גדולים הפונים לצמחייה ירוקה." }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="h-[75vh] relative flex items-center justify-center bg-stone-900 overflow-hidden pt-20">
        <div className="absolute inset-0 grayscale brightness-[0.45]">
           {clinicImg && (
             <Image 
              src={clinicImg.imageUrl} 
              alt="טיפול רגשי בטבעון - קליניקה ירוקה ומזמינה של מורן פז" 
              fill 
              className="object-cover"
              priority
              data-ai-hint={clinicImg.imageHint}
             />
           )}
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
           <span className="boutique-label text-primary/80 mb-6 block">Tivon Clinic Tour</span>
           <h1 className="text-5xl md:text-8xl font-headline text-white mb-8">סיור בקליניקה בטבעון</h1>
           <p className="text-2xl md:text-3xl font-headline italic text-white/90 leading-relaxed">
             פסיכותרפיה הוליסטית בלב הטבע - מרחב בטוח לנשימה ושינוי בעמק יזרעאל.
           </p>
        </div>
      </section>
      
      <section className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Virtual Tour" title="האווירה בקליניקה" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
            {highlights.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6 p-8 bg-stone-50 border border-border/10 hover:shadow-lg transition-all duration-700">
                <div className="text-primary p-4 bg-white rounded-full shadow-sm">{item.icon}</div>
                <h3 className="text-2xl font-headline font-bold text-accent">{item.title}</h3>
                <p className="text-lg font-light text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-right order-2 lg:order-1">
               <h2 className="text-4xl md:text-6xl font-headline text-accent mb-12 italic">למה טיפול בטבעון?</h2>
               <div className="space-y-8 boutique-para mb-12">
                  <p>
                    המרחב שבו מתקיים הטיפול הוא בעל משמעות אדירה. כשאנחנו יוצאים מהמרוץ של עמק יזרעאל ונכנסים אל תוך הירוק של טבעון, המערכת העצבית שלנו מתחילה להירגע עוד לפני שהחל המפגש.
                  </p>
                  <p>
                    בקליניקה שלי הושקעה מחשבה רבה ביצירת תחושה של "בית". השילוב בין פסיכותרפיה מקצועית לבין סביבה תומכת ושקטה מאפשר למטופלות שלי להרגיש בטוחות לחלוטין לצלול לעומק.
                  </p>
               </div>
               
               <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-end space-x-reverse space-x-6 border-r-8 border-primary pr-8 py-6 bg-white shadow-xl">
                     <MapPin size={24} className="text-primary" />
                     <p className="text-2xl font-headline font-bold text-accent">מיקום נגיש בלב טבעון והסביבה</p>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="image-zoom-container aspect-[4/5] shadow-2xl relative border-8 border-white">
                  {clinicImg && (
                    <Image 
                      src={clinicImg.imageUrl} 
                      alt="פסיכותרפיה בטבעון - המרחב הטיפולי של מורן פז" 
                      fill 
                      className="object-cover"
                      data-ai-hint={clinicImg.imageHint}
                    />
                  )}
               </div>
            </div>
         </div>
      </section>

      <TestimonialsSection />

      <FaqSection items={tivonFaqs} title="שאלות נפוצות על טיפול בטבעון" subtitle="Tivon Clinic FAQ" />

      <section className="py-32 bg-stone-50 px-6 md:px-20" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="נפגש בקליניקה בטבעון?" className="flex flex-col items-center" />
          <p className="boutique-para mb-12">ניתן לתאם פגישת הכרות ללא עלות עבור טיפול רגשי בטבעון. השאירי פרטים ואחזור אלייך בהקדם.</p>
          <div className="flex justify-center mb-16">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-primary !text-white boutique-label !text-lg md:!text-xl hover:bg-accent transition-all rounded-sm shadow-xl"
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
