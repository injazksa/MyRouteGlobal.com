'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header({ lang }: { lang: string }) {
  const isArabic = lang === "ar";
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // تأثير عند التمرير لتغيير مظهر الهيدر
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // وظيفة للحصول على الرابط المقابل باللغة الأخرى
  const getTransLink = (targetLang: string) => {
    const segments = pathname.split('/');
    segments[1] = targetLang;
    return segments.join('/') || `/${targetLang}`;
  };

  const navLinks = [
    { href: `/${lang}/visa`, label: isArabic ? "فحص التأشيرات" : "Visa Checker" },
    { href: `/${lang}/immigration`, label: isArabic ? "نقاط الهجرة" : "Immigration Points" },
    { href: `/${lang}/scholarships`, label: isArabic ? "المنح الدراسية" : "Scholarships" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-primary">MyRoute<span className="text-accent">Global</span></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 leading-none">Travel & Immigration</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-primary/5 ${
                pathname === link.href ? "text-primary bg-primary/10" : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href={getTransLink(isArabic ? "en" : "ar")} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all text-sm font-black text-gray-700"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span>{isArabic ? "English" : "العربية"}</span>
          </Link>
          
          <button 
            className="md:hidden p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 md:hidden bg-white animate-in fade-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 text-gray-800 font-bold transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                <ChevronRight className={`h-5 w-5 text-primary ${isArabic ? "rotate-180" : ""}`} />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
