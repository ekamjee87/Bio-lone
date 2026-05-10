"use client";

import { useState } from "react";
import { 
  MousePointer2, 
  Search, 
  PenTool, 
  MoreVertical, 
  Maximize, 
  X,
  Layers,
  Activity,
  Heart,
  Brain,
  Bone
} from "lucide-react";
import { useRouter } from "next/navigation";
import AnatomyCanvas from "./AnatomyCanvas";
import AIAssistant from "./AIAssistant";

export default function ExplorerLayout() {
  const router = useRouter();
  const [activeTool, setActiveTool] = useState("select");

  return (
    <div className="fixed inset-0 z-[100] flex bg-[#020205] text-white overflow-hidden font-sans">
      
      {/* Left Info Panel */}
      <div className="hidden lg:flex w-[320px] h-full flex-col bg-[#0a0f1c]/80 backdrop-blur-xl border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-20">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-widest text-[#a3a3a3]">
            Bio Clone <span className="text-white">AI</span>
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="mb-8">
            <h2 className="text-2xl font-light mb-4">Male Anatomy <span className="font-bold text-[#00f0ff]">3.0</span></h2>
            <p className="text-sm text-[#a3a3a3] leading-relaxed">
              The human body is a complex structure made of thousands of distinct parts. These components can be organized based on region, such as head, neck, thorax, abdomen, and limbs, or based on similar functions, such as respiration or circulation. By working together, these structures enable humans to survive and reproduce.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#7b2cbf] font-bold">Systems Overview</h3>
            
            {[
              { icon: <Heart className="w-4 h-4" />, name: "Cardiovascular", status: "Active" },
              { icon: <Brain className="w-4 h-4" />, name: "Nervous", status: "Scanning" },
              { icon: <Bone className="w-4 h-4" />, name: "Skeletal", status: "Hidden" },
              { icon: <Activity className="w-4 h-4" />, name: "Muscular", status: "Hidden" },
            ].map((system, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-[#00f0ff]/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#e0aaff] group-hover:text-[#00f0ff] transition-colors">
                    {system.icon}
                  </div>
                  <span className="text-sm font-medium">{system.name}</span>
                </div>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                  system.status === 'Active' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' :
                  system.status === 'Scanning' ? 'bg-[#7b2cbf]/30 text-[#e0aaff] animate-pulse' :
                  'bg-white/5 text-[#a3a3a3]'
                }`}>
                  {system.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold">Visualization Modes</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Skeleton', 'Muscle', 'Nervous', 'Organs'].map((mode) => (
                <button key={mode} className="glass-panel py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/30 transition-all">
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Toolbar */}
      <div className="hidden md:flex w-14 h-full bg-[#050505] border-r border-white/5 flex flex-col items-center py-6 gap-6 z-20">
        {[
          { id: "select", icon: <MousePointer2 className="w-5 h-5" /> },
          { id: "layers", icon: <Layers className="w-5 h-5" /> },
          { id: "search", icon: <Search className="w-5 h-5" /> },
          { id: "draw", icon: <PenTool className="w-5 h-5" /> },
        ].map((tool) => (
          <button 
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTool === tool.id 
                ? "bg-[#2a134d] text-[#00f0ff] shadow-[0_0_15px_rgba(123,44,191,0.5)] border border-[#7b2cbf]/50" 
                : "text-[#a3a3a3] hover:text-white hover:bg-white/5"
            }`}
          >
            {tool.icon}
          </button>
        ))}
        
        <div className="mt-auto">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-[#a3a3a3] hover:text-white hover:bg-white/5 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center 3D Area */}
      <div className="flex-1 relative bg-gradient-to-b from-[#020205] to-[#0a0f1c]">
        {/* Top Right Controls */}
        <div className="absolute top-6 right-6 flex gap-3 z-30">
          <button className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-white/20 transition-all backdrop-blur-md">
            <Maximize className="w-4 h-4" />
          </button>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnatomyCanvas />
      </div>

      {/* Right AI Assistant */}
      <div className="hidden lg:flex h-full">
        <AIAssistant />
      </div>

    </div>
  );
}
