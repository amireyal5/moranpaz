"use client";

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsappLink = "https://wa.me/972507817338?text=היי%20מורן%20הגעתי%20מהאתר%20שלך%20מעוניין%20לקבל%20פרטים%20נוספים%20תודה";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'בית', href: '/' },
    { label: 'אודות', href: '/about' },
    { label: 'התהליך הטיפולי', href: '/practice' },
    { label: 'טיפול אונליין', href: '/online-therapy' },
    { label: 'נקודות של אור', href: '/blog' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[200] transition-all duration-700 px-6 md:px-12 lg:px-24 flex justify-between items-center py-6 md:py-10",
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl py-4 md:py-5 border-b border-border/30 shadow-sm' 
          : 'bg-transparent'
      )}>
        <NextLink 
          href="/"
          className="flex flex-col items-start z-[220] group"
        >
          <span className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-headline tracking-[0.25em] font-light transition-all duration-700",
            isScrolled ? "text-foreground" : "text-white drop-shadow-md"
          )}>
            MORAN PAZ
          </span>
          <span className={cn(
            "text-[11px] font-handwriting tracking-widest transition-opacity duration-700",
            isScrolled ? "text-primary opacity-100" : "text-white/80 opacity-0 group-hover:opacity-100"
          )}>
            BeinMe — להיות אני בתוכי
          </span>
        </NextLink>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-12 boutique-label">
          {navItems.map((item) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              className={cn(
                "relative py-1 transition-all duration-700 text-[14px] tracking-[0.15em] font-medium",
                isScrolled 
                  ? (pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-primary") 
                  : (pathname === item.href ? "text-white" : "text-white/90 hover:text-white drop-shadow-sm")
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className={cn(
                  "absolute bottom-0 right-0 w-full h-[1.5px] transition-all duration-700",
                  isScrolled ? "bg-primary" : "bg-white"
                )} />
              )}
            </NextLink>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-10 py-3.5 transition-all duration-700 text-[13px] tracking-[0.2em] font-bold shadow-xl rounded-sm",
              isScrolled 
                ? "bg-primary text-white hover:bg-accent" 
                : "bg-white/20 backdrop-blur-md text-white border border-white/40 hover:bg-white hover:text-primary"
            )}
          >
            פגישת היכרות
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        {!mobileMenuOpen && (
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="lg:hidden p-2 z-[230] relative"
            aria-label="Menu"
          >
            <Menu 
              strokeWidth={1} 
              className={cn(
                "size-10 transition-colors duration-700",
                isScrolled ? "text-foreground" : "text-white drop-shadow-md"
              )} 
            />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[300] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center h-screen w-full",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-12 left-12 p-2"
        >
          <X strokeWidth={1} className="size-10 text-white/70 hover:text-white" />
        </button>

        <div className="flex flex-col items-center space-y-12 text-center w-full max-w-sm">
          {navItems.map((item, i) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-5xl font-headline font-light tracking-[0.2em] hover:text-primary transition-all duration-700"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.label}
            </NextLink>
          ))}
          
          <div className="pt-16 w-full px-12">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center bg-primary text-white py-6 rounded-sm boutique-label text-base tracking-[0.3em] font-bold shadow-2xl"
            >
              תיאום פגישה
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
