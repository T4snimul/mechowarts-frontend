import { Bell, CalendarDays, Menu, Search } from "lucide-react";

export default function DashboardHeader({
  onMenuToggle,
}: {
  onMenuToggle?: () => void;
}) {
  return (
    <header className="border-border bg-card/80 border-b backdrop-blur-sm">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={onMenuToggle}
          className="text-muted-foreground hover:bg-accent hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground truncate text-xs">
            Home / Dashboard
          </p>
          <p className="text-muted-foreground/70 hidden truncate text-[11px] sm:block">
            Your courses, schedule, resources, and tools — all in one place.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="text-muted-foreground hover:bg-accent hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:bg-accent hover:text-foreground hidden h-8 w-8 items-center justify-center rounded-lg transition-colors sm:flex"
            aria-label="Calendar"
          >
            <CalendarDays className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:bg-accent hover:text-foreground relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="bg-primary absolute top-2 right-2 h-1.5 w-1.5 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
