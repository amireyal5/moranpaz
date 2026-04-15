"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
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
  Loader2, Save, Plus, Trash2, Box, Heart, Sparkles, Image as ImageIcon, Type, Layout,
  Orbit, Compass, Users, Star, Palette, MessageSquare, HelpCircle,
  MousePointerClick, Quote, AlignLeft, AlignCenter, AlignRight, UserRound, RefreshCcw,
  ChevronRight, Monitor, Smartphone, Globe, X, Search, BookOpen, FileText, ShieldCheck, Check
} from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-48 w-full bg-stone-50 flex items-center justify-center font-headline text-stone-400">טוען עורך...</div>
});
import 'react-quill-new/dist/quill.snow.css';
import {
  ContentState,
  PAGE_FALLBACKS,
  getInitialPageContent,
  DEFAULT_CONTENT_VALUES,
  TitleSettings
} from '@/config/page-defaults';
import { ADMIN_HELP_CONTENT } from '@/config/admin-help-content';


// Quill toolbar with RTL + image support
const QUILL_MODULES = {
  toolbar: [
    [{ direction: 'rtl' }, { align: [] }],
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};
const QUILL_FORMATS = [
  'direction', 'align', 'header', 'font', 'size',
  'bold', 'italic', 'underline',
  'color', 'background',
  'list',
  'link', 'image',
];

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_PAGES = [
  { id: 'home', name: '🏠 דף הבית' },
  { id: 'about', name: '👩‍⚕️ אודות' },
  { id: 'practice', name: '🌿 התהליך הטיפולי' },
  { id: 'online-therapy', name: '💻 טיפול אונליין' },
  { id: 'tivon', name: '🌳 קליניקה בטבעון' },
  { id: 'emeq-izrael', name: '🌾 קליניקה בעמק יזרעאל' },
  { id: 'women', name: '🌸 ליווי לנשים' },
  { id: 'youth', name: '🎈 טיפול בנוער' },
  { id: 'adults', name: '💼 טיפול במבוגרים' },
  { id: 'updates', name: '📢 עדכונים והודעות' },
  { id: 'blog', name: '📝 בלוג (ראשי)' },
  { id: 'contact', name: '📩 צור קשר' },
  { id: 'privacy', name: '📄 מדיניות פרטיות' },
  { id: 'terms', name: '⚖️ תנאי שימוש' },
  { id: 'accessibility', name: '♿ נגישות' },
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

const FONT_OPTIONS = [
  { label: 'כותרת (Headline)', value: 'font-headline' },
  { label: 'כתב יד (Handwriting)', value: 'font-handwriting' },
  { label: 'רגיל (Sans)', value: 'font-sans' },
];

const SIZE_OPTIONS = [
  { label: 'קטן (2xl)', value: 'text-2xl' },
  { label: 'בינוני (4xl)', value: 'text-4xl' },
  { label: 'גדול (6xl)', value: 'text-6xl' },
  { label: 'ענק (7xl)', value: 'text-7xl' },
  { label: 'מקסימלי (9xl)', value: 'text-9xl' },
];

const EMPTY_CONTENT: ContentState = getInitialPageContent('home');

// ─── Small reusable sub-components ────────────────────────────────────────────

function TitleEditor({ settings, onChange, label }: { settings?: TitleSettings, onChange: (s: TitleSettings) => void, label: string }) {
  const s = settings || { text: '', fontSize: 'text-4xl', fontFamily: 'font-headline', align: 'right', color: 'text-foreground' };
  
  return (
    <div className="bg-white p-6 border border-stone-100 rounded-none shadow-sm space-y-6 mb-8">
      <div className="flex items-center gap-3 border-b border-stone-50 pb-4">
        <div className="w-1.5 h-6 bg-primary" />
        <Label className="boutique-label text-primary text-lg">{label}</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Field label="טקסט הכותרת">
            <Input value={s.text} onChange={e => onChange({ ...s, text: e.target.value })} className="bg-stone-50 border-none h-12" />
          </Field>
        </div>
        <Field label="כותרת משנה (Optional)">
          <Input value={s.subtitle || ''} onChange={e => onChange({ ...s, subtitle: e.target.value })} className="bg-stone-50 border-none h-12" />
        </Field>
        <Field label="יישור">
          <AlignPicker value={s.align || 'right'} onChange={v => onChange({ ...s, align: v as any })} />
        </Field>
        <Field label="גופן">
          <Select value={s.fontFamily} onValueChange={v => onChange({ ...s, fontFamily: v })}>
            <SelectTrigger className="bg-stone-50 border-none h-12"><SelectValue /></SelectTrigger>
            <SelectContent>{FONT_OPTIONS.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="גודל">
          <Select value={s.fontSize} onValueChange={v => onChange({ ...s, fontSize: v })}>
            <SelectTrigger className="bg-stone-50 border-none h-12"><SelectValue /></SelectTrigger>
            <SelectContent>{SIZE_OPTIONS.map(z => <SelectItem key={z.value} value={z.value}>{z.label}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <div className="md:col-span-2">
          <Field label="צבע (Class/Hex)">
            <Input value={s.color || ''} onChange={e => onChange({ ...s, color: e.target.value })} placeholder="text-primary או #000000" className="bg-stone-50 border-none h-12" />
          </Field>
        </div>
      </div>
      <div className="pt-4 border-t border-stone-50 mt-4">
        <p className="text-[10px] text-stone-400 mb-2">תצוגה מקדימה של הכותרת</p>
        <div className={`p-4 rounded border border-dashed border-stone-200 ${s.align === 'center' ? 'text-center' : s.align === 'left' ? 'text-left' : 'text-right'}`}>
          {s.subtitle && <span className="boutique-label block text-primary text-xs mb-2">{s.subtitle}</span>}
          <h2 className={`${s.fontFamily} ${s.fontSize} ${s.color?.startsWith('#') ? '' : s.color}`}>{s.text || 'כותרת לדוגמה'}</h2>
          <div className={`w-12 h-[2px] bg-primary/20 mt-4 ${s.align === 'center' ? 'mx-auto' : s.align === 'left' ? 'mr-auto ml-0' : 'ml-auto mr-0'}`} />
        </div>
      </div>
    </div>
  );
}

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

function MoveButtons({ onUp, onDown, disableUp, disableDown }: { onUp: () => void, onDown: () => void, disableUp: boolean, disableDown: boolean }) {
  return (
    <div className="flex gap-1 bg-stone-100/50 p-1 rounded-sm">
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); onUp(); }} 
        disabled={disableUp} 
        className={`h-8 w-10 flex items-center justify-center transition-all ${disableUp ? 'opacity-20 cursor-not-allowed' : 'text-stone-500 hover:text-primary hover:bg-white shadow-sm'}`}
      >
        <ChevronRight className="-rotate-90 size-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); onDown(); }} 
        disabled={disableDown} 
        className={`h-8 w-10 flex items-center justify-center transition-all ${disableDown ? 'opacity-20 cursor-not-allowed' : 'text-stone-500 hover:text-primary hover:bg-white shadow-sm'}`}
      >
        <ChevronRight className="rotate-90 size-4" />
      </button>
    </div>
  );
}

function AlignPicker({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const options = [
    { value: 'right', icon: <AlignRight size={16} /> },
    { value: 'center', icon: <AlignCenter size={16} /> },
    { value: 'left', icon: <AlignLeft size={16} /> }
  ];
  return (
    <div className="flex gap-1 bg-stone-50 p-1 w-fit">
      {options.map(opt => (
        <Button
          key={opt.value}
          type="button"
          variant={value === opt.value ? 'default' : 'ghost'}
          onClick={() => onChange(opt.value)}
          className={`h-9 w-12 p-0 ${value === opt.value ? 'bg-primary text-white' : 'text-stone-400'}`}
        >
          {opt.icon}
        </Button>
      ))}
    </div>
  );
}

function DynamicSectionEditor({ section, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }: { 
  section: any, 
  onChange: (s: any) => void, 
  onRemove: () => void,
  onMoveUp: () => void,
  onMoveDown: () => void,
  isFirst: boolean,
  isLast: boolean
}) {
  return (
    <div className="bg-white p-6 border border-stone-100 rounded-none shadow-sm space-y-6 mb-8 relative group">
      <div className="flex justify-between items-center border-b border-stone-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent" />
          <Label className="boutique-label text-accent text-lg">
            {section.type === 'text' ? 'בלוק טקסט' : section.type === 'image-text' ? 'תמונה וטקסט' : 'כותרת בלבד'}
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <MoveButtons onUp={onMoveUp} onDown={onMoveDown} disableUp={isFirst} disableDown={isLast} />
          <button 
            type="button" 
            onClick={onRemove} 
            className="text-red-400 hover:text-red-600 transition-colors h-8 w-8 flex items-center justify-center"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="סוג הבלוק">
          <Select value={section.type} onValueChange={v => onChange({ ...section, type: v })}>
            <SelectTrigger className="bg-stone-50 border-none h-12"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="text">טקסט בלבד</SelectItem>
              <SelectItem value="image-text">תמונה וטקסט</SelectItem>
              <SelectItem value="title-only">כותרת בלבד</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="צבע רקע">
          <Select value={section.bg || 'white'} onValueChange={v => onChange({ ...section, bg: v })}>
            <SelectTrigger className="bg-stone-50 border-none h-12"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SECTION_BG_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <div className="md:col-span-2">
          <Field label="כותרת הבלוק (אופציונלי)">
            <Input value={section.title || ''} onChange={e => onChange({ ...section, title: e.target.value })} className="bg-stone-50 border-none h-12" />
          </Field>
        </div>

        {section.type === 'image-text' && (
          <>
            <Field label="קישור לתמונה">
              <Input value={section.imageUrl || ''} onChange={e => onChange({ ...section, imageUrl: e.target.value })} placeholder="https://..." className="bg-stone-50 border-none h-12 font-sans" dir="ltr" />
            </Field>
            <Field label="מיקום תמונה">
              <Select value={section.imagePosition || 'right'} onValueChange={v => onChange({ ...section, imagePosition: v })}>
                <SelectTrigger className="bg-stone-50 border-none h-12"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="right">ימין</SelectItem>
                  <SelectItem value="left">שמאל</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </>
        )}

        {section.type !== 'title-only' && (
          <div className="md:col-span-2">
            <Field label="תוכן">
              <div className="min-h-[200px]" dir="rtl">
                <ReactQuill
                  theme="snow"
                  value={section.content || ''}
                  onChange={val => onChange({ ...section, content: val })}
                  modules={QUILL_MODULES}
                  formats={QUILL_FORMATS}
                />
              </div>
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}

function CharCounter({ value, limit }: { value: string; limit: number }) {
  const len = value.length;
  const color = len > limit ? 'text-red-500' : len > Math.floor(limit * 0.85) ? 'text-amber-500' : 'text-stone-400';
  return <span className={`text-[10px] font-headline tabular-nums ${color}`}>{len}/{limit}</span>;
}

function GoogleSearchPreview({ title, url, description }: { title: string; url: string; description: string }) {
  if (!title && !description) return null;
  return (
    <div className="p-4 border border-stone-100 bg-stone-50 shadow-sm" dir="ltr">
      <p className="text-[10px] boutique-label text-stone-400 mb-3 text-right">תצוגה מקדימה — כך יופיע בגוגל</p>
      <div className="space-y-0.5 font-sans">
        <p className={`text-[15px] font-normal leading-snug truncate ${title.length > 60 ? 'text-red-500' : 'text-[#1a0dab]'}`}>{title || 'כותרת הדף'}</p>
        <p className="text-[13px] text-[#006621] truncate">{url}</p>
        <p className="text-[13px] text-[#545454] leading-snug line-clamp-2">{description || 'תיאור הדף יופיע כאן...'}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

// ─── Help Guide Component ──────────────────────────────────────────────────
function AdminGuide() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const ICON_MAP: Record<string, React.ReactNode> = {
    Lock: <ShieldCheck size={18} />,
    Layout: <Layout size={18} />,
    Type: <Type size={18} />,
    Image: <ImageIcon size={18} />,
    Box: <Box size={18} />,
    FileText: <FileText size={18} />,
    Sparkles: <Sparkles size={18} />,
    MousePointerClick: <MousePointerClick size={18} />,
    Globe: <Globe size={18} />,
    Palette: <Palette size={18} />,
    HelpCircle: <HelpCircle size={18} />,
    BookOpen: <BookOpen size={18} />,
  };

  const filtered = ADMIN_HELP_CONTENT.filter(topic =>
    search === '' ||
    topic.title.includes(search) ||
    topic.content.some(c => c.sub.includes(search) || c.text.includes(search))
  );

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-8 left-8 z-[500] w-14 h-14 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
    >
      <HelpCircle size={28} />
      <span className="absolute right-full mr-4 bg-accent text-white px-3 py-1.5 rounded-sm text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-headline">מדריך עורך</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[500] flex justify-end" dir="rtl">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-accent text-white flex-shrink-0">
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1 transition-colors">
            <X size={22} />
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-handwriting">מדריך העורך</h2>
            <p className="text-xs text-white/70 font-headline mt-0.5">כל מה שצריך לדעת על העורך</p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-stone-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 size-4" />
            <input
              type="text"
              placeholder="חפשי נושא (למשל: Slug, Hero, CTA...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 h-10 bg-stone-50 border border-stone-100 text-sm font-headline focus:outline-none focus:border-primary/40 text-right"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-stone-300">
              <HelpCircle size={40} className="mb-3" />
              <p className="font-headline text-sm">לא נמצאו תוצאות</p>
            </div>
          ) : (
            filtered.map((topic) => (
              <details key={topic.id} className="border-b border-stone-50 group">
                <summary className="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer hover:bg-stone-50 transition-colors list-none">
                  <ChevronRight className="text-stone-300 group-open:rotate-90 transition-transform flex-shrink-0 size-4" />
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <span className="font-headline font-bold text-stone-700 text-sm">{topic.title}</span>
                    <span className="text-primary flex-shrink-0">{ICON_MAP[topic.icon] ?? <HelpCircle size={18} />}</span>
                  </div>
                </summary>
                <div className="px-6 pb-4 space-y-4">
                  {topic.content.map((item, idx) => (
                    <div key={idx} className="border-r-2 border-primary/20 pr-4">
                      <p className="text-xs font-bold text-accent mb-1.5 font-headline">{item.sub}</p>
                      <p className="text-xs text-stone-500 leading-relaxed font-headline">{item.text}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex-shrink-0">
          <a href="/admin/help" className="flex items-center justify-center gap-2 text-xs text-stone-400 hover:text-primary font-headline transition-colors">
            <BookOpen size={14} />
            פתיחת מרכז הידע המלא
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminPages() {
  const router = useRouter();
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [customPageId, setCustomPageId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [content, setContent] = useState<ContentState>(EMPTY_CONTENT);
  const [isDirty, setIsDirty] = useState(false);
  const [allPages, setAllPages] = useState<{id: string, name: string}[]>(DEFAULT_PAGES);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const loadAllPages = async () => {
    if (!db) return;
    try {
      const snap = await getDocs(collection(db, 'siteContent'));
      const pages = snap.docs
        .map(d => ({ id: d.id, name: d.id === 'global' ? '⚙️ הגדרות כלליות' : d.data().siteName || d.id }))
        .filter(p => p.id !== 'global'); // We handle global separately
      
      // Merge with DEFAULT_PAGES to ensure standard ones are there
      const combined = [...DEFAULT_PAGES];
      pages.forEach(p => {
        if (!combined.find(cp => cp.id === p.id)) {
          combined.push({ id: p.id, name: `📄 ${p.name}` });
        }
      });
      setAllPages(combined);
    } catch (e) {
      console.error("Error loading pages:", e);
    }
  };

  useEffect(() => {
    loadAllPages();
  }, [db]);

  const set = (patch: Partial<ContentState>) => {
    setContent(prev => {
      // Basic check: is anything actually changing?
      const isChanged = Object.entries(patch).some(([k, v]) => prev[k as keyof ContentState] !== v);
      if (!isChanged) return prev;
      
      if (!isFetching && mounted) {
        setIsDirty(true);
      }
      return { ...prev, ...patch };
    });
  };

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  const handlePageSelect = (newPage: string) => {
    if (isDirty) {
      const confirm = window.confirm('יש לך שינויים שלא נשמרו. האם את בטוחה שברצונך לעבור דף? השינויים יאבדו.');
      if (!confirm) return;
    }
    setSelectedPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedPage !== 'custom' && db) fetchPageContent(selectedPage);
  }, [selectedPage, db]);

  // Auto-save: debounce 3s after last change
  useEffect(() => {
    if (!isDirty || isSaving || selectedPage === 'custom' || !mounted || !db) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      const targetId = selectedPage;
      setAutoSaveStatus('saving');
      try {
        await setDoc(doc(db, 'siteContent', targetId), { ...content, pageId: targetId, updatedAt: Date.now() });
        setIsDirty(false);
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2500);
      } catch {
        setAutoSaveStatus('error');
        setTimeout(() => setAutoSaveStatus('idle'), 4000);
      }
    }, 3000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [isDirty, content, selectedPage, isSaving, mounted, db]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const fetchPageContent = async (id: string) => {
    if (!db) return;
    setIsFetching(true);
    try {
      const snap = await getDoc(doc(db, 'siteContent', id));
      const fb = PAGE_FALLBACKS[id] || {};
      const d = snap.exists() ? snap.data() : null;
      if (d !== null) {
        setContent({
          heroTitle:            d.heroTitle            ?? '',
          heroSubtitle:         d.heroSubtitle         ?? '',
          heroTitleSettings:    d.heroTitleSettings    ?? { ...DEFAULT_CONTENT_VALUES.heroTitleSettings, text: d.heroTitle || '' },
          heroSubtitleSettings: d.heroSubtitleSettings ?? { ...DEFAULT_CONTENT_VALUES.heroSubtitleSettings, text: d.heroSubtitle || '' },
          heroImageUrlDesktop:  d.heroImageUrlDesktop  ?? '',
          heroImageUrlMobile:   d.heroImageUrlMobile   ?? '',
          portraitImageUrl:     d.portraitImageUrl     ?? '',
          portraitShape:        d.portraitShape        ?? 'circle',
          portraitPosition:     d.portraitPosition     ?? 'left',
          clinicImageUrl:       d.clinicImageUrl       ?? '',
          heroHeight:           d.heroHeight           ?? '70vh',
          heroTextAlign:        d.heroTextAlign        ?? 'center',
          heroBgColor:          d.heroBgColor          ?? '',
          introTitle:           d.introTitle           ?? '',
          introContent:         d.introContent         ?? '',
          sectionBg:            d.sectionBg            ?? 'white',
          primaryColor:         d.primaryColor         ?? '35 40% 45%',
          metaTitle:            d.metaTitle            ?? '',
          metaDescription:      d.metaDescription      ?? '',
          siteName:             d.siteName             ?? '',
          siteSubtitle:         d.siteSubtitle         ?? '',
          siteEmail:            d.siteEmail            ?? '',
          sitePhone:            d.sitePhone            ?? '',
          siteDescription:      d.siteDescription      ?? '',
          facebookLink:         d.facebookLink         ?? '',
          instagramLink:        d.instagramLink        ?? '',
          ctaAlign:             d.ctaAlign             ?? 'center',
          navItems:             Array.isArray(d.navItems)     ? d.navItems     : [],
          footerItems:          Array.isArray(d.footerItems)  ? d.footerItems  : [],
          ctaButtons:           Array.isArray(d.ctaButtons)   ? d.ctaButtons   : [],
          features:             Array.isArray(d.features)     ? d.features     : [],
          testimonials:         Array.isArray(d.testimonials) ? d.testimonials : [],
          faqs:                 Array.isArray(d.faqs)         ? d.faqs         : [],
          dynamicSections:      Array.isArray(d.dynamicSections) ? d.dynamicSections : [],
          featuresTitle:        d.featuresTitle               ?? DEFAULT_CONTENT_VALUES.featuresTitle,
          testimonialsTitle:    d.testimonialsTitle           ?? DEFAULT_CONTENT_VALUES.testimonialsTitle,
          faqsTitle:           d.faqsTitle                   ?? DEFAULT_CONTENT_VALUES.faqsTitle,
          introTitleSettings:   d.introTitleSettings          ?? DEFAULT_CONTENT_VALUES.introTitleSettings,
          contactTitleSettings: d.contactTitleSettings        ?? DEFAULT_CONTENT_VALUES.contactTitleSettings,
          sectionOrder:         d.sectionOrder                ?? [...(DEFAULT_CONTENT_VALUES.sectionOrder as string[])],
        });
      } else {
        setContent({
          heroTitle:            fb.heroTitle            ?? '',
          heroSubtitle:         fb.heroSubtitle         ?? '',
          heroTitleSettings:    fb.heroTitleSettings    ?? { ...DEFAULT_CONTENT_VALUES.heroTitleSettings, text: fb.heroTitle || '' },
          heroSubtitleSettings: fb.heroSubtitleSettings ?? { ...DEFAULT_CONTENT_VALUES.heroSubtitleSettings, text: fb.heroSubtitle || '' },
          heroImageUrlDesktop:  '',
          heroImageUrlMobile:   '',
          portraitImageUrl:     '',
          portraitShape:        'circle',
          portraitPosition:     'left',
          clinicImageUrl:       '',
          heroHeight:           fb.heroHeight           ?? '70vh',
          heroTextAlign:        fb.heroTextAlign        ?? 'center',
          heroBgColor:          '',
          introTitle:           fb.introTitle           ?? '',
          introContent:         fb.introContent         ?? '',
          sectionBg:            'white',
          primaryColor:         fb.primaryColor         ?? '35 40% 45%',
          metaTitle:            '',
          metaDescription:      '',
          siteName:             '',
          siteSubtitle:         '',
          siteEmail:            '',
          sitePhone:            '',
          siteDescription:      '',
          facebookLink:         '',
          instagramLink:        '',
          ctaAlign:             'center',
          navItems:             Array.isArray(fb.navItems)     ? fb.navItems     : [],
          footerItems:          Array.isArray(fb.footerItems)  ? fb.footerItems  : [],
          ctaButtons:           Array.isArray(fb.ctaButtons)   ? fb.ctaButtons   : [],
          features:             Array.isArray(fb.features)     ? fb.features     : [],
          testimonials:         Array.isArray(fb.testimonials) ? fb.testimonials : [],
          faqs:                 Array.isArray(fb.faqs)         ? fb.faqs         : [],
          dynamicSections:      [],
          featuresTitle:        fb.featuresTitle               ?? DEFAULT_CONTENT_VALUES.featuresTitle,
          testimonialsTitle:    fb.testimonialsTitle           ?? DEFAULT_CONTENT_VALUES.testimonialsTitle,
          faqsTitle:           fb.faqsTitle                   ?? DEFAULT_CONTENT_VALUES.faqsTitle,
          introTitleSettings:   fb.introTitleSettings          ?? DEFAULT_CONTENT_VALUES.introTitleSettings,
          contactTitleSettings: fb.contactTitleSettings        ?? DEFAULT_CONTENT_VALUES.contactTitleSettings,
          sectionOrder:         fb.sectionOrder                || [...(DEFAULT_CONTENT_VALUES.sectionOrder as string[])],
        });
      }
      setTimeout(() => {
        setIsDirty(false);
        setIsFetching(false);
      }, 500);
    } catch (e) {
      toast({ variant: 'destructive', title: 'שגיאה בטעינת הדף', description: String(e) });
      setIsFetching(false);
    } 
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || isSaving) return;
    const rawId = selectedPage === 'custom' ? customPageId : selectedPage;
    let targetId = rawId.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    
    if (!targetId) {
      toast({ variant: 'destructive', title: 'אנא הזיני מזהה עמוד (Slug)' });
      return;
    }

    setIsSaving(true);
    try {
      // If the slug changed for an existing page, we need to create a new doc and delete the old one
      if (selectedPage !== 'custom' && selectedPage !== 'global' && selectedPage !== targetId) {
        if (window.confirm(`האם את בטוחה שברצונך לשנות את הכתובת מ-${selectedPage} ל-${targetId}? קישורים קיימים עלולים להישבר.`)) {
          await setDoc(doc(db, 'siteContent', targetId), { ...content, pageId: targetId, updatedAt: Date.now() });
          await deleteDoc(doc(db, 'siteContent', selectedPage));
          setSelectedPage(targetId);
        } else {
          setIsSaving(false);
          return;
        }
      } else {
        await setDoc(doc(db, 'siteContent', targetId), { ...content, pageId: targetId, updatedAt: Date.now() });
      }
      
      setIsDirty(false);
      await loadAllPages(); // Refresh the list
      toast({ title: '✅ נשמר בהצלחה!', description: `הדף "${targetId}" עודכן.` });
      if (selectedPage === 'custom') setSelectedPage(targetId);
    } catch (err: any) {
      const msg = err?.code === 'permission-denied'
        ? 'אין הרשאות כתיבה. ודאי שאת מחוברת ושה-Firebase Rules מאפשרים כתיבה.'
        : String(err?.message || err);
      toast({ variant: 'destructive', title: '❌ שמירה נכשלה', description: msg });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePage = async () => {
    if (!db || !selectedPage || selectedPage === 'global') return;
    if (!window.confirm(`האם את בטוחה שברצונך למחוק את הדף "${selectedPage}"? פעולה זו אינה ניתנת לביטול.`)) return;
    
    setIsSaving(true);
    try {
      await deleteDoc(doc(db, 'siteContent', selectedPage));
      toast({ title: '✅ נמחק בהצלחה', description: `הדף ${selectedPage} הוסר מהמערכת.` });
      await loadAllPages();
      setSelectedPage('home');
    } catch (err) {
      toast({ variant: 'destructive', title: 'מחיקה נכשלה', description: String(err) });
    } finally {
      setIsSaving(false);
    }
  };

  const addItem   = <K extends 'ctaButtons' | 'features' | 'testimonials' | 'faqs' | 'navItems' | 'footerItems'>(key: K, item: ContentState[K][number]) => {
    setContent(prev => ({ ...prev, [key]: [...(prev[key] as any[]), item] }));
    setIsDirty(true);
  };
  const removeItem = (key: keyof ContentState, i: number) => {
    setContent(prev => { const a = [...(prev[key] as any[])]; a.splice(i, 1); return { ...prev, [key]: a }; });
    setIsDirty(true);
  };
  const updateItem = (key: keyof ContentState, i: number, field: string, val: string) => {
    setContent(prev => { const a = [...(prev[key] as any[])]; a[i] = { ...a[i], [field]: val }; return { ...prev, [key]: a }; });
    setIsDirty(true);
  };
  const moveItem   = (key: keyof ContentState, i: number, dir: 'up' | 'down') => {
    setContent(prev => {
      const a = [...(prev[key] as any[])];
      const j = dir === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= a.length) return prev;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...prev, [key]: a };
    });
    setIsDirty(true);
  };

  if (!mounted || authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="animate-spin text-primary size-12" /></div>;
  }

  return (
    <main className="min-h-screen bg-stone-50 text-right pb-44">
      <Navbar />
      <section className="pt-28 md:pt-48 px-4 md:px-6 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="w-full">
            <button 
              type="button"
              onClick={() => router.push('/admin/dashboard')} 
              className="mb-4 text-stone-400 p-0 hover:text-primary h-auto flex items-center transition-colors"
            >
              <ChevronRight className="ml-2 size-4" /> חזרה ללוח הבקרה
            </button>
            <h1 className="text-4xl md:text-6xl font-handwriting text-accent">ניהול תוכן ועיצוב</h1>
          </div>

          <div className="w-full md:w-96 flex flex-col gap-4 md:sticky md:top-[88px] md:z-[40]">
            <div className="flex gap-2">
              <div className="flex-1">
                <Field label="בחר דף לעריכה">
                  <Select value={selectedPage} onValueChange={handlePageSelect}>
                    <SelectTrigger className="bg-white border-none h-12 rounded-none shadow-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global" className="font-bold text-primary">⚙️ הגדרות אתר כלליות</SelectItem>
                      {allPages.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                      <SelectItem value="custom" className="italic text-stone-400">✚ עמוד חדש</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <button 
                type="button" 
                onClick={loadAllPages} 
                className="mt-7 text-stone-400 hover:text-primary transition-colors p-2"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
            {(selectedPage === 'custom' || (selectedPage !== 'global' && selectedPage !== 'custom')) && (
              <Field label="מזהה עמוד (Slug)">
                <Input 
                  value={selectedPage === 'custom' ? customPageId : customPageId || selectedPage} 
                  onChange={e => setCustomPageId(e.target.value)} 
                  placeholder="my-new-page" 
                  className="bg-white h-12" 
                />
              </Field>
            )}
            {selectedPage !== 'global' && selectedPage !== 'custom' && (
              <button 
                type="button" 
                onClick={handleDeletePage} 
                className="text-red-500 hover:text-red-700 self-end text-xs transition-colors hover:underline mt-1"
              >
                מחיקת דף זה לצמיתות
              </button>
            )}
          </div>
        </div>

        {isFetching ? (
          <div className="h-96 flex flex-col items-center justify-center text-stone-400 gap-4">
            <Loader2 className="animate-spin size-12" />
            <p className="boutique-label">טוען נתונים מ-Firestore...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-12">
            
            {selectedPage === 'global' ? (
              <SectionCard icon={<Globe size={20} />} title="הגדרות כלליות">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="שם האתר">
                    <Input value={content.siteName} onChange={e => set({ siteName: e.target.value })} />
                  </Field>
                  <Field label="סלוגן ראשי">
                    <Input value={content.siteSubtitle} onChange={e => set({ siteSubtitle: e.target.value })} />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="תיאור אתר (לפוטר / SEO)">
                      <Textarea value={content.siteDescription || ''} onChange={e => set({ siteDescription: e.target.value })} rows={3} />
                    </Field>
                  </div>
                  <Field label="אימייל ליצירת קשר">
                    <Input value={content.siteEmail || ''} onChange={e => set({ siteEmail: e.target.value })} dir="ltr" />
                  </Field>
                  <Field label="טלפון ליצירת קשר">
                    <Input value={content.sitePhone || ''} onChange={e => set({ sitePhone: e.target.value })} dir="ltr" />
                  </Field>
                  <Field label="כתובת / מיקום">
                    <Input value={content.siteAddress || ''} onChange={e => set({ siteAddress: e.target.value })} />
                  </Field>
                  <Field label="לינק פייסבוק">
                    <Input value={content.facebookLink || ''} onChange={e => set({ facebookLink: e.target.value })} dir="ltr" />
                  </Field>
                  <Field label="לינק אינסטגרם">
                    <Input value={content.instagramLink || ''} onChange={e => set({ instagramLink: e.target.value })} dir="ltr" />
                  </Field>
                </div>
                {/* Global Nav Editor */}
                <div className="pt-8 space-y-4">
                  <Label className="boutique-label flex items-center gap-2">תפריט עליון (Navbar)</Label>
                  {content.navItems.map((item, i) => (
                    <div key={i} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-1">
                        <Label className="text-[10px]">תווית</Label>
                        <Input value={item.label} onChange={e => updateItem('navItems', i, 'label', e.target.value)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-[10px]">קישור (Slug/URL)</Label>
                        <Input value={item.href} onChange={e => updateItem('navItems', i, 'href', e.target.value)} />
                      </div>
                      <MoveButtons onUp={() => moveItem('navItems', i, 'up')} onDown={() => moveItem('navItems', i, 'down')} disableUp={i === 0} disableDown={i === content.navItems.length - 1} />
                      <Button type="button" variant="ghost" onClick={() => removeItem('navItems', i)} className="text-destructive"><Trash2 size={16} /></Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('navItems', { label: '', href: '' })} variant="outline" className="w-full h-12 border-dashed">
                    <Plus className="mr-2 size-4" /> הוספת קישור לתפריט
                  </Button>
                </div>

                {/* Global Footer Editor */}
                <div className="pt-8 border-t border-stone-100 mt-8 space-y-4">
                  <Label className="boutique-label flex items-center gap-2 text-primary">קישורים בפוטר (Footer Links)</Label>
                  <p className="text-xs text-stone-400">אם רשימה זו ריקה, הפוטר ישתמש אוטומטית בקישורי התפריט העליון.</p>
                  {(content.footerItems || []).map((item, i) => (
                    <div key={i} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-1">
                        <Label className="text-[10px]">תווית</Label>
                        <Input value={item.label} onChange={e => updateItem('footerItems', i, 'label', e.target.value)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-[10px]">קישור (Slug/URL)</Label>
                        <Input value={item.href} onChange={e => updateItem('footerItems', i, 'href', e.target.value)} />
                      </div>
                      <MoveButtons onUp={() => moveItem('footerItems', i, 'up')} onDown={() => moveItem('footerItems', i, 'down')} disableUp={i === 0} disableDown={i === (content.footerItems?.length || 0) - 1} />
                      <Button type="button" variant="ghost" onClick={() => removeItem('footerItems', i)} className="text-destructive"><Trash2 size={16} /></Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem('footerItems', { label: '', href: '' })} variant="outline" className="w-full h-12 border-dashed">
                    <Plus className="mr-2 size-4" /> הוספת קישור לפוטר
                  </Button>
                </div>
              </SectionCard>
            ) : (
              <>
                {/* ── Visual Design ── */}
                <SectionCard icon={<Palette size={20} />} title="עיצוב ותצוגה">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="צבע ראשי (Primary Accent)">
                      <Select value={content.primaryColor} onValueChange={v => set({ primaryColor: v })}>
                        <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                        <SelectContent>{PRESET_COLORS.map(c => <SelectItem key={c.value} value={c.value}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </Field>
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

                {/* ── Hero ── */}
                <SectionCard icon={<Smartphone size={20} />} title="חלק עליון (Hero)">
                  <TitleEditor 
                    label="כותרת Hero הראשית" 
                    settings={content.heroTitleSettings} 
                    onChange={s => set({ heroTitleSettings: s, heroTitle: s.text })} 
                  />
                  <TitleEditor 
                    label="כותרת משנה ב-Hero" 
                    settings={content.heroSubtitleSettings} 
                    onChange={s => set({ heroSubtitleSettings: s, heroSubtitle: s.text })} 
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="תמונת רקע - דסקטופ (URL)">
                      <Input value={content.heroImageUrlDesktop} onChange={e => set({ heroImageUrlDesktop: e.target.value })} className="font-sans" dir="ltr" placeholder="https://..." />
                    </Field>
                    <Field label="תמונת רקע - מובייל (URL)">
                      <Input value={content.heroImageUrlMobile} onChange={e => set({ heroImageUrlMobile: e.target.value })} className="font-sans" dir="ltr" placeholder="https://..." />
                    </Field>
                  </div>
                </SectionCard>

                {/* ── Portrait ── */}
                <SectionCard icon={<UserRound size={20} />} title="תמונת פורטרט">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="קישור לתמונה (URL)">
                      <Input value={content.portraitImageUrl} onChange={e => set({ portraitImageUrl: e.target.value })} className="font-sans" dir="ltr" placeholder="https://..." />
                    </Field>
                    <Field label="צורת התמונה">
                      <Select value={content.portraitShape} onValueChange={v => set({ portraitShape: v })}>
                        <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="circle">עיגול</SelectItem>
                          <SelectItem value="rectangle">מלבן (3:4)</SelectItem>
                          <SelectItem value="square">ריבוע</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="מיקום">
                      <Select value={content.portraitPosition} onValueChange={v => set({ portraitPosition: v })}>
                        <SelectTrigger className="bg-stone-50"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">שמאל</SelectItem>
                          <SelectItem value="right">ימין</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="תמונת קליניקה / משנית (URL)">
                    <Input value={content.clinicImageUrl} onChange={e => set({ clinicImageUrl: e.target.value })} className="font-sans" dir="ltr" placeholder="https://..." />
                  </Field>
                  {content.portraitImageUrl && (
                    <div className="border-t border-stone-100 pt-5 flex items-center gap-4">
                      <p className="boutique-label text-stone-400 text-[11px]">תצוגה מקדימה</p>
                      <div className={`relative overflow-hidden border-2 border-stone-200 ${content.portraitShape === 'circle' ? 'rounded-full w-16 h-16' : content.portraitShape === 'square' ? 'w-16 h-16' : 'w-12 h-16'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={content.portraitImageUrl} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </SectionCard>

                {/* ── Content ── */}
                <SectionCard icon={<Monitor size={20} />} title="תוכן העמוד">
                  <TitleEditor 
                    label="כותרת קטע תוכן ראשי" 
                    settings={content.introTitleSettings} 
                    onChange={s => set({ introTitleSettings: s })} 
                  />
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
                  {content.introContent && (
                    <div className="border-t border-stone-100 pt-5">
                      <p className="boutique-label text-stone-400 mb-3">תצוגה מקדימה</p>
                      <div
                        className={`p-6 md:p-8 rounded-sm font-headline text-stone-700 leading-relaxed prose-preview text-right ${
                          content.sectionBg === 'stone-50' ? 'bg-stone-50' :
                          content.sectionBg === 'stone-100' ? 'bg-stone-100' :
                          content.sectionBg === 'primary' ? 'bg-primary/10' : 'bg-white border border-stone-100'
                        }`}
                        dangerouslySetInnerHTML={{ __html: content.introContent.replace(/&nbsp;|\u00A0/g, ' ') }}
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
                      <div className="mt-4 flex flex-col items-center">
                        <p className="text-[10px] text-stone-400 mb-2">תצוגה מקדימה</p>
                        <div className={`border h-fit w-fit transition-all duration-700 font-bold tracking-[0.15em] rounded-sm whitespace-nowrap ${
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
                  <TitleEditor 
                    label="כותרת קטע קוביות תוכן" 
                    settings={content.featuresTitle} 
                    onChange={s => set({ featuresTitle: s })} 
                  />
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
                  <TitleEditor 
                    label="כותרת קטע עדויות" 
                    settings={content.testimonialsTitle} 
                    onChange={s => set({ testimonialsTitle: s })} 
                  />
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
                  <TitleEditor 
                    label="כותרת קטע שאלות נפוצות" 
                    settings={content.faqsTitle} 
                    onChange={s => set({ faqsTitle: s })} 
                  />
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

                {/* ── Page Layout ── */}
                <SectionCard icon={<Layout size={20} />} title="סדר חלקי העמוד (Layout)">
                  <div className="space-y-3">
                    <p className="text-sm text-stone-500 mb-4 font-bold">השתמשי בחיצים כדי לשנות את סדר הופעת הקטעים בעמוד:</p>
                    {content.sectionOrder.map((secId, i) => {
                      const labels: any = {
                        hero: 'הדר (Hero)',
                        intro: 'תוכן ראשי (About)',
                        dynamic: 'בלוקים חופשיים (Dynamic)',
                        features: 'מרחבי הטיפול (Features)',
                        testimonials: 'המלצות (Testimonials)',
                        faqs: 'שאלות נפוצות (FAQ)',
                        cta: 'כפתורי פעולה (CTA)',
                        contact: 'יצירת קשר (Contact)'
                      };
                      return (
                        <div key={secId} className="flex items-center justify-between bg-white p-4 border border-stone-100 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-accent/20" />
                            <span className="font-bold text-accent">{labels[secId] || secId}</span>
                          </div>
                          <MoveButtons 
                            onUp={() => {
                              const next = [...content.sectionOrder];
                              if (i > 0) {
                                [next[i], next[i-1]] = [next[i-1], next[i]];
                                set({ sectionOrder: next });
                              }
                            }} 
                            onDown={() => {
                              const next = [...content.sectionOrder];
                              if (i < next.length - 1) {
                                [next[i], next[i+1]] = [next[i+1], next[i]];
                                set({ sectionOrder: next });
                              }
                            }} 
                            disableUp={i === 0} 
                            disableDown={i === content.sectionOrder.length - 1} 
                          />
                        </div>
                      );
                    })}
                  </div>
                </SectionCard>

                {/* ── Dynamic Sections ── */}
                <SectionCard icon={<Box size={20} />} title="בלוקים חופשיים (Custom Blocks)">
                  <p className="text-sm text-stone-500 mb-6">בלוקים אלו יופיעו תחת הקטגוריה "בלוקים חופשיים" בסדר שקבעתם למעלה.</p>
                  {(content.dynamicSections || []).map((sec, i) => (
                    <DynamicSectionEditor 
                      key={sec.id || i}
                      section={sec}
                      onChange={s => {
                        const next = [...(content.dynamicSections || [])];
                        next[i] = s;
                        set({ dynamicSections: next });
                      }}
                      onRemove={() => {
                        const next = [...(content.dynamicSections || [])];
                        next.splice(i, 1);
                        set({ dynamicSections: next });
                      }}
                      onMoveUp={() => {
                        const next = [...(content.dynamicSections || [])];
                        if (i > 0) {
                          [next[i], next[i-1]] = [next[i-1], next[i]];
                          set({ dynamicSections: next });
                        }
                      }}
                      onMoveDown={() => {
                        const next = [...(content.dynamicSections || [])];
                        if (i < next.length - 1) {
                          [next[i], next[i+1]] = [next[i+1], next[i]];
                          set({ dynamicSections: next });
                        }
                      }}
                      isFirst={i === 0}
                      isLast={i === (content.dynamicSections?.length || 0) - 1}
                    />
                  ))}
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => {
                        const id = Math.random().toString(36).substr(2, 9);
                        const next = [...(content.dynamicSections || []), { id, type: 'text', content: '', title: '', bg: 'white' }];
                        set({ dynamicSections: next as any });
                      }} 
                      className="flex-1 h-14 border-2 border-primary/20 border-dashed rounded-sm text-primary hover:bg-primary/5 transition-all flex items-center justify-center font-bold tracking-wider"
                    >
                      <Type className="ml-2 size-5" /> הוספת בלוק טקסט חופשי
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        const id = Math.random().toString(36).substr(2, 9);
                        const next = [...(content.dynamicSections || []), { id, type: 'image-text', content: '', title: '', imageUrl: '', imagePosition: 'right', bg: 'white' }];
                        set({ dynamicSections: next as any });
                      }} 
                      className="flex-1 h-14 border-2 border-primary/20 border-dashed rounded-sm text-primary hover:bg-primary/5 transition-all flex items-center justify-center font-bold tracking-wider"
                    >
                      <ImageIcon className="ml-2 size-5" /> תמונה משולבת עם טקסט
                    </button>
                  </div>
                </SectionCard>

                {/* ── Contact Section ── */}
                <SectionCard icon={<MessageSquare size={20} />} title="קטע יצירת קשר">
                  <TitleEditor
                    label="כותרת קטע יצירת קשר"
                    settings={content.contactTitleSettings}
                    onChange={s => set({ contactTitleSettings: s })}
                  />
                </SectionCard>

                {/* ── SEO ── */}
                <SectionCard icon={<Globe size={20} />} title="קידום בגוגל (SEO)">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <CharCounter value={content.metaTitle || ''} limit={60} />
                        <Label className="boutique-label">כותרת גוגל (Meta Title)</Label>
                      </div>
                      <Input value={content.metaTitle || ''} onChange={e => set({ metaTitle: e.target.value })} placeholder="כותרת העמוד בגוגל — עד 60 תווים" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <CharCounter value={content.metaDescription || ''} limit={160} />
                        <Label className="boutique-label">תיאור גוגל (Meta Description)</Label>
                      </div>
                      <Textarea value={content.metaDescription || ''} onChange={e => set({ metaDescription: e.target.value })} placeholder="תיאור קצר שמופיע תחת הכותרת בגוגל — 140-160 תווים" rows={3} />
                    </div>
                    <GoogleSearchPreview
                      title={content.metaTitle || ''}
                      url={`www.moranpaz.co.il${selectedPage !== 'home' ? `/${selectedPage}` : ''}`}
                      description={content.metaDescription || ''}
                    />
                  </div>
                </SectionCard>
              </>
            )}

            {/* ── Save Button ── */}
            <div className="fixed bottom-0 left-0 right-0 z-[250] bg-background/95 backdrop-blur-md border-t border-border/40">
              {autoSaveStatus !== 'idle' && (
                <div className={`flex items-center justify-center gap-1.5 text-xs font-headline py-1.5 transition-all ${
                  autoSaveStatus === 'saving' ? 'text-stone-400 bg-stone-50/80' :
                  autoSaveStatus === 'saved' ? 'text-green-700 bg-green-50/80' : 'text-red-600 bg-red-50/80'
                }`}>
                  {autoSaveStatus === 'saving' && <Loader2 size={11} className="animate-spin" />}
                  {autoSaveStatus === 'saved' && <Check size={11} />}
                  {autoSaveStatus === 'saving' ? 'שומר אוטומטית...' : autoSaveStatus === 'saved' ? 'נשמר אוטומטית ✓' : '⚠ שגיאה בשמירה האוטומטית'}
                </div>
              )}
              <div className="p-3 md:p-4">
                <Button type="submit" disabled={isSaving || autoSaveStatus === 'saving'} className="w-full bg-primary hover:bg-accent h-13 text-white text-base boutique-label rounded-none shadow-xl flex items-center justify-center gap-3">
                  {isSaving ? (
                    <><Loader2 className="animate-spin size-4" /> שומר...</>
                  ) : (
                    <><Save className="size-4" /> {isDirty ? 'שמירת שינויים ידנית' : 'כל השינויים שמורים ✓'}</>
                  )}
                </Button>
              </div>
            </div>

          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
