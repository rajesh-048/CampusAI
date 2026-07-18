import { CalendarDays, Star, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AcademicCalendarPage() {
  const events = [
    { title: "Semester 5 Begins", date: "Jul 15, 2024", type: "Semester Start", isImportant: true },
    { title: "Independence Day Holiday", date: "Aug 15, 2024", type: "Holiday", isImportant: false },
    { title: "Internal Exam 1", date: "Aug 25 - Aug 30, 2024", type: "Exam", isImportant: true },
    { title: "Ganesh Chaturthi Holiday", date: "Sep 07, 2024", type: "Holiday", isImportant: false },
    { title: "TechFest 2024", date: "Sep 20 - Sep 22, 2024", type: "Event", isImportant: true },
    { title: "Internal Exam 2", date: "Oct 10 - Oct 15, 2024", type: "Exam", isImportant: true },
    { title: "Dussehra Vacation", date: "Oct 12 - Oct 14, 2024", type: "Holiday", isImportant: false },
    { title: "Diwali Holidays", date: "Nov 01 - Nov 03, 2024", type: "Holiday", isImportant: true },
    { title: "External Examinations", date: "Dec 01 - Dec 20, 2024", type: "Exam", isImportant: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Calendar</h1>
        <p className="text-sm text-muted-foreground">Key dates, holidays, exams, and milestones for 2024-25</p>
      </div>

      <div className="space-y-3">
        {events.map((event, i) => (
          <div
            key={i}
            className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${event.isImportant ? "gradient-primary text-white" : "glass text-muted-foreground"}`}>
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  {event.title} {event.isImportant && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
                </h3>
                <span className="text-xs text-muted-foreground">{event.date}</span>
              </div>
            </div>
            <Badge variant={event.type === "Exam" ? "destructive" : event.type === "Holiday" ? "secondary" : "default"}>
              {event.type}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
