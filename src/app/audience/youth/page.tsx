"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { Heart } from 'lucide-react';

export default function YouthPage() {
  const contentReveal = useReveal();
  const youthInviteReveal = useReveal();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20לנוער";

  return (
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title="טיפול לנוער" />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <h3 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight">
              מקום בטוח להיות מי שאת/ה
            </h3>
            
            <div className="boutique-para space-y-8">
              <p>
                גיל ההתבגרות הוא תקופה של שינויים מרגשים אך גם מאתגרים מאוד. זהו שלב של חיפוש זהות, התמודדות עם לחץ חברתי, לימודי ורגשי, ולפעמות תחושה שאף אחד לא באמת מבין.
              </p>
              <p>
                בטיפול רגשי לנוער, אני מציעה מרחב שבו אפשר לדבר על הכל – בלי שיפוטיות, בגובה העיניים ובסודיות מלאה. נשתמש בכלים יצירתיים וחווייתיים כדי לעזור לנער או לנערה למצוא את הכוחות הפנימיים שלהם.
              </p>
            </div>

            <div className="bg-white p-12 border border-primary/10 shadow-2xl space-y-8 mt-16">
              <h4 className="text-3xl font-headline font-bold text-primary">במה הטיפול יכול לעזור?</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl font-light">
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> חיזוק הביטחון והערך העצמי</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> התמודדות עם חרדות חברתיות ולימודיות</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> שיפור מיומנויות תקשורת עם הורים וחברים</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> עיבוד חוויות רגשיות וקשיים חברתיים</li>
                <li className="flex items-start gap-4"><Heart size={20} className="text-primary mt-1" /> מציאת כלים לוויסות רגשי במצבי לחץ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Personal Invitation */}
      <section ref={youthInviteReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50 px-8">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h3 className="text-6xl md:text-8xl font-handwriting text-accent">מרחב בטוח לצמוח בו</h3>
            <p className="boutique-para text-2xl font-light max-w-2xl mx-auto">
              הורים יקרים, אני כאן כדי להעניק לילדיכם את המרחב המכיל והמקצועי לו הם זקוקים. בואו נתאם שיחת ייעוץ ראשונית לבדיקת התאמה.
            </p>
            <div className="pt-8">
               <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
              >
                פנייה לשיחת ייעוץ והתאמה
              </a>
            </div>
         </div>
      </section>

      <section id="contact" className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <p className="text-center boutique-para mb-12">הורים יקרים, מוזמנים ליצור קשר לשיחה ראשונית לבדיקת התאמה עבור הילד/ה שלכם.</p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
