import Link from "next/link";
import { Globe, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer({ lang }: { lang: string }) {
  const isAr = lang === "ar";
  
  return (
    <footer className="bg-primary text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link href={`/${lang}`} className="flex items-center gap-2 text-white font-bold text-2xl">
              <Globe className="text-accent h-8 w-8" /> MyRouteGlobal
            </Link>
            <p className="text-sm leading-relaxed">
              {isAr ? "المنصة العالمية الأولى المتخصصة في حلول الهجرة المبتكرة." : "The world's leading platform for innovative immigration solutions."}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{isAr ? "الأدوات" : "Tools"}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href={`/${lang}/visa`} className="hover:text-accent">{isAr ? "فحص التأشيرات" : "Visa Checker"}</Link></li>
              <li><Link href={`/${lang}/immigration`} className="hover:text-accent">{isAr ? "حاسبة النقاط" : "CRS Calculator"}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{isAr ? "الدعم" : "Support"}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href={`/${lang}/privacy`} className="hover:text-accent">{isAr ? "الخصوصية" : "Privacy"}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{isAr ? "تابعنا" : "Follow Us"}</h4>
            <div className="flex gap-4">
              <Facebook size={20} className="cursor-pointer hover:text-accent" />
              <Twitter size={20} className="cursor-pointer hover:text-accent" />
              <Instagram size={20} className="cursor-pointer hover:text-accent" />
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          © {new Date().getFullYear()} MyRoute Global.
        </div>
      </div>
    </footer>
  );
}
