"use client";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="text-foreground flex min-h-screen bg-[#f2f5f5]">
      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
      <SignedIn>
        <DashboardSidebar
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
          mobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader
            onMenuToggle={() => setIsMobileSidebarOpen((current) => !current)}
          />

          <main className="flex-1 px-4 py-5 md:px-6 lg:px-8">{children}</main>
        </div>
      </SignedIn>{" "}
    </div>
  );
}
