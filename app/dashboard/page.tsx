import type { Metadata } from "next";

import RootHeader from "@/components/shared/root-header";
import DashboardWelcome from "@/components/shared/dashboard-welcome";

export const metadata: Metadata = {
  title: "Mechowarts | Dashboard",
  description: "Dashboard has everything a student needs.",
};

export default function Dashboard() {
  return (
    <div className="selection:bg-primary selection:text-background from-background to-muted/40 flex min-h-screen flex-col bg-linear-to-b">
      <RootHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl px-4 py-6 sm:px-6">
          <DashboardWelcome />
        </div>
      </main>
    </div>
  );
}
