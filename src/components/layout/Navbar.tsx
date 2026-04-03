
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'בית', href: '/' },
    { label: 'אודות', href: '/about' },
    { label: 'התהליך הטיפולי', href: '/practice' },
    { label: 'נקודות של אור', href: '/blog' },
    { label: 'צור קשר', href: '/contact' },
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
            "text-xl sm:text-2xl font-handwriting tracking-widest transition-all duration-700 mt-1",
            isScrolled ? "text-accent" : "text-white drop-shadow-sm"
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
              "px-10 py-3.5 transition-all duration-700 text-[13px] tracking-[0.2em] font-bold shadow-xl rounded-sm !text-white flex items-center gap-2",
              isScrolled 
                ? "bg-primary hover:bg-accent" 
                : "bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white hover:!text-primary"
            )}
          >
            פגישת היכרות
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          className={cn(
            "lg:hidden p-2 z-[230] relative",
            mobileMenuOpen && "hidden"
          )}
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
      </nav>

      {/* Mobile Menu Overlay - Now fully opaque */}
      <div className={cn(
        "fixed inset-0 z-[300] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-start h-screen w-full pt-20 sm:pt-32",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 left-8 p-4"
        >
          <X strokeWidth={1} className="size-10 text-white/70 hover:text-white transition-colors" />
        </button>

        <div className="flex flex-col items-center space-y-8 sm:space-y-10 text-center w-full px-6 overflow-y-auto max-h-[75vh]">
          {navItems.map((item, i) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              className={cn(
                "relative text-3xl md:text-4xl font-headline tracking-[0.15em] transition-all duration-500 whitespace-nowrap",
                pathname === item.href 
                  ? "text-white font-bold scale-110" 
                  : "text-white/60 font-light hover:text-white"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-primary animate-in fade-in zoom-in duration-1000" />
              )}
            </NextLink>
          ))}
        </div>
        
        <div className="absolute bottom-12 text-center w-full px-6">
          <div className="mashrabiya-divider opacity-10 mb-6 max-w-[120px] mx-auto"></div>
          <span className="boutique-label text-white/40 tracking-[0.4em] text-[10px]">MORAN PAZ • BEINME</span>
        </div>
      </div>
    </>
  );
}
