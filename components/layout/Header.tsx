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
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl text-primary shrink-0">
          <Globe className="h-6 w-6 text-accent" />
          <span className="inline">MyRouteGlobal</span>
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
          <Link href={isArabic ? "/en" : "/ar"} className="text-sm font-medium hover:text-accent transition-colors px-2 py-1 border rounded hover:bg-gray-50">
            {isArabic ? "English" : "العربية"}
          </Link>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-white animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 space-y-6 text-lg font-medium shadow-xl h-full border-t">
            <Link 
              href={`/${lang}/visa`} 
              className="flex items-center justify-between border-b pb-4 hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{isArabic ? "فحص التأشيرات" : "Visa Checker"}</span>
              <span className={isArabic ? "rotate-180" : ""}>→</span>
            </Link>
            <Link 
              href={`/${lang}/immigration`} 
              className="flex items-center justify-between border-b pb-4 hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{isArabic ? "نقاط الهجرة" : "Immigration Points"}</span>
              <span className={isArabic ? "rotate-180" : ""}>→</span>
            </Link>
            <Link 
              href={`/${lang}/scholarships`} 
              className="flex items-center justify-between border-b pb-4 hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{isArabic ? "المنح الدراسية" : "Scholarships"}</span>
              <span className={isArabic ? "rotate-180" : ""}>→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
