import Hero from "@/components/shared/hero";
import RootFooter from "@/components/shared/root-footer";
import RootHeader from "@/components/shared/root-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mechowarts | Welcome",
  description:
    "Mechowarts helps students manage courses, track academic progress, and stay connected with study resources in one focused dashboard.",
};

export default function Home() {
  return (
    <div className="selection:bg-primary selection:text-background from-background to-muted/40 flex min-h-screen flex-col bg-linear-to-b">
      <RootHeader />
      <Hero />
      <RootFooter />
    </div>
  );
}
