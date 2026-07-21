import { useState } from "react";
import { Search, ExternalLink, Mail } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import type { PersonProfile } from "../../types";
import { peopleData } from "../../data/people";

export default function FamilyTeachersPage({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const designations = [
    "All",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
  ];
  const [activeDesig, setActiveDesig] = useState("All");
  const [search, setSearch] = useState("");
  const teachers = peopleData.filter(
    (p) =>
      p.role === "teacher" &&
      (activeDesig === "All" || p.designation === activeDesig) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-5 p-4 md:p-6">
      <div className="flex flex-wrap gap-1.5">
        {designations.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDesig(d)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeDesig === d ? "bg-primary text-primary-foreground" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-accent border"}`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search
          size={14}
          className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search faculty…"
          className="bg-card border-border focus:ring-primary/30 focus:border-primary/50 w-full rounded-lg border py-2 pr-4 pl-9 text-sm focus:ring-2 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {teachers.map((t) => (
          <button
            key={t.id}
            onClick={() => onOpenProfile(t)}
            className="border-border bg-card hover:border-primary/30 hover:bg-primary/[0.02] group flex items-start gap-4 rounded-xl border p-4 text-left transition-all"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white transition-transform group-hover:scale-105"
              style={{ backgroundColor: t.avatarColor }}
            >
              {t.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground group-hover:text-primary truncate text-sm font-semibold transition-colors">
                {t.name}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {t.designation}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {t.specializations?.slice(0, 2).map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="border-border px-1.5 py-0 text-[9px]"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
              {t.email && (
                <p className="text-muted-foreground mt-2 flex items-center gap-1 truncate text-[10px]">
                  <Mail size={9} />
                  {t.email}
                </p>
              )}
            </div>
            <ExternalLink
              size={12}
              className="text-muted-foreground/40 group-hover:text-primary/50 mt-0.5 shrink-0 transition-colors"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
