
"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { aiPoweredFaqAssistant } from '@/ai/flows/ai-powered-faq-assistant-flow';
import { cn } from '@/lib/utils';

export function FaqAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userQuestion = question.trim();
    setQuestion('');
    setChat(prev => [...prev, { role: 'user', content: userQuestion }]);
    setIsLoading(true);

    try {
      const result = await aiPoweredFaqAssistant({ question: userQuestion });
      setChat(prev => [...prev, { role: 'assistant', content: result.answer }]);
    } catch (error) {
      setChat(prev => [...prev, { role: 'assistant', content: 'סליחה, אירעה שגיאה. אנא נסה שוב מאוחר יותר.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[150] flex flex-col items-start">
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-primary/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center space-x-reverse space-x-2">
              <Sparkles size={20} />
              <span className="font-headline font-bold">עוזרת וירטואלית</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {chat.length === 0 && (
              <div className="text-center py-10 px-6">
                <p className="text-stone-500 text-sm">היי! אני כאן לענות על שאלות בנוגע למורן פז, התהליך הטיפולי והסדנאות.</p>
                <p className="text-primary font-bold mt-2">במה אוכל לעזור?</p>
              </div>
            )}
            {chat.map((msg, i) => (
              <div key={i} className={cn(
                "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-secondary text-foreground mr-auto" 
                  : "bg-stone-100 text-foreground ml-auto"
              )}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-stone-100 p-3 rounded-2xl text-sm ml-auto flex items-center space-x-reverse space-x-2">
                <Loader2 size={16} className="animate-spin text-primary" />
                <span>חושבת...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-stone-100 flex space-x-reverse space-x-2">
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="שאל/י אותי משהו..."
              className="flex-grow bg-stone-50 border-none focus:ring-1 focus:ring-primary rounded-full px-4 text-sm"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary text-white p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center space-x-reverse space-x-2"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        {!isOpen && <span className="hidden md:block font-bold text-sm">יש לך שאלה?</span>}
      </button>
    </div>
  );
}
