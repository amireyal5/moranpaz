
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
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
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20מעוניינת%20לקבל%20פרטים%20על%20תיאום%20פגישת%20היכרות";

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
      
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="מורן פז - פסיכותרפיה הוליסטית וטיפול רגשי בטבעון" 
              fill
              className="object-cover opacity-70 grayscale-[0.1]"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-background"></div>
        </div>
        
        <div ref={heroReveal} className="relative z-10 text-center reveal max-w-6xl w-full px-4">
           {/* SEO Focused H1: Combines visual hook with primary keyword */}
           <h1 className="flex flex-col items-center">
             <span className="boutique-label text-primary block mb-6 md:mb-10 text-sm md:text-lg">מטפלת רגשית מוסמכת בטבעון</span>
             <div className="boutique-title mb-10 md:mb-16 flex flex-wrap justify-center items-center gap-x-6 md:gap-x-12">
               <span>להתחבר</span>
               <span className="text-primary/30 text-3xl md:text-6xl select-none">•</span>
               <span>לגלות</span>
               <span className="text-primary/30 text-3xl md:text-6xl select-none">•</span>
               <span className="italic">להשתנות</span>
             </div>
           </h1>
           
           <h2 className="text-xl md:text-3xl font-headline italic mb-12 text-accent/80 max-w-4xl mx-auto leading-relaxed">
             פסיכותרפיה הוליסטית וליווי רגשי עמוק בעמק יזרעאל, טבעון ואונליין לישראלים בארץ ובעולם
           </h2>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
             <a 
               href={whatsappLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex w-full md:w-auto px-12 md:px-20 py-4 md:py-5 bg-primary !text-white boutique-label hover:bg-accent transition-all duration-700 items-center justify-center gap-4 shadow-2xl rounded-sm"
             >
                תאום שיחת היכרות
                <ArrowLeft size={20} />
             </a>
             <Link 
               href="/about"
               className="inline-flex w-full md:w-auto px-8 md:px-16 py-4 md:py-5 bg-transparent border border-foreground/20 text-foreground text-lg hover:bg-stone-50 transition-all duration-700 font-light items-center justify-center gap-4 shadow-sm"
             >
                על הגישה שלי
             </Link>
           </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown size={32} />
        </div>
      </section>

      <section ref={uniquenessReveal} className="py-24 md:py-48 px-6 md:px-24 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Unique Approach" title="מה מיוחד בשיטת הטיפול שלי?" className="flex flex-col items-center text-center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 md:mt-20">
            {uniquenessPoints.map((point, i) => (
              <div key={i} className={cn("space-y-4 md:space-y-6 group", `stagger-${i+1}`)}>
                <div className="mb-4 md:mb-6 p-4 bg-stone-50 inline-block rounded-full shadow-sm group-hover:shadow-md transition-all duration-700 text-primary animate-art-float">
                  {point.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-accent">{point.title}</h3>
                <p className="text-lg md:text-xl font-light text-stone-600 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={audienceReveal} className="py-24 md:py-40 px-6 md:px-24 bg-stone-50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <SectionTitle subtitle="Audiences" title="עם מי אני עובדת?" className="flex flex-col items-center text-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {audiences.map((item, i) => (
              <Link 
                key={i} 
                href={item.link}
                className={cn(
                  "boutique-card group",
                  `stagger-${i+1}`
                )}
              >
                <div className="art-icon">
                  {item.icon}
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-700">{item.title}</h3>
                <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed max-w-[280px]">{item.desc}</p>
                <div className="mt-8 md:mt-10 boutique-label !text-white/50 group-hover:!text-white transition-all flex items-center gap-2">
                  למידע נוסף <ArrowLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section ref={tourReveal} className="py-24 md:py-48 px-6 md:px-24 reveal bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <SectionTitle subtitle="The Clinic" title="סיור בקליניקה בטבעון" />
            <p className="boutique-para mb-8 md:mb-12">
              הקליניקה ממוקמת בלב הטבע של טבעון. כאן מתקיים מרחב בטוח המאפשר נשימה עמוקה וניתוק מרעשי היום-יום. טיפול רגשי בטבעון הוא הזמנה לשקט פנימי.
            </p>
            <Link href="/tivon" className="inline-flex items-center gap-4 boutique-label text-primary border-b border-primary/20 hover:border-primary transition-all pb-2 group text-xl md:text-2xl font-bold">
              בואו לראות איפה הכל קורה
              <Eye size={24} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="image-zoom-container aspect-video shadow-2xl relative border-4 md:border-8 border-white">
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
      
      <FaqSection items={homeFaqs} title="שאלות נפוצות על הטיפול" subtitle="SEO FAQ" />

      <section id="contact" className="py-24 md:py-48 px-6 bg-white border-t border-border/20">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center text-center" />
          <p className="boutique-para mb-12 md:mb-20 font-medium">אני כאן בשבילך לתאום שיחת הכרות ללא עלות. בואי נתחיל את המסע שלך יחד.</p>
          <ContactForm />
          
          <div className="mt-16 md:mt-24 flex flex-col items-center">
            <a 
              href={whatsappLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 md:gap-8 text-foreground hover:text-primary transition-colors boutique-label group text-xl md:text-2xl font-bold border border-primary/20 px-8 md:px-12 py-4 md:py-5 w-full md:w-auto justify-center rounded-sm shadow-sm"
            >
              <MessageCircle size={32} className="md:size-[40px] group-hover:rotate-12 transition-transform text-primary" />
              שלחי הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FaqAssistant />
    </main>
  );
}
