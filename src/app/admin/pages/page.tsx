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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, Save, ChevronRight, Monitor, Smartphone, Globe,
  Plus, Trash2, Box, Heart, Sparkles,
  Orbit, Compass, Users, Star, Palette, MessageSquare, HelpCircle,
  MousePointerClick, Quote, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-48 w-full bg-stone-50 flex items-center justify-center font-headline text-stone-400">טוען עורך...</div>
});
import 'react-quill-new/dist/quill.snow.css';

// Quill toolbar with RTL + image support
const QUILL_MODULES = {
  toolbar: [
    [{ direction: 'rtl' }, { align: [] }],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};
const QUILL_FORMATS = [
  'direction', 'align', 'header',
  'bold', 'italic', 'underline',
  'color', 'background',
  'list',
  'link', 'image',
];

// ─── Constants ────────────────────────────────────────────────────────────────

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
  { value: 'Star', icon: <Star size={14} /> },
  { value: 'MessageSquare', icon: <MessageSquare size={14} /> },
  { value: 'HelpCircle', icon: <HelpCircle size={14} /> },
];

const PRESET_COLORS = [
  { name: 'זהב בוטיק (Mustard Gold)', value: '35 40% 45%' },
  { name: 'ירוק מרווה (Sage)', value: '155 15% 45%' },
  { name: 'ורוד עתיק (Dusty Rose)', value: '350 20% 65%' },
  { name: 'כחול ערפל (Ocean Mist)', value: '190 15% 55%' },
  { name: 'חרדל כהה (Dark Mustard)', value: '40 50% 35%' },
  { name: 'טרקוטה (Terracotta)', value: '15 35% 50%' },
];

const HERO_HEIGHTS = [
  { label: 'קצר (50vh)', value: '50vh' },
  { label: 'בינוני (70vh)', value: '70vh' },
  { label: 'גבוה (80vh)', value: '80vh' },
  { label: 'מסך מלא (100vh)', value: '100vh' },
];

const SECTION_BG_OPTIONS = [
  { label: 'לבן', value: 'white' },
  { label: 'אבן בהיר', value: 'stone-50' },
  { label: 'אבן כהה', value: 'stone-100' },
  { label: 'ראשי (Primary)', value: 'primary' },
];

const CTA_VARIANTS = [
  { label: 'ראשי (מלא)', value: 'primary' },
  { label: 'מסגרת (Outline)', value: 'outline' },
  { label: 'שקוף (Ghost)', value: 'ghost' },
];

const CTA_SIZES = [
  { label: 'קטן', value: 'sm' },
  { label: 'רגיל', value: 'default' },
  { label: 'גדול', value: 'lg' },
];

