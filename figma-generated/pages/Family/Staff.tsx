import { Building2, Mail } from "lucide-react";
import type { PersonProfile } from "../../types";
import { peopleData } from "../../data/people";

export default function FamilyStaffPage({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const staff = peopleData.filter((p) => p.role === "staff");
  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {staff.map((s) => (
          <button
            key={s.id}
            onClick={() => onOpenProfile(s)}
            className="border-border bg-card hover:border-primary/30 hover:bg-primary/[0.02] group flex items-start gap-4 rounded-xl border p-4 text-left transition-all"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white transition-transform group-hover:scale-105"
              style={{ backgroundColor: s.avatarColor }}
            >
              {s.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground group-hover:text-primary text-sm font-semibold transition-colors">
                {s.name}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {s.designation}
              </p>
              <p className="text-muted-foreground/70 text-[11px]">
                {s.department}
              </p>
              {s.office && (
                <p className="text-muted-foreground mt-1.5 flex items-center gap-1 text-[10px]">
                  <Building2 size={10} />
                  {s.office}
                </p>
              )}
              {s.emailPublic && s.email && (
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 truncate text-[10px]">
                  <Mail size={10} />
                  {s.email}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
