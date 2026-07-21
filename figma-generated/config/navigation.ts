import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BookOpen,
  FlaskConical,
  Calculator,
  FileOutput,
  Timer,
} from "lucide-react";
import type { NavItem } from "../types";

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  {
    href: "/schedule/routine",
    label: "Schedule",
    icon: Calendar,
    children: [
      { href: "/schedule/routine", label: "Class Routine" },
      { href: "/schedule/exams", label: "Semester Exams" },
      { href: "/schedule/tests", label: "Class Test Routine" },
      { href: "/schedule/events", label: "Events & Activities" },
    ],
  },
  {
    href: "/family",
    label: "MTE Family",
    icon: Users,
    children: [
      { href: "/family", label: "MTE Wall" },
      { href: "/family/students", label: "Students" },
      { href: "/family/teachers", label: "Teachers" },
      { href: "/family/alumni", label: "Alumni" },
      { href: "/family/staff", label: "Staff" },
    ],
  },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

export const resourceItems: NavItem[] = [
  { href: "/notes", label: "Notes", icon: FileText },
  {
    href: "/theories",
    label: "Theories",
    icon: BookOpen,
    children: [
      { href: "/theories/physics", label: "Physics" },
      { href: "/theories/mathematics", label: "Mathematics" },
    ],
  },
  {
    href: "/sessionals",
    label: "Sessionals",
    icon: FlaskConical,
    children: [
      { href: "/sessionals/lab-reports", label: "Lab Reports" },
      { href: "/sessionals/experiments", label: "Experiments" },
    ],
  },
];

export const toolItems: NavItem[] = [
  { href: "/tools/grade-calc", label: "Grade Calculator", icon: Calculator },
  {
    href: "/tools/report-cover",
    label: "Report Cover Generator",
    icon: FileOutput,
  },
  { href: "/tools/pomodoro", label: "Pomodoro Timer", icon: Timer },
];

// ─── Page metadata keyed by pathname ─────────────────────────────────────────

export interface PageMeta {
  crumb: string;
  subtitle?: string;
}

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    crumb: "Home / Dashboard",
    subtitle:
      "Your courses, schedule, resources, and tools — all in one place.",
  },
  "/schedule/routine": {
    crumb: "Schedule / Class Routine",
    subtitle: "Sat – Wed · 3rd Year, 1st Semester",
  },
  "/schedule/exams": {
    crumb: "Schedule / Semester Exams",
    subtitle: "Final examinations · 3rd Year, 1st Semester",
  },
  "/schedule/tests": {
    crumb: "Schedule / Class Test Routine",
    subtitle: "In-semester assessments starting from Cycle 4",
  },
  "/schedule/events": {
    crumb: "Schedule / Events & Activities",
    subtitle: "Non-academic activities, sports, and cultural events",
  },
  "/family": {
    crumb: "MTE Family / Wall",
    subtitle:
      "Share moments, thoughts, and achievements with the MTE community",
  },
  "/family/students": {
    crumb: "MTE Family / Students",
    subtitle: "Browse all students by series",
  },
  "/family/teachers": {
    crumb: "MTE Family / Teachers",
    subtitle: "Department of Mechanical & Industrial Engineering, RUET",
  },
  "/family/alumni": {
    crumb: "MTE Family / Alumni",
    subtitle: "MTE graduates making their mark around the world",
  },
  "/family/staff": {
    crumb: "MTE Family / Staff",
    subtitle: "Lab technicians and administrative staff",
  },
  "/chat": {
    crumb: "Home / Chat",
    subtitle: "Messages with classmates, teachers, and alumni",
  },
  "/notes": { crumb: "Resources / Notes" },
  "/theories": {
    crumb: "Resources / Theories",
    subtitle: "Coming soon — check back later",
  },
  "/sessionals": {
    crumb: "Resources / Sessionals",
    subtitle: "Coming soon — check back later",
  },
  "/tools/grade-calc": { crumb: "Tools / Grade Calculator" },
  "/tools/report-cover": { crumb: "Tools / Report Cover Generator" },
  "/tools/pomodoro": { crumb: "Tools / Pomodoro Timer" },
};

// Paths where the main content area should not scroll (full-height panels)
export const noScrollPaths = new Set([
  "/chat",
  "/family/alumni",
  "/notes",
  "/tools/report-cover",
]);
