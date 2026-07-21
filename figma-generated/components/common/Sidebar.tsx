"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import type { NavItem } from "../../types";

function isGroupActive(item: NavItem, pathname: string): boolean {
  if (item.children)
    return item.children.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
    );
  return pathname === item.href;
}

function getInitialExpanded(items: NavItem[], pathname: string): string | null {
  for (const item of items) {
    if (item.children && isGroupActive(item, pathname)) return item.href;
  }
  return null;
}

function SidebarNavItem({
  item,
  collapsed,
  expanded,
  onToggleExpand,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isGroupActive(item, pathname);
  const Icon = item.icon;
  const exactActive = !item.children && pathname === item.href;

  return (
    <div>
      {item.children ? (
        <button
          onClick={onToggleExpand}
          title={collapsed ? item.label : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
            active
              ? "bg-primary/10 text-primary"
              : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Icon size={16} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {expanded ? (
                <ChevronDown size={14} className="opacity-60" />
              ) : (
                <ChevronRight size={14} className="opacity-60" />
              )}
            </>
          )}
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={onNavigate}
          title={collapsed ? item.label : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
            exactActive
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Icon size={16} className="shrink-0" />
          {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
        </Link>
      )}

      {!collapsed && item.children && expanded && (
        <div className="mt-0.5 ml-7 flex flex-col gap-0.5">
          {item.children.map((child) => {
            const childActive = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className={`rounded px-2 py-1.5 text-left text-xs transition-colors ${
                  childActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  navItems: NavItem[];
  resourceItems: NavItem[];
  toolItems: NavItem[];
  onNavigate?: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
  navItems,
  resourceItems,
  toolItems,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const allItems = [...navItems, ...resourceItems, ...toolItems];
  const [expandedHref, setExpandedHref] = useState<string | null>(() =>
    getInitialExpanded(allItems, pathname),
  );

  useEffect(() => {
    const next = getInitialExpanded(allItems, pathname);
    if (next) setExpandedHref(next);
  }, [pathname]);

  function handleToggle(href: string) {
    setExpandedHref((prev) => (prev === href ? null : href));
  }

  function renderItems(items: NavItem[]) {
    return items.map((item) => (
      <SidebarNavItem
        key={item.href}
        item={item}
        collapsed={collapsed}
        expanded={expandedHref === item.href}
        onToggleExpand={() => handleToggle(item.href)}
        onNavigate={onNavigate}
      />
    ));
  }

  return (
    <aside
      className={`${collapsed ? "w-[56px]" : "w-[248px]"} bg-card border-border flex h-screen shrink-0 flex-col border-r transition-all duration-200`}
    >
      <div
        className={`border-border flex h-14 shrink-0 items-center border-b ${collapsed ? "justify-center px-0" : "gap-2.5 px-4"}`}
      >
        {!collapsed && (
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <Bot size={18} className="text-primary-foreground" />
            </div>
            <span
              className="text-foreground truncate text-base font-bold tracking-tight"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Mechowarts
            </span>
          </div>
        )}
        {collapsed && (
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Bot size={18} className="text-primary-foreground" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="hover:bg-accent text-muted-foreground hover:text-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors"
          >
            <PanelLeftClose size={15} />
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pt-3">
        <div className="flex flex-col gap-0.5 pb-3">
          {renderItems(navItems)}
        </div>

        {!collapsed && (
          <>
            <div className="pb-3">
              <p className="text-muted-foreground mb-1.5 px-3 text-[10px] font-semibold tracking-widest uppercase">
                Resources
              </p>
              <div className="flex flex-col gap-0.5">
                {renderItems(resourceItems)}
              </div>
            </div>
            <div className="pb-4">
              <p className="text-muted-foreground mb-1.5 px-3 text-[10px] font-semibold tracking-widest uppercase">
                Tools
              </p>
              <div className="flex flex-col gap-0.5">
                {renderItems(toolItems)}
              </div>
            </div>
          </>
        )}
        {collapsed && (
          <>
            <div className="flex flex-col gap-0.5 pb-3">
              {renderItems(resourceItems)}
            </div>
            <div className="flex flex-col gap-0.5 pb-4">
              {renderItems(toolItems)}
            </div>
          </>
        )}
      </div>

      <div className="border-border border-t px-2 py-3">
        {collapsed ? (
          <button
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground flex w-full justify-center py-2 transition-colors"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={15} />
          </button>
        ) : (
          <div className="hover:bg-accent flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 transition-colors">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                TH
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-semibold">
                Rafid Mahmud
              </p>
              <p className="text-muted-foreground truncate text-[11px]">
                2408037@student.ruet.ac.bd
              </p>
            </div>
            <ChevronRight
              size={14}
              className="text-muted-foreground shrink-0"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
