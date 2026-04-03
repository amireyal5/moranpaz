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
    { label: 'התהליך הטיפולי', href: '/practice' },
    { label: 'טיפול אונליין', href: '/online-therapy' },
    { label: 'טבעון', href: '/tivon' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[200] transition-all duration-700 px-6 md:px-12 lg:px-24 flex justify-between items-center py-6 md:py-10",
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl py-3 md:py-5 border-b border-border/30 shadow-sm' 
          : 'bg-transparent'
      )}>
        <NextLink 
          href="/"
          className="flex flex-col items-start z-[220] group"
        >
          <span className={cn(
            "text-xl sm:text-2xl md:text-3xl font-headline tracking-[0.25em] font-light transition-all duration-700",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            MORAN PAZ
          </span>
          <span className={cn(
            "text-[10px] font-handwriting tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700",
            isScrolled ? "text-primary" : "text-primary-foreground"
          )}>
            BeinMe — להיות אני בתוכי
          </span>
        </NextLink>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-10 boutique-label">
          {navItems.map((item) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              className={cn(
                "relative py-1 transition-all duration-700 text-[12px] tracking-[0.2em] font-medium",
                isScrolled 
                  ? (pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-primary") 
                  : (pathname === item.href ? "text-white" : "text-white/70 hover:text-white")
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className={cn(
                  "absolute bottom-0 right-0 w-full h-[1px] transition-all duration-700",
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
              "px-6 py-2.5 transition-all duration-700 text-[10px] tracking-[0.3em] font-bold shadow-lg rounded-sm",
              isScrolled 
                ? "bg-primary text-white hover:bg-accent" 
                : "bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-primary"
            )}
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
            <Menu 
              strokeWidth={1} 
              className={cn(
                "size-7 sm:size-8 transition-colors duration-700",
                isScrolled ? "text-foreground" : "text-white"
              )} 
            />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[300] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center h-screen w-full overflow-hidden",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 left-8 p-2 hover:rotate-90 transition-all duration-500"
          aria-label="סגירת תפריט"
        >
          <X strokeWidth={1} className="size-8 text-white/70 hover:text-white" />
        </button>

        <div className="flex flex-col items-center space-y-8 px-6 text-center w-full max-w-sm">
          {navItems.map((item, i) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-3xl font-headline font-light tracking-[0.15em] hover:text-primary transition-all duration-700",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              {item.label}
            </NextLink>
          ))}
          
          <div className={cn(
            "pt-8 w-full transition-all duration-1000 delay-500",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center bg-primary !text-white py-5 rounded-sm boutique-label text-xs tracking-[0.3em] font-bold shadow-2xl hover:bg-white hover:!text-accent transition-all duration-500"
            >
              תאום פגישה
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
