import { Box, Eye, Cpu, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AnatomyModels() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-6">
      
      {/* Left: Complete 3D Anatomy Models Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm flex flex-col group min-h-[450px]" style={{ backgroundColor: '#f6ebd9', background: 'linear-gradient(to bottom, #faebd7 0%, #e8cda8 100%)' }}>
        
        <div className="p-8 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-[#111827]">Complete 3D Anatomy Models</h2>
            <button className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-white hover:bg-[#334155] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
            </button>
          </div>
          
          <p className="text-[15px] text-[#374151] mb-8 max-w-sm leading-relaxed">
            The most <strong className="font-bold">scientifically accurate</strong> and <strong className="font-bold">detailed</strong> virtual models of the human body ever assembled.
          </p>
          
          <div className="flex gap-4">
            <Link href="/explorer?model=female" className="inline-block">
              <button className="bg-[#111827] hover:bg-[#1f2937] text-white px-8 py-3 rounded-md text-[15px] font-bold transition-all shadow-md w-40">
                Launch Female
              </button>
            </Link>
            <Link href="/explorer?model=male" className="inline-block">
              <button className="bg-[#111827] hover:bg-[#1f2937] text-white px-8 py-3 rounded-md text-[15px] font-bold transition-all shadow-md w-40">
                Launch Male
              </button>
            </Link>
          </div>
        </div>

        {/* Male & Female Anatomy Models Visual */}
        <div className="absolute bottom-0 right-0 w-[95%] h-[95%] pointer-events-none">
          {/* We use a standard img tag pointing to the public folder */}
          <img 
            src="/models.png" 
            alt="Male and Female Anatomy Models" 
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      </div>

      {/* Right: Stacked Tool Cards */}
      <div className="flex flex-col gap-4">
        {[
          { 
            title: "Human Studio", 
            desc: "Customize and embed 3D models for your educational material and your presentations.", 
            icon: <Box className="w-6 h-6 text-[#d0bfff]" />,
            btn: "Launch Studio"
          },
          { 
            title: "BioDigital VR", 
            desc: "Unprecedented views from immersive & collaborative training experiences in simulated reality.", 
            icon: <Eye className="w-6 h-6 text-[#d0bfff]" />,
            btn: "Launch VR"
          },
          { 
            title: "3D Visualization Services", 
            desc: "Custom features and data visualization natively integrated directly in your application.", 
            icon: <Cpu className="w-6 h-6 text-[#d0bfff]" />,
            btn: "Launch Services"
          },
        ].map((tool, i) => (
          <div key={i} className="flex-1 rounded-2xl bg-gradient-to-r from-[#4c2482] to-[#361661] p-6 shadow-[0_10px_20px_rgba(42,19,77,0.2)] border border-[#7b2cbf]/30 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(123,44,191,0.3)] transition-all cursor-pointer relative overflow-hidden">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#2a134d] flex items-center justify-center border border-[#7b2cbf]/50 shadow-inner group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold text-white tracking-wide">{tool.title}</h4>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white" />
                  </div>
                </div>
                <p className="text-[11px] text-[#d0bfff] font-medium leading-relaxed pr-4">{tool.desc}</p>
              </div>
            </div>
            
            <button className="mt-4 self-start bg-[#2a134d] hover:bg-[#7b2cbf] border border-[#7b2cbf]/50 text-white text-[11px] font-bold px-4 py-1.5 rounded uppercase tracking-wider transition-colors relative z-10">
              {tool.btn}
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
