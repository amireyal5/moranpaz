
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'מורן פז | פסיכותרפיה הוליסטית',
  description: 'מורן פז - פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים-חווייתיים. להתחבר, לגלות, ולהשתנות.',
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
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
        {children}
      </body>
    </html>
  );
}
