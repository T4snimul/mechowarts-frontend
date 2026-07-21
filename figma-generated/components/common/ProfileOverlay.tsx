import { useState } from "react";
import {
  X,
  Mail,
  Linkedin,
  MapPin,
  Building2,
  MessageCircle,
  Heart,
  ThumbsUp,
  BookOpen,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import type { PersonProfile } from "../../types";
import { roleConfig } from "../../data/people";
import { feedPosts } from "../../data/feed";

export default function ProfileOverlay({
  person,
  onClose,
}: {
  person: PersonProfile;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"about" | "posts">("about");
  const cfg = roleConfig[person.role];
  const RoleIcon = cfg.icon;
  const personPosts = feedPosts.filter((p) => p.authorId === person.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/20"
      onClick={onClose}
    >
      <div
        className="bg-card border-border flex h-full w-full max-w-[440px] flex-col overflow-hidden border-l shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0">
          <div
            className="h-24"
            style={{
              background: `linear-gradient(135deg, ${person.avatarColor}25 0%, ${person.avatarColor}10 100%)`,
            }}
          />
          <button
            onClick={onClose}
            className="bg-background/80 hover:bg-background border-border absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border transition-colors"
          >
            <X size={13} />
          </button>
          <div className="absolute -bottom-7 left-5">
            <div
              className="border-card flex h-14 w-14 items-center justify-center rounded-2xl border-4 text-lg font-bold text-white shadow-md"
              style={{ backgroundColor: person.avatarColor }}
            >
              {person.avatar}
            </div>
          </div>
        </div>
        <div className="shrink-0 px-5 pt-9 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2
                className="text-foreground text-sm font-bold"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {person.name}
              </h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {person.role === "student" &&
                  `${person.roll} · ${person.year} · ${person.series} Series`}
                {person.role === "teacher" && `${person.designation}`}
                {person.role === "alumni" &&
                  `Class of ${person.graduationYear} · ${person.companyRole}`}
                {person.role === "staff" && `${person.designation}`}
              </p>
              <p className="text-muted-foreground/70 mt-0.5 text-xs">
                {person.role === "teacher" && person.department}
                {person.role === "alumni" && person.company}
                {person.role === "staff" && person.department}
              </p>
            </div>
            <Badge
              className={`shrink-0 gap-1 border text-[10px] ${cfg.bg} ${cfg.color}`}
            >
              <RoleIcon size={10} />
              {cfg.label}
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {person.emailPublic && person.email && (
              <a
                href={`mailto:${person.email}`}
                className="text-primary bg-primary/8 hover:bg-primary/15 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] transition-colors"
              >
                <Mail size={10} />
                {person.email}
              </a>
            )}
            {person.linkedin && (
              <span className="flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] text-sky-600">
                <Linkedin size={10} />
                {person.linkedin}
              </span>
            )}
            {person.location && (
              <span className="text-muted-foreground bg-muted flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]">
                <MapPin size={10} />
                {person.location}
              </span>
            )}
            {person.office && (
              <span className="text-muted-foreground bg-muted flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]">
                <Building2 size={10} />
                {person.office}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors">
              <MessageCircle size={12} /> Message
            </button>
            <button className="border-border hover:bg-accent flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-colors">
              <Heart size={12} /> Follow
            </button>
          </div>
          <div className="border-border mt-3 flex gap-1 border-b">
            {(["about", "posts"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 pb-2 text-xs font-medium capitalize transition-colors ${activeTab === tab ? "border-primary text-primary border-b-2" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab} {tab === "posts" && `(${personPosts.length})`}
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          {activeTab === "about" && (
            <div className="flex flex-col gap-4 pt-3">
              {person.bio && (
                <div>
                  <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold tracking-widest uppercase">
                    About
                  </p>
                  <p className="text-foreground/80 text-xs leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              )}
              {person.role === "teacher" && (
                <>
                  {person.specializations && (
                    <div>
                      <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
                        Specializations
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {person.specializations.map((s) => (
                          <Badge
                            key={s}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {person.courses && (
                    <div>
                      <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
                        Current Courses
                      </p>
                      <div className="flex flex-col gap-1">
                        {person.courses.map((c) => (
                          <div
                            key={c}
                            className="text-foreground/80 flex items-center gap-2 text-xs"
                          >
                            <BookOpen
                              size={11}
                              className="text-primary shrink-0"
                            />
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {person.publications && (
                    <div>
                      <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
                        Publications
                      </p>
                      <div className="flex flex-col gap-2">
                        {person.publications.map((pub, i) => (
                          <div
                            key={i}
                            className="bg-muted/40 border-border rounded-lg border p-2.5"
                          >
                            <p className="text-foreground text-xs leading-snug font-medium">
                              {pub.title}
                            </p>
                            <p className="text-muted-foreground mt-1 text-[10px]">
                              {pub.journal} · {pub.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              {person.role === "alumni" && person.career && (
                <div>
                  <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
                    Career
                  </p>
                  {person.career.map((c, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
                        {i < (person.career?.length ?? 0) - 1 && (
                          <div className="bg-border mt-1 mb-1 w-px flex-1" />
                        )}
                      </div>
                      <div className="pb-3">
                        <p className="text-foreground text-xs font-semibold">
                          {c.role}
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          {c.company}
                        </p>
                        <p className="text-muted-foreground/70 text-[10px]">
                          {c.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {person.role === "student" && person.hometown && (
                <div className="text-foreground/70 flex items-center gap-2 text-xs">
                  <MapPin size={12} className="text-primary" />
                  Hometown: {person.hometown}
                </div>
              )}
            </div>
          )}
          {activeTab === "posts" && (
            <div className="flex flex-col gap-3 pt-3">
              {personPosts.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No posts yet.
                </p>
              ) : (
                personPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border-border bg-background rounded-xl border p-3"
                  >
                    <p className="text-foreground/80 text-xs leading-relaxed">
                      {post.content}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-muted-foreground text-[10px]">
                        {post.timestamp}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                        <ThumbsUp size={10} />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
