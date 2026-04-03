
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
import { Loader2, Save, ChevronRight, Monitor, Smartphone, Globe, ListOrdered, Plus, Trash2, LayoutTextWindow, Settings, MousePointer2 } from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const DEFAULT_PAGES = [
  { id: 'home', name: 'דף הבית' },
  { id: 'about', name: 'אודות' },
  { id: 'practice', name: 'התהליך הטיפולי' },
  { id: 'online', name: 'טיפול אונליין' },
  { id: 'tivon', name: 'טבעון' },
  { id: 'emeq-izrael', name: 'עמק יזרעאל' },
  { id: 'women', name: 'טיפול בנשים' },
  { id: 'youth', name: 'טיפול בנוער' },
  { id: 'adults', name: 'טיפול במבוגרים' }
];

export default function PageManagement() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [selectedPage, setSelectedPage] = useState('home');
  const [customPageId, setCustomPageId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [existingPages] = useState<{id: string, name: string}[]>(DEFAULT_PAGES);

  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    introTitle: '',
    introContent: '',
    heroImageUrlDesktop: '',
    heroImageUrlMobile: '',
    siteName: '',
    siteSubtitle: '',
    navItems: [] as { label: string, href: string }[],
    ctaButtons: [] as { label: string, href: string, variant: 'primary' | 'outline' }[]
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
          introContent: data.introContent || '',
          heroImageUrlDesktop: data.heroImageUrlDesktop || '',
          heroImageUrlMobile: data.heroImageUrlMobile || '',
          siteName: data.siteName || '',
          siteSubtitle: data.siteSubtitle || '',
          navItems: data.navItems || [],
          ctaButtons: data.ctaButtons || []
        });
      } else {
        setContent({ 
          heroTitle: '', 
          heroSubtitle: '', 
          introTitle: '', 
          introContent: '',
          heroImageUrlDesktop: '',
          heroImageUrlMobile: '',
          siteName: '',
          siteSubtitle: '',
          navItems: [],
          ctaButtons: []
        });
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
    
    const targetId = selectedPage === 'custom' ? customPageId : selectedPage;
    if (!targetId) {
      toast({ variant: "destructive", title: "אנא הזיני מזהה עמוד (Slug)" });
      return;
    }

    setIsSaving(true);
    try {
      await setDoc(doc(db, 'siteContent', targetId), {
        ...content,
        pageId: targetId,
        updatedAt: Date.now()
      });
      toast({ title: "התוכן נשמר בהצלחה!" });
      if (selectedPage === 'custom') {
        setCustomPageId('');
        setSelectedPage(targetId);
      }
    } catch (e) {
      toast({ variant: "destructive", title: "שגיאה בשמירה" });
    } finally {
      setIsSaving(false);
    }
  };

  const addNavItem = () => {
    setContent({
      ...content,
      navItems: [...content.navItems, { label: '', href: '' }]
    });
  };

  const removeNavItem = (index: number) => {
    const updated = [...content.navItems];
    updated.splice(index, 1);
    setContent({ ...content, navItems: updated });
  };

  const updateNavItem = (index: number, field: 'label' | 'href', value: string) => {
    const updated = [...content.navItems];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, navItems: updated });
  };

  const moveNavItem = (index: number, direction: 'up' | 'down') => {
    const updated = [...content.navItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setContent({ ...content, navItems: updated });
  };

  const addCtaButton = () => {
    setContent({
      ...content,
      ctaButtons: [...content.ctaButtons, { label: '', href: '', variant: 'primary' }]
    });
  };

  const removeCtaButton = (index: number) => {
    const updated = [...content.ctaButtons];
    updated.splice(index, 1);
    setContent({ ...content, ctaButtons: updated });
  };

  const updateCtaButton = (index: number, field: string, value: string) => {
    const updated = [...content.ctaButtons];
    (updated[index] as any)[field] = value;
    setContent({ ...content, ctaButtons: updated });
  };

  const moveCtaButton = (index: number, direction: 'up' | 'down') => {
    const updated = [...content.ctaButtons];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setContent({ ...content, ctaButtons: updated });
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
              <ChevronRight className="ml-2" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-6xl font-handwriting text-accent">ניהול תוכן ועיצוב</h1>
          </div>
          
          <div className="w-full md:w-80 space-y-4">
            <div className="space-y-2">
              <Label className="boutique-label flex items-center gap-2">
                <Settings size={14} /> בחר דף לעריכה
              </Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="bg-white border-none h-12 rounded-none shadow-sm">
                  <SelectValue placeholder="בחרי עמוד..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global" className="font-bold text-primary">⚙️ הגדרות כלליות (תפריט)</SelectItem>
                  {existingPages.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  <SelectItem value="custom" className="italic text-stone-400">+ הוספת עמוד חדש...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPage === 'custom' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label className="boutique-label text-primary">מזהה עמוד (באנגלית, למשל: my-page)</Label>
                <Input 
                  value={customPageId} 
                  onChange={e => setCustomPageId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="h-10 border-primary/20 font-sans"
                  placeholder="new-page-id"
                />
              </div>
            )}
          </div>
        </div>

        {isFetching ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
        ) : (
          <form onSubmit={handleSave} className="space-y-12">
            
            {selectedPage === 'global' ? (
              <div className="space-y-12">
                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <Globe size={24} className="text-primary" /> הגדרות מותג (Navbar)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">שם המותג</Label>
                      <Input value={content.siteName} onChange={e => setContent({...content, siteName: e.target.value})} className="h-14 text-xl font-headline" placeholder="MORAN PAZ" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">תיאור המותג</Label>
                      <Input value={content.siteSubtitle} onChange={e => setContent({...content, siteSubtitle: e.target.value})} className="h-14 text-xl font-headline italic" placeholder="BeinMe — להיות אני בתוכי" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <ListOrdered size={24} className="text-primary" /> ניהול וסדר תפריט הניווט
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <p className="text-xs text-stone-400 italic mb-4">כאן תוכלי לקבוע אילו עמודים יפורסמו בתפריט ובאיזה סדר הם יופיעו.</p>
                    {content.navItems.map((item, index) => (
                      <div key={index} className="flex gap-4 items-end bg-stone-50 p-4 border border-stone-100">
                        <div className="flex flex-col gap-1">
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveNavItem(index, 'up')} disabled={index === 0} className="h-6 w-6 p-0 opacity-50 hover:opacity-100">▲</Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveNavItem(index, 'down')} disabled={index === content.navItems.length - 1} className="h-6 w-6 p-0 opacity-50 hover:opacity-100">▼</Button>
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-stone-400">תווית בתפריט</Label>
                          <Input value={item.label} onChange={e => updateNavItem(index, 'label', e.target.value)} className="bg-white border-none" placeholder="למשל: אודות" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-stone-400">כתובת (URL)</Label>
                          <Input value={item.href} onChange={e => updateNavItem(index, 'href', e.target.value)} className="bg-white border-none font-sans" placeholder="למשל: /about" />
                        </div>
                        <Button type="button" variant="ghost" onClick={() => removeNavItem(index)} className="text-destructive hover:bg-destructive/10">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={addNavItem} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                      <Plus className="mr-2" size={18} /> הוספת קישור לתפריט
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100"><CardTitle className="font-headline text-2xl">תמונות וכותרות (Hero)</CardTitle></CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">כותרת ראשית (Hero)</Label>
                      <Input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="h-14 text-xl font-headline" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">כותרת משנית (Hero Subtitle)</Label>
                      <Input value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="h-14 text-xl font-headline italic" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-3">
                        <Label className="boutique-label text-stone-400 flex items-center gap-2">
                          <Monitor size={14} /> רקע דסקטופ (URL)
                        </Label>
                        <Input value={content.heroImageUrlDesktop} onChange={e => setContent({...content, heroImageUrlDesktop: e.target.value})} className="font-sans" placeholder="https://..." />
                      </div>
                      <div className="space-y-3">
                        <Label className="boutique-label text-stone-400 flex items-center gap-2">
                          <Smartphone size={14} /> רקע מובייל (URL)
                        </Label>
                        <Input value={content.heroImageUrlMobile} onChange={e => setContent({...content, heroImageUrlMobile: e.target.value})} className="font-sans" placeholder="https://..." />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <LayoutTextWindow size={24} className="text-primary" /> עיצוב ותוכן העמוד
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">כותרת פתיחה</Label>
                      <Input value={content.introTitle} onChange={e => setContent({...content, introTitle: e.target.value})} className="h-14 text-xl font-headline" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">גוף העמוד (שימוש בעורך לעיצוב חופשי)</Label>
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

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <MousePointer2 size={24} className="text-primary" /> ניהול כפתורי הנעה לפעולה (CTA)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <p className="text-xs text-stone-400 italic mb-4">תוכלי להוסיף כפתורים שיובילו לדפים בתוך האתר או ללינקים חיצוניים.</p>
                    {content.ctaButtons.map((btn, index) => (
                      <div key={index} className="flex gap-4 items-end bg-stone-50 p-6 border border-stone-100 rounded-sm">
                        <div className="flex flex-col gap-1">
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveCtaButton(index, 'up')} disabled={index === 0}>▲</Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveCtaButton(index, 'down')} disabled={index === content.ctaButtons.length - 1}>▼</Button>
                        </div>
                        <div className="flex-[2] space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-stone-400">כיתוב על הכפתור</Label>
                          <Input value={btn.label} onChange={e => updateCtaButton(index, 'label', e.target.value)} className="bg-white border-none" />
                        </div>
                        <div className="flex-[3] space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-stone-400">קישור (URL פנימי או חיצוני)</Label>
                          <Input value={btn.href} onChange={e => updateCtaButton(index, 'href', e.target.value)} className="bg-white border-none font-sans" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-stone-400">עיצוב</Label>
                          <Select value={btn.variant} onValueChange={(val) => updateCtaButton(index, 'variant', val)}>
                            <SelectTrigger className="bg-white border-none"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="primary">מלא (בולט)</SelectItem>
                              <SelectItem value="outline">מסגרת (מעודן)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="button" variant="ghost" onClick={() => removeCtaButton(index)} className="text-destructive">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={addCtaButton} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary">
                      <Plus className="mr-2" size={18} /> הוספת כפתור חדש
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            <Button type="submit" disabled={isSaving} className="w-full bg-primary h-16 text-white text-xl boutique-label rounded-none shadow-2xl transition-all hover:bg-accent">
              {isSaving ? <Loader2 className="animate-spin" /> : <><Save className="ml-4" /> שמירת כל השינויים</>}
            </Button>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
