import {
  Calculator,
  Calendar,
  Clock,
  File,
  FlaskConical,
  HomeIcon,
  LibraryBig,
  Map,
  MessageSquare,
  Notebook,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  description: string;
  breadcrumb?: string[];
  items?: DashboardNavItem[];
};

export const dashboardNav = {
  main: [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
      description:
        "Your courses, schedule, resources, and tools will appear here.",
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: Calendar,
      description:
        "Review upcoming classes, academic deadlines, and campus events.",
      items: [
        {
          title: "This Week",
          url: "/dashboard/schedule/this-week",
          description:
            "See the classes, labs, and reminders planned for this week.",
          breadcrumb: ["Schedule", "This Week"],
        },
        {
          title: "Academics",
          url: "/dashboard/schedule/academics",
          description:
            "Track academic dates, class routines, and department notices.",
          breadcrumb: ["Schedule", "Academics"],
        },
        {
          title: "Events",
          url: "/dashboard/schedule/events",
          description:
            "Keep an eye on upcoming campus programs and student activities.",
          breadcrumb: ["Schedule", "Events"],
        },
      ],
    },
    {
      title: "Family",
      url: "/dashboard/family",
      icon: Users,
      description:
        "Browse student batches and stay connected with your Mechowarts family.",
      items: [
        {
          title: "23 Series",
          url: "/dashboard/family/23-series",
          description:
            "Find updates and shared resources for the 23 series students.",
          breadcrumb: ["Family", "23 Series"],
        },
        {
          title: "22 Series",
          url: "/dashboard/family/22-series",
          description:
            "Find updates and shared resources for the 22 series students.",
          breadcrumb: ["Family", "22 Series"],
        },
        {
          title: "21 Series",
          url: "/dashboard/family/21-series",
          description:
            "Find updates and shared resources for the 21 series students.",
          breadcrumb: ["Family", "21 Series"],
        },
      ],
    },
    {
      title: "Chat",
      url: "/dashboard/chat",
      icon: MessageSquare,
      description:
        "Join conversations with classmates, groups, and academic circles.",
    },
  ],
  resources: [
    {
      title: "Notes",
      url: "/dashboard/resources/notes",
      icon: Notebook,
      description:
        "Access organized notes and study materials for your courses.",
      breadcrumb: ["Resources", "Notes"],
    },
    {
      title: "Theories",
      url: "/dashboard/resources/theories",
      icon: LibraryBig,
      description: "Read theory resources grouped by course and subject area.",
      breadcrumb: ["Resources", "Theories"],
      items: [
        {
          title: "CSE 2187: Software Engineering",
          url: "/dashboard/resources/theories/cse-2187",
          description:
            "Software Engineering theory resources will be collected here.",
          breadcrumb: ["Resources", "Theories", "CSE 2187"],
        },
        {
          title: "EEE 2187: Electronics",
          url: "/dashboard/resources/theories/eee-2187",
          description: "Electronics theory resources will be collected here.",
          breadcrumb: ["Resources", "Theories", "EEE 2187"],
        },
        {
          title: "ME 2155: Engineering Mechanics",
          url: "/dashboard/resources/theories/me-2155",
          description:
            "Engineering Mechanics theory resources will be collected here.",
          breadcrumb: ["Resources", "Theories", "ME 2155"],
        },
        {
          title:
            "MATH 2127: Fourier Series, Laplace Transform and Partial Differential Equation",
          url: "/dashboard/resources/theories/math-2127",
          description:
            "Math theory resources for Fourier series, Laplace transforms, and PDEs will be collected here.",
          breadcrumb: ["Resources", "Theories", "MATH 2127"],
        },
        {
          title: "HUM 2127: Engineering Economics & Accounting",
          url: "/dashboard/resources/theories/hum-2127",
          description:
            "Engineering Economics and Accounting theory resources will be collected here.",
          breadcrumb: ["Resources", "Theories", "HUM 2127"],
        },
      ],
    },
    {
      title: "Sessionals",
      url: "/dashboard/resources/sessionals",
      icon: FlaskConical,
      description: "Find lab, sessional, and practical coursework resources.",
      breadcrumb: ["Resources", "Sessionals"],
      items: [
        {
          title: "CSE 2187: Software Engineering",
          url: "/dashboard/resources/sessionals/cse-2187",
          description:
            "Software Engineering sessional resources will be collected here.",
          breadcrumb: ["Resources", "Sessionals", "CSE 2187"],
        },
        {
          title: "EEE 2187: Electronics",
          url: "/dashboard/resources/sessionals/eee-2187",
          description:
            "Electronics sessional resources will be collected here.",
          breadcrumb: ["Resources", "Sessionals", "EEE 2187"],
        },
        {
          title: "ME 2155: Engineering Mechanics",
          url: "/dashboard/resources/sessionals/me-2155",
          description:
            "Engineering Mechanics sessional resources will be collected here.",
          breadcrumb: ["Resources", "Sessionals", "ME 2155"],
        },
        {
          title:
            "MATH 2127: Fourier Series, Laplace Transform and Partial Differential Equation",
          url: "/dashboard/resources/sessionals/math-2127",
          description:
            "Math sessional resources for Fourier series, Laplace transforms, and PDEs will be collected here.",
          breadcrumb: ["Resources", "Sessionals", "MATH 2127"],
        },
        {
          title: "HUM 2127: Engineering Economics & Accounting",
          url: "/dashboard/resources/sessionals/hum-2127",
          description:
            "Engineering Economics and Accounting sessional resources will be collected here.",
          breadcrumb: ["Resources", "Sessionals", "HUM 2127"],
        },
      ],
    },
  ],
  tools: [
    {
      title: "Grade Calculator",
      url: "/dashboard/tools/grade-calculator",
      icon: Calculator,
      description:
        "Estimate course grades and plan the scores you need for your targets.",
      breadcrumb: ["Tools", "Grade Calculator"],
    },
    {
      title: "Report Cover Generator",
      url: "/dashboard/tools/report-cover-generator",
      icon: File,
      description:
        "Generate clean report covers for labs, assignments, and projects.",
      breadcrumb: ["Tools", "Report Cover Generator"],
    },
    {
      title: "Pomodoro Timer",
      url: "/dashboard/tools/pomodoro-timer",
      icon: Clock,
      description:
        "Use focused work sessions to stay steady during study time.",
      breadcrumb: ["Tools", "Pomodoro Timer"],
    },
    {
      title: "Alumni Map",
      url: "/dashboard/tools/alumni-map",
      icon: Map,
      description:
        "Explore where alumni are studying, working, and building their careers.",
      breadcrumb: ["Tools", "Alumni Map"],
    },
  ],
} satisfies Record<string, DashboardNavItem[]>;

const flattenItems = (items: DashboardNavItem[]): DashboardNavItem[] =>
  items.flatMap((item) => [item, ...flattenItems(item.items ?? [])]);

export const dashboardRoutes = flattenItems([
  ...dashboardNav.main,
  ...dashboardNav.resources,
  ...dashboardNav.tools,
]);

export const getDashboardRoute = (pathname: string) =>
  dashboardRoutes.find((route) => route.url === pathname);
