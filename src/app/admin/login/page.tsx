
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "שגיאת התחברות",
        description: "המייל או הסיסמה אינם נכונים.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 text-right">
      <Navbar />
      <section className="pt-56 pb-32 px-8 flex justify-center">
        <Card className="w-full max-w-md bg-white shadow-xl border-none rounded-sm">
          <CardHeader className="text-center pb-8 border-b border-stone-100">
            <CardTitle className="text-4xl font-handwriting text-accent">כניסת אדמין</CardTitle>
          </CardHeader>
          <CardContent className="pt-10">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="boutique-label text-stone-400">אימייל</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="bg-stone-50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none h-12 text-lg"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" title="סיסמה" className="boutique-label text-stone-400">סיסמה</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="bg-stone-50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none h-12 text-lg"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accent hover:bg-primary text-white boutique-label h-14 rounded-none transition-all duration-700 shadow-lg"
              >
                {loading ? "מתחבר..." : "התחברות"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
