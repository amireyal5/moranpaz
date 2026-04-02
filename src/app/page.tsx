"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronDown, MessageCircle, ArrowLeft, Eye, Orbit, Waves, Infinity, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroReveal = useReveal();
  const uniquenessReveal = useReveal();
  const audienceReveal = useReveal();
  const tourReveal = useReveal();
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const clinicImg = PlaceHolderImages.find(img => img.id === 'clinic-tivon');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20הגעתי%20מהאתר%20שלך%20מעוניין%20לקבל%20פרטים%20נוספים%20תודה";

  const homeFaqs = [
    {
      question: "למי מתאים הטיפול הרגשי?",
      answer: "הטיפול מתאים למי שחווה עומס רגשי, חרדה, תקיעות בחיים או רצון עמוק לחיבור אותנטי לעצמו. אני עובדת עם מבוגרים, נוער ונשים בטבעון ובאונליין."
    },
    {
      question: "מהי פסיכותרפיה הוליסטית ואיך היא עוזרת?",
      answer: "פסיכותרפיה הוליסטית רואה באדם שלם - גוף, נפש ורוח. הטיפול משלב שיחה יחד עם כלים חווייתיים (כמו מיינדפולנס ועבודת צללים) כדי לייצר שינוי עמוק ויציב."
    },
    {
      question: "איפה מתקיימות הפגישות?",
      answer: "הפגישות מתקיימות בקליניקה שלווה בטבעון הטובלת בירוק, המשרה שקט וביטחון, או בשיחות וידאו (זום) מכל מקום בעולם."
    }
  ];

  const audiences = [
    {
      title: "מבוגרים",
      icon: <Orbit size={120} strokeWidth={0.5} />,
      link: "/audience/adults",
      desc: "ליווי רגשי בצמתי חיים ומציאת עוגן פנימי."
    },
    {
      title: "נוער",
      icon: <Infinity size={120} strokeWidth={0.5} />,
      link: "/audience/youth",
      desc: "מרחב בטוח לפיתוח חוסן רגשי וביטוי עצמי."
    },
    {
      title: "נשים",
      icon: <Waves size={120} strokeWidth={0.5} />,
      link: "/audience/women",
      desc: "חיבור עמוק לעולם הפנימי ומציאת הקול האותנטי."
    }
  ];

  const uniquenessPoints = [
    {
      title: "שילוב גוף-נפש",
      icon: <Orbit size={32} strokeWidth={1} />,
      desc: "פסיכותרפיה הוליסטית שרואה בך שלם. אנחנו עובדות עם הרגש, הגוף והמחשבה יחד לריפוי עמוק."
    },
    {
      title: "כלים חווייתיים",
      icon: <Infinity size={32} strokeWidth={1} />,
      desc: "עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס – כלים המאפשרים לצלול לעומק העולם הפנימי."
    },
    {
      title: "מרחב בטוח בטבע",
      icon: <Waves size={32} strokeWidth={1} />,
      desc: "הקליניקה בטבעון מציעה שקט חיצוני שמאפשר להקשיב לשקט הפנימי, בסביבה מכילה ועוטפת."
    },
    {
      title: "ידע וניסיון עשיר",
      icon: <Compass size={32} strokeWidth={1} />,
      desc: "תואר שני (MA) בייעוץ ארגוני ובוגרת פסיכותרפיה הוליסטית. שילוב של מקצועיות וגישה אנושית."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section Redesign 2026 - Ultra Luxury */}
      <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center px-6 pt-40 md:pt-48 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="מורן פז - פסיכותרפיה הוליסטית וטיפול רגשי בטבעון" 
              fill
              className="object-cover opacity-60 grayscale-[0.2]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-background"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-7xl w-full px-4 flex flex-col items-center">
           <span className="boutique-label text-primary block mb-12 text-sm md:text-lg tracking-[0.4em] font-medium">
             מטפלת רגשית מוסמכת בטבעון ועמק יזרעאל
           </span>
           
           <h1 className="mb-16 md:mb-24">
             <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-14 gap-y-4 text-5xl sm:text-7xl md:text-9xl font-bold tracking-normal leading-none font-['Amatic_SC'] text-foreground">
               <span className="inline-block transition-transform hover:scale-105 duration-700">להתחבר</span>
               <span className="text-primary/40 text-3xl md:text-5xl select-none">•</span>
               <span className="inline-block transition-transform hover:scale-105 duration-700">לגלות</span>
               <span className="text-primary/40 text-3xl md:text-5xl select-none">•</span>
               <span className="inline-block transition-transform hover:scale-105 duration-700">להשתנות</span>
             </div>
           </h1>
           
           <h2 className="text-xl md:text-3xl font-headline italic mb-16 text-accent/70 max-w-4xl mx-auto leading-relaxed font-medium">
             פסיכותרפיה הוליסטית וליווי רגשי עמוק ליצירת עוגן פנימי וחוסן נפשי
           </h2>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl">
             <a 
               href={whatsappLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex w-full md:w-auto px-12 md:px-16 py-4 md:py-5 bg-primary !text-white boutique-label !text-sm md:!text-base hover:bg-accent transition-all duration-700 items-center justify-center gap-4 shadow-xl rounded-sm group overflow-hidden relative whitespace-nowrap !tracking-[0.2em]"
             >
                <span className="relative z-10">תאום שיחת היכרות</span>
                <ArrowLeft size={18} className="relative z-10 group-hover:-translate-x-2 transition-transform duration-500" />
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
             </a>
             <Link 
               href="/practice"
               className="inline-flex w-full md:w-auto px-10 md:px-12 py-4 md:py-5 bg-transparent border border-foreground/15 text-foreground/80 hover:bg-stone-50/50 hover:border-foreground/30 transition-all duration-700 font-light items-center justify-center gap-4 tracking-widest uppercase text-xs md:text-sm"
             >
                התהליך הטיפולי
             </Link>
           </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
          <ChevronDown size={40} strokeWidth={1} />
        </div>
      </section>

      <section ref={uniquenessReveal} className="py-32 md:py-56 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Unique Approach" title="מה מיוחד בשיטת הטיפול שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mt-20">
            {uniquenessPoints.map((point, i) => (
              <div key={i} className={cn("space-y-6 md:space-y-10 group text-center md:text-right", `stagger-${i+1}`)}>
                <div className="mb-6 p-6 bg-stone-50 inline-block rounded-full shadow-sm group-hover:shadow-md transition-all duration-1000 text-primary animate-art-float">
                  {React.cloneElement(point.icon as React.ReactElement, { size: 48, strokeWidth: 0.5 })}
                </div>
                <h3 className="text-3xl md:text-4xl font-headline font-bold text-accent">{point.title}</h3>
                <p className="text-xl md:text-2xl font-light text-stone-500 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={audienceReveal} className="py-32 md:py-56 px-6 md:px-24 bg-stone-50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <SectionTitle subtitle="Audiences" title="עם מי אני עובדת?" className="flex flex-col items-center text-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {audiences.map((item, i) => (
              <Link 
                key={i} 
                href={item.link}
                className={cn(
                  "boutique-card group !min-h-[500px]",
                  `stagger-${i+1}`
                )}
              >
                <div className="art-icon">
                  {item.icon}
                </div>
                <h3 className="text-5xl sm:text-6xl md:text-7xl font-headline mb-6 md:mb-10 group-hover:scale-105 transition-transform duration-1000">{item.title}</h3>
                <p className="text-2xl md:text-3xl font-light opacity-80 leading-relaxed max-w-[320px]">{item.desc}</p>
                <div className="mt-10 md:mt-16 boutique-label !text-white/40 group-hover:!text-white transition-all duration-700 flex items-center gap-4 text-lg">
                  למידע נוסף <ArrowLeft size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section ref={tourReveal} className="py-32 md:py-56 px-6 md:px-24 reveal bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="order-2 lg:order-1">
            <SectionTitle subtitle="The Clinic" title="סיור בקליניקה בטבעון" />
            <p className="boutique-para mb-12 md:mb-16">
              הקליניקה ממוקמת בלב הטבע של טבעון. כאן מתקיים מרחב בטוח המאפשר נשימה עמוקה וניתוק מרעשי היום-יום. טיפול רגשי בטבעון הוא הזמנה לשקט פנימי.
            </p>
            <Link href="/tivon" className="inline-flex items-center gap-6 boutique-label text-primary border-b border-primary/20 hover:border-primary transition-all pb-4 group text-2xl md:text-3xl font-bold">
              בואו לראות איפה הכל קורה
              <Eye size={32} strokeWidth={1} className="group-hover:scale-110 transition-transform duration-700" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="image-zoom-container aspect-video shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative border-8 md:border-[16px] border-white">
              {clinicImg && (
                <Image 
                  src={clinicImg.imageUrl} 
                  alt="הקליניקה של מורן פז בטבעון - טיפול רגשי ופסיכותרפיה" 
                  fill 
                  className="object-cover grayscale-[0.3]"
                  data-ai-hint={clinicImg.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      
      <FaqSection items={homeFaqs} title="שאלות נפוצות על הטיפול" subtitle="Common Questions" />

      <section id="contact" className="py-32 md:py-56 px-6 bg-white border-t border-border/10">
        <div className="max-w-5xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center text-center" />
          <p className="boutique-para mb-16 md:mb-24 font-medium max-w-3xl mx-auto">אני כאן בשבילך לתאום שיחת הכרות ללא עלות. בואי נתחיל את המסע שלך יחד.</p>
          <ContactForm />
          
          <div className="mt-24 md:mt-32 flex flex-col items-center">
            <a 
              href={whatsappLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8 md:gap-12 text-foreground hover:text-primary transition-all duration-700 boutique-label !text-2xl md:!text-4xl group font-bold border border-primary/15 px-12 md:px-20 py-8 md:py-10 w-full md:w-auto justify-center rounded-sm shadow-sm hover:shadow-xl hover:bg-stone-50/50"
            >
              <MessageCircle size={48} className="md:size-[64px] group-hover:rotate-12 transition-transform text-primary" />
              שלחי הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
