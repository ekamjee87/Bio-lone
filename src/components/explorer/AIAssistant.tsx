"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello. I am the Bio Clone AI Assistant. How can I help you explore the human anatomy today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I encountered an error connecting to the neural network. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[380px] h-full flex flex-col bg-[#0a0f1c]/80 backdrop-blur-xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7b2cbf] to-[#00f0ff] flex items-center justify-center shadow-[0_0_15px_rgba(123,44,191,0.5)]">
          <Bot className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            AI Assistant <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          </h2>
          <p className="text-[#a3a3a3] text-xs">Medical Intelligence OS</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-white/10" : "bg-[#2a134d] border border-[#7b2cbf]/50"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-[#00f0ff]" />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-[#2a134d] text-white rounded-tr-none border border-[#7b2cbf]/30" 
                : "bg-white/5 text-[#e0e0e0] rounded-tl-none border border-white/10"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2a134d] border border-[#7b2cbf]/50 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#00f0ff]" />
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-[#00f0ff] animate-spin" />
              <span className="text-[#a3a3a3] text-xs">Analyzing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-5 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["Function of the heart?", "Explain nervous system", "What does the liver do?"].map((q, i) => (
            <button 
              key={i} 
              onClick={() => setInput(q)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#a3a3a3] hover:text-white transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-white/10 bg-[#050505]/50">
        <form onSubmit={handleSubmit} className="relative">
          <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-white transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a medical question..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-[#a3a3a3] focus:outline-none focus:border-[#7b2cbf]/50 transition-colors"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#7b2cbf] to-[#9d4edd] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-white hover:shadow-[0_0_15px_rgba(123,44,191,0.5)] transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
