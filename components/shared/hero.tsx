import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

function Hero() {
  return (
    <main className="bg-muted/20 flex flex-1 items-center justify-center px-6 py-12">
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Your academic world, <span className="text-primary">simplified</span>.
        </h1>

        <p className="text-muted-foreground mx-auto max-w-xl text-lg">
          Manage courses, track progress, and stay connected with your
          studies—all in one clean, student-first platform.
        </p>

        <div className="flex justify-center gap-3">
          <Link href="/dashboard">
            <Button size="lg">Dashboard</Button>
          </Link>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

        <div className="grid gap-4 pt-10 md:grid-cols-3">
          {[
            ["📚 Courses", "All your subjects in one place"],
            ["📊 Progress", "Track your academic growth"],
            ["⚡ Fast Access", "No clutter, just what you need"],
          ].map(([title, desc]) => (
            <Card key={title} className="text-left">
              <CardContent className="space-y-1 p-4">
                <h3 className="font-medium">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Hero;
