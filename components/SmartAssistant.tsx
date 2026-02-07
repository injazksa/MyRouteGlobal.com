"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUERY_CATEGORIES = {
  visa: ["تأشيرة", "فيزا", "سفر", "دخول", "إقامة", "متطلبات"],
  immigration: ["هجرة", "كندا", "نقاط", "crs", "express entry"],
  scholarships: ["منحة", "دراسة", "جامعة", "بكالوريوس", "ماجستير", "دكتوراه"],
  general: ["مرحباً", "شكراً", "مساعدة", "معلومات", "خدمات"],
};

export default function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "مرحباً! أنا مساعد MyRoute الذكي. كيف يمكنني مساعدتك اليوم؟\n\nيمكنني مساعدتك في:\n• فحص متطلبات التأشيرات\n• حساب نقاط الهجرة الكندية\n• البحث عن المنح الدراسية\n• الإجابة على أسئلتك العامة",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const analyzeQuery = (query: string): string => {
    const queryLower = query.toLowerCase();
    if (QUERY_CATEGORIES.visa.some(word => queryLower.includes(word))) return "visa";
    if (QUERY_CATEGORIES.immigration.some(word => queryLower.includes(word))) return "immigration";
    if (QUERY_CATEGORIES.scholarships.some(word => queryLower.includes(word))) return "scholarships";
    return "general";
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    const queryType = analyzeQuery(userMessage);
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBDAPXiasCJp7ylSNKCIbGvsbfaPNal1z0";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `أنت مساعد MyRoute المتخصص في الهجرة والتأشيرات. 
              الموقع يقدم: فحص التأشيرات لـ 196 دولة، حساب نقاط الهجرة الكندية، والمنح الدراسية.
              أجب بلغة عربية فصحى واضحة. كن دقيقاً في المعلومات القانونية وأشِر دوماً للتحقق من المصادر الرسمية.
              
              سؤال المستخدم: ${userMessage}`
            }]
          }]
        }),
      });

      if (!response.ok) throw new Error("فشل الاتصال بـ Gemini");
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini Error:", error);
      const fallbackResponses = {
        visa: "يمكنك استخدام أداة 'فحص التأشيرات' على موقعنا للحصول على معلومات دقيقة لـ 196 دولة.",
        immigration: "ننصحك باستخدام 'حاسبة نقاط الهجرة الكندية' لتقييم فرصك بدقة وحساب الـ CRS.",
        scholarships: "لدينا قاعدة بيانات شاملة لأفضل المنح العالمية، يمكنك تصفح قسم المنح الدراسية.",
        general: "شكراً لسؤالك! نحن هنا لمساعدتك في كل ما يتعلق بالهجرة والتأشيرات والمنح الدراسية.",
      };
      return fallbackResponses[queryType as keyof typeof fallbackResponses] || fallbackResponses.general;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(userMessage);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2">
          <Bot size={24} />
          <span className="font-bold text-sm">مساعد MyRoute</span>
        </button>
      ) : (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">المساعد الذكي</span>
            </div>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white border text-slate-800 rounded-bl-none shadow-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
              placeholder="اكتب سؤالك هنا..." 
            />
            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
