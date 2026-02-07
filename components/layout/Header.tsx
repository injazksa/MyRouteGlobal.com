'use client';

import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ lang }: { lang: string }) {
  const isArabic = lang === "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl text-primary">
          <Globe className="h-6 w-6 text-accent" />
          <span className="hidden sm:inline">MyRouteGlobal</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href={`/${lang}/visa`} className="hover:text-accent transition-colors">
            {isArabic ? "فحص التأشيرات" : "Visa Checker"}
          </Link>
          <Link href={`/${lang}/immigration`} className="hover:text-accent transition-colors">
            {isArabic ? "نقاط الهجرة" : "Immigration Points"}
          </Link>
          <Link href={`/${lang}/scholarships`} className="hover:text-accent transition-colors">
            {isArabic ? "المنح الدراسية" : "Scholarships"}
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href={isArabic ? "/en" : "/ar"} className="text-sm font-medium hover:text-accent transition-colors">
            {isArabic ? "EN" : "AR"}
          </Link>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link href={`/${lang}/visa`} className="block hover:text-accent">{isArabic ? "فحص التأشيرات" : "Visa Checker"}</Link>
            <Link href={`/${lang}/immigration`} className="block hover:text-accent">{isArabic ? "نقاط الهجرة" : "Immigration Points"}</Link>
            <Link href={`/${lang}/scholarships`} className="block hover:text-accent">{isArabic ? "المنح الدراسية" : "Scholarships"}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
