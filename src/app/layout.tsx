import { SITE_URL } from '@/lib/site-config';

import type { Metadata } from 'next';
import './globals.css';
import { FloatingWhatsApp } from '@/components/shared/FloatingWhatsApp';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BeinMe - מורן פז | להיות אני בתוכי',
    description: 'מרחב בטוח לצמיחה וריפוי רגשי בטבעון, בעמק יזרעאל ובאונליין.',
    url: SITE_URL,
    siteName: 'BeinMe - מורן פז',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'BeinMe - מורן פז | פסיכותרפיה הוליסטית',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeinMe - מורן פז | להיות אני בתוכי',
    description: 'מרחב בטוח לצמיחה וריפוי רגשי בטבעון, בעמק יזרעאל ובאונליין.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'uZtRayPCUnA35YVD2gPquUAz34V0WlSF1jaUI3kYYnM',
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
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
