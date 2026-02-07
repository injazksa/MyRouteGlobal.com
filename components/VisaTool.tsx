"use client";

import { useState, useEffect } from 'react';
import { getCountries, getVisaRules } from '@/lib/supabase';
import { Plane, Loader2 } from 'lucide-react';

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
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-3xl mx-auto my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-3">
          <Plane className="text-accent" size={32} /> فحص التأشيرات الدولية
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">جنسيتك</label>
          <select className="w-full p-3 border rounded-lg bg-gray-50" onChange={(e) => setPassport(e.target.value)}>
            <option value="">اختر جنسيتك...</option>
            {countries.map((c) => <option key={c.code} value={c.code}>{c.name_ar}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الدولة المقصودة</label>
          <select className="w-full p-3 border rounded-lg bg-gray-50" onChange={(e) => setDest(e.target.value)}>
            <option value="">إلى أين تريد السفر؟</option>
            {countries.map((c) => <option key={c.code} value={c.code}>{c.name_ar}</option>)}
          </select>
        </div>
      </div>
      
      <button onClick={checkVisa} disabled={loading || !passport || !dest} className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2">
        {loading ? <Loader2 className="animate-spin" size={20} /> : 'تحقق من التأشيرة'}
      </button>
      
      {result && (
        <div className={`mt-8 p-6 rounded-xl border-2 text-center ${getStatusColor(result.status)}`}>
          <h3 className="text-2xl font-bold mb-2">{result.status}</h3>
          <p>{result.note}</p>
          {result.official_link && <a href={result.official_link} target="_blank" className="inline-block mt-4 text-accent hover:underline">زيارة الموقع الرسمي →</a>}
        </div>
      )}
    </div>
  );
}
