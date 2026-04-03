"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/shared/ContactForm';
import { useReveal } from '@/hooks/use-reveal';
import { CheckCircle2 } from 'lucide-react';

export default function AdultsPage() {
  const contentReveal = useReveal();
  const personalCtaReveal = useReveal();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20אני%20פונה%20לגבי%20טיפול%20למבוגרים";

  return (
    <main className="min-h-screen bg-background text-right">
      <Navbar />
      
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Audience" title="טיפול למבוגרים" />
          
          <div ref={contentReveal} className="reveal space-y-12">
            <h3 className="text-4xl md:text-6xl font-headline italic text-accent mb-12 leading-tight">
              למצוא עוגן בתוך סערות החיים
            </h3>
            
            <div className="boutique-para space-y-8">
              <p>
                החיים הבוגרים מזמנים לנו אינסוף אתגרים – בקריירה, בזוגיות, בהורות ובמפגש היומיומי עם עצמנו. לפעמים אנחנו מוצאים את עצמנו בלופ של חרדה, מתח או תחושת חוסר משמעות, ותוהים לאן נעלם החיבור האותנטי שלנו.
              </p>
              <p>
                הטיפול למבוגרים בקליניקה בטבעון או בזום הוא מרחב שקט ומכיל, שבו נוכל יחד לעבד את החוויות, להבין את הדפוסים שמנהלים אותנו ולייצר שינוי אמיתי. 
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
              {[
                "התמודדות עם חרדה וסטרס יומיומי",
                "משברי גיל ושינויי קריירה",
                "שיפור מערכות יחסים וזוגיות",
                "מציאת משמעות וחיבור עצמי",
                "כלים לוויסות רגשי וחוסן נפשי",
                "עיבוד טראומה וחוויות עבר"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-reverse space-x-6 border-r-4 border-primary/20 pr-6 py-4 bg-white shadow-sm">
                  <CheckCircle2 size={24} className="text-primary" />
                  <span className="text-2xl font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adults Personal Appeal */}
      <section ref={personalCtaReveal} className="py-24 bg-stone-50 reveal border-y border-stone-200/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className="text-6xl md:text-8xl font-handwriting text-accent">זה הזמן שלך להרגיש חופשי</h3>
          <p className="boutique-para text-2xl font-light leading-relaxed">
            אני מזמינה אותך ליצור עבורך את המרחב לשקט פנימי וצמיחה. בואי נתחיל בשיחת היכרות פשוטה שבה נבדוק איך אני יכולה ללוות אותך.
          </p>
          <div className="pt-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-16 py-6 bg-accent text-white boutique-label !text-[13px] hover:bg-primary transition-all duration-700 shadow-2xl rounded-sm !opacity-100 min-w-[280px] justify-center"
            >
              תאום שיחת היכרות אישית
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Connect" title="צרו קשר" className="flex flex-col items-center" />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
