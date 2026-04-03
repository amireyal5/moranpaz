"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
import { 
  Loader2, Save, ChevronRight, Monitor, Smartphone, Globe, ListOrdered, 
  Plus, Trash2, Layout, MousePointer2, Box, Heart, Sparkles, 
  Orbit, Compass, Users, Star, Palette, MessageSquare, HelpCircle 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

const ICON_OPTIONS = [
  { value: 'Heart', icon: <Heart size={14} /> },
  { value: 'Sparkles', icon: <Sparkles size={14} /> },
  { value: 'Orbit', icon: <Orbit size={14} /> },
  { value: 'Compass', icon: <Compass size={14} /> },
  { value: 'Users', icon: <Users size={14} /> },
  { value: 'Star', icon: <Star size={14} /> }
];

const PRESET_COLORS = [
  { name: 'Mustard Gold (Premium)', value: '35 40% 45%' },
  { name: 'Sage (Original)', value: '155 15% 45%' },
  { name: 'Dusty Rose', value: '350 20% 65%' },
  { name: 'Ocean Mist', value: '190 15% 55%' },
  { name: 'Terracotta', value: '25 30% 60%' },
  { name: 'Deep Forest', value: '155 25% 25%' }
];

export default function PageManagement() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [mounted, setMounted] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [customPageId, setCustomPageId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    introTitle: '',
    introContent: '',
    heroImageUrlDesktop: '',
    heroImageUrlMobile: '',
    primaryColor: '35 40% 45%',
    metaTitle: '',
    metaDescription: '',
    siteName: '',
    siteSubtitle: '',
    navItems: [] as { label: string, href: string }[],
    ctaButtons: [] as { label: string, href: string, variant: 'primary' | 'outline' }[],
    features: [] as { title: string, description: string, icon: string }[],
    testimonials: [] as { text: string, author: string, location: string }[],
    faqs: [] as { question: string, answer: string }[]
  });

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (selectedPage !== 'custom' && db) {
      fetchPageContent(selectedPage);
    }
  }, [selectedPage, db]);

  const fetchPageContent = async (id: string) => {
    if (!db) return;
    setIsFetching(true);
    try {
      const pageRef = doc(db, 'siteContent', id);
      const docSnap = await getDoc(pageRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setContent({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          introTitle: data.introTitle || '',
          introContent: data.introContent || '',
          heroImageUrlDesktop: data.heroImageUrlDesktop || '',
          heroImageUrlMobile: data.heroImageUrlMobile || '',
          primaryColor: data.primaryColor || '35 40% 45%',
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          siteName: data.siteName || '',
          siteSubtitle: data.siteSubtitle || '',
          navItems: data.navItems || [],
          ctaButtons: data.ctaButtons || [],
          features: data.features || [],
          testimonials: data.testimonials || [],
          faqs: data.faqs || []
        });
      } else {
        setContent({ 
          heroTitle: '', heroSubtitle: '', introTitle: '', introContent: '',
          heroImageUrlDesktop: '', heroImageUrlMobile: '',
          primaryColor: '35 40% 45%', metaTitle: '', metaDescription: '',
          siteName: '', siteSubtitle: '', navItems: [], ctaButtons: [],
          features: [], testimonials: [], faqs: []
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
    
    const rawTargetId = selectedPage === 'custom' ? customPageId : selectedPage;
    const targetId = rawTargetId.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    
    if (!targetId) {
      toast({ variant: "destructive", title: "אנא הזיני מזהה עמוד (Slug)" });
      return;
    }

    setIsSaving(true);
    const saveRef = doc(db, 'siteContent', targetId);
    const savePayload = {
      ...content,
      pageId: targetId,
      updatedAt: Date.now()
    };

    setDoc(saveRef, savePayload)
      .then(() => {
        toast({ title: "התוכן נשמר בהצלחה!" });
        if (selectedPage === 'custom') {
          setCustomPageId('');
          setSelectedPage(targetId);
        }
      })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: saveRef.path,
          operation: 'write',
          requestResourceData: savePayload
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setIsSaving(false));
  };

  const addArrayItem = (key: keyof typeof content, newItem: any) => {
    setContent(prev => ({ ...prev, [key]: [...(prev[key] as any[]), newItem] }));
  };
  const removeArrayItem = (key: keyof typeof content, index: number) => {
    const updated = [...(content[key] as any[])];
    updated.splice(index, 1);
    setContent(prev => ({ ...prev, [key]: updated }));
  };
  const updateArrayItem = (key: keyof typeof content, index: number, field: string, value: string) => {
    const updated = [...(content[key] as any[])];
    updated[index] = { ...updated[index], [field]: value };
    setContent(prev => ({ ...prev, [key]: updated }));
  };
  const moveArrayItem = (key: keyof typeof content, index: number, direction: 'up' | 'down') => {
    const updated = [...(content[key] as any[])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setContent(prev => ({ ...prev, [key]: updated }));
  };

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-primary size-12" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 text-center bg-stone-50">
        <div className="max-w-md space-y-8">
          <div className="p-6 bg-white rounded-full w-fit mx-auto shadow-xl">
            <Monitor className="size-16 text-primary" strokeWidth={1} />
          </div>
          <h2 className="text-4xl font-handwriting font-bold text-accent">אזור זה ניתן לשימוש מהמחשב בלבד</h2>
          <p className="text-lg font-headline text-stone-500">עריכת תוכן ועיצוב דורשים מסך רחב לעבודה מלוטשת. אנא התחברי מהמחשב.</p>
          <Button onClick={() => router.push('/admin/dashboard')} variant="outline" className="boutique-label h-12 px-8 border-stone-200">חזרה ללוח הבקרה</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-48 pb-32 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="mb-4 text-stone-400 p-0 hover:text-primary">
              <ChevronRight className="ml-2" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-6xl font-handwriting text-accent">מערכת ניהול פרימיום</h1>
          </div>
          
          <div className="w-full md:w-80 space-y-4">
            <div className="space-y-2">
              <Label className="boutique-label flex items-center gap-2">בחר דף לעריכה</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="bg-white border-none h-12 rounded-none shadow-sm">
                  <SelectValue placeholder="בחרי עמוד..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global" className="font-bold text-primary">⚙️ הגדרות כלליות ומיתוג</SelectItem>
                  {DEFAULT_PAGES.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  <SelectItem value="custom" className="italic text-stone-400">+ הוספת עמוד חדש...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedPage === 'custom' && (
              <div className="space-y-2">
                <Label className="boutique-label">מזהה עמוד באנגלית (Slug)</Label>
                <Input value={customPageId} onChange={e => setCustomPageId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="my-new-page" className="bg-white h-12" />
              </div>
            )}
          </div>
        </div>

        {isFetching ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
        ) : (
          <form onSubmit={handleSave} className="space-y-12">
            
            <Card className="border-none shadow-xl rounded-none overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-stone-100">
                <CardTitle className="font-headline text-2xl flex items-center gap-4">
                  <Palette size={24} className="text-primary" /> עיצוב ו-SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label className="boutique-label">צבע המותג הראשי</Label>
                    <Select value={content.primaryColor} onValueChange={(val) => setContent({...content, primaryColor: val})}>
                      <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PRESET_COLORS.map(c => (
                          <SelectItem key={c.value} value={c.value}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${c.value})` }}></div>
                              {c.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label className="boutique-label">כותרת גוגל (Meta Title)</Label>
                    <Input value={content.metaTitle} onChange={e => setContent({...content, metaTitle: e.target.value})} placeholder="מורן פז | פסיכותרפיה" />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <Label className="boutique-label">תיאור גוגל (Meta Description)</Label>
                    <Input value={content.metaDescription} onChange={e => setContent({...content, metaDescription: e.target.value})} placeholder="תיאור קצר לתוצאות החיפוש..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedPage === 'global' ? (
              <div className="space-y-12">
                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100"><CardTitle className="font-headline text-2xl">הגדרות מותג</CardTitle></CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">שם המותג</Label>
                      <Input value={content.siteName} onChange={e => setContent({...content, siteName: e.target.value})} className="h-14 text-xl font-headline" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">תיאור המותג</Label>
                      <Input value={content.siteSubtitle} onChange={e => setContent({...content, siteSubtitle: e.target.value})} className="h-14 text-xl font-headline italic" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100"><CardTitle className="font-headline text-2xl">תפריט ניווט</CardTitle></CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {content.navItems.map((item, index) => (
                      <div key={index} className="flex gap-4 items-end bg-stone-50 p-4 border border-stone-100">
                        <div className="flex flex-col gap-1">
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('navItems', index, 'up')} disabled={index === 0}>▲</Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('navItems', index, 'down')} disabled={index === content.navItems.length - 1}>▼</Button>
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-[10px] font-bold">תווית</Label>
                          <Input value={item.label} onChange={e => updateArrayItem('navItems', index, 'label', e.target.value)} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-[10px] font-bold">כתובת (URL)</Label>
                          <Input value={item.href} onChange={e => updateArrayItem('navItems', index, 'href', e.target.value)} />
                        </div>
                        <Button type="button" variant="ghost" onClick={() => removeArrayItem('navItems', index)} className="text-destructive"><Trash2 size={18} /></Button>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addArrayItem('navItems', { label: '', href: '' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary">
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
                        <Label className="boutique-label text-stone-400 flex items-center gap-2"><Monitor size={14} /> רקע דסקטופ (URL)</Label>
                        <Input value={content.heroImageUrlDesktop} onChange={e => setContent({...content, heroImageUrlDesktop: e.target.value})} className="font-sans" />
                      </div>
                      <div className="space-y-3">
                        <Label className="boutique-label text-stone-400 flex items-center gap-2"><Smartphone size={14} /> רקע מובייל (URL)</Label>
                        <Input value={content.heroImageUrlMobile} onChange={e => setContent({...content, heroImageUrlMobile: e.target.value})} className="font-sans" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100"><CardTitle className="font-headline text-2xl">תוכן העמוד</CardTitle></CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">כותרת פתיחה</Label>
                      <Input value={content.introTitle} onChange={e => setContent({...content, introTitle: e.target.value})} className="h-14 text-xl font-headline" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label text-stone-400">גוף העמוד</Label>
                      <div className="prose-editor">
                        <ReactQuill theme="snow" value={content.introContent} onChange={val => setContent({...content, introContent: val})} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <Box size={24} className="text-primary" /> קוביות תוכן (Features)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {content.features.map((feat, index) => (
                      <div key={index} className="bg-stone-50 p-6 border border-stone-100 rounded-sm space-y-4">
                        <div className="flex justify-between items-center">
                           <div className="flex gap-2">
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('features', index, 'up')} disabled={index === 0}>▲</Button>
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('features', index, 'down')} disabled={index === content.features.length - 1}>▼</Button>
                           </div>
                           <Button type="button" variant="ghost" onClick={() => removeArrayItem('features', index)} className="text-destructive"><Trash2 size={16} /></Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold">אייקון</Label>
                            <Select value={feat.icon} onValueChange={(val) => updateArrayItem('features', index, 'icon', val)}>
                              <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {ICON_OPTIONS.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    <div className="flex items-center gap-2">{opt.icon} {opt.value}</div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label className="text-[10px] font-bold">כותרת הקוביה</Label>
                            <Input value={feat.title} onChange={e => updateArrayItem('features', index, 'title', e.target.value)} className="bg-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-bold">תיאור הקוביה</Label>
                           <Input value={feat.description} onChange={e => updateArrayItem('features', index, 'description', e.target.value)} className="bg-white" />
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addArrayItem('features', { title: '', description: '', icon: 'Heart' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary">
                      <Plus className="mr-2" size={18} /> הוספת קוביית תוכן חדשה
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <MousePointer2 size={24} className="text-primary" /> ניהול כפתורים (CTA)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {content.ctaButtons.map((btn, index) => (
                      <div key={index} className="flex gap-4 items-end bg-stone-50 p-6 border border-stone-100">
                        <div className="flex flex-col gap-1">
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('ctaButtons', index, 'up')} disabled={index === 0}>▲</Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('ctaButtons', index, 'down')} disabled={index === content.ctaButtons.length - 1}>▼</Button>
                        </div>
                        <div className="flex-[2] space-y-2">
                          <Label className="text-[10px] font-bold">כיתוב</Label>
                          <Input value={btn.label} onChange={e => updateArrayItem('ctaButtons', index, 'label', e.target.value)} className="bg-white" />
                        </div>
                        <div className="flex-[3] space-y-2">
                          <Label className="text-[10px] font-bold">קישור</Label>
                          <Input value={btn.href} onChange={e => updateArrayItem('ctaButtons', index, 'href', e.target.value)} className="bg-white font-sans" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-[10px] font-bold">עיצוב</Label>
                          <Select value={btn.variant} onValueChange={(val) => updateArrayItem('ctaButtons', index, 'variant', val)}>
                            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="primary">מלא</SelectItem>
                              <SelectItem value="outline">מסגרת</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="button" variant="ghost" onClick={() => removeArrayItem('ctaButtons', index)} className="text-destructive"><Trash2 size={18} /></Button>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addArrayItem('ctaButtons', { label: '', href: '', variant: 'primary' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary">
                      <Plus className="mr-2" size={18} /> הוספת כפתור חדש
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <HelpCircle size={24} className="text-primary" /> שאלות נפוצות (FAQ)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {content.faqs.map((faq, index) => (
                      <div key={index} className="bg-stone-50 p-6 border border-stone-100 rounded-sm space-y-4">
                        <div className="flex justify-between items-center">
                           <div className="flex gap-2">
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('faqs', index, 'up')} disabled={index === 0}>▲</Button>
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('faqs', index, 'down')} disabled={index === content.faqs.length - 1}>▼</Button>
                           </div>
                           <Button type="button" variant="ghost" onClick={() => removeArrayItem('faqs', index)} className="text-destructive"><Trash2 size={16} /></Button>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold">שאלה</Label>
                          <Input value={faq.question} onChange={e => updateArrayItem('faqs', index, 'question', e.target.value)} className="bg-white" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold">תשובה</Label>
                          <Input value={faq.answer} onChange={e => updateArrayItem('faqs', index, 'answer', e.target.value)} className="bg-white" />
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addArrayItem('faqs', { question: '', answer: '' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary">
                      <Plus className="mr-2" size={18} /> הוספת שאלה ותשובה
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100">
                    <CardTitle className="font-headline text-2xl flex items-center gap-4">
                      <MessageSquare size={24} className="text-primary" /> המלצות ועדויות
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {content.testimonials.map((t, index) => (
                      <div key={index} className="bg-stone-50 p-6 border border-stone-100 rounded-sm space-y-4">
                        <div className="flex justify-between items-center">
                           <div className="flex gap-2">
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('testimonials', index, 'up')} disabled={index === 0}>▲</Button>
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('testimonials', index, 'down')} disabled={index === content.testimonials.length - 1}>▼</Button>
                           </div>
                           <Button type="button" variant="ghost" onClick={() => removeArrayItem('testimonials', index)} className="text-destructive"><Trash2 size={16} /></Button>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold">ההמלצה</Label>
                          <Input value={t.text} onChange={e => updateArrayItem('testimonials', index, 'text', e.target.value)} className="bg-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold">שם הכותב/ת</Label>
                            <Input value={t.author} onChange={e => updateArrayItem('testimonials', index, 'author', e.target.value)} className="bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold">מיקום</Label>
                            <Input value={t.location} onChange={e => updateArrayItem('testimonials', index, 'location', e.target.value)} className="bg-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addArrayItem('testimonials', { text: '', author: '', location: '' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary">
                      <Plus className="mr-2" size={18} /> הוספת המלצה חדשה
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            <Button type="submit" disabled={isSaving} className="w-full bg-primary h-16 text-white text-xl boutique-label rounded-none shadow-2xl">
              {isSaving ? <Loader2 className="animate-spin" /> : <><Save className="ml-4" /> שמירת כל השינויים</>}
            </Button>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
