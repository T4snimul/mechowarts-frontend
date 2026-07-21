import { Clock, AlertCircle, MapPin } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { SUBJECT_COLORS } from "../../constants";
import { semesterExams } from "../../data/schedule";

export default function SemesterExamsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="gap-1.5 border-rose-200 bg-rose-50 px-2.5 py-1 text-xs text-rose-700">
          <Clock size={12} />
          Exam Slot: 14:30 – 17:00 daily
        </Badge>
        <span className="text-muted-foreground text-xs">
          3rd Year · 1st Semester · Nov 2025
        </span>
      </div>
      <Card className="border-border shadow-none">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="bg-muted/40 border-border border-b">
                {["Date", "Subject", "Code", "Venue", "Syllabus", ""].map(
                  (h, i) => (
                    <th
                      key={i}
                      className={`text-muted-foreground px-4 py-3 text-xs font-semibold ${i === 5 ? "text-right" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {semesterExams.map((exam, i) => {
                const past = exam.daysLeft < 0;
                const soon = exam.daysLeft >= 0 && exam.daysLeft <= 3;
                const color = SUBJECT_COLORS[exam.code] || "#64748b";
                return (
                  <tr
                    key={i}
                    className={`border-border border-b transition-colors ${past ? "opacity-50" : "hover:bg-muted/20"}`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-foreground text-xs font-medium tabular-nums">
                        {exam.date}
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        14:30–17:00
                      </p>
                    </td>
                    <td className="text-foreground px-4 py-3 font-medium">
                      {exam.subject}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: color + "18", color }}
                      >
                        {exam.code}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-4 py-3 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {exam.venue}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-4 py-3 text-xs">
                      {exam.syllabus}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {past ? (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground text-[10px]"
                        >
                          Done
                        </Badge>
                      ) : exam.daysLeft === 0 ? (
                        <Badge className="border-0 bg-rose-500 text-[10px] text-white">
                          Today
                        </Badge>
                      ) : (
                        <Badge
                          className={`border text-[10px] ${soon ? "border-amber-200 bg-amber-50 text-amber-700" : "bg-primary/5 text-primary border-primary/20"}`}
                        >
                          in {exam.daysLeft}d
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <p className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
        <AlertCircle size={12} />
        All exams run 14:30–17:00 (3 hours). Confirm venue with department
        notice board.
      </p>
    </div>
  );
}
