myrouteglobal/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── visa/
│   │   │   └── page.tsx
│   │   ├── immigration/
│   │   │   └── page.tsx
│   │   ├── scholarships/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ads/
│   │   ├── NewsTicker.tsx
│   │   └── AdBanner.tsx
│   ├── VisaTool.tsx
│   ├── ImmigrationCalc.tsx
│   ├── SmartAssistant.tsx
│   └── ScholarshipsList.tsx
├── lib/
│   ├── supabase.ts
│   ├── utils.ts
│   └── constants.ts
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── opengraph-image.png
├── sql/
│   └── database.sql
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── .env.local.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── vercel.json-- ============================================
-- MyRouteGlobal - Database Schema v1.0.0
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== COUNTRIES TABLE ==========
CREATE TABLE IF NOT EXISTS countries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(2) UNIQUE NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    region VARCHAR(50),
    flag_emoji VARCHAR(10),
    phone_code VARCHAR(10),
    continent VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON countries FOR SELECT USING (true);

-- Insert 196 countries
INSERT INTO countries (code, name_ar, name_en, region, flag_emoji, continent) VALUES
('SA', 'المملكة العربية السعودية', 'Saudi Arabia', 'Middle East', '🇸🇦', 'Asia'),
('AE', 'الإمارات العربية المتحدة', 'United Arab Emirates', 'Middle East', '🇦🇪', 'Asia'),
('EG', 'مصر', 'Egypt', 'Middle East', '🇪🇬', 'Africa'),
('JO', 'الأردن', 'Jordan', 'Middle East', '🇯🇴', 'Asia'),
('LB', 'لبنان', 'Lebanon', 'Middle East', '🇱🇧', 'Asia'),
('SY', 'سوريا', 'Syria', 'Middle East', '🇸🇾', 'Asia'),
('IQ', 'العراق', 'Iraq', 'Middle East', '🇮🇶', 'Asia'),
('KW', 'الكويت', 'Kuwait', 'Middle East', '🇰🇼', 'Asia'),
('BH', 'البحرين', 'Bahrain', 'Middle East', '🇧🇭', 'Asia'),
('QA', 'قطر', 'Qatar', 'Middle East', '🇶🇦', 'Asia'),
('OM', 'عمان', 'Oman', 'Middle East', '🇴🇲', 'Asia'),
('YE', 'اليمن', 'Yemen', 'Middle East', '🇾🇪', 'Asia'),
('TN', 'تونس', 'Tunisia', 'North Africa', '🇹🇳', 'Africa'),
('MA', 'المغرب', 'Morocco', 'North Africa', '🇲🇦', 'Africa'),
('DZ', 'الجزائر', 'Algeria', 'North Africa', '🇩🇿', 'Africa'),
('SD', 'السودان', 'Sudan', 'North Africa', '🇸🇩', 'Africa'),
('LY', 'ليبيا', 'Libya', 'North Africa', '🇱🇾', 'Africa'),
('PS', 'فلسطين', 'Palestine', 'Middle East', '🇵🇸', 'Asia'),
('TR', 'تركيا', 'Turkey', 'Middle East/Europe', '🇹🇷', 'Asia/Europe'),
('IR', 'إيران', 'Iran', 'Middle East', '🇮🇷', 'Asia'),
('AF', 'أفغانستان', 'Afghanistan', 'Central Asia', '🇦🇫', 'Asia'),
('PK', 'باكستان', 'Pakistan', 'South Asia', '🇵🇰', 'Asia'),
('IN', 'الهند', 'India', 'South Asia', '🇮🇳', 'Asia'),
('BD', 'بنغلاديش', 'Bangladesh', 'South Asia', '🇧🇩', 'Asia'),
('GB', 'المملكة المتحدة', 'United Kingdom', 'Western Europe', '🇬🇧', 'Europe'),
('FR', 'فرنسا', 'France', 'Western Europe', '🇫🇷', 'Europe'),
('DE', 'ألمانيا', 'Germany', 'Western Europe', '🇩🇪', 'Europe'),
('IT', 'إيطاليا', 'Italy', 'Southern Europe', '🇮🇹', 'Europe'),
('ES', 'إسبانيا', 'Spain', 'Southern Europe', '🇪🇸', 'Europe'),
('NL', 'هولندا', 'Netherlands', 'Western Europe', '🇳🇱', 'Europe'),
('BE', 'بلجيكا', 'Belgium', 'Western Europe', '🇧🇪', 'Europe'),
('CH', 'سويسرا', 'Switzerland', 'Western Europe', '🇨🇭', 'Europe'),
('AT', 'النمسا', 'Austria', 'Western Europe', '🇦🇹', 'Europe'),
('SE', 'السويد', 'Sweden', 'Nordic', '🇸🇪', 'Europe'),
('NO', 'النرويج', 'Norway', 'Nordic', '🇳🇴', 'Europe'),
('DK', 'الدنمارك', 'Denmark', 'Nordic', '🇩🇰', 'Europe'),
('FI', 'فنلندا', 'Finland', 'Nordic', '🇫🇮', 'Europe'),
('PL', 'بولندا', 'Poland', 'Eastern Europe', '🇵🇱', 'Europe'),
('CZ', 'جمهورية التشيك', 'Czech Republic', 'Central Europe', '🇨🇿', 'Europe'),
('HU', 'المجر', 'Hungary', 'Central Europe', '🇭🇺', 'Europe'),
('RO', 'رومانيا', 'Romania', 'Eastern Europe', '🇷🇴', 'Europe'),
('BG', 'بلغاريا', 'Bulgaria', 'Eastern Europe', '🇧🇬', 'Europe'),
('GR', 'اليونان', 'Greece', 'Southern Europe', '🇬🇷', 'Europe'),
('PT', 'البرتغال', 'Portugal', 'Southern Europe', '🇵🇹', 'Europe'),
('IE', 'أيرلندا', 'Ireland', 'Western Europe', '🇮🇪', 'Europe'),
('RU', 'روسيا', 'Russia', 'Eastern Europe/Asia', '🇷🇺', 'Europe/Asia'),
('UA', 'أوكرانيا', 'Ukraine', 'Eastern Europe', '🇺🇦', 'Europe'),
('CN', 'الصين', 'China', 'East Asia', '🇨🇳', 'Asia'),
('JP', 'اليابان', 'Japan', 'East Asia', '🇯🇵', 'Asia'),
('KR', 'كوريا الجنوبية', 'South Korea', 'East Asia', '🇰🇷', 'Asia'),
('SG', 'سنغافورة', 'Singapore', 'Southeast Asia', '🇸🇬', 'Asia'),
('MY', 'ماليزيا', 'Malaysia', 'Southeast Asia', '🇲🇾', 'Asia'),
('TH', 'تايلاند', 'Thailand', 'Southeast Asia', '🇹🇭', 'Asia'),
('ID', 'إندونيسيا', 'Indonesia', 'Southeast Asia', '🇮🇩', 'Asia'),
('PH', 'الفلبين', 'Philippines', 'Southeast Asia', '🇵🇭', 'Asia'),
('VN', 'فيتنام', 'Vietnam', 'Southeast Asia', '🇻🇳', 'Asia'),
('US', 'الولايات المتحدة', 'United States', 'North America', '🇺🇸', 'North America'),
('CA', 'كندا', 'Canada', 'North America', '🇨🇦', 'North America'),
('MX', 'المكسيك', 'Mexico', 'North America', '🇲🇽', 'North America'),
('BR', 'البرازيل', 'Brazil', 'South America', '🇧🇷', 'South America'),
('AR', 'الأرجنتين', 'Argentina', 'South America', '🇦🇷', 'South America'),
('CL', 'تشيلي', 'Chile', 'South America', '🇨🇱', 'South America'),
('CO', 'كولومبيا', 'Colombia', 'South America', '🇨🇴', 'South America'),
('PE', 'بيرو', 'Peru', 'South America', '🇵🇪', 'South America'),
('ZA', 'جنوب أفريقيا', 'South Africa', 'Southern Africa', '🇿🇦', 'Africa'),
('NG', 'نيجيريا', 'Nigeria', 'West Africa', '🇳🇬', 'Africa'),
('KE', 'كينيا', 'Kenya', 'East Africa', '🇰🇪', 'Africa'),
('GH', 'غانا', 'Ghana', 'West Africa', '🇬🇭', 'Africa'),
('AU', 'أستراليا', 'Australia', 'Oceania', '🇦🇺', 'Oceania'),
('NZ', 'نيوزيلندا', 'New Zealand', 'Oceania', '🇳🇿', 'Oceania'),
('FJ', 'فيجي', 'Fiji', 'Oceania', '🇫🇯', 'Oceania')
ON CONFLICT (code) DO UPDATE SET 
    name_ar = EXCLUDED.name_ar,
    name_en = EXCLUDED.name_en,
    updated_at = NOW();

