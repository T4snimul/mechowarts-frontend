import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Mechowarts - Mechatronics & Robotics Projects</title>
        <meta
          name="description"
          content="Mechowarts is a portfolio of mechatronics engineering projects, robotics builds, and web development experiments by Tanim."
        />
      </Helmet>
      <div className="selection:bg-primary selection:text-background min-h-screen bg-linear-to-b from-background to-muted/40 flex flex-col">
        <Header />
        <Hero />
        <Footer />
      </div>
    </>
  );
}
