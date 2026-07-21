// ─── Subject colors ───────────────────────────────────────────────────────────
export const SUBJECT_COLORS: Record<string, string> = {
  "ME 301": "#0d9488",
  "ME 303": "#7c3aed",
  "ME 305": "#d97706",
  "ME 307": "#0891b2",
  "ME 309": "#be185d",
  "ME 311": "#16a34a",
};

export const SERIES_COLORS: Record<string, string> = {
  "25": "#0d9488",
  "24": "#7c3aed",
  "23": "#d97706",
  "22": "#0891b2",
  "21": "#be185d",
  "20": "#16a34a",
};

export const SERIES_LIST = [
  { key: "25", label: "25 Series", context: "Semester 1-1" },
  { key: "24", label: "24 Series", context: "Semester 2-1" },
  { key: "23", label: "23 Series", context: "Semester 2-2" },
  { key: "22", label: "22 Series", context: "Semester 3-1" },
  { key: "21", label: "21 Series", context: "Semester 3-2" },
  { key: "20", label: "20 Series", context: "Semester 4-1" },
];

export const seriesToRollPrefix = (k: string) => `${k}08`;

// ─── Schedule constants ───────────────────────────────────────────────────────
export const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed"];
export const PERIOD_SLOTS = [
  { label: "P1", time: "08:00", period: 1 },
  { label: "P2", time: "08:50", period: 2 },
  { label: "P3", time: "09:40", period: 3 },
  { label: "Break", time: "10:30", period: -1 },
  { label: "P4", time: "10:50", period: 4 },
  { label: "P5", time: "11:40", period: 5 },
  { label: "P6", time: "12:30", period: 6 },
  { label: "Lunch", time: "13:20", period: -2 },
  { label: "P7", time: "14:30", period: 7 },
  { label: "P8", time: "15:20", period: 8 },
];

// ─── Notes constants ──────────────────────────────────────────────────────────
export const NOTE_SEMESTERS = [
  "1-1",
  "1-2",
  "2-1",
  "2-2",
  "3-1",
  "3-2",
  "4-1",
  "4-2",
];
export const NOTE_PRESET_TAGS = [
  "Theory",
  "Formula",
  "Exercise",
  "Summary",
  "Lab",
];
export const NOTE_COURSES = Object.keys(SUBJECT_COLORS);

// ─── Grade calculator constants ───────────────────────────────────────────────
export const RUET_GRADES = [
  { letter: "A+", gpa: 4.0, min: 80 },
  { letter: "A", gpa: 3.75, min: 75 },
  { letter: "A-", gpa: 3.5, min: 70 },
  { letter: "B+", gpa: 3.25, min: 65 },
  { letter: "B", gpa: 3.0, min: 60 },
  { letter: "B-", gpa: 2.75, min: 55 },
  { letter: "C+", gpa: 2.5, min: 50 },
  { letter: "C", gpa: 2.25, min: 45 },
  { letter: "D", gpa: 2.0, min: 40 },
  { letter: "F", gpa: 0.0, min: 0 },
];

// ─── Pomodoro constants ───────────────────────────────────────────────────────
import type { PomodoroMode } from "../types";
export const POMODORO_DURATIONS: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};
export const POMODORO_LABELS: Record<PomodoroMode, string> = {
  focus: "Focus",
  short: "Short Break",
  long: "Long Break",
};
export const POMODORO_COLORS: Record<PomodoroMode, string> = {
  focus: "#0d9488",
  short: "#7c3aed",
  long: "#0891b2",
};
export const POMODORO_BG: Record<PomodoroMode, string> = {
  focus: "bg-teal-50",
  short: "bg-violet-50",
  long: "bg-sky-50",
};
