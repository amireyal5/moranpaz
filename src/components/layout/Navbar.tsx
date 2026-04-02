"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
        "fixed w-full z-[200] transition-all duration-700 px-6 sm:px-12 lg:px-24 flex justify-between items-center py-6 sm:py-8 md:py-10",
        isScrolled ? 'bg-background/95 backdrop-blur-md py-4 sm:py-4 md:py-5 border-b border-border/40 shadow-sm' : 'bg-transparent'
      )}>
        <Link 
          href="/"
          className="text-2xl sm:text-3xl md:text-3xl font-headline tracking-[0.2em] font-light hover:opacity-50 transition-all duration-700 z-[220]"
        >
          MORAN PAZ
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-6 xl:space-x-10 boutique-label">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "hover-gold relative py-1 transition-all duration-700 text-[13px] xl:text-[14px] tracking-[0.2em] font-medium",
                pathname === item.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {item.label}{item.hasCopyright && <sup>©</sup>}
            </Link>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-primary px-6 xl:px-8 py-2 xl:py-2.5 hover:bg-accent transition-all duration-700 text-[13px] xl:text-[14px] tracking-[0.2em] font-bold shadow-md"
          >
            צרו קשר
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2 hover:opacity-50 transition-opacity z-[230] relative"
          aria-label="תפריט"
        >
          {mobileMenuOpen ? 
            <X strokeWidth={1} className="size-8 text-white" /> : 
            <Menu strokeWidth={1} className="size-8 text-foreground" />
          }
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[210] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center h-screen w-full overflow-hidden",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        <div className="flex flex-col items-center space-y-8 sm:space-y-12 px-6 text-center">
          {navItems.map((item, i) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-3xl sm:text-4xl font-headline font-light tracking-[0.2em] hover:text-primary transition-all duration-700",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.label}{item.hasCopyright && <sup className="text-[0.4em]">©</sup>}
            </Link>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="boutique-label text-primary pt-10 border-t border-white/10 w-full sm:w-64 text-center text-xl font-bold"
          >
            צרו קשר
          </a>
        </div>
      </div>
    </>
  );
}
