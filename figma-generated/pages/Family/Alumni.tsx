import { useState, useMemo } from "react";
import {
  Search,
  List,
  Globe,
  Building2,
  MapPin,
  ExternalLink,
  X,
} from "lucide-react";
import type { PersonProfile } from "../../types";
import { peopleData, alumniMapData } from "../../data/people";

// World map SVG projection helper (simple equirectangular)
function lngLatToXY(lng: number, lat: number, w: number, h: number) {
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

// Simplified world country paths (key countries only, the rest as bg)
const WORLD_PATHS = [
  {
    id: "eurasia",
    d: "M 230,60 L 320,55 L 410,60 L 450,80 L 480,70 L 520,75 L 560,65 L 590,75 L 620,70 L 640,80 L 660,75 L 680,90 L 660,110 L 640,120 L 620,140 L 600,160 L 580,180 L 560,200 L 540,210 L 520,220 L 500,230 L 480,250 L 460,270 L 450,290 L 440,310 L 430,330 L 420,310 L 410,290 L 400,270 L 380,260 L 360,250 L 340,240 L 320,230 L 300,220 L 280,210 L 260,200 L 250,180 L 240,160 L 235,140 L 230,120 L 228,100 Z",
    highlight: false,
  },
  {
    id: "south-asia",
    d: "M 480,130 L 520,125 L 560,130 L 580,150 L 570,170 L 555,190 L 540,200 L 520,195 L 500,185 L 485,165 L 478,145 Z",
    highlight: false,
  },
  {
    id: "africa",
    d: "M 320,190 L 370,185 L 400,200 L 420,220 L 430,250 L 435,280 L 430,310 L 410,330 L 390,350 L 365,360 L 340,355 L 315,340 L 300,310 L 295,280 L 300,250 L 310,220 L 315,200 Z",
    highlight: false,
  },
  {
    id: "n-america",
    d: "M 30,60 L 120,55 L 160,70 L 180,90 L 190,120 L 185,150 L 175,170 L 160,180 L 140,190 L 120,195 L 100,185 L 80,170 L 60,155 L 45,135 L 35,110 L 28,85 Z",
    highlight: false,
  },
  {
    id: "s-america",
    d: "M 120,210 L 160,205 L 180,220 L 185,250 L 180,280 L 170,310 L 155,330 L 135,340 L 115,330 L 100,305 L 95,275 L 98,245 L 105,220 Z",
    highlight: false,
  },
  {
    id: "australia",
    d: "M 580,220 L 640,215 L 670,230 L 680,255 L 670,275 L 645,285 L 615,280 L 590,265 L 578,245 Z",
    highlight: false,
  },
  {
    id: "japan",
    d: "M 645,95 L 660,90 L 665,105 L 655,115 L 643,108 Z",
    highlight: false,
  },
  {
    id: "uk",
    d: "M 265,75 L 275,70 L 282,80 L 276,90 L 265,85 Z",
    highlight: false,
  },
  {
    id: "bangladesh",
    d: "M 515,148 L 525,144 L 530,152 L 525,160 L 515,157 Z",
    highlight: true,
  },
  {
    id: "netherlands",
    d: "M 295,77 L 302,74 L 306,80 L 301,85 L 294,82 Z",
    highlight: true,
  },
  {
    id: "germany",
    d: "M 303,80 L 318,76 L 325,85 L 320,95 L 305,94 L 300,87 Z",
    highlight: true,
  },
  {
    id: "saudi",
    d: "M 380,145 L 415,140 L 420,165 L 405,175 L 385,170 L 375,158 Z",
    highlight: true,
  },
  {
    id: "s-korea",
    d: "M 627,103 L 637,100 L 640,109 L 633,115 L 625,110 Z",
    highlight: true,
  },
  {
    id: "canada",
    d: "M 40,58 L 130,52 L 155,65 L 150,80 L 120,82 L 80,80 L 45,72 Z",
    highlight: true,
  },
  {
    id: "usa",
    d: "M 40,80 L 155,75 L 170,90 L 165,120 L 140,135 L 80,138 L 45,125 L 38,100 Z",
    highlight: true,
  },
];

function AlumniMapView({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterCountry, setFilterCountry] = useState("all");
  const W = 720,
    H = 380;

  const countries = useMemo(
    () => [...new Set(alumniMapData.map((a) => a.country))].sort(),
    [],
  );

  const filtered =
    filterCountry === "all"
      ? alumniMapData
      : alumniMapData.filter((a) => a.country === filterCountry);

  const clusters = useMemo(() => {
    const groups: Record<string, typeof alumniMapData> = {};
    filtered.forEach((a) => {
      const key = `${a.city}-${a.country}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });
    return Object.values(groups);
  }, [filtered]);

  const selectedAlumnus = alumniMapData.find((a) => a.id === selectedId);
  const countryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    alumniMapData.forEach((a) => {
      stats[a.country] = (stats[a.country] || 0) + 1;
    });
    return stats;
  }, []);

  return (
    <div className="flex h-full flex-col gap-0">
      <div className="border-border bg-card flex shrink-0 flex-wrap items-center gap-3 border-b px-4 py-3 md:px-6">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium">
            Filter by country:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["all", ...countries].map((c) => (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors ${filterCountry === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"}`}
              >
                {c === "all"
                  ? `All (${alumniMapData.length})`
                  : `${c} (${countryStats[c] || 0})`}
              </button>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground flex shrink-0 items-center gap-1.5 text-xs">
          <Globe size={12} className="text-primary" />
          <span>
            {alumniMapData.length} alumni · {countries.length} countries
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div
          className="relative min-h-0 flex-1 overflow-hidden bg-[#e8f4f8]"
          style={{ minHeight: 280 }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-full w-full"
            style={{ display: "block" }}
          >
            <rect width={W} height={H} fill="#c8e6f0" />
            {WORLD_PATHS.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill={p.highlight ? "#b2d8c8" : "#d4e8d4"}
                stroke="#a0c8b8"
                strokeWidth="0.8"
                opacity={0.9}
              />
            ))}
            {[-60, -30, 0, 30, 60].map((lat) => {
              const { y } = lngLatToXY(0, lat, W, H);
              return (
                <line
                  key={lat}
                  x1={0}
                  y1={y}
                  x2={W}
                  y2={y}
                  stroke="#a0c8d8"
                  strokeWidth="0.4"
                  opacity={0.6}
                />
              );
            })}
            {[-120, -60, 0, 60, 120].map((lng) => {
              const { x } = lngLatToXY(lng, 0, W, H);
              return (
                <line
                  key={lng}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={H}
                  stroke="#a0c8d8"
                  strokeWidth="0.4"
                  opacity={0.6}
                />
              );
            })}
            {clusters.map((cluster, ci) => {
              const first = cluster[0];
              const { x, y } = lngLatToXY(first.lng, first.lat, W, H);
              const isSelected = cluster.some((a) => a.id === selectedId);
              const count = cluster.length;
              const r = count > 1 ? 14 : 10;
              return (
                <g
                  key={ci}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedId(isSelected ? null : first.id)}
                >
                  <circle cx={x + 1} cy={y + 2} r={r} fill="rgba(0,0,0,0.2)" />
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={isSelected ? "#0d9488" : first.avatarColor}
                    stroke="white"
                    strokeWidth="2"
                    opacity={isSelected ? 1 : 0.9}
                  />
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r={r + 6}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="2"
                      opacity={0.4}
                    />
                  )}
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={count > 1 ? 9 : 7}
                    fontWeight="bold"
                    style={{ pointerEvents: "none" }}
                  >
                    {count > 1 ? count : first.avatar}
                  </text>
                </g>
              );
            })}
          </svg>

          {selectedAlumnus &&
            (() => {
              const { x, y } = lngLatToXY(
                selectedAlumnus.lng,
                selectedAlumnus.lat,
                W,
                H,
              );
              const clusterHere = alumniMapData.filter(
                (a) =>
                  a.city === selectedAlumnus.city &&
                  a.country === selectedAlumnus.country,
              );
              const leftPct = (x / W) * 100;
              const topPct = (y / H) * 100;
              const alignRight = leftPct > 60;
              const alignBottom = topPct > 65;
              return (
                <div
                  className="pointer-events-auto absolute z-20"
                  style={{
                    left: alignRight
                      ? undefined
                      : `${Math.min(leftPct + 3, 75)}%`,
                    right: alignRight
                      ? `${Math.max(100 - leftPct + 3, 15)}%`
                      : undefined,
                    top: alignBottom
                      ? undefined
                      : `${Math.min(topPct + 5, 60)}%`,
                    bottom: alignBottom
                      ? `${Math.max(100 - topPct + 5, 15)}%`
                      : undefined,
                  }}
                >
                  <div className="bg-card border-border w-56 rounded-xl border p-3 shadow-xl">
                    <div className="mb-2 flex items-center gap-1.5">
                      <MapPin size={11} className="text-primary shrink-0" />
                      <span className="text-foreground text-[11px] font-semibold">
                        {selectedAlumnus.city}, {selectedAlumnus.country}
                      </span>
                      <button
                        onClick={() => setSelectedId(null)}
                        className="text-muted-foreground hover:text-foreground ml-auto"
                      >
                        <X size={11} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {clusterHere.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => onOpenProfile(a)}
                          className="hover:bg-accent -mx-1 flex items-center gap-2 rounded-lg p-1 text-left transition-colors"
                        >
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                            style={{ backgroundColor: a.avatarColor }}
                          >
                            {a.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-foreground truncate text-xs font-semibold">
                              {a.name}
                            </p>
                            <p className="text-muted-foreground truncate text-[10px]">
                              {a.companyRole}
                            </p>
                            <p className="text-muted-foreground/70 truncate text-[10px]">
                              {a.company}
                            </p>
                          </div>
                          <ExternalLink
                            size={9}
                            className="text-muted-foreground/40 shrink-0"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>

        <div className="border-border flex w-full shrink-0 flex-col border-t lg:w-72 lg:border-t-0 lg:border-l">
          <div className="border-border shrink-0 border-b px-3 py-2">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
              {filtered.length} alumni
              {filterCountry !== "all" ? ` in ${filterCountry}` : ""}
            </p>
          </div>
          <div
            className="min-h-0 flex-1 overflow-y-auto"
            style={{ maxHeight: 400 }}
          >
            {filtered.map((a) => {
              const isSelected = a.id === selectedId;
              return (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedId(isSelected ? null : a.id);
                  }}
                  className={`border-border flex w-full items-center gap-3 border-b px-3 py-2.5 text-left transition-colors last:border-0 ${isSelected ? "bg-primary/5" : "hover:bg-muted/30"}`}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                    style={{ backgroundColor: a.avatarColor }}
                  >
                    {a.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-xs font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}
                    >
                      {a.name}
                    </p>
                    <p className="text-muted-foreground truncate text-[10px]">
                      {a.companyRole} · {a.company}
                    </p>
                    <p className="text-muted-foreground/60 mt-0.5 flex items-center gap-1 text-[10px]">
                      <MapPin size={9} />
                      {a.city}, {a.country}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProfile(a);
                    }}
                    className="text-muted-foreground hover:text-primary shrink-0 p-1 transition-colors"
                  >
                    <ExternalLink size={11} />
                  </button>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FamilyAlumniPage({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const [view, setView] = useState<"list" | "map">("list");
  const [search, setSearch] = useState("");
  const alumni = peopleData.filter(
    (p) =>
      p.role === "alumni" &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.company || "").toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-border bg-card flex shrink-0 flex-wrap items-center gap-3 border-b px-4 py-3 md:px-6">
        <div className="relative max-w-xs min-w-0 flex-1">
          <Search
            size={13}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or company…"
            className="bg-background border-border focus:ring-primary/30 focus:border-primary/50 w-full rounded-lg border py-1.5 pr-4 pl-8 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
        <div className="border-border flex shrink-0 items-center overflow-hidden rounded-lg border">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
          >
            <List size={13} /> List
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
          >
            <Globe size={13} /> Map
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[900px] flex-col gap-3 p-4 md:p-6">
            {alumni.map((a) => (
              <div
                key={a.id}
                className="border-border bg-card hover:border-primary/20 hover:bg-primary/[0.02] flex items-center gap-4 rounded-xl border p-4 transition-all"
              >
                <button onClick={() => onOpenProfile(a)} className="shrink-0">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: a.avatarColor }}
                  >
                    {a.avatar}
                  </div>
                </button>
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => onOpenProfile(a)}
                    className="text-foreground hover:text-primary text-left text-sm font-semibold transition-colors"
                  >
                    {a.name}
                  </button>
                  <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                    <Building2 size={11} />
                    {a.companyRole} · {a.company}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    {a.location && (
                      <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                        <MapPin size={10} />
                        {a.location}
                      </span>
                    )}
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
                      Class of {a.graduationYear}
                    </span>
                  </div>
                </div>
                <button className="text-primary border-primary/30 bg-primary/5 hover:bg-primary/10 shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AlumniMapView onOpenProfile={onOpenProfile} />
      )}
    </div>
  );
}
