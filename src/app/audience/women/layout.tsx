import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ליווי רגשי לנשים | מורן פז BeinMe',
  description: 'מרחב טיפולי לנשים לחיבור מחדש לסמכות הפנימית. פסיכותרפיה הוליסטית בגישת גוף-נפש-רוח. לנשים בטבעון, עמק יזרעאל ואונליין.',
  alternates: { canonical: 'https://www.moranpaz.co.il/audience/women' },
};

export default function WomenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
