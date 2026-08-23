"use client";

import Link from "next/link";
import {
  BookOpen,
  Bot,
  Calendar,
  Calculator,
  ChevronRight,
  FileOutput,
  FileText,
  FlaskConical,
  Home,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Timer,
  Users,
} from "lucide-react";

const groupItems = [
  { label: "Home", href: "/dashboard", icon: Home, active: true },
  { label: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { label: "MTE Family", href: "/dashboard/family", icon: Users },
  { label: "Chat", href: "/dashboard/chat", icon: MessageSquare },
];

const resourceItems = [
  { label: "Notes", href: "/dashboard/notes", icon: FileText },
  { label: "Theories", href: "/dashboard/theories", icon: BookOpen },
  { label: "Sessionals", href: "/dashboard/sessionals", icon: FlaskConical },
];

const toolItems = [
  {
    label: "Grade Calculator",
    href: "/dashboard/grade-calculator",
    icon: Calculator,
  },
  {
    label: "Report Cover Generator",
    href: "/dashboard/report-cover",
    icon: FileOutput,
  },
  { label: "Pomodoro Timer", href: "/dashboard/pomodoro", icon: Timer },
];

function SidebarSection({
  title,
  items,
  collapsed,
}: {
  title?: string;
  collapsed: boolean;
  items: Array<{
    label: string;
    href: string;
    icon: typeof Home;
    active?: boolean;
  }>;
}) {
  return (
    <div className="space-y-1">
      {title && !collapsed ? (
        <p className="text-muted-foreground px-3 pt-3 pb-2 text-[10px] font-semibold tracking-[0.2em] uppercase">
          {title}
        </p>
      ) : null}

      {items.map(({ label, href, icon: Icon, active }) => (
        <Link
          key={label}
          href={href}
          title={collapsed ? label : undefined}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            active
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
          } ${collapsed ? "justify-center px-2" : ""}`}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="flex-1 text-left">{label}</span>}
          {!collapsed && (label === "Schedule" || label === "MTE Family") ? (
            <ChevronRight className="h-4 w-4 opacity-70" />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

type DashboardSidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export default function DashboardSidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const isCompact = collapsed && !mobileOpen;

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onMobileClose}
          className="fixed inset-0 z-30 bg-slate-950/20 md:hidden"
        />
      ) : null}

      <aside
        className={[
          "border-border bg-card h-screen overflow-hidden border-r transition-all duration-200 md:flex md:flex-col",
          mobileOpen
            ? "fixed inset-y-0 left-0 z-40 flex w-[260px]"
            : "hidden md:flex",
          isCompact ? "md:w-[72px]" : "md:w-[260px]",
        ].join(" ")}
      >
        <div className="border-border flex h-16 shrink-0 items-center justify-between border-b px-3">
          {!isCompact || mobileOpen ? (
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
                <Bot className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-foreground truncate text-base font-bold tracking-tight">
                Mechowarts
              </span>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
                <Bot className="text-primary-foreground h-4 w-4" />
              </div>
            </div>
          )}

          <button
            type="button"
            aria-label={isCompact ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => {
              if (mobileOpen && onMobileClose) {
                onMobileClose();
                return;
              }

              onToggleCollapse?.();
            }}
            className="text-muted-foreground hover:bg-accent hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          >
            {isCompact && !mobileOpen ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3">
          <SidebarSection items={groupItems} collapsed={isCompact} />

          <div className="mt-4">
            <SidebarSection
              title="Resources"
              items={resourceItems}
              collapsed={isCompact}
            />
          </div>

          <div className="mt-4">
            <SidebarSection
              title="Tools"
              items={toolItems}
              collapsed={isCompact}
            />
          </div>
        </nav>

        <div className="border-border shrink-0 border-t px-3 py-3">
          <div className="hover:bg-accent flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 transition-colors">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
              TH
            </div>

            {!isCompact || mobileOpen ? (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-semibold">
                    Rafid Mahmud
                  </p>
                  <p className="text-muted-foreground truncate text-[11px]">
                    2408037@student.ruet.ac.bd
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground h-4 w-4" />
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