const PAGE_FALLBACKS: Record<string, any> = {
  home: {
    heroTitle: "להאיר את עצמכם",
    heroSubtitle: "ברוכים הבאים למרחב של BeinMe. אני מזמינה אתכם למסע של מודעות, קבלה וחיבור לסמכות הפנימית דרך עבודה משולבת של גוף, נפש ורוח",
    introTitle: "בכל טיפת חושך אפשר לשפוך אור של מודעות",
    introContent: "<p><strong>ברוכים הבאים, אני מורן פז.</strong></p><p>אני מאמינה ששינוי עמוק מתחיל במפגש כנה ובקבלה של כל חלקי העצמי שלנו. עבורי, הרגשות הם המצפן המדויק ביותר שיש לנו, ולכל אחד ואחת מאיתנו יש מפת דרכים פנימית הייחודית רק לו.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '80vh',
    heroTextAlign: 'center',
    features: [
      { title: "גוף", icon: "Orbit", description: "הקשבה לתחושות הפיזיקליות כפתח לעולם הרגשי." },
      { title: "נפש", icon: "Heart", description: "עיבוד רגשות, דפוסים והסיפור שאנחנו מספרים לעצמנו." },
      { title: "רוח", icon: "Sparkles", description: "חיבור למודעות, למשמעות ולאור שבתוכנו." }
    ]
  },
  about: {
    heroTitle: "הלב מאחורי הקליניקה",
    heroSubtitle: "להדליק את האור בתוך המרחב הטיפולי",
    introTitle: "אני מאמינה ששינוי – כל שינוי – מתחיל קודם כל במפגש. מפגש אמיץ וחשוף עם כל אותם חלקים המרכיבים אותנו.",
    introContent: "<p>בתוך המרחב הטיפולי, המטרה שלי היא לעזור לך להדליק את האור. בכל מקום שבו קיימת טיפת חושך, ניתן לשפוך את אור המודעות ולהאיר את עצמנו מחדש.</p><p>הרגשות שלנו הם המצפן. לכל אחד מאיתנו יש מפת דרכים פנימית ייחודית לחייו, ולעיתים כל מה שנדרש הוא מישהי שתחזיק את הפנס בזמן שאת מגלה אותה מחדש.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
    features: [
      { title: "שילוב גוף-נפש-רוח", icon: "Orbit", description: "אני עובדת עם הרגש, הגוף והרוח יחד לריפוי עמוק וחיבור למשמעות." },
      { title: "כלים חווייתיים", icon: "Sparkles", description: "אני משלבת עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס בטיפול." },
      { title: "גישה אנושית", icon: "Heart", description: "מקצועיות אקדמית (M.A) יחד עם חיבור אנושי חם בגובה העיניים." }
    ]
  },
  practice: {
    heroTitle: "התהליך הטיפולי",
    heroSubtitle: "מסע משותף של גילוי וריפוי",
    introTitle: "העבודה הטיפולית משלבת כלים מעולמות הפסיכולוגיה והרוח.",
    introContent: "<p>הגישה שלי רואה בכל אדם שלם — גוף, נפש ורוח. אנחנו עובדים יחד עם הרגשות, הגוף, הדפוסים והסיפורים שאנחנו מספרים לעצמנו.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
    features: [
      { title: "תקיעות בחיים", icon: "Compass", description: "שחרור חסמים ויצירת תנועה חדשה." },
      { title: "חרדה ומתח", icon: "Heart", description: "כלים לוויסות רגשי ומרחב לנשימה." },
      { title: "מערכות יחסים", icon: "Users", description: "שיפור הקשר עם עצמך ועם הסביבה." },
      { title: "דימוי עצמי", icon: "Star", description: "בניית ערך פנימי וחיבור לקול האותנטי." }
    ],
    faqs: [
      { question: "מה זה פסיכותרפיה הוליסטית?", answer: "זוהי גישה טיפולית הרואה באדם שלם - גוף, נפש ורוח." },
      { question: "כמה זמן אורך תהליך הטיפול?", answer: "זה משתנה מאדם לאדם. בדרך כלל מדובר בתהליך של מספר חודשים עד שנה." }
    ]
  },
  online: {
    heroTitle: "בית פנימי מכל מקום",
    heroSubtitle: "טיפול רגשי אונליין לישראלים בארץ ובעולם",
    introTitle: 'טיפול בעברית לישראלים בחו"ל',
    introContent: "<p>הטיפול האונליין מאפשר לך לקבל ליווי רגשי מקצועי מכל מקום בעולם, בפרטיות ובנוחות של הבית שלך.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
    features: [
      { title: 'לישראלים בחו"ל', icon: "Orbit", description: "טיפול בעברית מכל מקום בעולם, ללא פשרות על איכות." },
      { title: "60 דקות טיפול", icon: "Star", description: "מפגש מלא ומעמיק דרך זום בזמן שנוח לך." },
      { title: "מרחב בטוח מהבית", icon: "Heart", description: "הפרטיות והנוחות של הסביבה המוכרת שלך." },
      { title: "פסיכותרפיה הוליסטית", icon: "Sparkles", description: "אותה גישה עמוקה — גוף, נפש ורוח — גם אונליין." }
    ]
  },
  tivon: {
    heroTitle: "פסיכותרפיה הוליסטית בטבעון",
    heroSubtitle: "מרחב בטוח לנשימה ושינוי בלב הטבע של קריית טבעון.",
    introTitle: "טיפול רגשי קרוב לבית",
    introContent: "<p>הקליניקה בטבעון ממוקמת בלב הטבע הירוק, מה שמאפשר מרחב של שקט והתנתקות מהרעש החיצוני עוד לפני תחילת המפגש.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '75vh',
    heroTextAlign: 'center',
    features: [
      { title: "אווירה כפרית ושלווה", icon: "Sparkles", description: "מיקום שקט בלב הירוק של טבעון." },
      { title: "מרחב בטוח ומכיל", icon: "Heart", description: "עיצוב מינימליסטי המשרה רוגע וביטחון." },
      { title: "אירוח חם", icon: "Star", description: "פינת ישיבה נעימה ותה צמחים להרגעה." },
      { title: "אור טבעי", icon: "Orbit", description: "חלונות גדולים הפונים לצמחייה ירוקה." }
    ],
    faqs: [
      { question: "למה כדאי להגיע לטיפול בטבעון?", answer: "הקליניקה בטבעון ממוקמת בלב הטבע הירוק, מה שמאפשר מרחב של שקט והתנתקות מהרעש החיצוני עוד לפני תחילת המפגש." },
      { question: "מהי פסיכותרפיה הוליסטית?", answer: "זוהי גישה טיפולית הרואה באדם שלם - גוף, נפש ורוח." }
    ]
  },
  'emeq-izrael': {
    heroTitle: "טיפול רגשי בעמק יזרעאל",
    heroSubtitle: "מרחב בטוח לצמיחה, ריפוי ומודעות בלב העמק - ליווי רגשי לנשים ונוער.",
    introTitle: "קרוב לבית, עמוק בלב",
    introContent: "<p>ליווי רגשי מקצועי לתושבי עמק יזרעאל והסביבה. נפגשים בקליניקה או אונליין — כמה שנוח לך.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
  },
  women: {
    heroTitle: "ליווי רגשי לנשים",
    heroSubtitle: "לחזור אל הבית הפנימי שלך",
    introTitle: "טיפול וליווי לנשים",
    introContent: "<p>הטיפול והליווי לנשים בקליניקה שלי הוא הזמנה עבורך לעצור ולהקשיב למה שמבקש ביטוי בתוכך.</p><p>אני כאן כדי לספק לך את המקום בו תוכלי להניח הכל ולחזור לעצמך.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
  },
  youth: {
    heroTitle: "טיפול רגשי לנוער",
    heroSubtitle: "מקום בטוח להיות מי שאת/ה",
    introTitle: "טיפול וליווי לנוער",
    introContent: "<p>גישה מותאמת לגיל המשלבת כלים יצירתיים וחווייתיים שמדברים בשפה של בני הנוער.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
  },
  adults: {
    heroTitle: "טיפול למבוגרים",
    heroSubtitle: "למצוא עוגן בתוך סערות החיים",
    introTitle: "טיפול רגשי למבוגרים",
    introContent: "<p>ליווי רגשי למבוגרים המחפשים בהירות, שינוי ועוגן יציב בחיים המודרניים.</p>",
    primaryColor: '35 40% 45%',
    heroHeight: '70vh',
    heroTextAlign: 'center',
  },
};

