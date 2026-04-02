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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'בית', href: '/' },
    { label: 'התהליך', href: '/practice' },
    { label: 'סדנת BEINME', href: '/workshop' },
    { label: 'טבעון', href: '/tivon' },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-[100] transition-all duration-700 px-8 md:px-20 flex justify-between items-center py-6",
      isScrolled ? 'bg-background/80 backdrop-blur-xl py-4 border-b border-border/40' : 'bg-transparent'
    )}>
      <Link 
        href="/"
        className="text-xl md:text-2xl font-headline tracking-[0.15em] font-light hover:opacity-70 transition-opacity"
      >
        MORAN PAZ
      </Link>
      
      <div className="hidden md:flex items-center space-x-reverse space-x-12 text-[10px] uppercase tracking-[0.3em] font-medium">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={cn(
              "hover-gold relative py-1",
              pathname === item.href ? "text-primary" : "text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
        <Link 
          href="#contact" 
          className="text-primary hover:text-accent transition-colors"
        >
          צור קשר
        </Link>
      </div>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        className="md:hidden p-2 hover:opacity-50 transition-opacity"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[200] bg-accent text-white transition-all duration-700 flex flex-col items-center justify-center",
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      )}>
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="absolute top-8 right-8 p-2"
        >
          <X size={30} strokeWidth={1} />
        </button>
        <div className="flex flex-col items-center space-y-10">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-headline font-light tracking-widest hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg tracking-[0.4em] uppercase text-primary pt-10"
          >
            צור קשר
          </Link>
        </div>
      </div>
    </nav>
  );
}