
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation'; // Correct import for Next.js Link in some versions, but standard is 'next/link'
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20הגעתי%20מהאתר%20שלך%20מעוניין%20לקבל%20פרטים%20נוספים%20תודה";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'בית', href: '/' },
    { label: 'אודות', href: '/about' },
    { label: 'טיפול', href: '/practice' },
    { label: 'אונליין', href: '/online-therapy' },
    { label: 'BeinMe', href: '/workshop', hasCopyright: true },
    { label: 'טבעון', href: '/tivon' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[200] transition-all duration-1000 px-6 sm:px-12 lg:px-24 flex justify-between items-center py-8 md:py-10",
        isScrolled ? 'bg-background/95 backdrop-blur-xl py-4 md:py-5 border-b border-border/30 shadow-sm' : 'bg-transparent'
      )}>
        <NextLink 
          href="/"
          className="text-2xl sm:text-3xl font-headline tracking-[0.25em] font-light hover:opacity-50 transition-all duration-700 z-[220]"
        >
          MORAN PAZ
        </NextLink>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-10 boutique-label">
          {navItems.map((item) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              className={cn(
                "hover-gold relative py-1 transition-all duration-700 text-[13px] tracking-[0.25em] font-medium",
                pathname === item.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {item.label}{item.hasCopyright && <sup>©</sup>}
            </NextLink>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="!text-white bg-primary px-8 py-3 hover:bg-accent transition-all duration-1000 text-[11px] tracking-[0.3em] font-bold shadow-lg rounded-sm"
          >
            צרו קשר
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        {!mobileMenuOpen && (
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="lg:hidden p-2 hover:opacity-50 transition-opacity z-[230] relative"
            aria-label="פתיחת תפריט"
          >
            <Menu strokeWidth={1} className="size-8 sm:size-9 text-foreground" />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[300] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center h-screen w-full overflow-hidden",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        {/* Close Button Inside Overlay */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-10 left-10 p-2 hover:rotate-90 transition-all duration-500"
          aria-label="סגירת תפריט"
        >
          <X strokeWidth={1} className="size-10 text-white/70 hover:text-white" />
        </button>

        <div className="flex flex-col items-center space-y-10 px-6 text-center w-full max-w-sm">
          {navItems.map((item, i) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-4xl font-headline font-light tracking-[0.2em] hover:text-primary transition-all duration-700",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.label}{item.hasCopyright && <sup>©</sup>}
            </NextLink>
          ))}
          
          <div className={cn(
            "pt-12 w-full transition-all duration-1000 delay-500",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center bg-primary !text-white py-6 rounded-sm boutique-label text-sm tracking-[0.4em] font-bold shadow-2xl hover:bg-white hover:!text-accent transition-all duration-500"
            >
              תאום פגישה
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
