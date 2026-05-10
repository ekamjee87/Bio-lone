import { ChevronRight } from "lucide-react";

const COLLECTIONS = [
  { 
    id: 1, 
    title: "Uterus and Fallopian tubes, with clean text", 
    author: "Created with Joy Aune, MD - Jay Van, MD - Image Intuit",
    org: "NYU Health, Prominence Medical Group",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&auto=format&fit=crop&q=60" 
  },
  { 
    id: 2, 
    title: "Foundational Organ System Anatomy for Medical Students", 
    author: "Created with Allison Paulino, MTA",
    org: "Sonoguide Educator & Library Area in Medical Center",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&auto=format&fit=crop&q=60" 
  },
  { 
    id: 3, 
    title: "Shoulder for Physical Therapy Students", 
    author: "Created with Milton R. Orth, F-ETG",
    org: "Professor of Physical Therapy",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=60" 
  },
];

export default function ExpertCollections() {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2a134d]">Expert Collections</h2>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-[#7b2cbf] transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
          <button className="text-gray-400 hover:text-[#7b2cbf] transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COLLECTIONS.map((item) => (
          <div key={item.id} className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_15px_40px_rgba(123,44,191,0.15)] hover:border-[#e0aaff] transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
            
            {/* Top Purple Gradient Image Container */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#5a189a] to-[#240046] p-4 flex items-center justify-center overflow-hidden">
              {/* Inner glass frame */}
              <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none"></div>
              {/* Image */}
              <div 
                className="w-[80%] h-[80%] bg-cover bg-center rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-1 bg-gradient-to-b from-white to-[#f8f9fa]">
              <h3 className="text-[15px] font-bold text-[#1a0b33] mb-3 leading-tight">{item.title}</h3>
              <div className="mt-auto flex flex-col gap-1">
                <p className="text-[10px] text-gray-500 font-medium">{item.author}</p>
                <p className="text-[10px] text-[#7b2cbf] font-bold">{item.org}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
