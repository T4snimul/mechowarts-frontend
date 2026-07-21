import Link from "next/link";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

function RootHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b px-6 py-3 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Bot className="bg-primary text-primary-foreground h-8 w-8 rounded-sm object-contain p-1" />
            <span className="font-semibold tracking-tight">Mechowarts</span>
          </div>
        </Link>

        <Link href="/auth">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </header>
  );
}

export default RootHeader;
