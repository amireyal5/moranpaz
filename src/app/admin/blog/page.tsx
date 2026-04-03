
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useAuth, useUser, useFirestore, useCollection } from '@/firebase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, LogOut, ArrowRight } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function BlogManagementPage() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    subtitle: '',
    content: '',
    heroImageUrl: '',
    category: 'מודעות',
    date: new Date().toISOString().split('T')[0]
  });

  const postsQuery = query(collection(db!, 'blogPosts'), orderBy('createdAt', 'desc'));
  const { data: posts, loading: postsLoading } = useCollection(postsQuery);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  const handleSignOut = () => {
    auth?.signOut().then(() => router.push('/'));
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    addDoc(collection(db, 'blogPosts'), {
      ...newPost,
      createdAt: Date.now()
    }).then(() => {
      toast({ title: "מאמר נשמר בהצלחה!" });
      setIsAdding(false);
      setNewPost({
        title: '',
        subtitle: '',
        content: '',
        heroImageUrl: '',
        category: 'מודעות',
        date: new Date().toISOString().split('T')[0]
      });
    }).catch(async (error) => {
      const permissionError = new FirestorePermissionError({
        path: 'blogPosts',
        operation: 'create',
        requestResourceData: newPost
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-primary size-12" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-56 pb-32 px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="boutique-label text-primary mb-4 block">Admin Panel</span>
            <h1 className="text-6xl font-handwriting text-accent">ניהול בלוג</h1>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => setIsAdding(!isAdding)} 
              className="bg-accent hover:bg-primary text-white boutique-label h-12 px-8 rounded-none"
            >
              {isAdding ? "ביטול" : "מאמר חדש"}
              <Plus className="mr-2 size-4" />
            </Button>
            <Button variant="outline" onClick={handleSignOut} className="h-12 border-stone-200 rounded-none boutique-label">
              התנתקות <LogOut className="mr-2 size-4" />
            </Button>
          </div>
        </div>

        {isAdding && (
          <Card className="mb-20 bg-white shadow-2xl border-none rounded-none animate-in fade-in slide-in-from-top-4">
            <CardHeader className="border-b border-stone-50">
              <CardTitle className="text-3xl font-headline text-accent">יצירת כתבה חדשה</CardTitle>
            </CardHeader>
            <CardContent className="pt-10">
              <form onSubmit={handleSavePost} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400">כותרת ראשית</Label>
                    <Input 
                      value={newPost.title} 
                      onChange={e => setNewPost({...newPost, title: e.target.value})} 
                      required 
                      className="h-12 border-stone-100 bg-stone-50"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400">כותרת משנית</Label>
                    <Input 
                      value={newPost.subtitle} 
                      onChange={e => setNewPost({...newPost, subtitle: e.target.value})} 
                      className="h-12 border-stone-100 bg-stone-50"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400">תמונת הירו (URL)</Label>
                    <Input 
                      value={newPost.heroImageUrl} 
                      onChange={e => setNewPost({...newPost, heroImageUrl: e.target.value})} 
                      required 
                      className="h-12 border-stone-100 bg-stone-50"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400">קטגוריה</Label>
                    <Input 
                      value={newPost.category} 
                      onChange={e => setNewPost({...newPost, category: e.target.value})} 
                      required 
                      className="h-12 border-stone-100 bg-stone-50"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">גוף הכתבה</Label>
                  <Textarea 
                    value={newPost.content} 
                    onChange={e => setNewPost({...newPost, content: e.target.value})} 
                    required 
                    rows={12}
                    className="border-stone-100 bg-stone-50 resize-none"
                  />
                </div>
                <Button type="submit" className="bg-primary text-white boutique-label h-14 w-full rounded-none">פרסום מאמר</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          <h2 className="text-3xl font-headline text-accent border-b border-stone-200 pb-4 mb-10">מאמרים קיימים</h2>
          {postsLoading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
          ) : posts?.length === 0 ? (
            <p className="text-xl text-stone-400 text-center py-20">עדיין אין מאמרים. הזמן להתחיל לכתוב...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {posts?.map(post => (
                <div key={post.id} className="bg-white p-8 border border-stone-100 flex justify-between items-center group hover:border-primary/30 transition-all">
                  <div>
                    <span className="boutique-label text-stone-300 text-[10px] mb-2 block">{post.date} | {post.category}</span>
                    <h3 className="text-2xl font-headline text-accent group-hover:text-primary transition-colors">{post.title}</h3>
                  </div>
                  <Button variant="ghost" className="text-stone-300 hover:text-primary">
                    עריכה <ArrowRight className="mr-2 size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
