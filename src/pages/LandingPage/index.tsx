import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/assets/logo.svg";
import { Helmet } from "react-helmet-async";

type LandingPageProps = {
  onLogin: () => void;
};

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <>
      <Helmet>
        <title>Mechowarts - Mechatronics & Robotics Projects</title>
        <meta
          name="description"
          content="Mechowarts is a portfolio of mechatronics engineering projects, robotics builds, and web development experiments by Tanim."
        />
      </Helmet>
      <div className="min-h-screen bg-linear-to-b from-background to-muted/40 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-background/70 backdrop-blur">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-8 object-contain bg-primary rounded-sm"
            />
            <span className="font-semibold tracking-tight">Mechowarts</span>
          </div>

          <Button variant="outline" onClick={onLogin}>
            Login
          </Button>
        </header>

        {/* Hero */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your academic world,{" "}
              <span className="text-primary">simplified</span>.
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Manage courses, track progress, and stay connected with your
              studies—all in one clean, student-first platform.
            </p>

            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={onLogin}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-4 pt-10">
              {[
                ["📚 Courses", "All your subjects in one place"],
                ["📊 Progress", "Track your academic growth"],
                ["⚡ Fast Access", "No clutter, just what you need"],
              ].map(([title, desc]) => (
                <Card key={title} className="text-left">
                  <CardContent className="p-4 space-y-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground py-6 border-t">
          Built for students. Designed to stay out of your way.
        </footer>
      </div>
    </>
  );
}
