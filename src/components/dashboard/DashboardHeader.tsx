"use client";

import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function DashboardHeader() {
  const categories = [
    "Anatomy",
    "Muscles & Skeletal",
    "Pathology",
    "AI Brain",
    "Biotech"
  ];

  return (
    <div className="w-full relative mt-0 md:mt-4 rounded-none md:rounded-b-3xl overflow-hidden bg-gradient-to-br from-[#2a134d] via-[#3b1c68] to-[#210c40] p-8 md:p-14 min-h-[400px] flex items-center shadow-[0_20px_50px_rgba(42,19,77,0.4)] border-b-4 border-[#1a0b33]">
      
      {/* Intricate Corner Ornaments (Simulated with CSS patterns) */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1)_10%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_10%,transparent_50%)] pointer-events-none"></div>
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full md:w-[55%] flex flex-col items-start gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-medium leading-[1.2] text-[#f8f5ff] max-w-xl text-shadow-sm">
          Visualize anatomy, disease, and treatments in <span className="text-[#e2cfff] drop-shadow-[0_0_15px_rgba(226,207,255,0.6)] font-semibold">interactive 3D</span>
        </h1>
        
        {/* Futuristic Search Bar */}
        <div className="relative w-full max-w-lg mt-2 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b388eb] to-[#e0aaff] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="relative flex items-center bg-gradient-to-r from-[#fdfbf7] to-[#f4eeff] border border-[#d1b3ff] rounded-full px-5 py-3.5 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.1)]">
            <Search className="w-5 h-5 text-[#7b2cbf] mr-3" />
            <input 
              type="text" 
              placeholder="Search 10,000+ models by text, subject, or phrase..." 
              className="w-full bg-transparent border-none outline-none text-[#333] placeholder-[#888] text-[15px] font-medium"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mt-4">
          {categories.map((tag) => (
            <button key={tag} className="px-4 py-1.5 rounded-full border border-[#9d4edd]/50 bg-gradient-to-b from-[#7b2cbf]/40 to-[#3c096c]/40 text-[#e0aaff] text-xs font-semibold uppercase tracking-wider hover:bg-[#9d4edd]/60 hover:shadow-[0_0_15px_rgba(157,78,221,0.5)] transition-all flex items-center gap-2 backdrop-blur-md">
              {tag}
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          ))}
        </div>
      </div>

      {/* Right Side 3D Brain/Nervous System Visual */}
      <div className="hidden md:block absolute right-[-5%] top-0 w-[55%] h-full pointer-events-none">
        {/* Using a high-quality relevant placeholder for the brain/nervous system */}
        <div className="w-full h-[120%] absolute top-[-10%] bg-[url('https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center filter grayscale-[0.2] hue-rotate-[260deg] brightness-[1.3] contrast-125 mix-blend-screen opacity-90 [mask-image:linear-gradient(to_left,black_40%,transparent_100%)]"></div>
        {/* Holographic glowing nodes effect */}
        <div className="absolute top-[30%] right-[30%] w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_20px_5px_#00E5FF] animate-pulse"></div>
        <div className="absolute top-[45%] right-[20%] w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_3px_#00E5FF] animate-pulse delay-100"></div>
        <div className="absolute top-[60%] right-[35%] w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_25px_5px_#00E5FF] animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
