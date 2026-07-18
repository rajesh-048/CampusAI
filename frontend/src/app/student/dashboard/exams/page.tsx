import { ClipboardList, Calendar, Clock, MapPin, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ExamSchedulePage() {
  const exams = [
    { subject: "Data Structures & Algorithms", code: "CS501", date: "Aug 25, 2024", time: "09:00 AM - 11:00 AM", room: "Exam Hall 1", type: "Internal 1" },
    { subject: "Database Management Systems", code: "CS502", date: "Aug 26, 2024", time: "09:00 AM - 11:00 AM", room: "Exam Hall 1", type: "Internal 1" },
    { subject: "Machine Learning Fundamentals", code: "CS503", date: "Aug 27, 2024", time: "09:00 AM - 11:00 AM", room: "Exam Hall 2", type: "Internal 1" },
    { subject: "Software Engineering", code: "CS504", date: "Aug 28, 2024", time: "09:00 AM - 11:00 AM", room: "Exam Hall 2", type: "Internal 1" },
    { subject: "Formal Languages & Automata", code: "CS505", date: "Aug 29, 2024", time: "09:00 AM - 11:00 AM", room: "Exam Hall 3", type: "Internal 1" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exam Schedule</h1>
          <p className="text-sm text-muted-foreground">Internal Examination 1 • Odd Semester 2024-25</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exams.map((exam, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:border-secondary/40 transition-colors">
            <div className="flex items-center justify-between">
              <Badge variant="glass" className="text-secondary font-mono">{exam.code}</Badge>
              <Badge variant="default">{exam.type}</Badge>
            </div>

            <div>
              <h2 className="font-bold text-base text-foreground leading-snug">{exam.subject}</h2>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> <span className="font-medium text-foreground">{exam.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" /> <span>{exam.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> <span>Venue: <strong className="text-foreground">{exam.room}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
