
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
import { 
  Loader2, Save, ChevronRight, Monitor, Smartphone, Globe, 
  Plus, Trash2, Box, Heart, Sparkles, 
  Orbit, Compass, Users, Star, Palette, MessageSquare, HelpCircle 
} from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-48 w-full bg-stone-50 flex items-center justify-center font-headline text-stone-400">טוען עורך...</div>
});
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
  { name: 'זהב בוטיק (Mustard Gold)', value: '35 40% 45%' },
  { name: 'ירוק מרווה (Sage)', value: '155 15% 45%' },
  { name: 'ורוד עתיק (Dusty Rose)', value: '350 20% 65%' },
  { name: 'כחול ערפל (Ocean Mist)', value: '190 15% 55%' }
];

const PAGE_FALLBACKS: Record<string, any> = {
  home: {
    heroTitle: "להאיר את עצמכם",
    heroSubtitle: "ברוכים הבאים למרחב של BeinMe. אני מזמינה אתכם למסע של מודעות, קבלה וחיבור לסמכות הפנימית דרך עבודה משולבת של גוף, נפש ורוח",
    introTitle: "בכל טיפת חושך אפשר לשפוך אור של מודעות",
    introContent: "<p><strong>ברוכים הבאים, אני מורן פז.</strong></p><p>אני מאמינה ששינוי עמוק מתחיל במפגש כנה ובקבלה של כל חלקי העצמי שלנו. עבורי, הרגשות הם המצפן המדויק ביותר שיש לנו, ולכל אחד ואחת מאיתנו יש מפת דרכים פנימית הייחודית רק לו.</p><p>המטרה שלי היא ללוות אתכם במסע הגילוי הזה – לעזור לכם לקבל את הסיפור שאתם מספרים לעצמכם, ולמצוא את הדרך להתחבר מחדש לסמכות הפנימית, לשקט ולאור שבתוככם.</p>",
    primaryColor: '35 40% 45%',
    features: [
      { title: "גוף", icon: "Orbit", description: "הקשבה לתחושות הפיזיקליות כפתח לעולם הרגשי." },
      { title: "נפש", icon: "Heart", description: "עיבוד רגשות, דפוסים והסיפור שאנחנו מספרים לעצמנו." },
      { title: "רוח", icon: "Sparkles", description: "חיבור למודעות, למשמעות ולאור שבתוכנו." }
    ]
  },
  about: {
    heroTitle: "הלב מאחורי הקליניקה",
    heroSubtitle: "להדליק את האור בתוך המרחב הטיפול",
    introTitle: "אני מאמינה ששינוי – כל שינוי – מתחיל קודם כל במפגש. מפגש אמיץ וחשוף עם כל אותם חלקים המרכיבים אותנו.",
    introContent: "<p>בתוך המרחב הטיפולי, המטרה שלי היא לעזור לך להדליק את האור. בכל מקום שבו קיימת טיפת חושך, ניתן לשפוך את אור המודעות ולהאיר את עצמנו מחדש.</p><p>הרגשות שלנו הם המצפן. לכל אחד מאיתנו יש מפת דרכים פנימית ייחודית לחייו, ולעיתים כל מה שנדרש הוא מישהי שתחזיק את הפנס בזמן שאת מגלה אותה מחדש.</p>",
    primaryColor: '35 40% 45%'
  }
};

