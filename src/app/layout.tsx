
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'מורן פז | פסיכותרפיה הוליסטית וטיפול רגשי בטבעון ועמק יזרעאל',
    template: '%s | מורן פז'
  },
  description: 'מורן פז - פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים-חווייתיים. מומחית בטיפול בחרדות, סטרס וצמיחה אישית. קליניקה בטבעון וטיפול אונליין לישראלים בארץ ובעולם.',
  keywords: [
    'פסיכותרפיה הוליסטית',
    'טיפול רגשי בטבעון',
    'טיפול בחרדות',
    'מטפלת רגשית עמק יזרעאל',
    'טיפול אונליין בעברית',
    'טיפול לישראלים בחו"ל',
    'קורס BeinMe©',
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
    title: 'מורן פז | פסיכותרפיה הוליסטית וטיפול רגשי',
    description: 'מרחב בטוח לצמיחה וריפוי רגשי בטבעון ובאונליין.',
    url: 'https://moranpaz.com',
    siteName: 'מורן פז - פסיכותרפיה הוליסטית',
    locale: 'he_IL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700;800&family=Frank+Ruhl+Libre:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