// ─── Content State Type ───────────────────────────────────────────────────────

type CtaButton = { label: string; href: string; variant: 'primary' | 'outline' | 'ghost'; size: 'sm' | 'default' | 'lg' };
type Feature   = { title: string; description: string; icon: string };
type Testimonial = { text: string; author: string; location: string };
type Faq       = { question: string; answer: string };
type NavItem   = { label: string; href: string };

type ContentState = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrlDesktop: string;
  heroImageUrlMobile: string;
  heroHeight: string;
  heroTextAlign: string;
  heroBgColor: string;
  introTitle: string;
  introContent: string;
  sectionBg: string;
  primaryColor: string;
  metaTitle: string;
  metaDescription: string;
  siteName: string;
  siteSubtitle: string;
  ctaAlign: string;
  navItems: NavItem[];
  ctaButtons: CtaButton[];
  features: Feature[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

const EMPTY_CONTENT: ContentState = {
  heroTitle: '',
  heroSubtitle: '',
  heroImageUrlDesktop: '',
  heroImageUrlMobile: '',
  heroHeight: '70vh',
  heroTextAlign: 'center',
  heroBgColor: '',
  introTitle: '',
  introContent: '',
  sectionBg: 'white',
  primaryColor: '35 40% 45%',
  metaTitle: '',
  metaDescription: '',
  siteName: '',
  siteSubtitle: '',
  ctaAlign: 'center',
  navItems: [],
  ctaButtons: [],
  features: [],
  testimonials: [],
  faqs: [],
};

// ─── Small reusable sub-components ────────────────────────────────────────────

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card className="border-none shadow-xl rounded-none overflow-hidden">
      <CardHeader className="bg-stone-50/80 border-b border-stone-100 py-4 md:py-6">
        <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-3">
          <span className="text-primary">{icon}</span> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 md:pt-8 space-y-5">{children}</CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="boutique-label">{label}</Label>
      {children}
    </div>
  );
}

function AlignPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { v: 'right', Icon: AlignRight },
    { v: 'center', Icon: AlignCenter },
    { v: 'left', Icon: AlignLeft },
  ];
  return (
    <div className="flex gap-1">
      {options.map(({ v, Icon }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`p-2 border rounded-sm transition-colors ${value === v ? 'bg-primary text-white border-primary' : 'bg-white border-stone-200 text-stone-400 hover:border-primary'}`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}

function MoveButtons({ onUp, onDown, disableUp, disableDown }: { onUp: () => void; onDown: () => void; disableUp: boolean; disableDown: boolean }) {
  return (
    <div className="flex gap-1">
      <Button type="button" variant="ghost" size="sm" onClick={onUp} disabled={disableUp} className="h-8 w-8 p-0">▲</Button>
      <Button type="button" variant="ghost" size="sm" onClick={onDown} disabled={disableDown} className="h-8 w-8 p-0">▼</Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

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
  const [content, setContent] = useState<ContentState>(EMPTY_CONTENT);

  const set = (patch: Partial<ContentState>) => setContent(prev => ({ ...prev, ...patch }));

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (selectedPage !== 'custom' && db) fetchPageContent(selectedPage);
  }, [selectedPage, db]);

  const fetchPageContent = async (id: string) => {
    if (!db) return;
    setIsFetching(true);
    try {
      const snap = await getDoc(doc(db, 'siteContent', id));
      const fb = PAGE_FALLBACKS[id] || {};
      const d = snap.exists() ? snap.data() : {};
      setContent({
        heroTitle:            d.heroTitle            || fb.heroTitle            || '',
        heroSubtitle:         d.heroSubtitle         || fb.heroSubtitle         || '',
        heroImageUrlDesktop:  d.heroImageUrlDesktop  || '',
        heroImageUrlMobile:   d.heroImageUrlMobile   || '',
        heroHeight:           d.heroHeight           || fb.heroHeight           || '70vh',
        heroTextAlign:        d.heroTextAlign        || fb.heroTextAlign        || 'center',
        heroBgColor:          d.heroBgColor          || '',
        introTitle:           d.introTitle           || fb.introTitle           || '',
        introContent:         d.introContent         || fb.introContent         || '',
        sectionBg:            d.sectionBg            || 'white',
        primaryColor:         d.primaryColor         || fb.primaryColor         || '35 40% 45%',
        metaTitle:            d.metaTitle            || '',
        metaDescription:      d.metaDescription      || '',
        siteName:             d.siteName             || (id === 'global' ? 'MORAN PAZ' : ''),
        siteSubtitle:         d.siteSubtitle         || (id === 'global' ? 'BeinMe — להיות אני בתוכי' : ''),
        ctaAlign:             d.ctaAlign             || 'center',
        navItems:             d.navItems             || fb.navItems             || [],
        ctaButtons:           d.ctaButtons           || fb.ctaButtons           || [],
        features:             d.features             || fb.features             || [],
        testimonials:         d.testimonials         || fb.testimonials         || [],
        faqs:                 d.faqs                 || fb.faqs                 || [],
      });
    } catch (e) {
      toast({ variant: 'destructive', title: 'שגיאה בטעינת הדף', description: String(e) });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || isSaving) return;
    const rawId = selectedPage === 'custom' ? customPageId : selectedPage;
    const targetId = rawId.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    if (!targetId) {
      toast({ variant: 'destructive', title: 'אנא הזיני מזהה עמוד (Slug)' });
      return;
    }
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'siteContent', targetId), { ...content, pageId: targetId, updatedAt: Date.now() });
      toast({ title: '✅ נשמר בהצלחה!', description: `הדף "${targetId}" עודכן.` });
    } catch (err: any) {
      const msg = err?.code === 'permission-denied'
        ? 'אין הרשאות כתיבה. ודאי שאת מחוברת ושה-Firebase Rules מאפשרים כתיבה.'
        : String(err?.message || err);
      toast({ variant: 'destructive', title: '❌ שמירה נכשלה', description: msg });
    } finally {
      setIsSaving(false);
    }
  };

  // Array helpers
  const addItem   = <K extends 'ctaButtons' | 'features' | 'testimonials' | 'faqs' | 'navItems'>(key: K, item: ContentState[K][number]) =>
    setContent(prev => ({ ...prev, [key]: [...(prev[key] as any[]), item] }));
  const removeItem = (key: keyof ContentState, i: number) =>
    setContent(prev => { const a = [...(prev[key] as any[])]; a.splice(i, 1); return { ...prev, [key]: a }; });
  const updateItem = (key: keyof ContentState, i: number, field: string, val: string) =>
    setContent(prev => { const a = [...(prev[key] as any[])]; a[i] = { ...a[i], [field]: val }; return { ...prev, [key]: a }; });
  const moveItem   = (key: keyof ContentState, i: number, dir: 'up' | 'down') =>
    setContent(prev => {
      const a = [...(prev[key] as any[])];
      const j = dir === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= a.length) return prev;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...prev, [key]: a };
    });

  if (!mounted || authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="animate-spin text-primary size-12" /></div>;
  }

  return (
    <main className="min-h-screen bg-stone-50 text-right pb-32">
      <Navbar />
      <section className="pt-28 md:pt-48 px-4 md:px-6 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="w-full">
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="mb-4 text-stone-400 p-0 hover:text-primary h-auto">
              <ChevronRight className="ml-2 size-4" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-4xl md:text-6xl font-handwriting text-accent">ניהול תוכן ועיצוב</h1>
          </div>

          <div className="w-full md:w-80 space-y-4">
            <Field label="בחר דף לעריכה">
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="bg-white border-none h-12 rounded-none shadow-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="global" className="font-bold text-primary">⚙️ הגדרות כלליות</SelectItem>
                  {DEFAULT_PAGES.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  <SelectItem value="custom" className="italic text-stone-400">✚ עמוד חדש</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            {selectedPage === 'custom' && (
              <Field label="מזהה עמוד (Slug)">
                <Input value={customPageId} onChange={e => setCustomPageId(e.target.value)} placeholder="my-new-page" className="bg-white h-12" />
              </Field>
            )}
          </div>
        </div>

        {isFetching ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 md:space-y-12">

            {/* ── Design & SEO ── */}
            <SectionCard icon={<Palette size={20} />} title="עיצוב ו-SEO">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="צבע מותג">
                  <Select value={content.primaryColor} onValueChange={v => set({ primaryColor: v })}>
                    <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PRESET_COLORS.map(c => (
                        <SelectItem key={c.value} value={c.value}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${c.value})` }} />
                            {c.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="כותרת גוגל (עד 60 תווים)">
                  <Input value={content.metaTitle} onChange={e => set({ metaTitle: e.target.value })} maxLength={60} />
                  <p className="text-[10px] text-stone-400 text-left">{content.metaTitle.length}/60</p>
                </Field>
                <div className="md:col-span-2">
                  <Field label="תיאור גוגל (עד 160 תווים)">
                    <Textarea value={content.metaDescription} onChange={e => set({ metaDescription: e.target.value })} maxLength={160} rows={2} className="resize-none" />
                    <p className="text-[10px] text-stone-400 text-left">{content.metaDescription.length}/160</p>
                  </Field>
                </div>
              </div>
            </SectionCard>

            {/* ── Global Settings ── */}
            {selectedPage === 'global' ? (
              <>
                <SectionCard icon={<Globe size={20} />} title="הגדרות מותג">
                  <Field label="שם האתר"><Input value={content.siteName} onChange={e => set({ siteName: e.target.value })} className="h-12 text-lg" /></Field>
                  <Field label="שורת מיתוג"><Input value={content.siteSubtitle} onChange={e => set({ siteSubtitle: e.target.value })} className="h-12 italic" /></Field>
                </SectionCard>

                {/* Nav Items */}
                <SectionCard icon={<AlignRight size={20} />} title="פריטי ניווט">
                  {content.navItems.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center bg-stone-50 p-3 rounded-sm">
                      <MoveButtons onUp={() => moveItem('navItems', i, 'up')} onDown={() => moveItem('navItems', i, 'down')} disableUp={i === 0} disableDown={i === content.navItems.length - 1} />
                      <Input value={item.label} onChange={e => updateItem('navItems', i, 'label', e.target.value)} placeholder="תווית" className="bg-white flex-1" />
                      <Input value={item.href} onChange={e => updateItem('navItems', i, 'href', e.target.value)} placeholder="/path" className="bg-white flex-1 font-sans" dir="ltr" />
                      <Button type="button" variant="ghost" onClick={() => removeItem('navItems', i)} className="text-destructive p-2 h-auto"><Trash2 size={16} /></Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('navItems', { label: '', href: '' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                    <Plus className="mr-2 size-4" /> הוספת פריט ניווט
                  </Button>
                </SectionCard>
              </>
            ) : (
              <>
                {/* ── Hero ── */}
                <SectionCard icon={<Smartphone size={20} />} title="כותרות ותמונות (Hero)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="כותרת ראשית">
                      <Input value={content.heroTitle} onChange={e => set({ heroTitle: e.target.value })} className="h-12 md:h-14 md:text-xl font-headline" />
                    </Field>
                    <Field label="כותרת משנית">
                      <Input value={content.heroSubtitle} onChange={e => set({ heroSubtitle: e.target.value })} className="h-12 italic" />
                    </Field>
                    <Field label="תמונת דסקטופ (URL)">
                      <Input value={content.heroImageUrlDesktop} onChange={e => set({ heroImageUrlDesktop: e.target.value })} className="font-sans" dir="ltr" />
                    </Field>
                    <Field label="תמונת מובייל (URL)">
                      <Input value={content.heroImageUrlMobile} onChange={e => set({ heroImageUrlMobile: e.target.value })} className="font-sans" dir="ltr" />
                    </Field>
                  </div>

                  {/* Hero Style */}
                  <div className="pt-4 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Field label="גובה Hero">
                      <Select value={content.heroHeight} onValueChange={v => set({ heroHeight: v })}>
                        <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                        <SelectContent>{HERO_HEIGHTS.map(h => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </Field>
                    <Field label="יישור טקסט">
                      <AlignPicker value={content.heroTextAlign} onChange={v => set({ heroTextAlign: v })} />
                    </Field>
                    <Field label="צבע רקע (fallback)">
                      <Input value={content.heroBgColor} onChange={e => set({ heroBgColor: e.target.value })} placeholder="#1c1917 או stone-900" className="font-sans" dir="ltr" />
                    </Field>
                  </div>
                </SectionCard>

                {/* ── Content ── */}
                <SectionCard icon={<Monitor size={20} />} title="תוכן העמוד">
                  <Field label="רקע קטע תוכן">
                    <Select value={content.sectionBg} onValueChange={v => set({ sectionBg: v })}>
                      <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                      <SelectContent>{SECTION_BG_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="כותרת פתיחה">
                    <Input value={content.introTitle} onChange={e => set({ introTitle: e.target.value })} className="h-12 text-lg" />
                  </Field>
                  <Field label="גוף העמוד">
                    <p className="text-[11px] text-stone-400 mb-1">Enter = פסקה חדשה · Shift+Enter = שורה חדשה (ללא רווח)</p>
                    <div className="min-h-[280px]" dir="rtl">
                      <ReactQuill
                        theme="snow"
                        value={content.introContent}
                        onChange={val => set({ introContent: val })}
                        modules={QUILL_MODULES}
                        formats={QUILL_FORMATS}
                      />
                    </div>
                  </Field>

                  {/* Live Preview */}
                  {content.introContent && (
                    <div className="border-t border-stone-100 pt-5">
                      <p className="boutique-label text-stone-400 mb-3">תצוגה מקדימה</p>
                      <div
                        className={`p-6 md:p-8 rounded-sm font-headline text-stone-700 leading-relaxed prose-preview text-right ${
                          content.sectionBg === 'stone-50' ? 'bg-stone-50' :
                          content.sectionBg === 'stone-100' ? 'bg-stone-100' :
                          content.sectionBg === 'primary' ? 'bg-primary/10' : 'bg-white border border-stone-100'
                        }`}
                        dangerouslySetInnerHTML={{ __html: content.introContent }}
                      />
                    </div>
                  )}
                </SectionCard>

                {/* ── CTA Buttons ── */}
                <SectionCard icon={<MousePointerClick size={20} />} title="כפתורי קריאה לפעולה (CTA)">
                  <Field label="יישור כפתורים">
                    <AlignPicker value={content.ctaAlign} onChange={v => set({ ctaAlign: v })} />
                  </Field>
                  {content.ctaButtons.map((btn, i) => (
                    <div key={i} className="bg-stone-50 p-4 border border-stone-100 rounded-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <MoveButtons onUp={() => moveItem('ctaButtons', i, 'up')} onDown={() => moveItem('ctaButtons', i, 'down')} disableUp={i === 0} disableDown={i === content.ctaButtons.length - 1} />
                        <Button type="button" variant="ghost" onClick={() => removeItem('ctaButtons', i)} className="text-destructive p-2 h-auto"><Trash2 size={16} /></Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="טקסט הכפתור">
                          <Input value={btn.label} onChange={e => updateItem('ctaButtons', i, 'label', e.target.value)} className="bg-white" />
                        </Field>
                        <Field label="קישור (URL)">
                          <Input value={btn.href} onChange={e => updateItem('ctaButtons', i, 'href', e.target.value)} className="bg-white font-sans" dir="ltr" />
                        </Field>
                        <Field label="סגנון">
                          <Select value={btn.variant} onValueChange={v => updateItem('ctaButtons', i, 'variant', v)}>
                            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                            <SelectContent>{CTA_VARIANTS.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </Field>
                        <Field label="גודל">
                          <Select value={btn.size} onValueChange={v => updateItem('ctaButtons', i, 'size', v)}>
                            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                            <SelectContent>{CTA_SIZES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </Field>
                      </div>
                      {/* Preview */}
                      <div className="flex gap-3 pt-1" style={{ justifyContent: content.ctaAlign === 'right' ? 'flex-end' : content.ctaAlign === 'left' ? 'flex-start' : 'center' }}>
                        <div className={`px-4 py-2 text-sm font-bold rounded-sm border transition-colors ${
                          btn.variant === 'primary' ? 'bg-primary text-white border-primary' :
                          btn.variant === 'outline' ? 'bg-transparent text-primary border-primary' :
                          'bg-transparent text-stone-600 border-transparent'
                        } ${btn.size === 'lg' ? 'text-base px-6 py-3' : btn.size === 'sm' ? 'text-xs px-3 py-1' : ''}`}>
                          {btn.label || 'טקסט כפתור'}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('ctaButtons', { label: 'לחצי כאן', href: '#', variant: 'primary', size: 'default' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                    <Plus className="mr-2 size-4" /> הוספת כפתור
                  </Button>
                </SectionCard>

                {/* ── Features / Blocks ── */}
                <SectionCard icon={<Box size={20} />} title="קוביות תוכן">
                  {content.features.map((feat, i) => (
                    <div key={i} className="bg-stone-50 p-4 md:p-5 border border-stone-100 rounded-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <MoveButtons onUp={() => moveItem('features', i, 'up')} onDown={() => moveItem('features', i, 'down')} disableUp={i === 0} disableDown={i === content.features.length - 1} />
                        <Button type="button" variant="ghost" onClick={() => removeItem('features', i)} className="text-destructive p-2 h-auto"><Trash2 size={16} /></Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field label="אייקון">
                          <Select value={feat.icon} onValueChange={v => updateItem('features', i, 'icon', v)}>
                            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {ICON_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  <div className="flex items-center gap-2">{opt.icon} {opt.value}</div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <div className="md:col-span-2">
                          <Field label="כותרת">
                            <Input value={feat.title} onChange={e => updateItem('features', i, 'title', e.target.value)} className="bg-white" />
                          </Field>
                        </div>
                      </div>
                      <Field label="תיאור">
                        <Textarea value={feat.description} onChange={e => updateItem('features', i, 'description', e.target.value)} rows={2} className="bg-white resize-none" />
                      </Field>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('features', { title: '', description: '', icon: 'Heart' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                    <Plus className="mr-2 size-4" /> הוספת קובייה
                  </Button>
                </SectionCard>

                {/* ── Testimonials ── */}
                <SectionCard icon={<Quote size={20} />} title="עדויות ממליצים">
                  {content.testimonials.map((t, i) => (
                    <div key={i} className="bg-stone-50 p-4 border border-stone-100 rounded-sm space-y-3">
                      <div className="flex justify-between items-center">
                        <MoveButtons onUp={() => moveItem('testimonials', i, 'up')} onDown={() => moveItem('testimonials', i, 'down')} disableUp={i === 0} disableDown={i === content.testimonials.length - 1} />
                        <Button type="button" variant="ghost" onClick={() => removeItem('testimonials', i)} className="text-destructive p-2 h-auto"><Trash2 size={16} /></Button>
                      </div>
                      <Field label="טקסט העדות">
                        <Textarea value={t.text} onChange={e => updateItem('testimonials', i, 'text', e.target.value)} rows={3} className="bg-white resize-none" />
                      </Field>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="שם הממליץ">
                          <Input value={t.author} onChange={e => updateItem('testimonials', i, 'author', e.target.value)} className="bg-white" />
                        </Field>
                        <Field label="מיקום / תפקיד">
                          <Input value={t.location} onChange={e => updateItem('testimonials', i, 'location', e.target.value)} className="bg-white" />
                        </Field>
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('testimonials', { text: '', author: '', location: '' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                    <Plus className="mr-2 size-4" /> הוספת עדות
                  </Button>
                </SectionCard>

                {/* ── FAQs ── */}
                <SectionCard icon={<HelpCircle size={20} />} title="שאלות ותשובות">
                  {content.faqs.map((faq, i) => (
                    <div key={i} className="bg-stone-50 p-4 border border-stone-100 rounded-sm space-y-3">
                      <div className="flex justify-between items-center">
                        <MoveButtons onUp={() => moveItem('faqs', i, 'up')} onDown={() => moveItem('faqs', i, 'down')} disableUp={i === 0} disableDown={i === content.faqs.length - 1} />
                        <Button type="button" variant="ghost" onClick={() => removeItem('faqs', i)} className="text-destructive p-2 h-auto"><Trash2 size={16} /></Button>
                      </div>
                      <Field label="שאלה">
                        <Input value={faq.question} onChange={e => updateItem('faqs', i, 'question', e.target.value)} className="bg-white font-bold" />
                      </Field>
                      <Field label="תשובה">
                        <Textarea value={faq.answer} onChange={e => updateItem('faqs', i, 'answer', e.target.value)} rows={3} className="bg-white resize-none" />
                      </Field>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('faqs', { question: '', answer: '' })} className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5">
                    <Plus className="mr-2 size-4" /> הוספת שאלה
                  </Button>
                </SectionCard>
              </>
            )}

            {/* ── Save Button ── */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/40 z-[250] md:relative md:bg-transparent md:border-none md:p-0">
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
