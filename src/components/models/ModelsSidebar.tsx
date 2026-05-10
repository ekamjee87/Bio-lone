"use client";

import React from "react";
import { 
  Box, 
  Map, 
  Settings, 
  Activity, 
  User, 
  Layers, 
  FileText, 
  ChevronDown,
  Stethoscope,
  Heart,
  Droplets,
  Brain,
  Wind,
  Eye,
  Microscope,
  Scissors
} from "lucide-react";

const categories = [
  { name: "All Models", icon: <Box size={18} />, active: true },
  { name: "Anatomy by Region", icon: <Map size={18} /> },
  { name: "Anatomy by System", icon: <Activity size={18} /> },
  { name: "Complete Anatomy", icon: <User size={18} /> },
  { name: "Bony Landmarks...", icon: <Layers size={18} /> },
  { name: "Cross Sections...", icon: <FileText size={18} /> },
  { name: "Anatomy Quizzes", icon: <FileText size={18} /> },
];

const specialties = [
  { name: "Allergy and Immunology", icon: <Droplets size={16} /> },
  { name: "Cardiology", icon: <Heart size={16} /> },
  { name: "Dentistry", icon: <Box size={16} /> },
  { name: "Dermatology", icon: <Layers size={16} /> },
  { name: "Endocrinology", icon: <Activity size={16} /> },
  { name: "Gastroenterology", icon: <Activity size={16} /> },
  { name: "Neurology", icon: <Brain size={16} /> },
  { name: "Oncology", icon: <Microscope size={16} /> },
  { name: "Orthopedics", icon: <Layers size={16} /> },
  { name: "Pediatrics", icon: <User size={16} /> },
  { name: "Radiology", icon: <Eye size={16} /> },
  { name: "Surgery", icon: <Scissors size={16} /> },
];

export default function ModelsSidebar() {
  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-gray-100 overflow-y-auto scrollbar-hide select-none">
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
          <span>Category</span>
          <ChevronDown size={14} />
        </div>

        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                cat.active 
                  ? "bg-[#F3F4F9] text-[#2a134d]" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className={cat.active ? "text-[#2a134d]" : "text-gray-400"}>
                {cat.icon}
              </span>
              <span className="truncate">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 mb-4 px-2">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Anatomy
          </div>
        </div>
        {/* Placeholder for future anatomy region links if different from categories */}

        <div className="mt-10 mb-4 px-2">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Specialties
          </div>
        </div>

        <div className="space-y-1">
          {specialties.map((spec) => (
            <button
              key={spec.name}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              <span className="text-gray-400 group-hover:text-gray-600">
                {spec.icon}
              </span>
              <span className="truncate">{spec.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
