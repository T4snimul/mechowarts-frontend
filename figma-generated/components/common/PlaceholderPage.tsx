import { Zap } from "lucide-react";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
        <Zap size={24} className="text-primary" />
      </div>
      <h2
        className="text-foreground mb-2 text-xl font-bold"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        {title}
      </h2>
      <p className="text-muted-foreground max-w-xs text-sm">
        This page is coming soon. Check back after the next iteration.
      </p>
    </div>
  );
}
