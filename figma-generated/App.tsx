import { useState } from "react";
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
  Search,
  Bell,
  CalendarDays,
  PanelLeftOpen,
  ChevronRight,
} from "lucide-react";
import type { Page, NavItem, PersonProfile } from "./types";
import Sidebar from "./components/common/Sidebar";
import ProfileOverlay from "./components/common/ProfileOverlay";
import PlaceholderPage from "./components/common/PlaceholderPage";
import HomePage from "./pages/Home";
import {
  ClassRoutinePage,
  SemesterExamsPage,
  ClassTestRoutinePage,
  EventsPage,
} from "./pages/Schedule";
import {
  FamilyFeedPage,
  FamilyStudentsPage,
  FamilyTeachersPage,
  FamilyAlumniPage,
  FamilyStaffPage,
} from "./pages/Family";
import ChatPage from "./pages/Chat";
import NotesPage from "./pages/Notes";
import GradeCalcPage from "./pages/GradeCalc";
import PomodoroPage from "./pages/Pomodoro";
import ReportCoverPage from "./pages/ReportCover";

// ─── Nav config ───────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  {
    id: "schedule-routine",
    label: "Schedule",
    icon: Calendar,
    children: [
      { id: "schedule-routine", label: "Class Routine" },
      { id: "schedule-exams", label: "Semester Exams" },
      { id: "schedule-tests", label: "Class Test Routine" },
      { id: "schedule-events", label: "Events & Activities" },
    ],
  },
  {
    id: "family-feed",
    label: "MTE Family",
    icon: Users,
    children: [
      { id: "family-feed", label: "MTE Wall" },
      { id: "family-students", label: "Students" },
      { id: "family-teachers", label: "Teachers" },
      { id: "family-alumni", label: "Alumni" },
      { id: "family-staff", label: "Staff" },
    ],
  },
  { id: "chat", label: "Chat", icon: MessageSquare },
];
const resourceItems: NavItem[] = [
  { id: "notes", label: "Notes", icon: FileText },
  {
    id: "theories",
    label: "Theories",
    icon: BookOpen,
    children: [
      { id: "theories", label: "Physics" },
      { id: "theories", label: "Mathematics" },
    ],
  },
  {
    id: "sessionals",
    label: "Sessionals",
    icon: FlaskConical,
    children: [
      { id: "sessionals", label: "Lab Reports" },
      { id: "sessionals", label: "Experiments" },
    ],
  },
];
const toolItems: NavItem[] = [
  { id: "grade-calc", label: "Grade Calculator", icon: Calculator },
  { id: "report-cover", label: "Report Cover Generator", icon: FileOutput },
  { id: "pomodoro", label: "Pomodoro Timer", icon: Timer },
];
const schedulePages: Page[] = [
  "schedule-routine",
  "schedule-exams",
  "schedule-tests",
  "schedule-events",
];
const familyPages: Page[] = [
  "family-feed",
  "family-students",
  "family-teachers",
  "family-alumni",
  "family-staff",
];

