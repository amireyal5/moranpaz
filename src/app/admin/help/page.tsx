
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ChevronRight, Search, Book, Image as ImageIcon, Link as LinkIcon, 
  FileText, Layout, MousePointer2, Settings, ExternalLink, Info, Box, MoveVertical 
} from 'lucide-react';

const HELP_TOPICS = [
  {
    id: 'general',
    title: 'מבוא למערכת הניהול',
    icon: <Book className="text-primary" />,
    content: [
      {
        sub: 'איך המערכת עובדת?',
        text: 'כל שינוי שתבצעי ותשמרי (לחיצה על "שמירה") יתעדכן באתר באופן מיידי.',
      }
    ]
  },
  {
    id: 'ordering',
    title: 'שליטה במיקום וסדר (חצים)',
    icon: <MoveVertical className="text-primary" />,
    content: [
      {
        sub: 'איך לקבוע איזה כפתור יופיע ראשון?',
        text: 'בכל מקום שיש רשימה (כפתורי CTA, תפריט ניווט או קוביות תוכן), תמצאי חצים של ▲ ו-▼. לחיצה על החץ למעלה תזיז את הפריט מקום אחד קדימה. כך תוכלי לסדר את האלמנטים בדיוק לפי רצונך.',
      }
    ]
  },
  {
    id: 'blocks',
    title: 'ניהול קוביות תוכן (Features)',
    icon: <Box className="text-primary" />,
    content: [
      {
        sub: 'מהן קוביות תוכן?',
        text: 'קוביות תוכן הן אלמנטים מעוצבים המורכבים מאייקון, כותרת ותיאור קצר. הן מצוינות להצגת שירותים, יתרונות או שלבים בתהליך.',
      },
      {
        sub: 'איך להוסיף קוביות?',
        text: 'בתוך עריכת עמוד, תחת האזור "קוביות תוכן", לחצי על "הוספת קוביית תוכן חדשה". בחרי אייקון מהרשימה, מלאי כותרת ותיאור, ושמרי.',
      }
    ]
  },
  {
    id: 'images',
    title: 'עבודה עם תמונות (Cloudinary)',
    icon: <ImageIcon className="text-primary" />,
    content: [
      {
        sub: 'מה זה לינק לתמונה (URL)?',
        text: 'זוהי כתובת האינטרנט של הקובץ. כשאת מעלה תמונה ל-Cloudinary, הוא מייצר לה כתובת שמתחילה ב-https. את הכתובת הזו יש להדביק בשדות התמונות בניהול.',
      }
    ]
  }
];

export default function AdminHelpPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredTopics = HELP_TOPICS.filter(topic => 
    topic.title.includes(search) || 
    topic.content.some(c => c.sub.includes(search) || c.text.includes(search))
  );

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-48 pb-32 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-stone-200 pb-10">
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="text-stone-400 p-0 hover:text-primary">
              <ChevronRight className="ml-2" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-6xl font-handwriting text-accent">מרכז ידע ותמיכה</h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 size-5" />
            <Input 
              placeholder="חפשי נושא עזרה..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-12 h-12 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            {filteredTopics.map((topic) => (
              <Card key={topic.id} className="border-none shadow-xl rounded-none">
                <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                  <CardTitle className="flex items-center gap-4 text-2xl font-headline text-accent">
                    {topic.icon}
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8">
                  <Accordion type="multiple" className="w-full">
                    {topic.content.map((item, idx) => (
                      <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border-b border-stone-50 last:border-0">
                        <AccordionTrigger className="text-lg font-headline font-bold text-stone-700 hover:text-primary text-right">
                          {item.sub}
                        </AccordionTrigger>
                        <AccordionContent className="text-base font-headline text-stone-500 leading-relaxed py-4 text-right">
                          {item.text}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