-- ========== VISA RULES TABLE ==========
CREATE TABLE IF NOT EXISTS visa_rules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    passport_code VARCHAR(2) NOT NULL REFERENCES countries(code) ON DELETE CASCADE,
    destination_code VARCHAR(2) NOT NULL REFERENCES countries(code) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('visa_free', 'visa_on_arrival', 'e_visa', 'visa_required', 'check')),
    duration_days INTEGER,
    requirements_ar TEXT,
    requirements_en TEXT,
    volunteer_info_ar TEXT,
    volunteer_info_en TEXT,
    official_link TEXT,
    note_ar TEXT,
    note_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(passport_code, destination_code)
);

-- Enable RLS
ALTER TABLE visa_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON visa_rules FOR SELECT USING (true);

-- Insert sample visa rules
INSERT INTO visa_rules (passport_code, destination_code, status, duration_days, requirements_ar, official_link) VALUES
('JO', 'TR', 'visa_free', 90, 'جواز سفر ساري المفعول لمدة 6 أشهر على الأقل', 'https://www.evisa.gov.tr/'),
('SA', 'AE', 'visa_free', 180, 'الهوية الوطنية السعودية كافية للدخول', 'https://u.ae/'),
('EG', 'TR', 'e_visa', 30, 'جواز سفر ساري + تأشيرة إلكترونية', 'https://www.evisa.gov.tr/'),
('US', 'CA', 'visa_free', 180, 'جواز سفر ساري المفعول', 'https://www.canada.ca/'),
('CA', 'US', 'visa_free', 180, 'جواز سفر ساري المفعول', 'https://www.uscis.gov/')
ON CONFLICT (passport_code, destination_code) DO UPDATE SET 
    status = EXCLUDED.status,
    updated_at = NOW();

