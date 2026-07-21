import Link from "next/link";
import DiscordIcon from "../icons/discord-icon";
import { Button } from "../ui/button";

export default function RootFooter() {
  return (
    <footer className="bg-muted/20 border-t py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-md font-bold tracking-tighter italic">
            MECHOWARTS
          </p>
          <p className="text-muted-foreground text-xs">
            The Mechatronics Hub for RUET.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Join the update channel
          </p>
          <Link
            rel="noreferer"
            href="https://discord.gg/RTSYg9SbFZ"
            target="_blank"
          >
            <Button
              variant="outline"
              className="hover:text-background gap-2 rounded-full px-8 hover:bg-[#5865F2]"
            >
              <DiscordIcon />
              Discord Server
            </Button>
          </Link>
        </div>

        <div className="font-mono text-xs tracking-wider uppercase opacity-50">
          © 2026 • All rights reserved
        </div>
      </div>
    </footer>
  );
}
