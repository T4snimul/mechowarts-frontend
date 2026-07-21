import {
  ArrowUpRight,
  BarChart3,
  BookMarked,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { GraduationCap } from "lucide-react";
import type { Page } from "../../types";
import {
  todaySchedule,
  recentNotes,
  stats,
  upcomingTasks,
  courseProgress,
  dashTools,
} from "../../data/schedule";

export default function DashboardPage({
  onNavigate,
}: {
  onNavigate: (p: Page) => void;
}) {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 17
        ? "Good afternoon"
        : "Good evening";
  const dateStr = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 p-4 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1
            className="text-foreground text-xl font-bold md:text-2xl"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {greeting}, Rafid 👋
          </h1>
          <p className="text-muted-foreground mt-0.5 text-sm">{dateStr}</p>
        </div>
        <Badge
          variant="outline"
          className="border-primary/30 text-primary bg-primary/5 shrink-0 gap-1 px-2.5 py-1 text-xs"
        >
          <GraduationCap size={12} />
          3rd Year · ME
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-border shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      {s.label}
                    </p>
                    <p
                      className="text-foreground mt-1 text-2xl font-bold"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[11px]">
                      {s.trend === "up" && (
                        <ArrowUpRight size={11} className="text-emerald-500" />
                      )}
                      {s.sub}
                    </p>
                  </div>
                  <div
                    className={`h-9 w-9 rounded-lg ${s.bg} flex shrink-0 items-center justify-center`}
                  >
                    <Icon size={18} className={s.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border shadow-none lg:col-span-2">
          <CardHeader className="px-5 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-sm font-semibold"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {"Today's Schedule"}
              </CardTitle>
              <button
                onClick={() => onNavigate("schedule-routine")}
                className="text-primary flex items-center gap-0.5 text-xs hover:underline"
              >
                Full schedule
                <ChevronRight size={12} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="flex flex-col">
              {todaySchedule.map((slot, i) => (
                <div key={i} className="flex items-stretch gap-3">
                  <div className="w-14 shrink-0 pt-1">
                    <span className="text-muted-foreground text-[11px] font-medium tabular-nums">
                      {slot.time}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          slot.type === "break" ? "#cbd5e1" : slot.color,
                      }}
                    />
                    {i < todaySchedule.length - 1 && (
                      <div className="bg-border mt-1 mb-1 w-px flex-1" />
                    )}
                  </div>
                  <div
                    className={`mb-3 flex-1 rounded-lg px-3 py-2 ${slot.type === "break" ? "bg-muted/40" : "bg-card border-border border"}`}
                  >
                    {slot.type === "break" ? (
                      <p className="text-muted-foreground text-xs italic">
                        Lunch Break
                      </p>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-foreground text-sm leading-tight font-medium">
                            {slot.subject}
                          </p>
                          <p className="text-muted-foreground mt-0.5 text-[11px]">
                            {slot.room}
                          </p>
                        </div>
                        <Badge
                          className="shrink-0 px-1.5 py-0 text-[10px]"
                          style={{
                            backgroundColor: slot.color + "18",
                            color: slot.color,
                            border: `1px solid ${slot.color}30`,
                          }}
                        >
                          {slot.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="border-border shadow-none">
            <CardHeader className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle
                  className="text-sm font-semibold"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Upcoming Tasks
                </CardTitle>
                <span className="text-muted-foreground text-[11px]">
                  {upcomingTasks.filter((t) => !t.done).length} remaining
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <div className="flex flex-col gap-2">
                {upcomingTasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {task.done ? (
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                    ) : (
                      <Circle
                        size={15}
                        className={`mt-0.5 shrink-0 ${task.priority === "high" ? "text-rose-400" : task.priority === "medium" ? "text-amber-400" : "text-slate-300"}`}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs leading-tight ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {task.title}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-[10px]">
                        {task.due}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border shadow-none">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle
                className="text-sm font-semibold"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Quick Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {dashTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.page}
                      onClick={() => onNavigate(tool.page)}
                      className="border-border hover:border-primary/30 hover:bg-primary/5 group flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-all"
                    >
                      <div
                        className={`h-8 w-8 rounded-lg ${tool.color} flex items-center justify-center`}
                      >
                        <Icon size={15} className="text-white" />
                      </div>
                      <span className="text-foreground/80 group-hover:text-primary text-center text-[11px] leading-tight font-medium transition-colors">
                        {tool.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border shadow-none">
          <CardHeader className="px-5 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-sm font-semibold"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Course Progress
              </CardTitle>
              <BarChart3 size={14} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex flex-col gap-4">
              {courseProgress.map((c) => (
                <div key={c.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-foreground text-xs font-medium">
                      {c.name}
                    </span>
                    <span className="text-muted-foreground text-[11px] tabular-nums">
                      {c.done}/{c.chapters} ch.
                    </span>
                  </div>
                  <Progress value={c.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-none">
          <CardHeader className="px-5 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-sm font-semibold"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Recent Notes
              </CardTitle>
              <button
                onClick={() => onNavigate("notes")}
                className="text-primary flex items-center gap-0.5 text-xs hover:underline"
              >
                All
                <ChevronRight size={12} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="divide-border flex flex-col divide-y">
              {recentNotes.map((note, i) => (
                <div
                  key={i}
                  className="group flex cursor-pointer items-start gap-3 py-3 first:pt-0 last:pb-0"
                  onClick={() => onNavigate("notes")}
                >
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors">
                    <BookMarked size={14} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground group-hover:text-primary truncate text-xs leading-snug font-medium transition-colors">
                      {note.title}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-[11px]">
                      {note.subject}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge
                      variant="outline"
                      className="border-border px-1.5 py-0 text-[10px]"
                    >
                      {note.tag}
                    </Badge>
                    <span className="text-muted-foreground text-[10px] whitespace-nowrap">
                      {note.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
