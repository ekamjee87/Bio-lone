"use client";

import React from "react";
import { 
  Search, 
  ChevronDown, 
  MoreVertical, 
  Globe, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  Bell
} from "lucide-react";

const tabs = [
  { name: "All", active: true },
  { name: "Anatomy and Physiology" },
  { name: "Conditions" },
  { name: "Procedures and Treatments" },
];

export default function ModelsHeader() {
  return (
    <div className="flex flex-col bg-white border-b border-gray-100 z-10">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-50">
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <button className="text-xs font-bold uppercase tracking-widest text-[#2a134d] flex items-center gap-1">
              Explore <ChevronDown size={14} />
            </button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600">
              My Library
            </button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600">
              Studio
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
             <span className="w-5 h-3 bg-red-600 rounded-sm"></span> EN <ChevronDown size={12} />
           </button>
           <div className="flex items-center gap-3 text-gray-400 border-l border-gray-200 pl-4">
             <button className="hover:text-gray-600"><MessageSquare size={18} /></button>
             <button className="hover:text-gray-600"><HelpCircle size={18} /></button>
             <button className="hover:text-gray-600"><Settings size={18} /></button>
           </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col px-8 py-6 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F3F4F9] rounded-lg text-[#2a134d]">
            <BoxIcon />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">All Models</h1>
        </div>

        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 max-w-3xl">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2a134d] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search All Models"
                className="w-full bg-[#F3F4F9] border-none rounded-md py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#2a134d]/10 transition-all placeholder:text-gray-400"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
              Filter <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
               <span className="w-5 h-3 bg-red-600 rounded-sm"></span> EN <ChevronDown size={12} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
               Sort: Relevance <ChevronDown size={14} />
             </button>
             <button className="p-2.5 rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50">
               <MoreVertical size={18} />
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`pb-3 text-sm font-medium transition-all relative ${
                tab.active 
                  ? "text-[#2a134d]" 
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.name}
              {tab.active && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2a134d]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}
