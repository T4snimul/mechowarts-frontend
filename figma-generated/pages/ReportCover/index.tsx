import { useState, useRef } from "react";
import {
  Eye,
  EyeOff,
  Code2,
  FormInput,
  Download,
  Copy,
  Check,
  ChevronLeft,
} from "lucide-react";

interface CoverData {
  university: string;
  department: string;
  courseTitle: string;
  courseCode: string;
  experimentNo: string;
  experimentTitle: string;
  submittedBy: string;
  studentId: string;
  year: string;
  semester: string;
  groupNo: string;
  submittedTo: string;
  designation: string;
  submissionDate: string;
}

const DEFAULT: CoverData = {
  university: "Rajshahi University of Engineering & Technology",
  department: "Department of Mechanical & Industrial Engineering",
  courseTitle: "Engineering Mechanics Sessional",
  courseCode: "ME 3108",
  experimentNo: "01",
  experimentTitle:
    "Determination of the Coefficient of Friction between Two Surfaces",
  submittedBy: "Rafid Mahmud",
  studentId: "2408037",
  year: "3rd",
  semester: "1st",
  groupNo: "A2",
  submittedTo: "Dr. Md. Zahidul Islam",
  designation: "Professor, Dept. of MIE, RUET",
  submissionDate: new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
};

function buildLatex(d: CoverData): string {
  return `\\documentclass[12pt,a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphicx}
\\usepackage{setspace}
\\usepackage{array}
\\usepackage{booktabs}
\\usepackage{fancyhdr}
\\usepackage{parskip}
\\pagestyle{empty}

\\begin{document}

\\begin{center}

  {\\Large\\bfseries ${d.university}}\\\\[6pt]
  {\\large ${d.department}}\\\\[24pt]

  \\includegraphics[width=2.2cm]{ruet-logo}\\\\[24pt]

  {\\LARGE\\bfseries LAB REPORT}\\\\[8pt]
  \\rule{0.6\\textwidth}{0.6pt}\\\\[24pt]

  \\begin{tabular}{rl}
    \\textbf{Course Title:}   & ${d.courseTitle} \\\\
    \\textbf{Course Code:}    & ${d.courseCode} \\\\[12pt]
    \\textbf{Experiment No.:} & ${d.experimentNo} \\\\
    \\textbf{Experiment:}     & \\parbox[t]{9cm}{${d.experimentTitle}} \\\\
  \\end{tabular}\\\\[28pt]

  \\rule{0.6\\textwidth}{0.4pt}\\\\[16pt]

  \\begin{tabular}{rl}
    \\textbf{Submitted By:} & ${d.submittedBy} \\\\
    \\textbf{Student ID:}   & ${d.studentId} \\\\
    \\textbf{Year \\& Semester:} & ${d.year} Year, ${d.semester} Semester \\\\
    \\textbf{Group No.:}    & ${d.groupNo} \\\\
  \\end{tabular}\\\\[28pt]

  \\rule{0.6\\textwidth}{0.4pt}\\\\[16pt]

  \\begin{tabular}{rl}
    \\textbf{Submitted To:} & ${d.submittedTo} \\\\
    \\textbf{Designation:}  & ${d.designation} \\\\
  \\end{tabular}\\\\[28pt]

  \\rule{0.6\\textwidth}{0.4pt}\\\\[16pt]

  \\textbf{Date of Submission:} ${d.submissionDate}

\\end{center}

\\end{document}`;
}

