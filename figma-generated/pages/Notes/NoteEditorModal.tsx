import { useState, useMemo, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  X,
  Save,
  Bold,
  Italic,
  Heading2,
  Code,
  Plus,
  Link,
  Youtube,
  ExternalLink,
  FileText,
  Image,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import type { Note } from "../../types";
import {
  NOTE_SEMESTERS,
  NOTE_COURSES,
  NOTE_PRESET_TAGS,
  SUBJECT_COLORS,
} from "../../constants";

// ─── LaTeX renderer helper ────────────────────────────────────────────────────
function renderLatex(source: string): string {
  let text = source
    .replace(/\\documentclass(\[.*?\])?\{.*?\}/g, "")
    .replace(/\\usepackage(\[.*?\])?\{.*?\}/g, "")
    .replace(/\\begin\{document\}/g, "")
    .replace(/\\end\{document\}/g, "");

  text = text.replace(
    /\\section\*\{(.+?)\}/g,
    '<h2 class="text-lg font-bold mt-5 mb-2" style="font-family:Nunito,sans-serif">$1</h2>',
  );
  text = text.replace(
    /\\subsection\*\{(.+?)\}/g,
    '<h3 class="text-sm font-semibold mt-4 mb-1.5">$1</h3>',
  );

  text = text.replace(/\\textbf\{(.+?)\}/g, "<strong>$1</strong>");
  text = text.replace(/\\textit\{(.+?)\}/g, "<em>$1</em>");
  text = text.replace(/\\text\{(.+?)\}/g, "$1");
  text = text.replace(/\\emph\{(.+?)\}/g, "<em>$1</em>");

  text = text.replace(
    /\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/g,
    (_, inner) => {
      const items = inner.split("\\item").filter((s: string) => s.trim());
      return (
        "<ol class='list-decimal pl-6 my-2 flex flex-col gap-1'>" +
        items.map((i: string) => `<li>${i.trim()}</li>`).join("") +
        "</ol>"
      );
    },
  );
  text = text.replace(
    /\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g,
    (_, inner) => {
      const items = inner.split("\\item").filter((s: string) => s.trim());
      return (
        "<ul class='list-disc pl-6 my-2 flex flex-col gap-1'>" +
        items.map((i: string) => `<li>${i.trim()}</li>`).join("") +
        "</ul>"
      );
    },
  );

  text = text.replace(
    /\\begin\{tabular\}(\{.*?\})([\s\S]*?)\\end\{tabular\}/g,
    (_, _fmt, body) => {
      const rows = body
        .split("\\\\")
        .map((r: string) => r.trim())
        .filter((r: string) => r && !r.startsWith("\\hline"));
      if (!rows.length) return "";
      const tableRows = rows.map((r: string, i: number) => {
        const cells = r.split("&").map((c: string) => c.trim());
        const tag = i === 0 ? "th" : "td";
        return (
          "<tr>" +
          cells
            .map(
              (c: string) =>
                `<${tag} class="px-3 py-1 border border-border text-xs">${c}</${tag}>`,
            )
            .join("") +
          "</tr>"
        );
      });
      return `<table class="border-collapse my-3 text-sm">${tableRows.join("")}</table>`;
    },
  );

  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return `<div class="my-3 overflow-x-auto py-1">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
    } catch {
      return `<code class="text-xs bg-muted px-1 rounded">$$${math}$$</code>`;
    }
  });

  text = text.replace(/\$([^$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `<code class="text-xs">$${math}$</code>`;
    }
  });

  text = text.replace(/\n{2,}/g, "</p><p class='mb-2'>");
  text = `<p class='mb-2'>${text}</p>`;
  text = text.replace(/<p class='mb-2'>\s*<\/p>/g, "");

  return text;
}

// ─── Tag chip input component ─────────────────────────────────────────────────
function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const allTags = useMemo(() => {
    const custom = tags.filter((t) => !NOTE_PRESET_TAGS.includes(t));
    return [...NOTE_PRESET_TAGS, ...custom];
  }, [tags]);

  const tagPalette: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    Theory: { bg: "#e0f2fe", text: "#0369a1", border: "#bae6fd" },
    Formula: { bg: "#ede9fe", text: "#6d28d9", border: "#ddd6fe" },
    Exercise: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    Summary: { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" },
    Lab: { bg: "#fee2e2", text: "#b91c1c", border: "#fecaca" },
  };
  function colorFor(t: string) {
    return (
      tagPalette[t] ?? { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" }
    );
  }

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setInput("");
  }
  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-col gap-2">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => {
            const c = colorFor(t);
            return (
              <span
                key={t}
                className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: c.bg,
                  color: c.text,
                  borderColor: c.border,
                }}
              >
                {t}
                <button
                  onClick={() => removeTag(t)}
                  className="ml-0.5 opacity-60 transition-opacity hover:opacity-100"
                >
                  <X size={9} />
                </button>
              </span>
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {allTags
          .filter((t) => !tags.includes(t))
          .map((t) => {
            const c = colorFor(t);
            return (
              <button
                key={t}
                onClick={() => addTag(t)}
                className="flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: c.bg + "80",
                  color: c.text,
                  borderColor: c.border,
                }}
              >
                <Plus size={9} />
                {t}
              </button>
            );
          })}
      </div>
      <div className="flex items-center gap-1.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(input);
            }
          }}
          placeholder="Add custom tag…"
          className="bg-muted/40 border-border focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50 flex-1 rounded-lg border px-2.5 py-1.5 text-[11px] outline-none focus:ring-1"
        />
        <button
          onClick={() => addTag(input)}
          disabled={!input.trim()}
          className="bg-primary/10 text-primary hover:bg-primary/20 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-colors disabled:opacity-30"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ─── Note editor modal ────────────────────────────────────────────────────────
export default function NoteEditorModal({
  note,
  onClose,
  onUpdate,
}: {
  note: Note;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
}) {
  const [savedAt, setSavedAt] = useState("All changes saved");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileIcons: Record<string, React.ElementType> = {
    pdf: FileText,
    image: Image,
    doc: FileText,
  };

  function update(updates: Partial<Note>) {
    onUpdate(note.id, updates);
    setSavedAt("Saving…");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSavedAt("All changes saved"), 700);
  }

  function addReference() {
    update({
      references: [...note.references, { label: "New reference", url: "" }],
    });
  }
  function updateRef(idx: number, field: "label" | "url", val: string) {
    update({
      references: note.references.map((r, i) =>
        i === idx ? { ...r, [field]: val } : r,
      ),
    });
  }
  function removeRef(idx: number) {
    update({ references: note.references.filter((_, i) => i !== idx) });
  }

  const latexPreview = useMemo(() => {
    if (note.editorMode !== "latex") return "";
    return renderLatex(note.content);
  }, [note.content, note.editorMode]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border-border flex w-full flex-col overflow-hidden rounded-t-2xl border shadow-2xl sm:max-w-4xl sm:rounded-2xl"
        style={{
          height: "calc(100dvh - 0px)",
          maxHeight: "calc(100dvh - 16px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <div className="bg-muted/50 border-border flex shrink-0 items-center rounded-lg border p-0.5">
            {(["rich", "latex"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => update({ editorMode: mode })}
                className={`rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors ${note.editorMode === mode ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {mode === "rich" ? "Rich Text" : "LaTeX"}
              </button>
            ))}
          </div>
          {note.editorMode === "rich" && (
            <div className="flex items-center gap-0.5">
              {[
                { icon: Bold, insert: "**bold**" },
                { icon: Italic, insert: "_italic_" },
                { icon: Heading2, insert: "\n## Heading\n" },
                { icon: Code, insert: "`code`" },
              ].map(({ icon: Icon, insert }) => (
                <button
                  key={insert}
                  title={insert}
                  onClick={() => update({ content: note.content + insert })}
                  className="hover:bg-accent text-muted-foreground hover:text-foreground flex h-7 w-7 items-center justify-center rounded transition-colors"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          )}
          <div className="flex-1" />
          <span className="text-muted-foreground flex hidden shrink-0 items-center gap-1 text-[10px] sm:flex">
            <Save size={11} />
            {savedAt}
          </span>
          <button
            onClick={onClose}
            className="hover:bg-accent text-muted-foreground hover:text-foreground ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="border-border bg-card shrink-0 border-b px-5 pt-4 pb-3">
          <input
            value={note.title}
            onChange={(e) => update({ title: e.target.value })}
            className="text-foreground placeholder:text-muted-foreground/30 mb-3 w-full bg-transparent text-xl font-bold outline-none"
            style={{ fontFamily: "Nunito, sans-serif" }}
            placeholder="Note title…"
            autoFocus
          />
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={note.semester}
                onChange={(e) => update({ semester: e.target.value })}
                className="bg-muted/50 border-border focus:ring-primary/30 text-muted-foreground rounded-lg border px-2 py-1 text-[11px] outline-none focus:ring-1"
              >
                {NOTE_SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    Sem {s}
                  </option>
                ))}
              </select>
              <select
                value={note.courseCode}
                onChange={(e) => update({ courseCode: e.target.value })}
                className="bg-muted/50 border-border focus:ring-primary/30 rounded-lg border px-2 py-1 text-[11px] outline-none focus:ring-1"
                style={{ color: SUBJECT_COLORS[note.courseCode] || "#64748b" }}
              >
                {NOTE_COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                value={note.topic}
                onChange={(e) => update({ topic: e.target.value })}
                placeholder="Topic…"
                className="bg-muted/50 border-border focus:ring-primary/30 text-muted-foreground min-w-[120px] rounded-lg border px-2 py-1 text-[11px] outline-none focus:ring-1"
              />
            </div>
            <div className="min-w-[200px] flex-1">
              <TagInput
                tags={note.tags}
                onChange={(tags) => update({ tags })}
              />
            </div>
          </div>
        </div>

        <div
          className={`flex min-h-0 flex-1 ${note.editorMode === "latex" ? "flex-row" : "flex-col"}`}
        >
          {note.editorMode === "rich" ? (
            <textarea
              value={note.content}
              onChange={(e) => update({ content: e.target.value })}
              placeholder="Start writing…"
              className="bg-background text-foreground placeholder:text-muted-foreground/40 min-h-0 flex-1 resize-none px-5 py-4 font-mono text-sm leading-relaxed outline-none"
            />
          ) : (
            <>
              <div className="border-border flex min-w-0 flex-1 flex-col border-r">
                <div className="shrink-0 border-b border-white/10 bg-[#1e2330] px-3 py-1.5">
                  <span className="font-mono text-[10px] text-slate-400">
                    LaTeX Source
                  </span>
                </div>
                <textarea
                  value={note.content}
                  onChange={(e) => update({ content: e.target.value })}
                  spellCheck={false}
                  className="min-h-0 flex-1 resize-none bg-[#1e2330] px-4 py-3 font-mono text-xs leading-relaxed text-emerald-300 outline-none placeholder:text-slate-600"
                  placeholder="% Enter LaTeX here..."
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="bg-card border-border shrink-0 border-b px-3 py-1.5">
                  <span className="text-muted-foreground text-[10px] font-medium">
                    Preview
                  </span>
                </div>
                <div
                  className="text-foreground min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: latexPreview }}
                />
              </div>
            </>
          )}
        </div>

        <div className="border-border bg-card shrink-0 border-t">
          <div className="divide-border flex flex-col sm:flex-row sm:divide-x">
            <div className="flex-1 px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
                  References
                </span>
                <button
                  onClick={addReference}
                  className="text-primary hover:text-primary/70 flex items-center gap-1 text-[10px] transition-colors"
                >
                  <Plus size={11} /> Add
                </button>
              </div>
              <div className="flex max-h-[90px] flex-col gap-1.5 overflow-y-auto">
                {note.references.length === 0 && (
                  <p className="text-muted-foreground/50 text-[11px]">
                    No references yet.
                  </p>
                )}
                {note.references.map((ref, i) => {
                  const isYt =
                    ref.url.includes("youtube.com") ||
                    ref.url.includes("youtu.be");
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      {isYt ? (
                        <Youtube size={11} className="shrink-0 text-rose-500" />
                      ) : (
                        <Link size={11} className="text-primary shrink-0" />
                      )}
                      <input
                        value={ref.label}
                        onChange={(e) => updateRef(i, "label", e.target.value)}
                        className="text-foreground border-border focus:border-primary min-w-0 flex-1 border-b bg-transparent text-[11px] outline-none"
                      />
                      <input
                        value={ref.url}
                        onChange={(e) => updateRef(i, "url", e.target.value)}
                        placeholder="https://…"
                        className="text-muted-foreground border-border focus:border-primary hidden w-32 border-b bg-transparent text-[11px] outline-none sm:block"
                      />
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/70 shrink-0"
                        >
                          <ExternalLink size={10} />
                        </a>
                      )}
                      <button
                        onClick={() => removeRef(i)}
                        className="text-muted-foreground hover:text-destructive shrink-0 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-border flex-1 border-t px-4 py-3 sm:border-t-0">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
                  Attachments
                </span>
                <button
                  onClick={() =>
                    import("sonner").then(({ toast }) =>
                      toast("Attachment upload coming soon!"),
                    )
                  }
                  className="text-primary hover:text-primary/70 flex items-center gap-1 text-[10px] transition-colors"
                >
                  <Plus size={11} /> Attach
                </button>
              </div>
              <div className="flex max-h-[90px] flex-col gap-1.5 overflow-y-auto">
                {note.attachments.length === 0 && (
                  <p className="text-muted-foreground/50 text-[11px]">
                    No attachments.
                  </p>
                )}
                {note.attachments.map((att, i) => {
                  const FileIcon = fileIcons[att.fileType] || FileText;
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <FileIcon
                        size={11}
                        className="text-muted-foreground shrink-0"
                      />
                      <span className="text-foreground min-w-0 flex-1 truncate text-[11px]">
                        {att.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-border shrink-0 px-1 py-0 text-[9px]"
                      >
                        {att.size}
                      </Badge>
                      <button
                        onClick={() =>
                          update({
                            attachments: note.attachments.filter(
                              (_, j) => j !== i,
                            ),
                          })
                        }
                        className="text-muted-foreground hover:text-destructive shrink-0 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
