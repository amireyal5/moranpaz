
"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-4xl mx-auto text-right">
          <SectionTitle subtitle="Journal" title="עדכונים והודעות" />
          <div className="space-y-16 mt-12">
            <div className="border-b border-border pb-12">
              <span className="boutique-label text-primary">מרץ 2024</span>
              <h3 className="text-3xl font-headline mt-4 mb-6">פתיחת מחזור אביב של קורס BeinMe</h3>
              <p className="boutique-para">ההרשמה למחזור הקרוב בעיצומה. הצטרפי למסע של גילוי עצמי במרחב נשי תומך.</p>
            </div>
            <div className="border-b border-border pb-12">
              <span className="boutique-label text-primary">פברואר 2024</span>
              <h3 className="text-3xl font-headline mt-4 mb-6">מאמר חדש: על חוסן רגשי בעתות שינוי</h3>
              <p className="boutique-para">כיצד נוכל למצוא עוגן פנימי בתוך סערות החיים החיצוניות?</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