// ─── Preview ──────────────────────────────────────────────────────────────────
function CoverPreview({ d }: { d: CoverData }) {
  return (
    <div className="flex h-full w-full items-start justify-center overflow-auto px-4 py-6">
      <div
        className="flex flex-col items-center rounded border border-gray-200 bg-white text-center text-gray-900 shadow-lg"
        style={{
          width: "595px",
          minWidth: "595px",
          padding: "72px 64px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
      >
        {/* Header */}
        <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
          {d.university}
        </div>
        <div style={{ fontSize: "13px", marginBottom: "24px" }}>
          {d.department}
        </div>

        {/* Logo placeholder */}
        <div
          className="mb-6 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-400"
          style={{ width: "64px", height: "64px", fontSize: "10px" }}
        >
          LOGO
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginBottom: "6px",
          }}
        >
          LAB REPORT
        </div>
        <div className="mb-6 w-48 border-t border-gray-400" />

        {/* Course info */}
        <table
          style={{
            borderCollapse: "collapse",
            marginBottom: "24px",
            textAlign: "left",
            width: "100%",
          }}
        >
          <tbody>
            {[
              ["Course Title", d.courseTitle],
              ["Course Code", d.courseCode],
              ["Experiment No.", d.experimentNo],
              ["Experiment", d.experimentTitle],
            ].map(([k, v]) => (
              <tr key={k}>
                <td
                  style={{
                    fontWeight: 600,
                    paddingRight: "12px",
                    paddingBottom: "4px",
                    whiteSpace: "nowrap",
                    verticalAlign: "top",
                  }}
                >
                  {k}:
                </td>
                <td style={{ paddingBottom: "4px", verticalAlign: "top" }}>
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-5 w-40 border-t border-gray-300" />

        {/* Submitted by */}
        <table
          style={{
            borderCollapse: "collapse",
            marginBottom: "24px",
            textAlign: "left",
            width: "100%",
          }}
        >
          <tbody>
            {[
              ["Submitted By", d.submittedBy],
              ["Student ID", d.studentId],
              ["Year & Semester", `${d.year} Year, ${d.semester} Semester`],
              ["Group No.", d.groupNo],
            ].map(([k, v]) => (
              <tr key={k}>
                <td
                  style={{
                    fontWeight: 600,
                    paddingRight: "12px",
                    paddingBottom: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {k}:
                </td>
                <td style={{ paddingBottom: "4px" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-5 w-40 border-t border-gray-300" />

        {/* Submitted to */}
        <table
          style={{
            borderCollapse: "collapse",
            marginBottom: "24px",
            textAlign: "left",
            width: "100%",
          }}
        >
          <tbody>
            {[
              ["Submitted To", d.submittedTo],
              ["Designation", d.designation],
            ].map(([k, v]) => (
              <tr key={k}>
                <td
                  style={{
                    fontWeight: 600,
                    paddingRight: "12px",
                    paddingBottom: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {k}:
                </td>
                <td style={{ paddingBottom: "4px" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-5 w-40 border-t border-gray-300" />

        <div>
          <span style={{ fontWeight: 600 }}>Date of Submission:</span>{" "}
          {d.submissionDate}
        </div>
      </div>
    </div>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const base =
    "w-full bg-input-background border border-border rounded-md px-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${base} resize-none py-2`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} h-9 py-0`}
        />
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ReportCoverPage() {
  const [data, setData] = useState<CoverData>(DEFAULT);
  const [mode, setMode] = useState<"form" | "latex">("form");
  const [latexSrc, setLatexSrc] = useState(() => buildLatex(DEFAULT));
  const [mobileView, setMobileView] = useState<"settings" | "preview">(
    "settings",
  );
  const [copied, setCopied] = useState(false);
  const latexRef = useRef<HTMLTextAreaElement>(null);

  function update(key: keyof CoverData, val: string) {
    const next = { ...data, [key]: val };
    setData(next);
    setLatexSrc(buildLatex(next));
  }

  function handleLatexChange(src: string) {
    setLatexSrc(src);
  }

  function syncFromLatex() {
    // When switching back to form from latex, rebuild the latex to reflect any
    // manual edits (preview still shows last known data; latex is source of truth
    // only in latex mode — no round-trip parse needed for MVP).
    setMode("form");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(latexSrc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Sync latex when switching to latex mode
  function switchToLatex() {
    setLatexSrc(buildLatex(data));
    setMode("latex");
  }

  const settingsPanel = (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Panel header */}
      <div className="border-border flex shrink-0 items-center justify-between border-b px-5 py-3">
        <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          {mode === "form" ? "Form Fields" : "LaTeX Source"}
        </span>
        <div className="flex items-center gap-1">
          {mode === "latex" && (
            <button
              onClick={handleCopy}
              className="bg-muted hover:bg-accent text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          <button
            onClick={mode === "form" ? switchToLatex : syncFromLatex}
            className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors"
          >
            {mode === "form" ? <Code2 size={12} /> : <FormInput size={12} />}
            {mode === "form" ? "Edit LaTeX" : "Back to Form"}
          </button>
        </div>
      </div>

      {/* Panel body */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {mode === "form" ? (
          <div className="flex flex-col gap-4 px-5 py-4">
            <div>
              <p className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase">
                Institution
              </p>
              <div className="flex flex-col gap-3">
                <Field
                  label="University"
                  value={data.university}
                  onChange={(v) => update("university", v)}
                />
                <Field
                  label="Department"
                  value={data.department}
                  onChange={(v) => update("department", v)}
                />
              </div>
            </div>
            <div>
              <p className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase">
                Course & Experiment
              </p>
              <div className="flex flex-col gap-3">
                <Field
                  label="Course Title"
                  value={data.courseTitle}
                  onChange={(v) => update("courseTitle", v)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Course Code"
                    value={data.courseCode}
                    onChange={(v) => update("courseCode", v)}
                  />
                  <Field
                    label="Experiment No."
                    value={data.experimentNo}
                    onChange={(v) => update("experimentNo", v)}
                  />
                </div>
                <Field
                  label="Experiment Title"
                  value={data.experimentTitle}
                  onChange={(v) => update("experimentTitle", v)}
                  multiline
                />
              </div>
            </div>
            <div>
              <p className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase">
                Submitted By
              </p>
              <div className="flex flex-col gap-3">
                <Field
                  label="Name"
                  value={data.submittedBy}
                  onChange={(v) => update("submittedBy", v)}
                />
                <Field
                  label="Student ID"
                  value={data.studentId}
                  onChange={(v) => update("studentId", v)}
                />
                <div className="grid grid-cols-3 gap-3">
                  <Field
                    label="Year"
                    value={data.year}
                    onChange={(v) => update("year", v)}
                  />
                  <Field
                    label="Semester"
                    value={data.semester}
                    onChange={(v) => update("semester", v)}
                  />
                  <Field
                    label="Group"
                    value={data.groupNo}
                    onChange={(v) => update("groupNo", v)}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase">
                Submitted To
              </p>
              <div className="flex flex-col gap-3">
                <Field
                  label="Name"
                  value={data.submittedTo}
                  onChange={(v) => update("submittedTo", v)}
                />
                <Field
                  label="Designation"
                  value={data.designation}
                  onChange={(v) => update("designation", v)}
                />
              </div>
            </div>
            <div>
              <p className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase">
                Submission
              </p>
              <Field
                label="Date"
                value={data.submissionDate}
                onChange={(v) => update("submissionDate", v)}
              />
            </div>
          </div>
        ) : (
          <div className="h-full p-3">
            <textarea
              ref={latexRef}
              value={latexSrc}
              onChange={(e) => handleLatexChange(e.target.value)}
              spellCheck={false}
              className="border-border focus:ring-primary/40 h-full min-h-[480px] w-full resize-none rounded-md border bg-[#1e1e2e] p-4 font-mono text-xs leading-relaxed text-[#cdd6f4] focus:ring-2 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Download button */}
      <div className="border-border shrink-0 border-t px-5 py-3">
        <button
          onClick={handleCopy}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Download size={14} />
          Copy LaTeX to Clipboard
        </button>
      </div>
    </div>
  );

  const previewPanel = (
    <div className="bg-muted/40 flex h-full flex-col overflow-hidden">
      <div className="border-border bg-card flex shrink-0 items-center justify-between border-b px-5 py-3">
        <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          Preview
        </span>
        <span className="text-muted-foreground text-[10px]">
          A4 · PDF output
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <CoverPreview d={data} />
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Mobile toggle bar ── */}
      <div className="border-border bg-card flex shrink-0 items-center gap-2 border-b px-4 py-2 md:hidden">
        <button
          onClick={() => setMobileView("settings")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${mobileView === "settings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
        >
          <FormInput size={13} />
          Settings
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${mobileView === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
        >
          <Eye size={13} />
          Preview
        </button>
      </div>

      {/* ── Mobile single-pane ── */}
      <div className="bg-card min-h-0 flex-1 overflow-hidden md:hidden">
        {mobileView === "settings" ? settingsPanel : previewPanel}
      </div>

      {/* ── Desktop two-column ── */}
      <div className="hidden min-h-0 flex-1 overflow-hidden md:flex">
        {/* Left: settings */}
        <div className="border-border bg-card flex w-[380px] shrink-0 flex-col overflow-hidden border-r">
          {settingsPanel}
        </div>
        {/* Right: preview */}
        <div className="min-w-0 flex-1 overflow-hidden">{previewPanel}</div>
      </div>
    </div>
  );
}
