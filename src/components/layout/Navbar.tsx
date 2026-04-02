
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

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'בית', href: '/' },
    { label: 'התהליך הטיפולי', href: '/practice' },
    { label: 'סדנת BEINME', href: '/workshop' },
    { label: 'טיפול בטבעון', href: '/tivon' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed w-full z-[100] transition-all duration-500 px-6 md:px-16 flex justify-between items-center",
      isScrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
    )}>
      <Link 
        href="/"
        className={cn(
          "text-xl md:text-2xl font-headline tracking-tighter font-bold uppercase transition-colors",
          isScrolled || !isHome ? 'text-foreground' : 'text-white'
        )}
      >
        MORAN PAZ
      </Link>
      
      <div className={cn(
        "hidden md:flex items-center space-x-reverse space-x-8 text-xs uppercase tracking-[0.2em] font-bold",
        isScrolled || !isHome ? 'text-foreground' : 'text-stone-100'
      )}>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={cn(
              "nav-link relative after:absolute after:bottom-[-4px] after:right-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
              pathname === item.href ? "after:w-full" : "after:w-0"
            )}
          >
            {item.label}
          </Link>
        ))}
        <Link 
          href="#contact" 
          className={cn(
            "px-6 py-2 rounded-full border transition-all",
            isScrolled || !isHome 
              ? 'border-primary text-primary hover:bg-primary hover:text-white' 
              : 'border-white/40 text-white hover:bg-white hover:text-foreground'
          )}
        >
          צור קשר
        </Link>
      </div>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        className={cn(
          "md:hidden p-2 rounded-full transition-colors",
          isScrolled || !isHome ? 'text-foreground bg-secondary' : 'text-white bg-black/20'
        )}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[200] bg-white transition-all duration-500 flex flex-col items-center justify-center space-y-8",
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      )}>
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="absolute top-8 right-8 p-2 text-foreground"
        >
          <X size={32} />
        </button>
        <div className="flex flex-col items-center space-y-8">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={handleLinkClick}
              className="text-3xl font-headline hover:italic transition-all uppercase text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact" 
            onClick={handleLinkClick}
            className="text-3xl font-headline hover:italic transition-all uppercase text-primary font-bold"
          >
            צור קשר
          </Link>
        </div>
      </div>
    </nav>
  );
}
