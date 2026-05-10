"use client";

import { useAuth } from "@/contexts/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#fcfcfd] pt-0 relative overflow-hidden text-gray-900">
      <Navbar theme="light" />
      
      {/* Background Texture for Light Theme */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Dashboard Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 xl:px-8 flex flex-col gap-12 pb-24">
        
        {/* Welcome & Search Section */}
        <DashboardHeader userName={user?.displayName || "Explorer"} />

        {/* Grid Sections */}
        <DashboardGrid />
        
      </div>

      <Footer />
    </main>
  );
}
