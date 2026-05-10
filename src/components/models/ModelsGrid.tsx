"use client";

import React, { useEffect, useRef } from "react";
import { Lock, Heart, Play } from "lucide-react";
import gsap from "gsap";

import { useRouter } from "next/navigation";

export interface Model {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  isPremium?: boolean;
}

interface ModelsGridProps {
  models?: Model[];
  isLoading?: boolean;
}

export function ModelCard({ model }: { model: Model }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={() => router.push(`/models/${model.id}`)}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <img 
          src={model.thumbnail} 
          alt={model.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        
        {model.isPremium && (
          <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur shadow-sm rounded-md">
            <Lock size={14} className="text-gray-600" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <Play size={20} className="text-[#2a134d] ml-1" />
           </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#2a134d] transition-colors">
            {model.title}
          </h3>
          <button className="text-gray-300 hover:text-red-500 transition-colors">
            <Heart size={16} />
          </button>
        </div>
        <div className="mt-auto pt-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500">
            {model.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ModelsGrid({ models = [], isLoading = false }: ModelsGridProps) {
  const isEmpty = models.length === 0 && !isLoading;

  return (
    <div className={`flex-1 relative min-h-0 ${isEmpty ? "bg-white" : "bg-gray-50/30"} overflow-y-auto p-8 scrollbar-hide`}>
      {isEmpty ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.4]" 
             style={{ 
               backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)", 
               backgroundSize: "24px 24px" 
             }}>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 relative z-10">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 h-[250px] animate-pulse">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))
        )}
      </div>

      {isEmpty && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 pointer-events-none">
           <div className="text-lg font-medium opacity-50">Select a category or search for models</div>
        </div>
      )}
    </div>
  );
}
