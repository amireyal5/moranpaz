
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Orbit, Waves, Infinity, Compass, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const introReveal = useReveal();
  const uniquenessReveal = useReveal();
  const portraitImg = PlaceHolderImages.find(img => img.id === 'moran-portrait');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20קראתי%20עליך%20באתר%20ואשמח%20לפרטים%20על%20תהליך%20טיפולי";

  const uniquenessPoints = [
    {
      title: "חיבור הוליסטי עמוק",
      icon: <Orbit className="text-primary animate-art-float" size={32} strokeWidth={1} />,
      desc: "אני מאמינה שהאדם הוא שלם. הגישה שלי משלבת שיחה עם עבודה רגשית חווייתית שנוגעת בגוף ובנשמה."
    },
    {
      title: "כלים מהעולם החדש",
      icon: <Infinity className="text-primary animate-art-float" size={32} strokeWidth={1} />,
      desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס – כלים המאפשרים גישה ישירה לרובד הרגשי העמוק."
    },
    {
      title: "מרחב של שקט",
      icon: <Waves className="text-primary animate-art-float" size={32} strokeWidth={1} />,
      desc: "הקליניקה ממוקמת בלב הירוק של טבעון, מרחב שמאפשר ניתוק מהרעש החיצוני וחיבור שקט לעצמך."
    },
    {
      title: "ליווי מקצועי מוסמך",
      icon: <Compass className="text-primary animate-art-float" size={32} strokeWidth={1} />,
      desc: "שילוב של תואר שני (MA) בייעוץ ארגוני מאוניברסיטת חיפה עם הכשרה מעמיקה בפסיכותרפיה הוליסטית."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div ref={introReveal} className="lg:col-span-7 reveal">
             <div className="mb-16">
               <span className="boutique-label block mb-6 text-primary">About Moran Paz</span>
               <h1 className="text-6xl md:text-9xl font-['Amatic_SC'] font-bold text-foreground leading-none">
                 נעים מאוד, מורן פז
               </h1>
               <div className="w-24 h-[1px] mt-8 mr-0 bg-primary/30"></div>
             </div>
             
             <div className="space-y-10 boutique-para">
                <p className="stagger-1 text-3xl md:text-4xl font-headline text-foreground italic border-r-4 border-primary/20 pr-8 font-light">
                  "אנחנו לא רק מה שהיינו – אנחנו גם מה שנהיה."
                </p>
                <div className="space-y-8">
                  <p className="stagger-2">
                    פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. 
                    אני מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב. 
                  </p>
                  <p className="stagger-3">
                    בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. 
                    לכל אדם יש את הקצב והמסע שלו ואני כאן ללוות מתוך כבוד ואמונה באדם ובדרך.
                  </p>
                  <p className="stagger-4">
                    בעשור האחרון עברתי מסע אישי מרפא וכיום אני מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם.
                  </p>
                  <p className="stagger-5 font-medium text-accent">
                    מה זה נותן? פחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, ביטוי אותנטי ותחושת רווחה גבוהה יותר.
                  </p>
                </div>
                
                <div className="pt-12 stagger-6">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-6 px-12 py-5 bg-accent !text-white boutique-label hover:bg-primary transition-all duration-700 shadow-xl rounded-sm whitespace-nowrap"
                  >
                    תאום שיחת היכרות אישית
                    <ArrowLeft size={18} />
                  </a>
                </div>
             </div>
          </div>
          
          <div className="lg:col-span-5">
             <div className="image-zoom-container aspect-[3/4] shadow-2xl border-t-8 border-r-8 border-primary/10">
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
        </div>
      </section>

      {/* Uniqueness Section */}
      <section ref={uniquenessReveal} className="py-32 md:py-48 px-8 md:px-24 bg-stone-50 reveal">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="My Philosophy" title="מה מייחד את הגישה שלי?" className="flex flex-col items-center" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
            {uniquenessPoints.map((point, i) => (
              <div key={i} className={cn("flex items-start space-x-reverse space-x-6 text-right group", `stagger-${i+1}`)}>
                <div className="mt-2 p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-700">
                  {point.icon}
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-headline font-bold text-accent">{point.title}</h4>
                  <p className="text-xl font-light text-stone-600 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="מוזמנת ליצור קשר" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
