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

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  }, [mobileMenuOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'בית', href: '/' },
    { label: 'טיפול', href: '/practice' },
    { label: 'קורס BEINME', href: '/workshop' },
    { label: 'טיפול בטבעון', href: '/tivon' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[200] transition-all duration-1000 px-8 md:px-24 flex justify-between items-center py-10",
        isScrolled ? 'bg-background/90 backdrop-blur-md py-6 border-b border-border/40' : 'bg-transparent'
      )}>
        <Link 
          href="/"
          className="text-2xl md:text-3xl font-headline tracking-[0.3em] font-light hover:opacity-50 transition-all duration-700 z-[220]"
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
                "hover-gold relative py-1 transition-all duration-700",
                pathname === item.href ? "text-primary border-b border-primary/30" : "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact" 
            className="text-primary hover:text-accent transition-all duration-700 border border-primary/40 px-10 py-3 hover:bg-primary/5"
          >
            צרו קשר
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-3 hover:opacity-50 transition-opacity z-[230] relative"
          aria-label="תפריט"
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={1} className="text-white" /> : <Menu size={28} strokeWidth={1} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay - Full Screen Coverage */}
      <div className={cn(
        "fixed inset-0 z-[210] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center h-screen w-screen overflow-hidden",
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
            className="boutique-label text-primary pt-16 border-t border-white/10 w-48 text-center"
          >
            צרו קשר
          </Link>
        </div>
      </div>
    </>
  );
}
