import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  SortDesc,
  SortAsc,
  ArrowDownAZ,
  Pin,
  BookMarked,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import type { Note } from "../../types";
import { SUBJECT_COLORS } from "../../constants";
import { seedNotes } from "../../data/notes";
import NoteEditorModal from "./NoteEditorModal";

const tagPalette: Record<string, { bg: string; text: string; border: string }> =
  {
    Theory: { bg: "#e0f2fe", text: "#0369a1", border: "#bae6fd" },
    Formula: { bg: "#ede9fe", text: "#6d28d9", border: "#ddd6fe" },
    Exercise: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    Summary: { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" },
    Lab: { bg: "#fee2e2", text: "#b91c1c", border: "#fecaca" },
  };
function tagColor(t: string) {
  return tagPalette[t] ?? { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" };
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(seedNotes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");
  const [filterSem, setFilterSem] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "az">(
    "newest",
  );

  const filtered = useMemo(() => {
    let list = notes.filter((n) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q);
      const matchesSem = filterSem === "all" || n.semester === filterSem;
      const matchesCourse =
        filterCourse === "all" || n.courseCode === filterCourse;
      const matchesTag = filterTag === "all" || n.tags.includes(filterTag);
      return matchesSearch && matchesSem && matchesCourse && matchesTag;
    });
    if (sortOrder === "newest")
      list = [...list].sort((a, b) => b.id.localeCompare(a.id));
    else if (sortOrder === "oldest")
      list = [...list].sort((a, b) => a.id.localeCompare(b.id));
    else list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [notes, search, filterSem, filterCourse, filterTag, sortOrder]);

  const semestersInData = useMemo(
    () => [...new Set(notes.map((n) => n.semester))].sort(),
    [notes],
  );
  const coursesInData = useMemo(
    () => [...new Set(notes.map((n) => n.courseCode))].sort(),
    [notes],
  );
  const tagsInData = useMemo(
    () => [...new Set(notes.flatMap((n) => n.tags))].sort(),
    [notes],
  );

  function updateNote(id: string, updates: Partial<Note>) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: "Just now" } : n,
      ),
    );
    setEditingNote((prev) =>
      prev && prev.id === id
        ? { ...prev, ...updates, updatedAt: "Just now" }
        : prev,
    );
  }

  function createNote() {
    const id = `n${Date.now()}`;
    const newNote: Note = {
      id,
      title: "Untitled Note",
      semester: "3-1",
      courseCode: "ME 301",
      courseName: "Thermodynamics",
      topic: "",
      tags: [],
      editorMode: "rich",
      content: "",
      references: [],
      attachments: [],
      isPinned: false,
      createdAt: "Today",
      updatedAt: "Just now",
    };
    setNotes((prev) => [newNote, ...prev]);
    setEditingNote(newNote);
  }

  const sortIcons = { newest: SortDesc, oldest: SortAsc, az: ArrowDownAZ };
  const SortIcon = sortIcons[sortOrder];
  const sortNext = { newest: "oldest", oldest: "az", az: "newest" } as const;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="bg-card border-border sticky top-0 z-10 flex flex-col gap-2.5 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={13}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, topic or content…"
              className="bg-muted/50 border-border focus:ring-primary/30 w-full rounded-lg border py-1.5 pr-3 pl-8 text-xs focus:ring-1 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortNext[sortOrder])}
            title={`Sort: ${sortOrder}`}
            className="border-border hover:bg-accent text-muted-foreground hover:text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors"
          >
            <SortIcon size={14} />
          </button>
          <button
            onClick={createNote}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <Plus size={14} />{" "}
            <span className="hidden sm:inline">New Note</span>
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-0.5">
          {["all", ...semestersInData].map((s) => (
            <button
              key={s}
              onClick={() => setFilterSem(s)}
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap transition-colors ${filterSem === s ? "bg-primary text-primary-foreground" : "bg-muted/50 border-border text-muted-foreground hover:text-foreground border"}`}
            >
              {s === "all" ? "All Semesters" : `Sem ${s}`}
            </button>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto pb-0.5">
          {["all", ...coursesInData].map((c) => {
            const color = SUBJECT_COLORS[c] || "#64748b";
            const isActive = filterCourse === c;
            return (
              <button
                key={c}
                onClick={() => setFilterCourse(c)}
                className="shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap transition-colors"
                style={
                  isActive
                    ? {
                        backgroundColor: color + "20",
                        borderColor: color + "50",
                        color,
                      }
                    : {}
                }
              >
                {c === "all" ? "All Courses" : c}
              </button>
            );
          })}
        </div>
        {tagsInData.length > 0 && (
          <div className="flex gap-1 overflow-x-auto pb-0.5">
            {["all", ...tagsInData].map((t) => {
              const c = tagColor(t);
              const isActive = filterTag === t;
              return (
                <button
                  key={t}
                  onClick={() => setFilterTag(t)}
                  className="shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap transition-colors"
                  style={
                    isActive
                      ? {
                          backgroundColor: c.bg,
                          color: c.text,
                          borderColor: c.border,
                        }
                      : {}
                  }
                >
                  {t === "all" ? "All Tags" : t}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-2xl">
              <BookMarked size={20} className="text-muted-foreground" />
            </div>
            <p className="text-foreground text-sm font-medium">
              No notes found
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Try adjusting your filters or{" "}
              <button
                onClick={createNote}
                className="text-primary hover:underline"
              >
                create a new note
              </button>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((note) => {
              const color = SUBJECT_COLORS[note.courseCode] || "#64748b";
              return (
                <button
                  key={note.id}
                  onClick={() => setEditingNote(note)}
                  className="border-border bg-card hover:border-primary/30 group flex flex-col rounded-xl border p-4 text-left transition-all hover:shadow-sm"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div
                      className="mt-1 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {note.isPinned && (
                      <Pin size={11} className="shrink-0 text-amber-500" />
                    )}
                  </div>
                  <p className="text-foreground group-hover:text-primary line-clamp-2 text-sm leading-snug font-semibold transition-colors">
                    {note.title}
                  </p>
                  <p className="mt-1.5 mb-2 text-[10px]" style={{ color }}>
                    {note.courseCode} · {note.topic || "No topic"}
                  </p>
                  <p className="text-muted-foreground line-clamp-2 flex-1 text-[11px]">
                    {note.content
                      .replace(
                        /\\[a-zA-Z]+\{?[^}]*\}?|\\begin\{[^}]+\}|\\end\{[^}]+\}|\$\$?[^$]*\$\$?|%.*$/gm,
                        "",
                      )
                      .trim()
                      .slice(0, 100) || "Empty note"}
                  </p>
                  {note.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {note.tags.slice(0, 3).map((t) => {
                        const c = tagColor(t);
                        return (
                          <span
                            key={t}
                            className="rounded-full border px-1.5 py-0 text-[9px] font-medium"
                            style={{
                              backgroundColor: c.bg,
                              color: c.text,
                              borderColor: c.border,
                            }}
                          >
                            {t}
                          </span>
                        );
                      })}
                      {note.tags.length > 3 && (
                        <span className="text-muted-foreground text-[9px]">
                          +{note.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="border-border mt-3 flex items-center justify-between border-t pt-2">
                    <span className="text-muted-foreground text-[10px]">
                      {note.semester}
                    </span>
                    <span className="text-muted-foreground/60 text-[9px]">
                      {note.updatedAt}
                    </span>
                  </div>
                  {note.contributor && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="bg-primary/20 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full">
                        <span className="text-primary text-[7px] font-bold">
                          {note.contributor
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-muted-foreground/70 truncate text-[9px]">
                        {note.contributor}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {editingNote && (
        <NoteEditorModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onUpdate={updateNote}
        />
      )}
    </div>
  );
}
