
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Orbit, Waves, Infinity, Compass, ArrowLeft, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20קראתי%20עליך%20באתר%20ואשמח%20לפרטים%20על%20תהליך%20טיפולי";

  const uniquenessPoints = [
    {
      title: "חיבור הוליסטי עמוק",
      icon: <Orbit className="text-primary" size={32} strokeWidth={1} />,
      desc: "אני מאמינה שהאדם הוא שלם. הגישה שלי משלבת שיחה עם עבודה רגשית חווייתית שנוגעת בגוף ובנשמה."
    },
    {
      title: "כלים מהעולם החדש",
      icon: <Infinity className="text-primary" size={32} strokeWidth={1} />,
      desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס – כלים המאפשרים גישה ישירה לרובד הרגשי העמוק."
    },
    {
      title: "מרחב של שקט",
      icon: <Waves className="text-primary" size={32} strokeWidth={1} />,
      desc: "הקליניקה ממוקמת בלב הירוק של טבעון, מרחב שמאפשר ניתוק מהרעש החיצוני וחיבור שקט לעצמך."
    },
    {
      title: "ליווי מקצועי מוסמך",
      icon: <Compass className="text-primary" size={32} strokeWidth={1} />,
      desc: "שילוב של תואר שני (MA) בייעוץ ארגוני מאוניברסיטת חיפה עם הכשרה מעמיקה בפסיכותרפיה הוליסטית."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={introReveal} className="reveal text-center mb-24">
            <span className="boutique-label block mb-8 text-primary">About Moran Paz</span>
            <h1 className="text-7xl md:text-[140px] font-handwriting font-bold text-foreground leading-none mb-10">
              נעים מאוד, מורן פז
            </h1>
            <div className="w-24 h-[1px] bg-primary/30 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-8 border-white">
                  {portraitImg && (
                    <Image 
                      src={portraitImg.imageUrl} 
                      alt="מורן פז - פסיכותרפיסטית" 
                      fill 
                      className="object-cover"
                      data-ai-hint={portraitImg.imageHint}
                    />
                  )}
               </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
               <div className="relative pr-12 py-2">
                  <Quote className="absolute -top-6 -right-2 text-primary/5 w-32 h-32 rotate-180 pointer-events-none" />
                  <div className="border-r-[3px] border-primary/20 pr-10 py-1">
                    <p className="text-3xl md:text-5xl font-headline text-accent italic font-light leading-snug relative z-10">
                      אנחנו לא רק מה שהיינו – אנחנו גם מה שנהיה.
                    </p>
                  </div>
               </div>
               <div className="space-y-8 boutique-para text-stone-600">
                  <p>
                    פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. 
                    אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב. 
                  </p>
                  <p>
                    בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. 
                    לכל אדם יש את הקצב והמסע שלו ואני כאן ללוות מתוך כבוד ואמונה באדם ובדרך.
                  </p>
                  <p className="font-medium text-accent">
                    התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, וביטוי אותנטי.
                  </p>
               </div>
               
               <div className="pt-8">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-8 px-16 py-4 bg-primary !text-white boutique-label hover:bg-accent transition-all duration-700 shadow-xl rounded-sm whitespace-nowrap !opacity-100"
                  >
                    תאום שיחת היכרות
                    <ArrowLeft size={16} />
                  </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-48 px-8 md:px-24 bg-stone-50 reveal">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="My Philosophy" title="מה מייחד את הגישה שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 mt-24">
            {uniquenessPoints.map((point, i) => (
              <div key={i} className={cn("flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-right group", `stagger-${i+1}`)}>
                <div className="flex-shrink-0 p-5 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-700 animate-art-float">
                  {point.icon}
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-headline font-bold text-accent">{point.title}</h4>
                  <p className="text-xl font-light text-stone-500 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="מוזמנת ליצור קשר" className="flex flex-col items-center text-center" />
          <p className="text-center boutique-para mb-16">אני כאן בשבילך לכל שאלה או לתיאום פגישה ראשונית.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
