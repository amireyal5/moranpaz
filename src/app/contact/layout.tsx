import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'יצירת קשר | מורן פז BeinMe',
  description: 'לתיאום שיחת היכרות עם מורן פז — פסיכותרפיסטית הוליסטית בטבעון, עמק יזרעאל ואונליין. ניתן לפנות בוואטסאפ או בטופס.',
  alternates: { canonical: 'https://www.moranpaz.co.il/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
