import { PageMeta } from "@/components/PageMeta";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";

const landingPageMeta = {
  title: "Mechowarts - Student Dashboard",
  description:
    "Mechowarts helps students manage courses, track academic progress, and stay connected with study resources in one focused dashboard.",
};

export default function LandingPage() {
  return (
    <>
      <PageMeta {...landingPageMeta} />
      <div className="selection:bg-primary selection:text-background min-h-screen bg-linear-to-b from-background to-muted/40 flex flex-col">
        <Header />
        <Hero />
        <Footer />
      </div>
    </>
  );
}
