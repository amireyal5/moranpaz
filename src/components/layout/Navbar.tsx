
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

export function Navbar() {
  const db = useFirestore();
  const settingsRef = useMemo(() => db ? doc(db, 'siteContent', 'global') : null, [db]);
  const { data: globalSettings } = useDoc<any>(settingsRef);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  
  const sitePhone = globalSettings?.sitePhone || "050-781-7338";
  const whatsappLink = `https://wa.me/${sitePhone.replace(/-/g, '').replace(/^0/, '972')}?text=היי%20מורן%20הגעתי%20מהאתר%20שלך%20מעוניין%20לקבל%20פרטים%20נוספים%20תודה`;

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

  const defaultNavItems = [
    { label: 'בית', href: '/' },
    { label: 'אודות', href: '/about' },
    { label: 'התהליך', href: '/practice' },
    { label: 'בלוג', href: '/blog' },
    { label: 'צור קשר', href: '/contact' },
  ];

  const navItems = globalSettings?.navItems?.length > 0 ? globalSettings.navItems : defaultNavItems;

  // Logic to determine if we should use the "solid" look (dark text)
  const useSolidLook = isScrolled || isAdminPage;

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[200] transition-all duration-700 px-4 md:px-8 lg:px-12 xl:px-24 flex justify-between items-center py-3 md:py-6",
        useSolidLook 
          ? 'bg-background/95 backdrop-blur-xl py-2 md:py-3 border-b border-border/30 shadow-sm' 
          : 'bg-transparent'
      )}>
        <NextLink 
          href="/"
          className="flex items-center gap-1.5 z-[220] group shrink-0"
        >
          {/* Logo Image */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 transition-transform duration-700 group-hover:scale-105">
            <Image 
              src="/logo.png"
              alt="Moran Paz Logo"
              fill
              className={cn(
                "object-contain transition-all duration-700",
                !useSolidLook && "brightness-0 invert drop-shadow-md"
              )}
              priority
            />
          </div>

          {/* Text Titles */}
          <div className="flex flex-col items-center translate-y-0.5">
            <span className={cn(
              "text-lg sm:text-2xl lg:text-3xl font-headline tracking-[0.2em] font-medium transition-all duration-700 leading-none text-center",
              useSolidLook ? "text-foreground" : "text-white drop-shadow-md"
            )}>
              {globalSettings?.siteName || "MORAN PAZ"}
            </span>
            <span 
              className={cn(
                "text-[13px] sm:text-base lg:text-[17px] font-handwriting tracking-widest transition-all duration-700 mt-2 leading-none font-bold text-center",
                useSolidLook ? "text-accent" : "text-white drop-shadow-sm"
              )}
            >
              {globalSettings?.siteSubtitle || "BeinMe — להיות אני בתוכי"}
            </span>
          </div>
        </NextLink>
        
        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-5 xl:gap-10 boutique-label">
          {navItems.map((item: any) => (
            <NextLink 
              key={item.href} 
              href={item.href} 
              className={cn(
                "relative py-1 transition-all duration-700 text-[12px] lg:text-[14px] xl:text-[16px] tracking-[0.1em] font-bold whitespace-nowrap",
                useSolidLook 
                  ? (pathname === item.href ? "text-primary" : "text-foreground/90 hover:text-primary") 
                  : (pathname === item.href ? "text-white" : "text-white hover:text-white/90 drop-shadow-md")
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className={cn(
                  "absolute bottom-0 right-0 w-full h-[1px] transition-all duration-700",
                  useSolidLook ? "bg-primary" : "bg-white"
                )} />
              )}
            </NextLink>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-4 xl:px-6 py-1.5 transition-all duration-700 text-[9px] xl:text-[11px] tracking-[0.15em] font-bold shadow-lg rounded-sm !text-white flex items-center gap-2 whitespace-nowrap",
              useSolidLook 
                ? "bg-primary hover:bg-accent" 
                : "bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:!text-primary"
            )}
          >
            פגישת היכרות
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          className={cn(
            "xl:hidden p-2 z-[230] relative",
            mobileMenuOpen && "hidden"
          )}
          aria-label="Menu"
        >
          <Menu 
            strokeWidth={1} 
            className={cn(
              "size-7 transition-colors duration-700",
              useSolidLook ? "text-foreground" : "text-white drop-shadow-md"
            )} 
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[300] bg-accent text-white transition-all duration-700 ease-in-out flex flex-col h-screen w-full",
        mobileMenuOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none invisible'
      )}>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 left-6 p-4 z-[310]"
        >
          <X strokeWidth={1} className="size-8 text-white/70 hover:text-white transition-colors" />
        </button>

        <div className="flex-1 overflow-y-auto flex flex-col items-center pt-20 sm:pt-32 pb-12">
          <div className="flex flex-col items-center space-y-6 sm:space-y-10 text-center w-full px-6">
            {navItems.map((item: any, i: number) => (
              <NextLink 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "relative text-2xl md:text-4xl font-headline tracking-[0.15em] transition-all duration-500 whitespace-nowrap",
                  pathname === item.href 
                    ? "text-white font-bold scale-110" 
                    : "text-white/60 font-light hover:text-white"
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary animate-in fade-in zoom-in duration-1000" />
                )}
              </NextLink>
            ))}
          </div>
          
          <div className="mt-auto pt-16 text-center w-full px-6">
            <div className="mashrabiya-divider opacity-10 mb-4 max-w-[100px] mx-auto"></div>
            <span className="boutique-label text-white/40 tracking-[0.4em] text-[9px]">
              {globalSettings?.siteName || "MORAN PAZ"} • {globalSettings?.siteSubtitle || "BEINME"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
