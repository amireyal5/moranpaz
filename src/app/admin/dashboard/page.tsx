
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Layout, LogOut, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="animate-spin text-primary size-12" /></div>;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-48 pb-32 px-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-stone-200 pb-8">
          <div>
            <span className="boutique-label text-primary mb-4 block">Control Center</span>
            <h1 className="text-6xl font-handwriting text-accent">לוח בקרה אדמין</h1>
          </div>
          <Button variant="ghost" onClick={() => auth?.signOut()} className="boutique-label text-stone-400">
            התנתקות <LogOut className="mr-2 size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card 
            className="hover:shadow-2xl transition-all cursor-pointer border-none bg-white p-8 group"
            onClick={() => router.push('/admin/blog')}
          >
            <div className="mb-8 p-4 bg-primary/10 w-fit rounded-sm group-hover:bg-primary group-hover:text-white transition-colors">
              <FileText size={40} strokeWidth={1} />
            </div>
            <h3 className="text-3xl font-headline text-accent mb-4">ניהול בלוג</h3>
            <p className="text-stone-500 font-headline leading-relaxed">העלאה, עריכה ומחיקה של מאמרים בבלוג &quot;נקודות של אור&quot;.</p>
          </Card>

          <Card 
            className="hover:shadow-2xl transition-all cursor-pointer border-none bg-white p-8 group"
            onClick={() => router.push('/admin/pages')}
          >
            <div className="mb-8 p-4 bg-primary/10 w-fit rounded-sm group-hover:bg-primary group-hover:text-white transition-colors">
              <Layout size={40} strokeWidth={1} />
            </div>
            <h3 className="text-3xl font-headline text-accent mb-4">ניהול תוכן דפים</h3>
            <p className="text-stone-500 font-headline leading-relaxed">עריכת כותרות ותכני הליבה של דפי האתר (בית, אודות ועוד).</p>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}
