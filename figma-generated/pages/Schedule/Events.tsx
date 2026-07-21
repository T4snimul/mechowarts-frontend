import {
  Trophy,
  Music,
  Gamepad2,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { nonAcademicEvents } from "../../data/schedule";

const eventTypeConfig = {
  sports: {
    icon: Trophy,
    color: "#16a34a",
    bg: "bg-green-50",
    badge: "bg-green-50 text-green-700 border-green-200",
  },
  cultural: {
    icon: Music,
    color: "#7c3aed",
    bg: "bg-violet-50",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  social: {
    icon: Gamepad2,
    color: "#0891b2",
    bg: "bg-sky-50",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
};

function EventCard({ event }: { event: (typeof nonAcademicEvents)[0] }) {
  const cfg = eventTypeConfig[event.type as keyof typeof eventTypeConfig];
  const Icon = cfg.icon;
  return (
    <div className="border-border bg-card hover:border-primary/20 hover:bg-primary/[0.02] flex items-start gap-3 rounded-xl border p-3.5 transition-all">
      <div
        className={`h-10 w-10 rounded-xl ${cfg.bg} flex shrink-0 items-center justify-center`}
      >
        <Icon size={18} style={{ color: cfg.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-foreground text-sm font-semibold">{event.title}</p>
          <Badge
            className={`shrink-0 border text-[10px] capitalize ${cfg.badge}`}
          >
            {event.type}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <CalendarDays size={11} />
            {event.date}
          </span>
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Clock size={11} />
            {event.time}
          </span>
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <MapPin size={11} />
            {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const upcoming = nonAcademicEvents.filter((e) => e.upcoming);
  const past = nonAcademicEvents.filter((e) => !e.upcoming);
  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 p-4 md:p-6">
      <div>
        <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-widest uppercase">
          Upcoming Events
        </p>
        <div className="flex flex-col gap-2.5">
          {upcoming.map((e, i) => (
            <EventCard key={i} event={e} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-widest uppercase">
          Past Events
        </p>
        <div className="flex flex-col gap-2.5 opacity-60">
          {past.map((e, i) => (
            <EventCard key={i} event={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