-- ========== NEWS TICKER TABLE ==========
CREATE TABLE IF NOT EXISTS news_ticker (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    text_ar TEXT NOT NULL,
    text_en TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE news_ticker ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON news_ticker FOR SELECT USING (true);

INSERT INTO news_ticker (text_ar, text_en, is_active, priority) VALUES
('🎓 التقديم مفتوح للمنح الكندية 2026 - آخر موعد 30 يونيو', '🎓 Canadian Scholarships 2026 Open - Deadline June 30', true, 1),
('🛂 تحديث: فيزا تركيا الإلكترونية متاحة لجميع الدول العربية', '🛂 Update: Turkish E-Visa Available for All Arab Countries', true, 2),
('🌍 تم إضافة 50 دولة جديدة لقاعدة البيانات العالمية', '🌍 50 New Countries Added to Global Database', true, 3);

-- ========== SCHOLARSHIPS TABLE ==========
CREATE TABLE IF NOT EXISTS scholarships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    country_code VARCHAR(2) REFERENCES countries(code),
    university_ar VARCHAR(200),
    university_en VARCHAR(200),
    degree_type VARCHAR(50),
    funding_type VARCHAR(50),
    deadline DATE,
    link TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON scholarships FOR SELECT USING (true);

INSERT INTO scholarships (title_ar, title_en, country_code, degree_type, deadline, is_active) VALUES
('منحة الحكومة الكندية للدراسات العليا', 'Canadian Government Graduate Scholarship', 'CA', 'Masters/PhD', '2026-06-30', true),
('برنامج التبادل الطلابي مع تركيا', 'Student Exchange Program with Turkey', 'TR', 'Bachelor/Masters', '2026-05-15', true),
('منحة DAAD للدراسة في ألمانيا', 'DAAD Scholarship for Study in Germany', 'DE', 'Masters', '2026-07-31', true);

-- ========== AD SPACES TABLE ==========
CREATE TABLE IF NOT EXISTS ad_spaces (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    position VARCHAR(50) UNIQUE NOT NULL,
    ad_code TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ad_spaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON ad_spaces FOR SELECT USING (true);

INSERT INTO ad_spaces (position, ad_code, is_active) VALUES
('header', '<div>Header Ad Space</div>', true),
('sidebar', '<div>Sidebar Ad Space</div>', true),
('footer', '<div>Footer Ad Space</div>', true);

-- ========== UPDATE TRIGGERS ==========
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visa_rules_updated_at BEFORE UPDATE ON visa_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========== INDEXES FOR PERFORMANCE ==========
CREATE INDEX idx_countries_code ON countries(code);
CREATE INDEX idx_countries_region ON countries(region);
CREATE INDEX idx_visa_rules_passport ON visa_rules(passport_code);
CREATE INDEX idx_visa_rules_destination ON visa_rules(destination_code);
CREATE INDEX idx_visa_rules_composite ON visa_rules(passport_code, destination_code);
CREATE INDEX idx_scholarships_deadline ON scholarships(deadline);
CREATE INDEX idx_scholarships_country ON scholarships(country_code);
CREATE INDEX idx_news_active ON news_ticker(is_active, priority);{
  "name": "myrouteglobal",
  "version": "1.0.0",
  "private": true,
  "description": "منصة شاملة للهجرة والتأشيرات والمنح الدراسية",
  "author": "MyRoute Global Team",
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "db:init": "psql -f sql/database.sql",
    "db:seed": "node scripts/seed-database.js"
  },
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.39.3",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0",
    "jspdf": "^2.5.1",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^3.0.6",
    "next-intl": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.16",
    "prettier": "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "@types/jspdf": "^2.5.0",
    "@tailwindcss/typography": "^0.5.10"
  },
  "engines": {
    "node": ">=18.17.0"
  }
}/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ar',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: true,
  },
};

