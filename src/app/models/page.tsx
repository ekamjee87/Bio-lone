"use client";

import React, { useState, useEffect } from "react";
import ModelsSidebar from "@/components/models/ModelsSidebar";
import ModelsHeader from "@/components/models/ModelsHeader";
import ModelsGrid, { Model } from "@/components/models/ModelsGrid";
import { Plus } from "lucide-react";

const mockModels: Model[] = [
  { 
    id: "gum-teeth", 
    title: "Human Gum and Teeth", 
    thumbnail: "/all-models/Human Gum And Teeth/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "placenta", 
    title: "Human Placenta", 
    thumbnail: "/all-models/Placenta/Thumbnail.jpg", 
    category: "Organs" 
  },
  { 
    id: "male-reproductive", 
    title: "Male Reproductive System", 
    thumbnail: "/all-models/Male Reproductive System/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "stomach-cross", 
    title: "Stomach Cross Section", 
    thumbnail: "/all-models/Stomach Cross Section/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "kidney-cross", 
    title: "Kidney Cross Section", 
    thumbnail: "/all-models/Kidney Cross Section/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "human-skull", 
    title: "Human Skull", 
    thumbnail: "/all-models/Human Skull/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "ovum-stages", 
    title: "Fertilization Stages of Ovum", 
    thumbnail: "/all-models/Fertilization Stages of Ovum/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "heart", 
    title: "Human Heart", 
    thumbnail: "/all-models/Heart/Thumbnail.jpg", 
    category: "Organs" 
  },
  { 
    id: "ear-section", 
    title: "Human Ear Section", 
    thumbnail: "/all-models/Ear Section/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "human-eye", 
    title: "Human Eye", 
    thumbnail: "/all-models/Human Eye/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "human-thorax", 
    title: "Human Thorax", 
    thumbnail: "/all-models/Human Throax/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "female-skeleton", 
    title: "Female Human Skeleton", 
    thumbnail: "/all-models/Feamle Human Skeleton/Thumbnail.jpg", 
    category: "Anatomy" 
  },
  { 
    id: "male-skeleton", 
    title: "Male Human Skeleton", 
    thumbnail: "/all-models/Male Skeleton/Thumbnail.jpg", 
    category: "Anatomy" 
  },
];

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>(mockModels);
  const [isLoading, setIsLoading] = useState(false);

  // For demo: automatically populate after 2 seconds to show transition
  useEffect(() => {
    // setIsLoading(true);
    // const timer = setTimeout(() => {
    //   setModels(mockModels);
    //   setIsLoading(false);
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  const handlePopulate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setModels(mockModels);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="flex h-screen bg-white overflow-hidden text-gray-900 font-sans">
      <ModelsSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <ModelsHeader />
        
        <ModelsGrid models={models} isLoading={isLoading} />

        {/* Floating Upload Trigger (Admin Simulator) */}
        <button 
          onClick={handlePopulate}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#2a134d] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
          title="Simulate Admin Upload"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>
    </main>
  );
}
