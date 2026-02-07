"use client";

import { useEffect, useState } from 'react';
import { getNews } from '@/lib/supabase';
import { Bell } from 'lucide-react';

export default function NewsTicker() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="bg-red-600 text-white text-sm py-2 overflow-hidden relative flex items-center shadow-md">
      <div className="bg-red-800 px-4 py-2 z-10 font-bold flex gap-2 items-center absolute right-0 h-full">
        <Bell size={16} className="animate-pulse text-yellow-400" /> أخبار
      </div>
      <div className="animate-marquee whitespace-nowrap flex gap-10 pr-24 w-full">
        {news.map((item, index) => (
          <span key={index} className="inline-block px-4 border-l border-red-400/50">
            {item.text_ar}
          </span>
        ))}
      </div>
    </div>
  );
}
