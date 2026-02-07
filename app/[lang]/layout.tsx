import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsTicker from "@/components/ads/NewsTicker";
import SmartAssistant from "@/components/SmartAssistant";
import "../globals.css";

export const metadata: Metadata = {
  title: "MyRoute Global | دليل الهجرة والتأشيرات والمنح الدراسية",
  description: "اكتشف شروط التأشيرات لـ 196 دولة، احسب نقاط الهجرة لكندا، وقدم على أفضل المنح الدراسية 2026.",
  keywords: "هجرة، كندا، فيزا تركيا، شنغن، منح دراسية، حاسبة نقاط، تطوع، عمل، سفر",
};

export default function RootLayout({ 
  children, 
  params: { lang } 
}: { 
  children: React.ReactNode; 
  params: { lang: string } 
}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MyRoute Global",
    "operatingSystem": "All",
    "applicationCategory": "TravelApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang={lang} dir={dir}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-gray-50">
        <NewsTicker />
        <Header lang={lang} />
        <main className="min-h-screen">
          {children}
        </main>
        <SmartAssistant />
        <Footer lang={lang} />
      </body>
    </html>
  );
}
