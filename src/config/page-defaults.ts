
export type NavItem = { label: string; href: string };
export type CtaButton = { label: string; href: string; variant: 'primary' | 'outline' | 'ghost'; size: 'sm' | 'default' | 'lg' };
export type Feature = { title: string; description: string; icon: string };
export type Testimonial = { text: string; author: string; location: string };
export type Faq = { question: string; answer: string };

export type ContentState = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrlDesktop: string;
  heroImageUrlMobile: string;
  heroHeight: string;
  heroTextAlign: string;
  heroBgColor: string;
  introTitle: string;
  introContent: string;
  portraitImageUrl: string;
  portraitShape: string;
  portraitPosition: string;
  clinicImageUrl: string;
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

export const DEFAULT_CONTENT_VALUES: Partial<ContentState> = {
  heroHeight: '70vh',
  heroTextAlign: 'center',
  primaryColor: '35 40% 45%',
  sectionBg: 'white',
  portraitShape: 'circle',
  portraitPosition: 'left',
  ctaAlign: 'center',
  navItems: [],
  ctaButtons: [],
  features: [],
  testimonials: [],
  faqs: [],
};

export const PAGE_FALLBACKS: Record<string, Partial<ContentState>> = {
  home: {
    heroTitle: "הבית הפנימי שלך",
    heroSubtitle: "מרחב בטוח למפגש אמיץ עם עצמך",
    introTitle: "נעים להכיר, אני מורן פז",
    introContent: "<p>אני מלווה נשים ונוער בתהליכי שינוי וצמיחה דרך פסיכותרפיה הוליסטית...</p>",
    features: [
      { title: "גוף", icon: "Heart", description: "הקשבה לתחושות הפיזיות כמרחב של ידע." },
      { title: "נפש", icon: "Sparkles", description: "חיבור עמוק לעולם הרגשי והפנימי." },
      { title: "רוח", icon: "Star", description: "מציאת המשמעות והחיבור למהות הרחבה יותר." }
    ]
  },
  about: {
    heroTitle: "הסיפור שמאחורי הקליניקה",
    heroSubtitle: "מרחב בטוח לנשימה ושינוי",
    introTitle: "נעים להכיר, אני מורן",
    introContent: "<p>אני מלווה נשים ונוער בתהליכי שינוי וצמיחה...</p>",
    features: [
      { title: "ליווי אישי", icon: "Heart", description: "מפגש אחד על אחד מותאם אישית." },
      { title: "אווירה מכילה", icon: "Sparkles", description: "מרחב בטוח לביטוי עצמי מלא." },
      { title: "כלים פרקטיים", icon: "Compass", description: "טכניקות לוויסות רגשי בבית." }
    ]
  },
  'online-therapy': {
    heroTitle: "בית פנימי מכל מקום",
    heroSubtitle: "טיפול רגשי אונליין לישראלים בארץ ובעולם",
    features: [
      { title: 'לישראלים בחו"ל', icon: "Orbit", description: "טיפול בעברית מכל מקום בעולם." },
      { title: "גמישות ונוחות", icon: "Star", description: "מהבית שלך, בזמן שמתאים לך." }
    ]
  }
};

export function getInitialPageContent(id: string): ContentState {
  const fallback = PAGE_FALLBACKS[id] || {};
  return {
    heroTitle:            fallback.heroTitle            || '',
    heroSubtitle:         fallback.heroSubtitle         || '',
    heroImageUrlDesktop:  '',
    heroImageUrlMobile:   '',
    portraitImageUrl:     '',
    portraitShape:        fallback.portraitShape        || 'circle',
    portraitPosition:     fallback.portraitPosition     || 'left',
    clinicImageUrl:       '',
    heroHeight:           fallback.heroHeight           || '70vh',
    heroTextAlign:        fallback.heroTextAlign        || 'center',
    heroBgColor:          '',
    introTitle:           fallback.introTitle           || '',
    introContent:         fallback.introContent         || '',
    sectionBg:            fallback.sectionBg            || 'white',
    primaryColor:         fallback.primaryColor         || '35 40% 45%',
    metaTitle:            '',
    metaDescription:      '',
    siteName:             '',
    siteSubtitle:         '',
    ctaAlign:             fallback.ctaAlign             || 'center',
    navItems:             fallback.navItems             || [],
    ctaButtons:           fallback.ctaButtons           || [],
    features:             fallback.features             || [],
    testimonials:         fallback.testimonials         || [],
    faqs:                 fallback.faqs                 || [],
  };
}
