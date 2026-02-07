'use client';

import { useEffect, useState } from 'react';
import { getNewsTicker } from '@/lib/supabase';
import { Megaphone, X } from 'lucide-react';

export default function NewsTicker() {
  const [news, setNews] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNewsTicker();
      setNews(data);
    };
    fetchNews();
  }, []);

  if (!isVisible || news.length === 0) return null;

  return (
    <div className="relative bg-primary text-white py-2 overflow-hidden border-b border-white/10 z-[60]">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-lg font-black text-xs uppercase tracking-wider shrink-0 z-10 shadow-sm">
          <Megaphone size={14} />
          <span className="hidden sm:inline">آخر الأخبار</span>
          <span className="sm:hidden">عاجل</span>
        </div>

        <div className="relative flex-1 overflow-hidden h-6">
          <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-12">
            {news.map((item, index) => (
              <div key={index} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-sm font-bold hover:text-accent transition-colors">
                  {item.text_ar} | {item.text_en}
                </span>
              </div>
            ))}
            {news.map((item, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-sm font-bold hover:text-accent transition-colors">
                  {item.text_ar} | {item.text_en}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors shrink-0"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
