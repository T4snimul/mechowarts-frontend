import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  Coffee,
  Focus,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import type { PomodoroMode } from "../../types";
import {
  POMODORO_DURATIONS,
  POMODORO_LABELS,
  POMODORO_COLORS,
  POMODORO_BG,
} from "../../constants";

export default function PomodoroPage() {
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [timeLeft, setTimeLeft] = useState(POMODORO_DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalFocused, setTotalFocused] = useState(0);
  const [task, setTask] = useState("Studying Thermodynamics");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = POMODORO_DURATIONS[mode];
  const progress = timeLeft / total;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const color = POMODORO_COLORS[mode];

  const R = 100,
    CX = 120,
    CY = 120;
  const circumference = 2 * Math.PI * R;
  const strokeDash = circumference * progress;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            if (mode === "focus") {
              setSessions((s) => s + 1);
              setTotalFocused((tf) => tf + POMODORO_DURATIONS.focus);
            }
            clearInterval(intervalRef.current!);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  function switchMode(m: PomodoroMode) {
    setMode(m);
    setTimeLeft(POMODORO_DURATIONS[m]);
    setRunning(false);
  }
  function reset() {
    setTimeLeft(POMODORO_DURATIONS[mode]);
    setRunning(false);
  }

  const focusMins = Math.floor(totalFocused / 60);

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col items-center gap-6 p-4 md:p-8">
      <div className="bg-muted/50 border-border flex w-full gap-1 rounded-xl border p-1">
        {(["focus", "short", "long"] as PomodoroMode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${mode === m ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            style={mode === m ? { color: POMODORO_COLORS[m] } : {}}
          >
            {POMODORO_LABELS[m]}
          </button>
        ))}
      </div>

      <div
        className={`relative flex items-center justify-center rounded-full p-6 ${POMODORO_BG[mode]}`}
        style={{ width: 280, height: 280 }}
      >
        <svg
          width={240}
          height={240}
          viewBox="0 0 240 240"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth={10}
          />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center gap-1">
          <span
            className="text-5xl font-bold tracking-tight tabular-nums"
            style={{ fontFamily: "Nunito, sans-serif", color }}
          >
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            {POMODORO_LABELS[mode]}
          </span>
          {sessions > 0 && (
            <div className="mt-1 flex gap-1">
              {Array.from({ length: Math.min(sessions, 8) }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border-border flex w-full items-center gap-2 rounded-xl border px-4 py-2.5">
        <Focus size={13} className="text-muted-foreground shrink-0" />
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="text-foreground placeholder:text-muted-foreground/50 flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="border-border hover:bg-accent text-muted-foreground hover:text-foreground flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: color }}
        >
          {running ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
        </button>
        <button
          onClick={() => {
            const next: PomodoroMode = mode === "focus" ? "short" : "focus";
            switchMode(next);
          }}
          className="border-border hover:bg-accent text-muted-foreground hover:text-foreground flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="grid w-full grid-cols-3 gap-3">
        {[
          { label: "Sessions", value: sessions.toString(), icon: CheckCircle2 },
          { label: "Focused", value: `${focusMins}m`, icon: Focus },
          {
            label: "Until break",
            value:
              sessions % 4 === 0 && sessions > 0
                ? "Long!"
                : `${4 - (sessions % 4)} left`,
            icon: Coffee,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border shadow-none">
              <CardContent className="flex flex-col items-center gap-1 p-3">
                <Icon size={15} style={{ color }} />
                <p
                  className="text-foreground text-lg font-bold"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-[10px]">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-muted-foreground max-w-xs text-center text-[11px] leading-relaxed">
        {mode === "focus"
          ? "Stay focused. Every 4 sessions earns a long break."
          : mode === "short"
            ? "Take a breath. Step away from your screen briefly."
            : "Great work! Rest well — you've earned this long break."}
      </p>
    </div>
  );
}
