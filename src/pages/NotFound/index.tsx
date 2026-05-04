import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-muted-foreground">
        Oops! This page wandered off into the void.
      </p>

      <Link to="/" className="mt-6">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