export default function PageManagement() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

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
      
      const fallback = PAGE_FALLBACKS[id] || {};

      if (docSnap.exists()) {
        const data = docSnap.data();
        setContent({
          heroTitle: data.heroTitle || fallback.heroTitle || '',
          heroSubtitle: data.heroSubtitle || fallback.heroSubtitle || '',
          introTitle: data.introTitle || fallback.introTitle || '',
          introContent: data.introContent || fallback.introContent || '',
          heroImageUrlDesktop: data.heroImageUrlDesktop || '',
          heroImageUrlMobile: data.heroImageUrlMobile || '',
          primaryColor: data.primaryColor || fallback.primaryColor || '35 40% 45%',
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          siteName: data.siteName || '',
          siteSubtitle: data.siteSubtitle || '',
          navItems: data.navItems || [],
          ctaButtons: data.ctaButtons || [],
          features: data.features || fallback.features || [],
          testimonials: data.testimonials || [],
          faqs: data.faqs || []
        });
      } else {
        setContent({ 
          heroTitle: fallback.heroTitle || '', 
          heroSubtitle: fallback.heroSubtitle || '', 
          introTitle: fallback.introTitle || '', 
          introContent: fallback.introContent || '',
          heroImageUrlDesktop: '', 
          heroImageUrlMobile: '',
          primaryColor: fallback.primaryColor || '35 40% 45%', 
          metaTitle: '', 
          metaDescription: '',
          siteName: id === 'global' ? 'MORAN PAZ' : '', 
          siteSubtitle: id === 'global' ? 'BeinMe — להיות אני בתוכי' : '', 
          navItems: [], 
          ctaButtons: [],
          features: fallback.features || [], 
          testimonials: [], 
          faqs: []
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

  return (
    <main className="min-h-screen bg-stone-50 text-right pb-32">
      <Navbar />
      <section className="pt-28 md:pt-48 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="w-full">
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="mb-4 text-stone-400 p-0 hover:text-primary h-auto">
              <ChevronRight className="ml-2 size-4" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-4xl md:text-6xl font-handwriting text-accent">ניהול תוכן ועיצוב</h1>
          </div>
          
          <div className="w-full md:w-80 space-y-4">
            <div className="space-y-2">
              <Label className="boutique-label flex items-center gap-2">בחר דף לעריכה</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="bg-white border-none h-12 rounded-none shadow-sm">
                  <SelectValue placeholder="בחרי עמוד..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global" className="font-bold text-primary">⚙️ הגדרות כלליות</SelectItem>
                  {DEFAULT_PAGES.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  <SelectItem value="custom" className="italic text-stone-400">+ הוספת עמוד חדש</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedPage === 'custom' && (
              <div className="space-y-2">
                <Label className="boutique-label">מזהה עמוד (Slug)</Label>
                <Input value={customPageId} onChange={e => setCustomPageId(e.target.value)} placeholder="my-page" className="bg-white h-12" />
              </div>
            )}
          </div>
        </div>

        {isFetching ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 md:space-y-12">
            
            {/* Design & SEO Section */}
            <Card className="border-none shadow-xl rounded-none overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-stone-100 py-4 md:py-6">
                <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-3">
                  <Palette size={20} className="text-primary" /> עיצוב ו-SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 md:pt-8 space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-3">
                    <Label className="boutique-label">צבע המותג</Label>
                    <Select value={content.primaryColor} onValueChange={(val) => setContent({...content, primaryColor: val})}>
                      <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PRESET_COLORS.map(c => (
                          <SelectItem key={c.value} value={c.value}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${c.value})` }}></div>
                              {c.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label">כותרת גוגל</Label>
                    <Input value={content.metaTitle} onChange={e => setContent({...content, metaTitle: e.target.value})} />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label className="boutique-label">תיאור גוגל</Label>
                    <Input value={content.metaDescription} onChange={e => setContent({...content, metaDescription: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedPage === 'global' ? (
              <Card className="border-none shadow-xl rounded-none">
                <CardHeader className="bg-stone-50/50 border-b border-stone-100 py-4 md:py-6">
                  <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-3">
                    <Globe size={20} className="text-primary" /> הגדרות מותג
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 md:pt-8 space-y-6">
                  <div className="space-y-3">
                    <Label className="boutique-label">שם האתר</Label>
                    <Input value={content.siteName} onChange={e => setContent({...content, siteName: e.target.value})} className="h-12 text-lg" />
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label">שורת מיתוג</Label>
                    <Input value={content.siteSubtitle} onChange={e => setContent({...content, siteSubtitle: e.target.value})} className="h-12 italic" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8 md:space-y-12">
                {/* Hero Section */}
                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100 py-4 md:py-6">
                    <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-3">
                      <Smartphone size={20} className="text-primary" /> כותרות ותמונות (Hero)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 md:pt-8 space-y-6">
                    <div className="space-y-3">
                      <Label className="boutique-label">כותרת ראשית</Label>
                      <Input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="h-12 md:h-14 md:text-xl font-headline" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label">כותרת משנית</Label>
                      <Input value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="h-12 md:h-14 italic" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="boutique-label">תמונת דסקטופ (URL)</Label>
                        <Input value={content.heroImageUrlDesktop} onChange={e => setContent({...content, heroImageUrlDesktop: e.target.value})} className="font-sans" />
                      </div>
                      <div className="space-y-3">
                        <Label className="boutique-label">תמונת מובייל (URL)</Label>
                        <Input value={content.heroImageUrlMobile} onChange={e => setContent({...content, heroImageUrlMobile: e.target.value})} className="font-sans" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Area */}
                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100 py-4 md:py-6">
                    <CardTitle className="font-headline text-xl md:text-2xl">תוכן העמוד</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 md:pt-8 space-y-6">
                    <div className="space-y-3">
                      <Label className="boutique-label">כותרת פתיחה</Label>
                      <Input value={content.introTitle} onChange={e => setContent({...content, introTitle: e.target.value})} className="h-12 text-lg" />
                    </div>
                    <div className="space-y-3">
                      <Label className="boutique-label">גוף העמוד</Label>
                      <div className="prose-editor min-h-[300px]">
                        <ReactQuill theme="snow" value={content.introContent} onChange={val => setContent({...content, introContent: val})} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features / Blocks */}
                <Card className="border-none shadow-xl rounded-none">
                  <CardHeader className="bg-stone-50/50 border-b border-stone-100 py-4 md:py-6">
                    <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-3">
                      <Box size={20} className="text-primary" /> קוביות תוכן
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 md:pt-8 space-y-4 md:space-y-6">
                    {content.features.map((feat, index) => (
                      <div key={index} className="bg-stone-50 p-4 md:p-6 border border-stone-100 rounded-sm space-y-4">
                        <div className="flex justify-between items-center">
                           <div className="flex gap-1 md:gap-2">
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('features', index, 'up')} disabled={index === 0}>▲</Button>
                             <Button type="button" variant="ghost" size="sm" onClick={() => moveArrayItem('features', index, 'down')} disabled={index === content.features.length - 1}>▼</Button>
                           </div>
                           <Button type="button" variant="ghost" onClick={() => removeArrayItem('features', index)} className="text-destructive p-2 h-auto"><Trash2 size={16} /></Button>
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
                            <Label className="text-[10px] font-bold">כותרת</Label>
                            <Input value={feat.title} onChange={e => updateArrayItem('features', index, 'title', e.target.value)} className="bg-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-bold">תיאור</Label>
                           <Input value={feat.description} onChange={e => updateArrayItem('features', index, 'description', e.target.value)} className="bg-white" />
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addArrayItem('features', { title: '', description: '', icon: 'Heart' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                      <Plus className="mr-2 size-4" /> הוספת קובייה
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Bottom Save Button - Stacked and Full on Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/40 z-[250] md:relative md:bg-transparent md:border-none md:p-0">
               <Button type="submit" disabled={isSaving} className="w-full bg-primary hover:bg-accent h-14 md:h-16 text-white text-lg md:text-xl boutique-label rounded-none shadow-2xl">
                {isSaving ? <Loader2 className="animate-spin" /> : <><Save className="ml-4 size-5" /> שמירת כל השינויים</>}
              </Button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