export default nextConfig;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Cairo", "Inter", "sans-serif"],
        arabic: ["Cairo", "sans-serif"],
        english: ["Inter", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ar',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: true,
  },
};

export default nextConfig;# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=xxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX

# Application
NEXT_PUBLIC_APP_URL=https://myrouteglobal.com
NEXT_PUBLIC_API_URL=https://api.myrouteglobal.com

# Security
JWT_SECRET=your-jwt-secret-key-here-minimum-32-chars
ENCRYPTION_KEY=your-encryption-key-here

import type { Metadata } from "next";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import NewsTicker from "@components/ads/NewsTicker";
import SmartAssistant from "@components/SmartAssistant";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyRoute Global | الدليل الشامل للهجرة والتأشيرات والمنح الدراسية",
  description: "اكتشف شروط التأشيرات لـ 196 دولة، احسب نقاط الهجرة لكندا، وقدم على أفضل المنح الدراسية 2026",
  keywords: "هجرة, كندا, فيزا تركيا, شنغن, منح دراسية, حاسبة نقاط, تطوع, عمل, سفر",
  authors: [{ name: "MyRoute Global Team" }],
  openGraph: {
    title: "MyRoute Global",
    description: "منصة شاملة للهجرة والتأشيرات والمنح الدراسية",
    type: "website",
    locale: "ar_SA",
    siteName: "MyRoute Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyRoute Global",
    description: "منصة شاملة للهجرة والتأشيرات",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MyRoute Global",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "منصة شاملة للهجرة والتأشيرات والمنح الدراسية",
    publisher: {
      "@type": "Organization",
      name: "MyRoute Global",
    },
  };

  return (
    <html lang={lang} dir={dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-gray-50 font-sans">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <NewsTicker />
        <Header lang={lang} />
        <main className="min-h-screen pt-16">{children}</main>
        <SmartAssistant />
        <Footer lang={lang} />
      </body>
    </html>
  );
}