const pageLabels: Record<Page, string> = {
  home: "Dashboard",
  "schedule-routine": "Class Routine",
  "schedule-exams": "Semester Exam Schedule",
  "schedule-tests": "Class Test Routine",
  "schedule-events": "Events & Activities",
  "family-feed": "MTE Wall",
  "family-students": "Students",
  "family-teachers": "Teachers",
  "family-alumni": "Alumni",
  "family-staff": "Staff",
  chat: "Chat",
  notes: "Notes",
  theories: "Theories",
  sessionals: "Sessionals",
  "grade-calc": "Grade Calculator",
  "report-cover": "Report Cover Generator",
  pomodoro: "Pomodoro Timer",
};
const pageSubtitles: Partial<Record<Page, string>> = {
  home: "Your courses, schedule, resources, and tools — all in one place.",
  "schedule-routine": "Sat – Wed · 3rd Year, 1st Semester",
  "schedule-exams": "Final examinations · 3rd Year, 1st Semester",
  "schedule-tests": "In-semester assessments starting from Cycle 4",
  "schedule-events": "Non-academic activities, sports, and cultural events",
  "family-feed":
    "Share moments, thoughts, and achievements with the MTE community",
  "family-students": "Browse all students by series",
  "family-teachers": "Department of Mechanical & Industrial Engineering, RUET",
  "family-alumni": "MTE graduates making their mark around the world",
  "family-staff": "Lab technicians and administrative staff",
  theories: "Coming soon — check back later",
  sessionals: "Coming soon — check back later",
  chat: "Messages with classmates, teachers, and alumni",
};
const pageCrumbs: Record<Page, string> = {
  home: "Home / Dashboard",
  "schedule-routine": "Schedule / Class Routine",
  "schedule-exams": "Schedule / Semester Exams",
  "schedule-tests": "Schedule / Class Test Routine",
  "schedule-events": "Schedule / Events & Activities",
  "family-feed": "MTE Family / Wall",
  "family-students": "MTE Family / Students",
  "family-teachers": "MTE Family / Teachers",
  "family-alumni": "MTE Family / Alumni",
  "family-staff": "MTE Family / Staff",
  chat: "Home / Chat",
  notes: "Resources / Notes",
  theories: "Resources / Theories",
  sessionals: "Resources / Sessionals",
  "grade-calc": "Tools / Grade Calculator",
  "report-cover": "Tools / Report Cover Generator",
  pomodoro: "Tools / Pomodoro Timer",
};

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({
  page,
  onMenuToggle,
}: {
  page: Page;
  onMenuToggle: () => void;
}) {
  const sub = pageSubtitles[page];
  return (
    <header className="bg-card border-border shrink-0 border-b px-4 md:px-6">
      <div className="flex h-14 items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="hover:bg-accent text-muted-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors md:hidden"
        >
          <PanelLeftOpen size={16} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground truncate text-xs">
            {pageCrumbs[page]}
          </p>
          {sub && (
            <p className="text-muted-foreground/70 hidden truncate text-[11px] sm:block">
              {sub}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="hover:bg-accent text-muted-foreground hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
            <Search size={16} />
          </button>
          <button className="hover:bg-accent text-muted-foreground hover:text-foreground hidden h-8 w-8 items-center justify-center rounded-lg transition-colors sm:flex">
            <CalendarDays size={16} />
          </button>
          <button className="hover:bg-accent text-muted-foreground hover:text-foreground relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
            <Bell size={16} />
            <span className="bg-primary absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [selectedProfile, setSelectedProfile] = useState<PersonProfile | null>(
    null,
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function renderPage() {
    switch (activePage) {
      case "home":
        return <HomePage onNavigate={setActivePage} />;
      case "schedule-routine":
        return <ClassRoutinePage />;
      case "schedule-exams":
        return <SemesterExamsPage />;
      case "schedule-tests":
        return <ClassTestRoutinePage />;
      case "schedule-events":
        return <EventsPage />;
      case "family-feed":
        return <FamilyFeedPage onOpenProfile={setSelectedProfile} />;
      case "family-students":
        return <FamilyStudentsPage onOpenProfile={setSelectedProfile} />;
      case "family-teachers":
        return <FamilyTeachersPage onOpenProfile={setSelectedProfile} />;
      case "family-alumni":
        return <FamilyAlumniPage onOpenProfile={setSelectedProfile} />;
      case "family-staff":
        return <FamilyStaffPage onOpenProfile={setSelectedProfile} />;
      case "chat":
        return <ChatPage onOpenProfile={setSelectedProfile} />;
      case "notes":
        return <NotesPage />;
      case "grade-calc":
        return <GradeCalcPage />;
      case "pomodoro":
        return <PomodoroPage />;
      case "report-cover":
        return <ReportCoverPage />;
      default:
        return <PlaceholderPage title={pageLabels[activePage]} />;
    }
  }

  const isChatPage =
    activePage === "chat" ||
    activePage === "family-alumni" ||
    activePage === "notes";

  return (
    <div
      className="bg-background flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              active={activePage}
              onNavigate={(p) => {
                setActivePage(p);
                setMobileSidebarOpen(false);
              }}
              collapsed={false}
              onToggle={() => setMobileSidebarOpen(false)}
              navItems={navItems}
              resourceItems={resourceItems}
              toolItems={toolItems}
              schedulePages={schedulePages}
              familyPages={familyPages}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          active={activePage}
          onNavigate={setActivePage}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
          navItems={navItems}
          resourceItems={resourceItems}
          toolItems={toolItems}
          schedulePages={schedulePages}
          familyPages={familyPages}
        />
      </div>

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          page={activePage}
          onMenuToggle={() => setMobileSidebarOpen(true)}
        />
        <div
          className={`min-h-0 flex-1 ${isChatPage ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          {renderPage()}
        </div>
      </div>

      {selectedProfile && (
        <ProfileOverlay
          person={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
