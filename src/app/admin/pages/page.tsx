
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useUser, useFirestore } from '@/firebase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, ChevronRight } from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const PAGES = [
  { id: 'home', name: 'דף הבית' },
  { id: 'about', name: 'אודות' },
  { id: 'practice', name: 'התהליך הטיפולי' },
  { id: 'online', name: 'טיפול אונליין' },
  { id: 'tivon', name: 'טבעון' }
];

export default function PageManagement() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [selectedPage, setSelectedPage] = useState('home');
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    introTitle: '',
    introContent: ''
  });

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    fetchPageContent(selectedPage);
  }, [selectedPage, db]);

  const fetchPageContent = async (id: string) => {
    if (!db) return;
    setIsFetching(true);
    try {
      const docRef = doc(db, 'siteContent', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setContent({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          introTitle: data.introTitle || '',
          introContent: data.introContent || ''
        });
      } else {
        setContent({ heroTitle: '', heroSubtitle: '', introTitle: '', introContent: '' });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || isSaving) return;
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'siteContent', selectedPage), {
        ...content,
        pageId: selectedPage,
        updatedAt: Date.now()
      });
      toast({ title: "התוכן נשמר בהצלחה!" });
    } catch (e) {
      toast({ variant: "destructive", title: "שגיאה בשמירה" });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-48 pb-32 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="mb-4 text-stone-400 p-0 hover:text-primary">
              <ChevronRight className="mr-2" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-6xl font-handwriting text-accent">עריכת תוכן דפים</h1>
          </div>
          
          <div className="w-full md:w-64 space-y-2">
            <Label className="boutique-label">בחר דף לעריכה</Label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="bg-white border-none h-12 rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGES.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isFetching ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
        ) : (
          <form onSubmit={handleSave} className="space-y-12">
            <Card className="border-none shadow-xl rounded-none">
              <CardHeader className="bg-stone-50/50 border-b border-stone-100"><CardTitle className="font-headline text-2xl">Hero Section</CardTitle></CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">כותרת ראשית (Hero)</Label>
                  <Input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="h-14 text-xl font-headline" />
                </div>
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">כותרת משנית (Hero Subtitle)</Label>
                  <Input value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="h-14 text-xl font-headline italic" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-none">
              <CardHeader className="bg-stone-50/50 border-b border-stone-100"><CardTitle className="font-headline text-2xl">Core Content</CardTitle></CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">כותרת פתיחה (Intro Title)</Label>
                  <Input value={content.introTitle} onChange={e => setContent({...content, introTitle: e.target.value})} className="h-14 text-xl font-headline" />
                </div>
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">תוכן מרכזי (Rich Text)</Label>
                  <div className="prose-editor">
                    <ReactQuill 
                      theme="snow"
                      value={content.introContent}
                      onChange={val => setContent({...content, introContent: val})}
                      className="bg-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSaving} className="w-full bg-primary h-16 text-white text-xl boutique-label rounded-none shadow-2xl">
              {isSaving ? <Loader2 className="animate-spin" /> : <><Save className="mr-4" /> שמירת כל השינויים</>}
            </Button>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
