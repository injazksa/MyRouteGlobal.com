"use client";
import { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';

export default function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'مرحباً! كيف يمكنني مساعدتك؟' }]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'شكراً لسؤالك! سأقوم بالرد عليك قريباً.' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-accent text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all">
          <Bot size={24} />
        </button>
      ) : (
        <div className="bg-white w-80 h-[400px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden">
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <span className="font-bold">مساعد MyRoute</span>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-900'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t bg-white flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border rounded-xl px-4 py-2 text-sm" placeholder="اكتب سؤالك..." />
            <button onClick={handleSend} className="bg-accent text-white p-2 rounded-xl"><Send size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
