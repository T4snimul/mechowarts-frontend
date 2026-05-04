import { Button } from "@/components/ui/button";

export default function Footer() {
  const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.06,72.06,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.4,80.21a105.73,105.73,0,0,0,32.63,16.15,77.7,77.7,0,0,0,7.36-12,67.6,67.6,0,0,1-11.77-5.59c.9-.66,1.76-1.35,2.58-2.07a71.4,71.4,0,0,0,64.78,0c.82.72,1.68,1.41,2.58,2.07a67.48,67.48,0,0,1-11.77,5.59,77.34,77.34,0,0,0,7.36,12,105.06,105.06,0,0,0,32.65-16.14C129.58,52.67,125.07,28.8,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.07,65.69,84.69,65.69Z" />
    </svg>
  );

  return (
    <footer className="border-t bg-muted/20 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-md font-bold tracking-tighter italic">
            MECHOWARTS
          </p>
          <p className="text-xs text-muted-foreground">
            The Mechatronics Hub for RUET.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Join the update channel
          </p>
          <Button
            variant="outline"
            className="rounded-full  hover:bg-[#5865F2] hover:text-background gap-2 px-8"
          >
            <DiscordIcon />
            Discord Server
          </Button>
        </div>

        <div className="text-xs font-mono opacity-50 uppercase tracking-wider">
          © 2026 • All rights reserved
        </div>
      </div>
    </footer>
  );
}
