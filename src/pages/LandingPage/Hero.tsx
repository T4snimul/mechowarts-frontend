import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <main className="bg-muted/20 flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Your academic world, <span className="text-primary">simplified</span>.
        </h1>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Manage courses, track progress, and stay connected with your
          studies—all in one clean, student-first platform.
        </p>

        <div className="flex gap-3 justify-center">
          <NavLink to="/auth">
            <Button size="lg">Get Started</Button>
          </NavLink>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

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
  );
}
