
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { collection, addDoc, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth, useUser, useFirestore, useCollection } from '@/firebase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, LogOut, ArrowRight, Monitor, Smartphone, Trash2, Edit, ChevronRight } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-48 w-full bg-stone-50 border border-stone-100 flex items-center justify-center font-headline text-stone-400">טוען עורך...</div>,
});

export default function BlogManagementPage() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [mounted, setMounted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    subtitle: '',
    summary: '',
    slug: '',
    content: '',
    heroImageUrlDesktop: '',
    heroImageUrlMobile: '',
    category: 'מודעות',
    date: new Date().toISOString().split('T')[0]
  });

  const postsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: posts, loading: postsLoading } = useCollection(postsQuery);

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || isSaving) return;

    setIsSaving(true);
    const sanitizedSlug = newPost.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    const postData = { ...newPost, slug: sanitizedSlug, updatedAt: Date.now() };

    if (editingId) {
      updateDoc(doc(db, 'blogPosts', editingId), postData)
        .then(() => {
          toast({ title: "מאמר עודכן!" });
          resetForm();
        })
        .catch(async () => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({ path: `blogPosts/${editingId}`, operation: 'update', requestResourceData: postData }));
        })
        .finally(() => setIsSaving(false));
    } else {
      addDoc(collection(db, 'blogPosts'), { ...postData, createdAt: Date.now() })
        .then(() => {
          toast({ title: "מאמר פורסם!" });
          resetForm();
        })
        .catch(async () => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({ path: 'blogPosts', operation: 'create', requestResourceData: postData }));
        })
        .finally(() => setIsSaving(false));
    }
  };

  const handleEdit = (post: any) => {
    setNewPost({
      title: post.title,
      subtitle: post.subtitle || '',
      summary: post.summary || '',
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
    if (!db || !confirm("האם למחוק?")) return;
    deleteDoc(doc(db, 'blogPosts', id)).then(() => toast({ title: "מאמר נמחק." }));
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewPost({ title: '', subtitle: '', summary: '', slug: '', content: '', heroImageUrlDesktop: '', heroImageUrlMobile: '', category: 'מודעות', date: new Date().toISOString().split('T')[0] });
  };

  if (!mounted || authLoading) return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="animate-spin text-primary size-12" /></div>;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-stone-50 text-right pb-32">
      <Navbar />
      <section className="pt-28 md:pt-48 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="w-full">
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="mb-4 text-stone-400 p-0 hover:text-primary h-auto">
              <ChevronRight className="ml-2 size-4" /> חזרה ללוח הבקרה
            </Button>
            <h1 className="text-4xl md:text-6xl font-handwriting text-accent">ניהול בלוג</h1>
          </div>
          <Button 
            onClick={() => isAdding ? resetForm() : setIsAdding(true)} 
            className="w-full md:w-auto bg-accent hover:bg-primary text-white boutique-label h-12 px-8 rounded-none"
          >
            {isAdding ? "ביטול" : "מאמר חדש"} <Plus className="mr-2 size-4" />
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-12 md:mb-20 bg-white shadow-2xl border-none rounded-none animate-in fade-in slide-in-from-top-4">
            <CardHeader className="border-b border-stone-50 py-4 md:py-6">
              <CardTitle className="text-2xl md:text-3xl font-headline text-accent">
                {editingId ? "עריכת מאמר" : "יצירת מאמר חדש"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 md:pt-10">
              <form onSubmit={handleSavePost} className="space-y-6 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-2 md:space-y-3">
                    <Label className="boutique-label text-stone-400">כותרת</Label>
                    <Input value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required className="h-12 border-stone-100 bg-stone-50" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <Label className="boutique-label text-stone-400">Slug (אנגלית)</Label>
                    <Input value={newPost.slug} onChange={e => setNewPost({...newPost, slug: e.target.value})} required className="h-12 border-stone-100 bg-stone-50 font-sans" />
                  </div>
                  <div className="space-y-2 md:space-y-3 md:col-span-2">
                    <Label className="boutique-label text-stone-400">תקציר</Label>
                    <Textarea value={newPost.summary} onChange={e => setNewPost({...newPost, summary: e.target.value})} className="min-h-20 bg-stone-50" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <Label className="boutique-label text-stone-400">תמונת דסקטופ</Label>
                    <Input value={newPost.heroImageUrlDesktop} onChange={e => setNewPost({...newPost, heroImageUrlDesktop: e.target.value})} className="font-sans" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <Label className="boutique-label text-stone-400">תמונת מובייל</Label>
                    <Input value={newPost.heroImageUrlMobile} onChange={e => setNewPost({...newPost, heroImageUrlMobile: e.target.value})} className="font-sans" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="boutique-label text-stone-400">תוכן המאמר</Label>
                  <div className="prose-editor min-h-[350px]">
                    <ReactQuill theme="snow" value={newPost.content} onChange={val => setNewPost({...newPost, content: val})} className="bg-stone-50" />
                  </div>
                </div>
                
                <Button disabled={isSaving} className="bg-primary text-white boutique-label h-14 w-full rounded-none">
                  {isSaving ? <Loader2 className="animate-spin" /> : (editingId ? "עדכון" : "פרסום")}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-headline text-accent border-b border-stone-200 pb-4 mb-6">מאמרים קיימים</h2>
          {postsLoading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-stone-300 size-12" /></div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts?.map((post: any) => (
                <div key={post.id} className="bg-white p-4 md:p-8 border border-stone-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-primary/30 transition-all">
                  <div className="flex-1">
                    <span className="text-[10px] text-stone-300 uppercase font-bold block mb-1">{post.date} | {post.category}</span>
                    <h3 className="text-xl md:text-2xl font-headline text-accent group-hover:text-primary transition-colors">{post.title}</h3>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="ghost" onClick={() => handleEdit(post)} className="text-stone-400 hover:text-primary flex-1 h-12 md:h-auto"><Edit size={18} /></Button>
                    <Button variant="ghost" onClick={() => handleDelete(post.id)} className="text-stone-400 hover:text-destructive flex-1 h-12 md:h-auto"><Trash2 size={18} /></Button>
                    <Button variant="ghost" onClick={() => router.push(`/blog/${post.slug || post.id}`)} className="text-stone-300 hover:text-accent flex-1 h-12 md:h-auto"><ArrowRight className="size-5" /></Button>
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
