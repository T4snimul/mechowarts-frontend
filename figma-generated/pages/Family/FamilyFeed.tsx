import { useState } from "react";
import {
  Image,
  Star,
  CalendarDays,
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import type { PersonProfile } from "../../types";
import { feedPosts } from "../../data/feed";
import { peopleData } from "../../data/people";

export default function FamilyFeedPage({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const [filter, setFilter] = useState<
    "all" | "students" | "teachers" | "alumni"
  >("all");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

  const filtered = feedPosts.filter((post) => {
    if (filter === "all") return true;
    const author = peopleData.find((p) => p.id === post.authorId);
    if (!author) return false;
    return (
      filter === author.role + "s" ||
      (filter === "teachers" && author.role === "teacher")
    );
  });

  const tabs = [
    { key: "all", label: "All" },
    { key: "students", label: "Students" },
    { key: "teachers", label: "Teachers" },
    { key: "alumni", label: "Alumni" },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-[680px] flex-col gap-5 p-4 md:p-6">
      <Card className="border-border shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                TH
              </AvatarFallback>
            </Avatar>
            <button className="text-muted-foreground bg-muted/50 hover:bg-muted flex-1 rounded-full px-4 py-2.5 text-left text-sm transition-colors">
              {"What's on your mind, Rafid?"}
            </button>
          </div>
          <div className="border-border mt-3 flex items-center gap-1 border-t pt-3">
            <button className="text-muted-foreground hover:text-foreground hover:bg-accent flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors">
              <Image size={14} className="text-emerald-500" /> Photo
            </button>
            <button className="text-muted-foreground hover:text-foreground hover:bg-accent flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors">
              <Star size={14} className="text-amber-500" /> Achievement
            </button>
            <button className="text-muted-foreground hover:text-foreground hover:bg-accent flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors">
              <CalendarDays size={14} className="text-primary" /> Event
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${filter === t.key ? "bg-primary text-primary-foreground" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-accent border"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((post) => {
          const author = peopleData.find((p) => p.id === post.authorId);
          if (!author) return null;
          const isLiked = likedPosts.has(post.id);
          const showComments = expandedComments.has(post.id);

          return (
            <Card key={post.id} className="border-border shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onOpenProfile(author)}
                    className="shrink-0"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-85"
                      style={{ backgroundColor: author.avatarColor }}
                    >
                      {author.avatar}
                    </div>
                  </button>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => onOpenProfile(author)}
                      className="text-foreground hover:text-primary text-left text-sm font-semibold transition-colors"
                    >
                      {author.name}
                    </button>
                    <p className="text-muted-foreground text-[11px] leading-tight">
                      {author.role === "student" &&
                        `Roll ${author.roll} · ${author.series} Series · ${author.year}`}
                      {author.role === "teacher" &&
                        `${author.designation} · MTE Dept.`}
                      {author.role === "alumni" &&
                        `Alumni · Class of ${author.graduationYear} · ${author.companyRole}`}
                      {author.role === "staff" && `${author.designation}`}
                    </p>
                    <p className="text-muted-foreground/60 text-[10px]">
                      {post.timestamp}
                    </p>
                  </div>
                </div>

                <p className="text-foreground/85 mt-3 text-sm leading-relaxed">
                  {post.content}
                </p>
                {post.tag && (
                  <span className="text-primary bg-primary/10 mt-2 inline-block rounded px-2 py-0.5 text-[11px] font-semibold">
                    #{post.tag}
                  </span>
                )}

                {post.imageUrl && (
                  <div className="bg-muted mt-3 overflow-hidden rounded-xl">
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      className="max-h-72 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="border-border mt-3 flex items-center gap-1 border-t pt-3">
                  <button
                    onClick={() =>
                      setLikedPosts((prev) => {
                        const next = new Set(prev);
                        isLiked ? next.delete(post.id) : next.add(post.id);
                        return next;
                      })
                    }
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${isLiked ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent"}`}
                  >
                    <ThumbsUp
                      size={13}
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    {post.likes + (isLiked ? 1 : 0)}
                  </button>
                  <button
                    onClick={() =>
                      setExpandedComments((prev) => {
                        const next = new Set(prev);
                        showComments ? next.delete(post.id) : next.add(post.id);
                        return next;
                      })
                    }
                    className="text-muted-foreground hover:bg-accent flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
                  >
                    <MessageCircle size={13} />
                    {post.comments.length}
                  </button>
                  <button className="text-muted-foreground hover:bg-accent flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors">
                    <Share2 size={13} /> Share
                  </button>
                </div>

                {showComments && (
                  <div className="border-border mt-3 flex flex-col gap-3 border-t pt-3">
                    {post.comments.map((comment, ci) => {
                      const commenter = peopleData.find(
                        (p) => p.id === comment.authorId,
                      );
                      if (!commenter) return null;
                      return (
                        <div key={ci} className="flex items-start gap-2.5">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                            style={{ backgroundColor: commenter.avatarColor }}
                          >
                            {commenter.avatar}
                          </div>
                          <div className="bg-muted/40 flex-1 rounded-xl px-3 py-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-foreground text-xs font-semibold">
                                {commenter.name}
                              </span>
                              <span className="text-muted-foreground text-[10px]">
                                {comment.time}
                              </span>
                            </div>
                            <p className="text-foreground/80 mt-0.5 text-xs leading-snug">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-1 flex items-center gap-2.5">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
                          TH
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted/50 flex flex-1 items-center gap-2 rounded-full px-3 py-1.5">
                        <input
                          placeholder="Write a comment…"
                          className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-xs outline-none"
                        />
                        <button className="text-primary hover:text-primary/70 transition-colors">
                          <Send size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
