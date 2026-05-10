import { ChevronRight } from "lucide-react";

interface CarouselItem {
  id: number;
  img: string;
  title: string;
  subtitle?: string;
}

interface ImageCarouselProps {
  title: string;
  items: CarouselItem[];
  type?: "featured" | "journeys" | "quizzes";
}

export default function ImageCarousel({ title, items, type = "featured" }: ImageCarouselProps) {
  
  const getCardStyle = () => {
    switch (type) {
      case "journeys":
        return "min-w-[280px] md:min-w-[320px] aspect-[21/9] rounded-xl";
      case "quizzes":
        return "min-w-[120px] md:min-w-[140px] aspect-square rounded-xl bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md";
      case "featured":
      default:
        return "min-w-[160px] md:min-w-[180px] aspect-[4/3] rounded-xl";
    }
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#2a134d]">{title}</h2>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-[#7b2cbf] transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
          <button className="text-gray-400 hover:text-[#7b2cbf] transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className={`relative overflow-hidden group cursor-pointer shrink-0 transition-transform hover:-translate-y-1 ${getCardStyle()}`}>
            
            {type === "quizzes" ? (
              <div className="w-full h-full flex flex-col items-center justify-between">
                <div 
                  className="w-16 h-16 bg-contain bg-center bg-no-repeat filter sepia-[0.4] hue-rotate-[10deg] drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <span className="text-[10px] font-bold text-center text-[#1a0b33] mt-2 leading-tight">{item.title}</span>
              </div>
            ) : (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Text Content */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white text-xs md:text-sm font-bold leading-tight">{item.title}</h3>
                  {item.subtitle && <p className="text-gray-300 text-[10px] mt-1">{item.subtitle}</p>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
