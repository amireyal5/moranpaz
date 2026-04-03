
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FaqSection } from '@/components/shared/FaqSection';
import { useReveal } from '@/hooks/use-reveal';
import { ContactForm } from '@/components/shared/ContactForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkshopPage() {
  const contentReveal = useReveal();
  const listReveal = useReveal();
  const workshopImg = PlaceHolderImages.find(img => img.id === 'workshop-women');
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אשמח%20לפרטים%20ולהרשמה%20לקורס%20BeinMe";

  const fits = [
    "את מרגישה עומס פנימי ולופים רגשיים שחוזרים על עצמם",
    "כל \"התקלה\" מבחוץ יכולה לערער אותך",
    "את מוצאת את עצמך עייפה מלהחזיק - פיזית ורגשית",
    "את מריצה דאגות בראש ולא נוכחת בכאן ועכשיו",
    "את רוצה לחזור לחיבור אותנטי וכנה עם עצמך",
    "את רוצה לסמוך ולהישען יותר, ולשחרר שליטה ואחיזה",
    "את רוצה לאפשר לעצמך להרגיש הכל ולהישאר יציבה",
    "את רוצה להכיר לעומק את העולם הפנימי הרגשי שלך",
    "את מרגישה שיש בתוכך עוצמה פנימית שלא מקבלת ביטוי"
  ];

  const workshopFaqs = [
    {
      question: "למי מיועד קורס BeinMe©?",
      answer: "הקורס מיועד לנשים שרוצות לעצור את המרוץ, להקשיב לעצמן ולגלות את העולם הפנימי שלהן בתוך מרחב קבוצתי מכיל ותומך."
    },
    {
      question: "כמה משתתפות יש בקבוצה?",
      answer: "הקבוצה היא אינטימית ומונה מספר מצומצם של נשים כדי לאפשר לכל אחת מרחב ביטוי וליווי אישי בתוך הקבוצה."
    },
    {
      question: "האם נדרש ניסיון קודם בטיפול או במיינדפולנס?",
      answer: "אין צורך בניסיון קודם. הקורס בנוי כך שהוא מתאים לכל אישה שמרגישה קריאה פנימית לשינוי וגילוי עצמי."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-right overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 md:pt-64 pb-32 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle={<span>BeinMe<sup>©</sup> קורס</span>} 
            title={<span>BeinMe<sup>©</sup> <span className="font-['Amatic_SC'] font-bold">קורס</span></span>} 
            className="mb-24" 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
            <div ref={contentReveal} className="lg:col-span-7 reveal space-y-12">
              <h1 className="text-7xl md:text-9xl font-['Amatic_SC'] font-bold text-foreground leading-none mb-10">
                להיות אני בתוכי
              </h1>
              
              <div className="space-y-8 boutique-para text-stone-600 text-right">
                <p>
                  <span dir="ltr">BeinMe<sup>©</sup></span> הוא מרחב קבוצתי – טיפולי לנשים, שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו, ולחוות אותו בכנות ואותנטיות.
                </p>
                <div className="italic text-accent border-r-4 border-primary/20 pr-8 py-6 bg-stone-50">
                  <p className="text-2xl md:text-3xl font-headline font-light leading-relaxed">
                    "אם לא תכירי את העולם הפנימי שלך – הוא ינהל אותך ואת תקראי לזה גורל."
                  </p>
                </div>
                <p>
                  האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו. כאן אפשר לעצור, לנשום ולהרגיש, ולחזור לבית הפנימי שלנו יחד עם נשים אחרות.
                </p>
              </div>
              
              <div className="pt-10">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 px-12 py-3 bg-primary !text-white boutique-label !text-sm md:!text-base hover:bg-accent transition-all duration-700 shadow-xl rounded-sm whitespace-nowrap !tracking-[0.2em]"
                >
                  הרשמה למחזור הקרוב
                  <ArrowLeft size={18} />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative group">
               <div className="image-zoom-container aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border border-border/20">
                  {workshopImg && (
                    <Image 
                      src={workshopImg.imageUrl} 
                      alt="סדנת נשים BeinMe עם מורן פז" 
                      fill 
                      className="object-cover grayscale"
                      data-ai-hint={workshopImg.imageHint}
                    />
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fit Section */}
      <section className="py-32 md:py-48 bg-stone-50 px-8 md:px-24">
         <div className="max-w-5xl mx-auto">
            <SectionTitle subtitle="The Connection" title="האם הקורס מתאים לך?" className="flex flex-col items-center text-center" />
            <div ref={listReveal} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mt-20 reveal">
               {fits.map((text, i) => (
                 <div key={i} className={cn("flex items-start space-x-reverse space-x-6 p-6 border-b border-primary/10 hover:bg-white transition-all duration-700 group", `stagger-${i+1}`)}>
                    <span className="text-primary font-headline text-2xl font-bold opacity-30 mt-1">0{i+1}</span>
                    <p className="text-xl text-stone-600 font-light leading-relaxed">{text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Quote CTA */}
      <section className="py-32 bg-accent text-white px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-['Amatic_SC'] font-bold mb-12 leading-none">
            מוכנה לצאת למסע קבוצתי מרפא?
          </h2>
          <div className="flex justify-center">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-12 py-4 bg-primary !text-white boutique-label !text-sm md:!text-base hover:bg-white hover:!text-accent transition-all duration-700 shadow-2xl rounded-sm !tracking-[0.2em]"
            >
              <MessageCircle size={22} />
              שלחי הודעה לבירור פרטים
            </a>
          </div>
        </div>
      </section>

      <FaqSection items={workshopFaqs} title="שאלות על הקורס" subtitle="Common Questions" />

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-48 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Register" title="צרי קשר להרשמה" className="flex flex-col items-center text-center" />
          <p className="text-center boutique-para mb-16">
            השאירי פרטים ואחזור אלייך עם כל המידע על המחזור הקרוב של BeinMe<sup>©</sup>.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
