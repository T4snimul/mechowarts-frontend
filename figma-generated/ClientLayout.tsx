"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, CalendarDays, PanelLeftOpen } from "lucide-react";
import Sidebar from "./components/common/Sidebar";
import ProfileOverlay from "./components/common/ProfileOverlay";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import {
  navItems,
  resourceItems,
  toolItems,
  pageMeta,
  noScrollPaths,
} from "./config/navigation";

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname];

  return (
    <header className="bg-card border-border shrink-0 border-b px-4 md:px-6">
      <div className="flex h-14 items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="hover:bg-accent text-muted-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors md:hidden"
        >
          <PanelLeftOpen size={16} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground truncate text-xs">
            {meta?.crumb ?? pathname}
          </p>
          {meta?.subtitle && (
            <p className="text-muted-foreground/70 hidden truncate text-[11px] sm:block">
              {meta.subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="hover:bg-accent text-muted-foreground hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
            <Search size={16} />
          </button>
          <button className="hover:bg-accent text-muted-foreground hover:text-foreground hidden h-8 w-8 items-center justify-center rounded-lg transition-colors sm:flex">
            <CalendarDays size={16} />
          </button>
          <button className="hover:bg-accent text-muted-foreground hover:text-foreground relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
            <Bell size={16} />
            <span className="bg-primary absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Inner shell (needs profile context) ─────────────────────────────────────
function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { selectedProfile, closeProfile } = useProfile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const noScroll = noScrollPaths.has(pathname);

  return (
    <div
      className="bg-background flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileSidebarOpen(false)}
              navItems={navItems}
              resourceItems={resourceItems}
              toolItems={toolItems}
              onNavigate={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
          navItems={navItems}
          resourceItems={resourceItems}
          toolItems={toolItems}
        />
      </div>

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuToggle={() => setMobileSidebarOpen(true)} />
        <div
          className={`min-h-0 flex-1 ${noScroll ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          {children}
        </div>
      </div>

      {selectedProfile && (
        <ProfileOverlay person={selectedProfile} onClose={closeProfile} />
      )}
    </div>
  );
}

// ─── Export: wraps everything with ProfileProvider ────────────────────────────
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <Shell>{children}</Shell>
    </ProfileProvider>
  );
}
