
import type { Metadata } from 'next';
import './globals.css';
import { FloatingWhatsApp } from '@/components/shared/FloatingWhatsApp';
import { FaqAssistant } from '@/components/shared/FaqAssistant';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'BeinMe - מורן פז | פסיכותרפיה הוליסטית בטבעון ובעמק יזרעאל',
    template: '%s | BeinMe - מורן פז'
  },
  description: 'מורן פז - פסיכותרפיסטית הוליסטית בגישת BeinMe. ליווי רגשי לנשים ונוער בטבעון, עמק יזרעאל ובאונליין. מומחית בטיפול בחרדה, חיבור לסמכות פנימית ועבודה רגשית עמוקה.',
  keywords: [
    'פסיכותרפיה הוליסטית',
    'טיפול רגשי בטבעון',
    'טיפול רגשי בעמק יזרעאל',
    'טיפול למבוגרים',
    'טיפול בחרדות',
    'מטפלת רגשית עמק יזרעאל',
    'טיפול אונליין בעברית',
    'BeinMe',
    'להיות אני בתוכי',
    'עבודת צללים',
    'פוקוסינג',
    'מיינדפולנס',
    'טיפול רגשי לנוער',
    'ליווי רגשי לנשים'
  ],
  authors: [{ name: 'מורן פז' }],
  creator: 'מורן פז',
  publisher: 'מורן פז',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BeinMe - מורן פז | להיות אני בתוכי',
    description: 'מרחב בטוח לצמיחה וריפוי רגשי בטבעון, בעמק יזרעאל ובאונליין.',
    url: 'https://moranpaz.com',
    siteName: 'BeinMe - מורן פז',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
        <FirebaseClientProvider>
          {children}
          <FloatingWhatsApp />
          <FaqAssistant />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
