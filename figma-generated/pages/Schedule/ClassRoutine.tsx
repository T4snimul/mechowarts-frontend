import { useState } from "react";
import { Calendar, AlertCircle } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { DAYS, PERIOD_SLOTS, SUBJECT_COLORS } from "../../constants";
import { classRoutine } from "../../data/schedule";

export default function ClassRoutinePage() {
  const [currentCycle] = useState(10);
  function getEntry(dayIdx: number, period: number) {
    return (classRoutine[dayIdx] || []).find(
      (e) =>
        e.periodsStart <= period && period < e.periodsStart + e.periodsCount,
    );
  }
  function isLabCont(dayIdx: number, period: number) {
    return (classRoutine[dayIdx] || []).some(
      (e) =>
        e.type === "lab" &&
        e.periodsStart < period &&
        period < e.periodsStart + e.periodsCount,
    );
  }
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5 px-2.5 py-1 text-xs">
            <Calendar size={12} />
            Cycle {currentCycle} / 14
          </Badge>
          {currentCycle >= 4 && (
            <Badge className="gap-1.5 border-amber-200 bg-amber-50 px-2.5 py-1 text-xs text-amber-700">
              <AlertCircle size={12} />
              Class Test Period Active
            </Badge>
          )}
        </div>
        <div className="text-muted-foreground flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-primary/20 inline-block h-3 w-3 rounded" />{" "}
            Class
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-amber-200" /> Lab
          </span>
        </div>
      </div>
      <Card className="border-border overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-xs">
            <thead>
              <tr className="bg-muted/40">
                <th className="text-muted-foreground border-border w-24 border-b px-3 py-2.5 text-left font-semibold">
                  Time
                </th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="border-border text-foreground border-b px-3 py-2.5 text-center font-semibold"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIOD_SLOTS.map((slot) => {
                if (slot.period < 0)
                  return (
                    <tr key={slot.label} className="bg-muted/20">
                      <td className="text-muted-foreground border-border border-b px-3 py-1.5 text-[11px] italic">
                        <span className="font-medium">{slot.time}</span>
                        <span className="ml-1.5 opacity-70">
                          {slot.period === -1 ? "Short Break" : "Lunch"}
                        </span>
                      </td>
                      {DAYS.map((d) => (
                        <td key={d} className="border-border border-b" />
                      ))}
                    </tr>
                  );
                return (
                  <tr
                    key={slot.label}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="border-border border-b px-3 py-2 align-top">
                      <span className="text-foreground font-semibold">
                        {slot.label}
                      </span>
                      <br />
                      <span className="text-muted-foreground">{slot.time}</span>
                    </td>
                    {DAYS.map((dn, di) => {
                      const entry = getEntry(di, slot.period);
                      if (isLabCont(di, slot.period))
                        return (
                          <td key={dn} className="border-border border-b" />
                        );
                      if (!entry)
                        return (
                          <td
                            key={dn}
                            className="border-border text-muted-foreground/30 border-b px-2 py-2 text-center"
                          >
                            —
                          </td>
                        );
                      const color = SUBJECT_COLORS[entry.code] || "#64748b";
                      return (
                        <td
                          key={dn}
                          rowSpan={
                            entry.type === "lab" ? entry.periodsCount : 1
                          }
                          className="border-border border-b px-2 py-1.5 align-top"
                        >
                          <div
                            className="h-full rounded-lg px-2 py-1.5"
                            style={{
                              backgroundColor:
                                color + (entry.type === "lab" ? "22" : "14"),
                              borderLeft: `3px solid ${color}`,
                            }}
                          >
                            <p
                              className="leading-tight font-semibold"
                              style={{ color }}
                            >
                              {entry.code}
                            </p>
                            <p className="text-foreground/80 mt-0.5 truncate text-[10px]">
                              {entry.subject}
                            </p>
                            <p className="text-muted-foreground text-[10px]">
                              {entry.room}
                            </p>
                            {entry.type === "lab" && (
                              <Badge
                                className="mt-1 px-1 py-0 text-[9px]"
                                style={{
                                  backgroundColor: color + "25",
                                  color,
                                  border: `1px solid ${color}40`,
                                }}
                              >
                                Lab
                              </Badge>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="flex flex-wrap gap-2">
        {Object.entries(SUBJECT_COLORS).map(([code, color]) => {
          const entry = Object.values(classRoutine)
            .flat()
            .find((e) => e.code === code);
          if (!entry) return null;
          return (
            <div
              key={code}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              style={{
                borderColor: color + "40",
                backgroundColor: color + "10",
                color,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium">{code}</span>
              <span className="text-foreground/60">
                — {entry.subject.replace(/ Lab$/, "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
