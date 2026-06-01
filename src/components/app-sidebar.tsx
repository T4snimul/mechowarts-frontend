"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import Logo from "@/assets/logo.svg";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { dashboardNav } from "@/config/dashboard-nav";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = useCurrentUser();

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                    <img src={Logo} alt="Mechowarts" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium text-sm">Mechowarts</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={dashboardNav.main} label="" />
          <NavMain items={dashboardNav.resources} label="Resources" />
          <NavMain items={dashboardNav.tools} label="Tools" />
        </SidebarContent>
        {currentUser && (
          <SidebarFooter>
            <NavUser
              user={{
                name: currentUser.name,
                email: currentUser.email,
                avatar: currentUser.nameAvatar,
              }}
            />
          </SidebarFooter>
        )}
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
