import Link from "next/link";
import { Plane, GraduationCap, Map, ArrowRight, CheckCircle2, Globe2, ShieldCheck, Zap } from "lucide-react";
import VisaTool from "@/components/VisaTool";
import ImmigrationCalc from "@/components/ImmigrationCalc";

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === "ar";

  const content = {
    hero: {
      badge: isArabic ? "تحديثات 2026 متوفرة الآن" : "2026 Updates Now Available",
      title: isArabic ? "بوابتك الذكية نحو" : "Your Smart Gateway to",
      titleAccent: isArabic ? "العالم" : "The World",
      desc: isArabic 
        ? "المنصة العربية الأولى المتكاملة لخدمات الهجرة، فحص التأشيرات، والمنح الدراسية. نضع العالم بين يديك بضغطة زر."
        : "The leading integrated platform for immigration services, visa checking, and scholarships. We put the world at your fingertips.",
      cta: isArabic ? "ابدأ رحلتك الآن" : "Start Your Journey",
      secondaryCta: isArabic ? "اكتشف الخدمات" : "Explore Services"
    },
    features: [
      {
        icon: <Plane className="w-6 h-6" />,
        title: isArabic ? "فحص التأشيرات" : "Visa Checker",
        desc: isArabic ? "قاعدة بيانات لـ 196 دولة محدثة لحظياً." : "Real-time database for 196 countries."
      },
      {
        icon: <Map className="w-6 h-6" />,
        title: isArabic ? "نقاط الهجرة" : "Immigration Points",
        desc: isArabic ? "حاسبة دقيقة لنظام الـ CRS الكندي وغيره." : "Accurate calculator for Canadian CRS and more."
      },
      {
        icon: <GraduationCap className="w-6 h-6" />,
        title: isArabic ? "المنح الدراسية" : "Scholarships",
        desc: isArabic ? "أحدث فرص التمويل الدراسي حول العالم." : "Latest funding opportunities worldwide."
      }
    ]
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-20 overflow-hidden hero-gradient">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold animate-bounce">
              <Zap size={16} />
              {content.hero.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight">
              {content.hero.title} <br />
              <span className="text-accent relative inline-block">
                {content.hero.titleAccent}
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-accent/20 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {content.hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                {content.hero.cta}
                <ArrowRight className={isArabic ? "rotate-180" : ""} />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-primary border-2 border-gray-100 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all">
                {content.hero.secondaryCta}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-12 opacity-60">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldCheck className="text-green-500" />
                {isArabic ? "بيانات موثوقة" : "Verified Data"}
              </div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Globe2 className="text-blue-500" />
                {isArabic ? "تغطية عالمية" : "Global Coverage"}
              </div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="text-accent" />
                {isArabic ? "تحديثات يومية" : "Daily Updates"}
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 space-y-32">
        <div id="visa-tool" className="scroll-mt-24">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-primary">
              {isArabic ? "فحص متطلبات التأشيرة" : "Check Visa Requirements"}
            </h2>
            <p className="text-gray-500 font-medium">
              {isArabic ? "اختر جنسيتك ووجهتك لمعرفة كافة التفاصيل" : "Select your nationality and destination for full details"}
            </p>
          </div>
          <VisaTool />
        </div>

        <div id="immigration-calc" className="scroll-mt-24">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-primary">
              {isArabic ? "حاسبة نقاط الهجرة الذكية" : "Smart Immigration Calculator"}
            </h2>
            <p className="text-gray-500 font-medium">
              {isArabic ? "احصل على تقرير مفصل لفرصك في الهجرة" : "Get a detailed report of your immigration chances"}
            </p>
          </div>
          <ImmigrationCalc />
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features.map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
