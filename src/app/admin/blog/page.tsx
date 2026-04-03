
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { collection, addDoc, query, orderBy, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth, useUser, useFirestore, useCollection } from '@/firebase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, LogOut, ArrowRight, Monitor, Smartphone, Trash2, Edit } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Import Quill styles
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-stone-50 animate-pulse border border-stone-100 flex items-center justify-center">טוען עורך טקסט...</div>,
});

export default function BlogManagementPage() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    subtitle: '',
    slug: '',
    content: '',
    heroImageUrlDesktop: '',
    heroImageUrlMobile: '',
    category: 'מודעות',
    date: new Date().toISOString().split('T')[0]
  });

  // Stabilize query for useCollection to prevent infinite loops
  const postsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: posts, loading: postsLoading } = useCollection(postsQuery);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  const handleSignOut = () => {
    auth?.signOut().then(() => router.push('/'));
  };

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      ['link', 'clean'],
    ],
  }), []);

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || isSaving) return;

    setIsSaving(true);
    const postData = {
      ...newPost,
      slug: newPost.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      updatedAt: Date.now()
    };

    if (editingId) {
      updateDoc(doc(db, 'blogPosts', editingId), postData)
        .then(() => {
          toast({ title: "מאמר עודכן בהצלחה!" });
          resetForm();
        })
        .catch(async (error) => {
          const permissionError = new FirestorePermissionError({
            path: `blogPosts/${editingId}`,
            operation: 'update',
            requestResourceData: postData
          });
          errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => setIsSaving(false));
    } else {
      addDoc(collection(db, 'blogPosts'), {
        ...postData,
        createdAt: Date.now()
      })
        .then(() => {
          toast({ title: "מאמר נשמר בהצלחה!" });
          resetForm();
        })
        .catch(async (error) => {
          const permissionError = new FirestorePermissionError({
            path: 'blogPosts',
            operation: 'create',
            requestResourceData: postData
          });
          errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => setIsSaving(false));
    }
  };

  const handleEdit = (post: any) => {
    setNewPost({
      title: post.title,
      subtitle: post.subtitle || '',
      slug: post.slug || '',
      content: post.content,
      heroImageUrlDesktop: post.heroImageUrlDesktop || '',
      heroImageUrlMobile: post.heroImageUrlMobile || '',
      category: post.category,
      date: post.date
    });
    setEditingId(post.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (!db || !confirm("האם את בטוחה שברצונך למחוק את המאמר?")) return;
    deleteDoc(doc(db, 'blogPosts', id))
      .then(() => toast({ title: "מאמר נמחק." }))
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: `blogPosts/${id}`,
          operation: 'delete'
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewPost({
      title: '',
      subtitle: '',
      slug: '',
      content: '',
      heroImageUrlDesktop: '',
      heroImageUrlMobile: '',
      category: 'מודעות',
      date: new Date().toISOString().split('T')[0]
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-primary size-12" />
      </div>
    );
  }

  if (!user) return null;

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
              onClick={() => {
                if (isAdding) resetForm();
                else setIsAdding(true);
              }} 
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
              <CardTitle className="text-3xl font-headline text-accent">
                {editingId ? "עריכת כתבה" : "יצירת כתבה חדשה"}
              </CardTitle>
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
                    <Label className="boutique-label text-stone-400">Slug (URL באנגלית)</Label>
                    <Input 
                      value={newPost.slug} 
                      onChange={e => setNewPost({...newPost, slug: e.target.value})} 
                      required 
                      className="h-12 border-stone-100 bg-stone-50"
                      placeholder="my-post-title"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="boutique-label text-stone-400">כותרת משנית</Label>
                    <Input 
                      value={newPost.subtitle} 
                      onChange={e => setNewPost({...newPost, subtitle: e.target.value})} 
                      className="h-12 border-stone-100 bg-stone-50"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400 flex items-center gap-2">
                      <Monitor size={14} /> תמונת דסקטופ (URL)
                    </Label>
                    <Input 
                      value={newPost.heroImageUrlDesktop} 
                      onChange={e => setNewPost({...newPost, heroImageUrlDesktop: e.target.value})} 
                      className="h-12 border-stone-100 bg-stone-50"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400 flex items-center gap-2">
                      <Smartphone size={14} /> תמונת מובייל (URL)
                    </Label>
                    <Input 
                      value={newPost.heroImageUrlMobile} 
                      onChange={e => setNewPost({...newPost, heroImageUrlMobile: e.target.value})} 
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
                  <div className="space-y-3">
                    <Label className="boutique-label text-stone-400">תאריך פרסום</Label>
                    <Input 
                      type="date"
                      value={newPost.date} 
                      onChange={e => setNewPost({...newPost, date: e.target.value})} 
                      required 
                      className="h-12 border-stone-100 bg-stone-50"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">גוף הכתבה (כמו ב-Word)</Label>
                  <div className="prose-editor">
                    <ReactQuill 
                      theme="snow"
                      value={newPost.content}
                      onChange={content => setNewPost({...newPost, content})}
                      modules={quillModules}
                      className="bg-stone-50"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-primary text-white boutique-label h-14 w-full rounded-none"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : (editingId ? "עדכון מאמר" : "פרסום מאמר")}
                </Button>
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
              {posts?.map((post: any) => (
                <div key={post.id} className="bg-white p-8 border border-stone-100 flex justify-between items-center group hover:border-primary/30 transition-all">
                  <div className="flex-1">
                    <span className="boutique-label text-stone-300 text-[10px] mb-2 block">{post.date} | {post.category}</span>
                    <h3 className="text-2xl font-headline text-accent group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-xs text-stone-400 font-mono">/{post.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => handleEdit(post)} className="text-stone-400 hover:text-primary">
                      <Edit size={18} />
                    </Button>
                    <Button variant="ghost" onClick={() => handleDelete(post.id)} className="text-stone-400 hover:text-destructive">
                      <Trash2 size={18} />
                    </Button>
                    <Button variant="ghost" onClick={() => router.push(`/blog/${post.slug || post.id}`)} className="text-stone-300 hover:text-accent">
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
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
