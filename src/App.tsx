import { AppSidebar } from "@/components/app-sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  NotificationIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import { Link, Outlet, useLocation } from "react-router-dom";
import { dashboardRoutes, getDashboardRoute } from "@/config/dashboard-nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function App() {
  const { pathname } = useLocation();
  const currentRoute = getDashboardRoute(pathname) ?? dashboardRoutes[0];
  const pageTitle = currentRoute.title === "Home" ? "Dashboard" : currentRoute.title;
  const sectionLabel = currentRoute.breadcrumb?.[0] ?? "Home";

  return (
    <>
      <SidebarProvider>
        <div className="flex w-full min-h-screen selection:bg-primary selection:text-background">
          <AppSidebar />

          <SidebarInset>
            <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur flex min-h-14 shrink-0 items-center gap-3 px-3 transition-[width,height] ease-linear sm:px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="hidden self-stretch data-[orientation=vertical]:h-auto sm:block"
              />
              <div className="min-w-0 flex-1 py-1.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                    {sectionLabel}
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    /
                  </span>
                  <h1 className="truncate text-sm font-semibold sm:text-base">
                    {pageTitle}
                  </h1>
                </div>
                <p className="hidden truncate text-xs text-muted-foreground sm:block">
                  {currentRoute.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon-sm" aria-label="Search">
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Open schedule"
                  asChild
                >
                  <Link to="/dashboard/schedule/this-week">
                    <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Notifications"
                      className="relative"
                    >
                      <HugeiconsIcon icon={NotificationIcon} strokeWidth={2} />
                      <span className="absolute right-1 top-1 size-1.5 bg-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex-col items-start gap-1">
                      <span className="text-xs font-medium">
                        Class routine placeholder
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Upcoming schedule alerts will appear here.
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start gap-1">
                      <span className="text-xs font-medium">
                        Resource updates
                      </span>
                      <span className="text-xs text-muted-foreground">
                        New notes and sessional files will be listed here.
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
