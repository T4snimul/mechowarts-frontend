import { useState, useMemo } from "react";
import { Plus, List, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import type { GradeRow } from "../../types";
import { RUET_GRADES } from "../../constants";

function marksToGrade(marks: number) {
  return (
    RUET_GRADES.find((g) => marks >= g.min) ??
    RUET_GRADES[RUET_GRADES.length - 1]
  );
}

export default function GradeCalcPage() {
  const [rows, setRows] = useState<GradeRow[]>([
    { id: "r1", subject: "Thermodynamics (ME 301)", credits: "3", marks: "78" },
    {
      id: "r2",
      subject: "Fluid Mechanics (ME 303)",
      credits: "3",
      marks: "72",
    },
    {
      id: "r3",
      subject: "Machine Elements (ME 305)",
      credits: "3",
      marks: "85",
    },
    {
      id: "r4",
      subject: "Numerical Methods (ME 307)",
      credits: "3",
      marks: "65",
    },
    {
      id: "r5",
      subject: "Engineering Drawing (ME 309)",
      credits: "2",
      marks: "90",
    },
    {
      id: "r6",
      subject: "Production Processes (ME 311)",
      credits: "3",
      marks: "58",
    },
  ]);
  const [prevSemesters, setPrevSemesters] = useState([
    { label: "Sem 2-2", cgpa: "3.45", credits: "17" },
    { label: "Sem 2-1", cgpa: "3.52", credits: "18" },
  ]);
  const [showScale, setShowScale] = useState(false);

  function addRow() {
    setRows((r) => [
      ...r,
      { id: `r${Date.now()}`, subject: "", credits: "3", marks: "" },
    ]);
  }
  function removeRow(id: string) {
    setRows((r) => r.filter((row) => row.id !== id));
  }
  function updateRow(id: string, field: keyof GradeRow, val: string) {
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, [field]: val } : row)),
    );
  }

  const semResults = useMemo(() => {
    const valid = rows.filter(
      (r) =>
        r.marks !== "" &&
        !isNaN(Number(r.marks)) &&
        !isNaN(Number(r.credits)) &&
        Number(r.credits) > 0,
    );
    const totalCredits = valid.reduce((s, r) => s + Number(r.credits), 0);
    const totalGradePoints = valid.reduce((s, r) => {
      const g = marksToGrade(Number(r.marks));
      return s + g.gpa * Number(r.credits);
    }, 0);
    const sgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    return { sgpa, totalCredits, totalGradePoints, validCount: valid.length };
  }, [rows]);

  const cgpa = useMemo(() => {
    const allCredits =
      prevSemesters.reduce((s, p) => s + Number(p.credits), 0) +
      semResults.totalCredits;
    const allPoints =
      prevSemesters.reduce(
        (s, p) => s + Number(p.cgpa) * Number(p.credits),
        0,
      ) + semResults.totalGradePoints;
    return allCredits > 0 ? allPoints / allCredits : 0;
  }, [prevSemesters, semResults]);

  const gpaColor = (g: number) =>
    g >= 3.5
      ? "text-emerald-600"
      : g >= 3.0
        ? "text-primary"
        : g >= 2.5
          ? "text-amber-600"
          : "text-rose-600";
  const gpaBar = (g: number) =>
    g >= 3.5
      ? "bg-emerald-500"
      : g >= 3.0
        ? "bg-primary"
        : g >= 2.5
          ? "bg-amber-500"
          : "bg-rose-500";

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          {
            label: "SGPA",
            value: semResults.sgpa.toFixed(2),
            sub: "This semester",
            big: true,
          },
          {
            label: "CGPA",
            value: cgpa.toFixed(2),
            sub: "Cumulative",
            big: true,
          },
          {
            label: "Credits",
            value: semResults.totalCredits.toString(),
            sub: "This semester",
            big: false,
          },
          {
            label: "Subjects",
            value: semResults.validCount.toString(),
            sub: "With marks",
            big: false,
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border shadow-none">
            <CardContent className="flex flex-col gap-1 p-4">
              <p className="text-muted-foreground text-xs font-medium">
                {stat.label}
              </p>
              <p
                className={`text-2xl font-bold ${gpaColor(Number(stat.value))} font-[Nunito,sans-serif]`}
              >
                {stat.value}
              </p>
              <p className="text-muted-foreground text-[10px]">{stat.sub}</p>
              {stat.big && (
                <Progress
                  value={(Number(stat.value) / 4) * 100}
                  className={`mt-1 h-1 [&>div]:${gpaBar(Number(stat.value))}`}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border shadow-none">
        <CardHeader className="px-5 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle
              className="text-sm font-semibold"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Current Semester Courses
            </CardTitle>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowScale((s) => !s)}
                className="text-primary hover:text-primary/70 flex items-center gap-1 text-[10px] transition-colors"
              >
                <List size={11} /> {showScale ? "Hide" : "Show"} Scale
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {showScale && (
            <div className="px-5 pb-3">
              <div className="bg-muted/30 border-border flex flex-wrap gap-1.5 rounded-xl border p-3">
                {RUET_GRADES.map((g) => (
                  <div
                    key={g.letter}
                    className="text-muted-foreground flex items-center gap-1 text-[10px]"
                  >
                    <span className="text-foreground w-5 font-bold">
                      {g.letter}
                    </span>
                    <span>= {g.gpa.toFixed(2)}</span>
                    <span className="text-muted-foreground/50">({g.min}+)</span>
                    <span className="text-muted-foreground/30 mx-1">·</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-border bg-muted/30 border-b">
                  <th className="text-muted-foreground px-5 py-2 text-left text-[10px] font-semibold">
                    Subject
                  </th>
                  <th className="text-muted-foreground w-20 px-3 py-2 text-center text-[10px] font-semibold">
                    Credits
                  </th>
                  <th className="text-muted-foreground w-24 px-3 py-2 text-center text-[10px] font-semibold">
                    Marks / 100
                  </th>
                  <th className="text-muted-foreground w-16 px-3 py-2 text-center text-[10px] font-semibold">
                    Grade
                  </th>
                  <th className="text-muted-foreground w-14 px-3 py-2 text-center text-[10px] font-semibold">
                    GPA
                  </th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const marks = Number(row.marks);
                  const valid = row.marks !== "" && !isNaN(marks);
                  const grade = valid ? marksToGrade(marks) : null;
                  const isFail = grade?.letter === "F";
                  return (
                    <tr
                      key={row.id}
                      className={`border-border hover:bg-muted/20 border-b transition-colors ${isFail ? "bg-rose-50/50" : ""}`}
                    >
                      <td className="px-5 py-2">
                        <input
                          value={row.subject}
                          onChange={(e) =>
                            updateRow(row.id, "subject", e.target.value)
                          }
                          placeholder="Subject name…"
                          className="text-foreground placeholder:text-muted-foreground/40 w-full bg-transparent text-xs outline-none"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          value={row.credits}
                          onChange={(e) =>
                            updateRow(row.id, "credits", e.target.value)
                          }
                          type="number"
                          min="1"
                          max="4"
                          className="bg-muted/40 border-border focus:ring-primary/30 w-full rounded-lg border px-2 py-1 text-center text-xs outline-none focus:ring-1"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          value={row.marks}
                          onChange={(e) =>
                            updateRow(row.id, "marks", e.target.value)
                          }
                          type="number"
                          min="0"
                          max="100"
                          placeholder="—"
                          className={`bg-muted/40 focus:ring-primary/30 w-full rounded-lg border px-2 py-1 text-center text-xs outline-none focus:ring-1 ${isFail ? "border-rose-300" : "border-border"}`}
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        {grade ? (
                          <span
                            className={`text-xs font-bold ${isFail ? "text-rose-600" : grade.gpa >= 3.5 ? "text-emerald-600" : "text-primary"}`}
                          >
                            {grade.letter}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/30 text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {grade ? (
                          <span
                            className={`text-xs font-semibold ${isFail ? "text-rose-600" : "text-foreground"}`}
                          >
                            {grade.gpa.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/30 text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => removeRow(row.id)}
                          className="text-muted-foreground/40 transition-colors hover:text-rose-500"
                        >
                          <X size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-border bg-muted/20 border-t-2">
                  <td className="text-foreground px-5 py-2 text-xs font-semibold">
                    Total / SGPA
                  </td>
                  <td className="text-foreground px-3 py-2 text-center text-xs font-semibold">
                    {semResults.totalCredits}
                  </td>
                  <td />
                  <td />
                  <td className="text-primary px-3 py-2 text-center text-sm font-bold">
                    {semResults.sgpa.toFixed(2)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="px-5 py-3">
            <button
              onClick={addRow}
              className="text-primary hover:text-primary/70 flex items-center gap-1.5 text-xs transition-colors"
            >
              <Plus size={13} /> Add subject
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-none">
        <CardHeader className="px-5 pt-4 pb-2">
          <CardTitle
            className="text-sm font-semibold"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Previous Semesters
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <div className="flex flex-col gap-2">
            {prevSemesters.map((sem, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  value={sem.label}
                  onChange={(e) =>
                    setPrevSemesters((p) =>
                      p.map((s, j) =>
                        j === i ? { ...s, label: e.target.value } : s,
                      ),
                    )
                  }
                  className="bg-muted/40 border-border focus:ring-primary/30 w-28 rounded-lg border px-2.5 py-1.5 text-xs outline-none focus:ring-1"
                />
                <span className="text-muted-foreground text-xs">CGPA</span>
                <input
                  value={sem.cgpa}
                  onChange={(e) =>
                    setPrevSemesters((p) =>
                      p.map((s, j) =>
                        j === i ? { ...s, cgpa: e.target.value } : s,
                      ),
                    )
                  }
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  className="bg-muted/40 border-border focus:ring-primary/30 w-20 rounded-lg border px-2.5 py-1.5 text-xs outline-none focus:ring-1"
                />
                <span className="text-muted-foreground text-xs">Credits</span>
                <input
                  value={sem.credits}
                  onChange={(e) =>
                    setPrevSemesters((p) =>
                      p.map((s, j) =>
                        j === i ? { ...s, credits: e.target.value } : s,
                      ),
                    )
                  }
                  type="number"
                  min="0"
                  className="bg-muted/40 border-border focus:ring-primary/30 w-16 rounded-lg border px-2.5 py-1.5 text-xs outline-none focus:ring-1"
                />
                <button
                  onClick={() =>
                    setPrevSemesters((p) => p.filter((_, j) => j !== i))
                  }
                  className="text-muted-foreground/40 transition-colors hover:text-rose-500"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setPrevSemesters((p) => [
                  ...p,
                  { label: `Sem ${p.length + 1}`, cgpa: "3.50", credits: "17" },
                ])
              }
              className="text-primary hover:text-primary/70 mt-1 flex items-center gap-1.5 text-xs transition-colors"
            >
              <Plus size={13} /> Add semester
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
