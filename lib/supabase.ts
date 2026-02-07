import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCountries() {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('name_ar', { ascending: true });
  
  if (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
  return data || [];
}

export async function getVisaRules(passportCode: string, destinationCode: string) {
  try {
    const { data, error } = await supabase
      .from('visa_rules')
      .select('*')
      .eq('passport_code', passportCode)
      .eq('destination_code', destinationCode)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Visa API Error:', error);
    return null;
  }
}

// دالة لجلب الأخبار (متوافقة مع المكونات القديمة)
export async function getNews() {
  const { data, error } = await supabase
    .from('news_ticker')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }
  return data || [];
}

// دالة لجلب الأخبار (متوافقة مع المكونات الجديدة)
export async function getNewsTicker() {
  return getNews();
}

export async function getScholarships() {
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('is_active', true)
    .order('deadline', { ascending: true });
  
  if (error) {
    console.error('Error fetching scholarships:', error);
    return [];
  }
  return data || [];
}
