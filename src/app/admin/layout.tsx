import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Box, Settings, Sparkles, LogOut, PanelLeftClose } from "lucide-react";
import { logoutAdmin } from "@/app/actions/adminAuth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-transparent text-white overflow-hidden selection:bg-electric-blue selection:text-black">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/5 gap-3">
          <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
            <span className="font-bold text-black tracking-tighter text-xs">OS</span>
          </div>
          <span className="font-bold tracking-widest text-sm text-neutral-300">BIO CLONE ADMIN</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-2 text-xs font-semibold text-neutral-600 uppercase tracking-widest mb-4">Core Systems</p>
          {[
            { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
            { name: "Live Builder", icon: Sparkles, path: "/admin/builder", color: "text-electric-blue" },
            { name: "Neural Users", icon: Users, path: "/admin/users" },
            { name: "3D Models", icon: Box, path: "/admin/models" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors group"
            >
              <item.icon size={18} className={`group-hover:scale-110 transition-transform ${item.color || ''}`} />
              {item.name}
            </Link>
          ))}

          <p className="px-2 text-xs font-semibold text-neutral-600 uppercase tracking-widest mt-8 mb-4">Configuration</p>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors group">
            <Settings size={18} className="group-hover:scale-110 transition-transform" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <form action={logoutAdmin}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
              <LogOut size={18} />
              Terminate Session
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-white">
              <PanelLeftClose size={20} />
            </button>
            <h2 className="text-sm font-medium text-neutral-300 tracking-wide">System Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-neutral-500 font-mono tracking-widest">SYSTEM ONLINE</span>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
           {children}
        </main>
      </div>
    </div>
  );
}
