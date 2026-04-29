"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavTools } from "@/components/nav-tools";
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
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CalculatorIcon,
  FileIcon,
  ClockIcon,
  Chat,
  ChatIcon,
  Books,
  MapsIcon,
  MachineRobotIcon,
} from "@hugeicons/core-free-icons";
import Logo from "@/assets/logo.png";
import {
  BookOpen,
  Bot,
  Calendar,
  HomeIcon,
  LibraryBig,
  MessageCircle,
  Notebook,
  Pickaxe,
  Settings2,
  SquareTerminal,
  User,
  Users,
} from "lucide-react";
import { TooltipProvider } from "./ui/tooltip";

// This is sample data.
const data = {
  user: {
    name: "Tasnimul Hasan",
    email: "2408020@student.ruet.ac.bd",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Schedule",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "This Week",
          url: "#",
        },
        {
          title: "Academics",
          url: "#",
        },
        {
          title: "Events",
          url: "#",
        },
      ],
    },
    {
      title: "Friends",
      url: "#",
      icon: Users,
      items: [
        {
          title: "My Friends",
          url: "#",
        },
        {
          title: "Add Friends",
          url: "#",
        },
      ],
    },
    {
      title: "Notes",
      url: "#",
      icon: Notebook,
    },
    {
      title: "Chat",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Theories",
      url: "#",
      icon: LibraryBig,
      items: [
        {
          title: "CSE 2187: Software Engineering",
          url: "#",
        },
        {
          title: "EEE 2187: Electronics",
          url: "#",
        },
        {
          title: "ME 2155: Engineering Mechanics",
          url: "#",
        },
        {
          title:
            "MATH 2127: Fourier Series, Laplace Transform and Partial Differential Equation",
          url: "#",
        },
        {
          title: "HUM 2127: Engineering Economics & Accounting",
          url: "#",
        },
      ],
    },
    {
      title: "Sessionals",
      url: "#",
      icon: Pickaxe,
      items: [
        {
          title: "CSE 2187: Software Engineering",
          url: "#",
        },
        {
          title: "EEE 2187: Electronics",
          url: "#",
        },
        {
          title: "ME 2155: Engineering Mechanics",
          url: "#",
        },
        {
          title:
            "MATH 2127: Fourier Series, Laplace Transform and Partial Differential Equation",
          url: "#",
        },
        {
          title: "HUM 2127: Engineering Economics & Accounting",
          url: "#",
        },
      ],
    },
  ],
  tools: [
    {
      name: "Grade Calculator",
      url: "#",
      icon: <HugeiconsIcon icon={CalculatorIcon} strokeWidth={2} />,
    },
    {
      name: "Report Cover Generator",
      url: "#",
      icon: <HugeiconsIcon icon={FileIcon} strokeWidth={2} />,
    },
    {
      name: "Pomodoro Timer",
      url: "#",
      icon: <HugeiconsIcon icon={ClockIcon} strokeWidth={2} />,
    },
    {
      name: "Alumni Map",
      url: "#",
      icon: <HugeiconsIcon icon={MapsIcon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary-foreground text-sidebar-primary-foreground">
                    <img src={Logo} alt="Mechowarts" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium text-sm">Mechowarts</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavTools tools={data.tools} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
