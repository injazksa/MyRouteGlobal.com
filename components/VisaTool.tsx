"use client";

import { useState, useEffect } from 'react';
import { getCountries, getVisaRules } from '@/lib/supabase';
import { Plane, Loader2, MapPin, Globe2 } from 'lucide-react';

export default function VisaTool() {
  const [countries, setCountries] = useState<any[]>([]);
  const [passport, setPassport] = useState("");
  const [dest, setDest] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const checkVisa = async () => {
    if (!passport || !dest) return;
    setLoading(true);
    setResult(null);
    
    const data = await getVisaRules(passport, dest);
    
    if (data) {
      setResult(data);
    } else {
      setResult({
        status: 'check',
        note: 'لا توجد بيانات دقيقة حالياً لهذه الوجهة. ننصح بالتواصل مع أقرب سفارة.',
        official_link: `https://www.google.com/search?q=visa+requirements+from+${passport}+to+${dest}`
      });
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'visa_free': return 'bg-green-50 border-green-200 text-green-700';
      case 'visa_on_arrival': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'e_visa': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'visa_required': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl border border-gray-100 max-w-3xl mx-auto my-6 md:my-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary flex justify-center items-center gap-3">
          <Plane className="text-accent shrink-0" size={28} /> 
          <span>فحص التأشيرات الدولية</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Globe2 size={16} className="text-accent" />
            جنسيتك (جواز السفر)
          </label>
          <div className="relative">
            <select 
              className="w-full p-4 border-2 border-gray-100 rounded-xl bg-gray-50 focus:border-accent focus:ring-0 transition-all appearance-none text-gray-800" 
              onChange={(e) => setPassport(e.target.value)}
              value={passport}
            >
              <option value="">اختر جنسيتك...</option>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name_ar}</option>)}
            </select>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <span className="text-xs">▼</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <MapPin size={16} className="text-accent" />
            الدولة المقصودة
          </label>
          <div className="relative">
            <select 
              className="w-full p-4 border-2 border-gray-100 rounded-xl bg-gray-50 focus:border-accent focus:ring-0 transition-all appearance-none text-gray-800" 
              onChange={(e) => setDest(e.target.value)}
              value={dest}
            >
              <option value="">إلى أين تريد السفر؟</option>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name_ar}</option>)}
            </select>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <span className="text-xs">▼</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={checkVisa} 
        disabled={loading || !passport || !dest} 
        className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 disabled:opacity-50 shadow-lg shadow-accent/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : 'تحقق من التأشيرة الآن'}
      </button>
      
      {result && (
        <div className={`mt-8 p-6 rounded-xl border-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 ${getStatusColor(result.status)}`}>
          <h3 className="text-2xl font-bold mb-2">
            {result.status === 'visa_free' && 'إعفاء من التأشيرة'}
            {result.status === 'visa_on_arrival' && 'تأشيرة عند الوصول'}
            {result.status === 'e_visa' && 'تأشيرة إلكترونية'}
            {result.status === 'visa_required' && 'تأشيرة مطلوبة'}
            {result.status === 'check' && 'تحقق من السفارة'}
          </h3>
          <p className="text-lg">{result.note || result.requirements_ar}</p>
          {result.official_link && (
            <a 
              href={result.official_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-white/50 rounded-full text-accent font-semibold hover:bg-white transition-colors border border-accent/20"
            >
              زيارة الموقع الرسمي →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
