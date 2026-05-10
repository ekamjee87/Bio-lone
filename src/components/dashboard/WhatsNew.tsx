import { ChevronRight } from "lucide-react";

const WHATS_NEW = [
  { id: 1, title: "Nerve vascular Offshoot", img: "https://images.unsplash.com/photo-1530213786676-4c4c64391e6b?w=200&auto=format&fit=crop&q=60" },
  { id: 2, title: "Endoscopic View", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=60" },
  { id: 3, title: "Robotic Surgery Path", img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=200&auto=format&fit=crop&q=60" },
  { id: 4, title: "Cardiomyopathy", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=200&auto=format&fit=crop&q=60" },
  { id: 5, title: "Emergency Craniotomy", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&auto=format&fit=crop&q=60" },
];

export default function WhatsNew() {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2a134d]">What's New</h2>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-[#7b2cbf] transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
          <button className="text-gray-400 hover:text-[#7b2cbf] transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      
      <div className="flex justify-between items-start overflow-x-auto pb-4 scrollbar-hide gap-4 md:gap-0">
        {WHATS_NEW.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-4 min-w-[140px] max-w-[160px] group cursor-pointer">
            {/* Circular Thumbnail with Metallic/Copper Border */}
            <div className="relative w-[130px] h-[130px] rounded-full p-[4px] bg-gradient-to-br from-[#ffd166] via-[#d4af37] to-[#aa6c39] shadow-[0_10px_20px_rgba(170,108,57,0.3)] group-hover:shadow-[0_15px_30px_rgba(170,108,57,0.5)] transition-all duration-300 transform group-hover:-translate-y-2">
              {/* Inner glass/white rim */}
              <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden relative bg-[#2a134d]">
                {/* Image */}
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 filter contrast-125 saturate-50 group-hover:saturate-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                {/* Holographic gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50 pointer-events-none"></div>
              </div>
            </div>
            {/* Title */}
            <span className="text-[11px] text-center font-bold text-[#444] group-hover:text-[#7b2cbf] transition-colors leading-tight px-2">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
