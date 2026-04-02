
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
    { label: 'קורס BEINME', href: '/workshop' },
    { label: 'טבעון', href: '/tivon' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[200] transition-all duration-1000 px-8 md:px-24 flex justify-between items-center py-10 md:py-12",
        isScrolled ? 'bg-background/95 backdrop-blur-md py-6 md:py-8 border-b border-border/40' : 'bg-transparent'
      )}>
        <Link 
          href="/"
          className="text-2xl md:text-3xl font-headline tracking-[0.2em] font-light hover:opacity-50 transition-all duration-700 z-[220]"
        >
          MORAN PAZ
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-12 boutique-label">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "hover-gold relative py-1 transition-all duration-700 text-[13px]",
                pathname === item.href ? "text-primary border-b border-primary/30" : "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact" 
            className="text-primary hover:text-foreground transition-all duration-700 border border-primary/40 px-10 py-3 hover:bg-primary/5 text-[13px]"
          >
            צרו קשר
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-4 hover:opacity-50 transition-opacity z-[230] relative"
          aria-label="תפריט"
        >
          {mobileMenuOpen ? <X size={32} strokeWidth={1} className="text-white" /> : <Menu size={32} strokeWidth={1} className="text-foreground" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[210] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center h-screen w-screen",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        <div className="flex flex-col items-center space-y-12">
          {navItems.map((item, i) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-3xl md:text-4xl font-headline font-light tracking-[0.2em] hover:text-primary transition-all duration-700",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="boutique-label text-primary pt-16 border-t border-white/10 w-64 text-center text-lg"
          >
            צרו קשר
          </Link>
        </div>
      </div>
    </>
  );
}
