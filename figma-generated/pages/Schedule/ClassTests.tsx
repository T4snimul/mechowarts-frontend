import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { SUBJECT_COLORS } from "../../constants";
import { classTests } from "../../data/schedule";

export default function ClassTestRoutinePage() {
  const [currentCycle] = useState(10);
  const cycles = [...new Set(classTests.map((t) => t.cycle))].sort(
    (a, b) => a - b,
  );
  const statusConfig = {
    done: {
      label: "Done",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    "results-out": {
      label: "Results Out",
      className: "bg-violet-50 text-violet-700 border-violet-200",
    },
    upcoming: {
      label: "Upcoming",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
  };
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-5 p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5 px-2.5 py-1 text-xs">
          Current: Cycle {currentCycle}
        </Badge>
        <span className="text-muted-foreground text-xs">
          Tests from Cycle 4 · 14 Cycles total
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {cycles.map((cycle) => {
          const tests = classTests.filter((t) => t.cycle === cycle);
          const isCurrent = cycle === currentCycle;
          return (
            <Card
              key={cycle}
              className={`border shadow-none ${isCurrent ? "border-primary/40 bg-primary/[0.02]" : "border-border"}`}
            >
              <CardHeader className="px-5 pt-4 pb-2">
                <div className="flex items-center gap-2.5">
                  <CardTitle
                    className="text-sm font-semibold"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    Cycle {cycle}
                  </CardTitle>
                  <span className="text-muted-foreground text-xs">
                    {tests[0]?.dates}
                  </span>
                  {isCurrent && (
                    <Badge className="bg-primary text-primary-foreground ml-1 px-2 py-0 text-[10px]">
                      Current
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-4">
                <div className="flex flex-col gap-2">
                  {tests.map((test, i) => {
                    const color = SUBJECT_COLORS[test.code] || "#64748b";
                    const cfg =
                      statusConfig[test.status as keyof typeof statusConfig];
                    return (
                      <div
                        key={i}
                        className="border-border bg-background hover:bg-muted/20 flex items-center gap-3 rounded-lg border p-2.5 transition-colors"
                      >
                        <div
                          className="w-1 shrink-0 self-stretch rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <div className="grid min-w-0 flex-1 grid-cols-[1fr_auto_auto] items-center gap-x-4">
                          <div>
                            <span
                              className="text-xs font-semibold"
                              style={{ color }}
                            >
                              {test.code}
                            </span>
                            <span className="text-foreground ml-2 text-xs">
                              {test.subject}
                            </span>
                            <p className="text-muted-foreground mt-0.5 text-[11px]">
                              {test.topics}
                            </p>
                          </div>
                          <p className="text-muted-foreground text-[11px] tabular-nums">
                            {test.period}
                          </p>
                          <Badge
                            className={`border text-[10px] whitespace-nowrap ${cfg.className}`}
                          >
                            {cfg.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
