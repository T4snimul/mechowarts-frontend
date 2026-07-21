import { useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import type { PersonProfile } from "../../types";
import { SERIES_LIST, SERIES_COLORS } from "../../constants";
import { peopleData } from "../../data/people";

export default function FamilyStudentsPage({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const [activeSeries, setActiveSeries] = useState("24");
  const [search, setSearch] = useState("");

  const students = peopleData.filter(
    (p) =>
      p.role === "student" &&
      p.series === activeSeries &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const seriesInfo = SERIES_LIST.find((s) => s.key === activeSeries);

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-5 p-4 md:p-6">
      <div className="flex flex-wrap gap-2">
        {SERIES_LIST.map((s) => {
          const count = peopleData.filter(
            (p) => p.role === "student" && p.series === s.key,
          ).length;
          const color = SERIES_COLORS[s.key] || "#64748b";
          const isActive = activeSeries === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActiveSeries(s.key)}
              className="flex flex-col items-start rounded-xl border px-3.5 py-2 text-left transition-all"
              style={
                isActive
                  ? { backgroundColor: color + "15", borderColor: color + "50" }
                  : {}
              }
            >
              <span
                className="text-sm font-semibold"
                style={{ color: isActive ? color : undefined }}
              >
                {s.label}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {s.context}
              </span>
              {count > 0 && (
                <span
                  className="mt-0.5 text-[10px] font-medium"
                  style={{ color }}
                >
                  {count} students
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search in ${seriesInfo?.label}…`}
            className="bg-card border-border focus:ring-primary/30 focus:border-primary/50 w-full rounded-lg border py-2 pr-4 pl-9 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
        {seriesInfo && (
          <Badge
            className="shrink-0 px-3 py-1.5 text-xs"
            style={{
              backgroundColor:
                (SERIES_COLORS[activeSeries] || "#64748b") + "15",
              color: SERIES_COLORS[activeSeries] || "#64748b",
              border: `1px solid ${SERIES_COLORS[activeSeries] || "#64748b"}30`,
            }}
          >
            {seriesInfo.context}
          </Badge>
        )}
      </div>

      {students.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center text-sm">
          No students found for this series yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => onOpenProfile(student)}
              className="border-border bg-card hover:border-primary/30 hover:bg-primary/[0.02] group flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-white transition-transform group-hover:scale-105"
                style={{ backgroundColor: student.avatarColor }}
              >
                {student.avatar}
              </div>
              <div className="w-full min-w-0">
                <p className="text-foreground group-hover:text-primary truncate text-xs font-semibold transition-colors">
                  {student.name}
                </p>
                <p className="text-muted-foreground mt-0.5 text-[10px]">
                  {student.roll}
                </p>
                <p className="text-muted-foreground/70 text-[10px]">
                  {student.year}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
