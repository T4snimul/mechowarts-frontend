import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mechowarts | Dashboard",
  description: "Dashboard has everything a student needs",
};

export default function Dashboard() {
  return (
    <div className="selection:bg-primary selection:text-background from-background to-muted/40 flex min-h-screen flex-col bg-linear-to-b"></div>
  );
}