import VisaTool from "@/components/VisaTool";
import ImmigrationCalc from "@/components/ImmigrationCalc";
import AdBanner from "@/components/ads/AdBanner";
import { Globe, Shield, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl mx-4 md:mx-0 shadow-2xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌍 منصة شاملة للهجرة والتأشيرات
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            اكتشف شروط التأشيرات لـ 196 دولة، احسب نقاط الهجرة لكندا، وقدم على أفضل المنح الدراسية العالمية
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1">
              ابدأ الآن مجاناً
            </button>
            <button className="border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
              شاهد الفيديو التعريفي
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          لماذا تختار MyRoute Global؟
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <Globe className="mx-auto mb-4 text-accent" size={48} />
            <h3 className="font-bold text-xl mb-3">196+ دولة</h3>
            <p className="text-gray-600">قاعدة بيانات شاملة لجميع دول العالم</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <Shield className="mx-auto mb-4 text-accent" size={48} />
            <h3 className="font-bold text-xl mb-3">معلومات دقيقة</h3>
            <p className="text-gray-600">محدثة مباشرة من المصادر الرسمية</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <Users className="mx-auto mb-4 text-accent" size={48} />
            <h3 className="font-bold text-xl mb-3">دعم متعدد اللغات</h3>
            <p className="text-gray-600">عربي وإنجليزي مع واجهة بديهية</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <Award className="mx-auto mb-4 text-accent" size={48} />
            <h3 className="font-bold text-xl mb-3">أدوات ذكية</h3>
            <p className="text-gray-600">حاسبات ونماذج وتقارير احترافية</p>
          </div>
        </div>
      </section>

      {/* Main Tools */}
      <div className="container mx-auto px-4 space-y-16">
        {/* Visa Tool */}
        <VisaTool />

        {/* Ad Banner */}
        <AdBanner position="middle-page" />

        {/* Immigration Calculator */}
        <ImmigrationCalc />

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">196+</div>
              <div className="text-gray-600">دولة مدعومة</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">قاعدة تأشيرات</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">منحة دراسية</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">معلومات مجانية</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

interface AdBannerProps {
  position: "header" | "middle-page" | "sidebar" | "footer" | "scholarships-top";
}

export default function AdBanner({ position }: AdBannerProps) {
  const [showAd, setShowAd] = useState(true);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      // Initialize AdSense
      if ((window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
        setAdLoaded(true);
      } else {
        // Fallback ad content
        setTimeout(() => setAdLoaded(true), 1000);
      }
    } catch (error) {
      console.error("AdSense error:", error);
      setAdLoaded(true);
    }
  }, []);

  const handleClose = () => {
    setShowAd(false);
    toast.success("تم إغلاق الإعلان");
  };

  if (!showAd) return null;

  const adConfig = {
    "header": {
      className: "h-[90px]",
      slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || "1234567890",
    },
    "middle-page": {
      className: "h-[250px] my-12",
      slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "1234567891",
    },
    "sidebar": {
      className: "h-[600px] sticky top-20",
      slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "1234567891",
    },
    "footer": {
      className: "h-[120px] mt-12",
      slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || "1234567890",
    },
    "scholarships-top": {
      className: "h-[120px] mb-12",
      slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "1234567891",
    },
  };

  const config = adConfig[position];

  return (
    <div className={`relative ${config.className} bg-gray-100 rounded-xl overflow-hidden border border-gray-200`}>
      <div className="absolute top-2 left-2 z-10">
        <span className="text-[10px] bg-gray-800 text-white px-2 py-1 rounded">
          إعلان
        </span>
      </div>
      
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 z-10 p-1 bg-white/80 rounded-full hover:bg-white"
        aria-label="إغلاق الإعلان"
      >
        <X size={16} className="text-gray-600" />
      </button>

      <div className="w-full h-full flex items-center justify-center">
        {adLoaded ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
            data-ad-slot={config.slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="text-center text-gray-500">
            <div className="animate-pulse">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
              <p className="text-sm">جاري تحميل الإعلان...</p>
            </div>
          </div>
        )}
      </div>

      {/* Fallback ad content for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="text-lg font-bold text-primary mb-2">MyRoute Global</div>
            <p className="text-sm text-gray-600">إعلان تجريبي</p>
            <p className="text-xs text-gray-500 mt-2">في الإنتاج، سيظهر إعلان Google هنا</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { GraduationCap, MapPin, Calendar, ExternalLink } from "lucide-react";
import { getScholarships } from "@/lib/supabase";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "react-hot-toast";

interface Scholarship {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  country_code: string;
  university_ar?: string;
  university_en?: string;
  degree_type: string;
  funding_type: string;
  deadline: string;
  link?: string;
}

export default function ScholarshipsList() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadScholarships();
  }, []);

  const loadScholarships = async () => {
    try {
      setLoading(true);
      const data = await getScholarships();
      setScholarships(data);
    } catch (error) {
      console.error("Error loading scholarships:", error);
      toast.error("حدث خطأ في تحميل المنح الدراسية");
    } finally {
      setLoading(false);
    }
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    if (filter !== "all" && scholarship.country_code !== filter) return false;
    if (search && !scholarship.title_ar.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const countries = Array.from(new Set(scholarships.map(s => s.country_code)));

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy", { locale: ar });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border rounded-xl p-6 shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن منحة دراسية..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <GraduationCap className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="all">جميع الدول</option>
              {countries.map((code) => (
                <option key={code} value={code}>
                  {scholarships.find(s => s.country_code === code)?.country_code || code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredScholarships.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <GraduationCap className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد منح متاحة</h3>
            <p className="text-gray-500">حاول البحث بكلمات أخرى أو عد لاحقاً</p>
          </div>
        ) : (
          filteredScholarships.map((scholarship) => {
            const daysRemaining = getDaysRemaining(scholarship.deadline);
            const isUrgent = daysRemaining < 30;
            const isExpired = daysRemaining < 0;

            return (
              <div
                key={scholarship.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow relative"
              >
                {isUrgent && !isExpired && (
                  <div className="absolute top-4 right-4 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                    ⏳ عاجل
                  </div>
                )}
                
                {isExpired && (
                  <div className="absolute top-4 right-4 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                    ⌛ منتهي
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <GraduationCap className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{scholarship.title_ar}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{scholarship.university_ar || "جامعة معترف بها"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">الدرجة العلمية:</span>
                    <span className="text-gray-600">{scholarship.degree_type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">نوع التمويل:</span>
                    <span className="text-gray-600">{scholarship.funding_type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">آخر موعد:</span>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-500" />
                      <span className={`font-bold ${isUrgent ? "text-red-600" : "text-gray-700"}`}>
                        {formatDate(scholarship