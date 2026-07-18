import Link from "next/link";
import {
  Calendar,
  ClipboardList,
  Bell,
  Download,
  BookOpen,
  ArrowRight,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import AISearchBar from "@/components/search/AISearchBar";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboardPage() {
  const mockTodayClasses = [
    { time: "09:00 - 10:00", subject: "Data Structures", faculty: "Dr. Anand Prakash", room: "CSE-101", type: "Lecture" },
    { time: "10:00 - 11:00", subject: "Database Systems", faculty: "Prof. Meena Gupta", room: "CSE-102", type: "Lecture" },
    { time: "11:00 - 12:00", subject: "Machine Learning", faculty: "Dr. Karthik Rajan", room: "CSE-201", type: "Lecture" },
  ];

  const mockExams = [
    { title: "Internal Exam 1 - Data Structures", date: "Aug 25, 2024", time: "09:00 AM", room: "Exam Hall 1" },
    { title: "Internal Exam 1 - Database Systems", date: "Aug 26, 2024", time: "09:00 AM", room: "Exam Hall 1" },
    { title: "Internal Exam 1 - Machine Learning", date: "Aug 27, 2024", time: "09:00 AM", room: "Exam Hall 2" },
  ];

  const mockNotices = [
    { title: "Semester 5 Registration Deadline", date: "Jul 20, 2024", category: "Academic", isPinned: true },
    { title: "TCS Placement Drive Announced", date: "Aug 05, 2024", category: "Placement", isPinned: true },
    { title: "Central Library Extended Hours", date: "Aug 01, 2024", category: "Library", isPinned: false },
  ];

  return (
    <div className="space-y-8">
      {/* Global AI Search Section */}
      <section className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Global Campus AI Search
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          What would you like to <span className="gradient-text">find today?</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Search across timetables, exams, notices, circulars, faculty hours, and uploaded documents in natural language.
        </p>
        <AISearchBar />
      </section>

      {/* Main Grid: Timetable + Exams + Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Today's Schedule & Upcoming Exams */}
        <div className="lg:col-span-8 space-y-8">
          {/* Today's Timetable */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Today&apos;s Timetable</h2>
                  <p className="text-xs text-muted-foreground">Monday • CSE Semester 5 (Sec A)</p>
                </div>
              </div>
              <Link
                href="/student/dashboard/timetable"
                className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
              >
                Full Week →
              </Link>
            </div>

            <div className="space-y-3">
              {mockTodayClasses.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      {item.time}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.subject}</h3>
                      <p className="text-xs text-muted-foreground">{item.faculty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground glass px-2.5 py-1 rounded-lg">
                      <MapPin className="h-3 w-3 text-secondary" /> {item.room}
                    </span>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Upcoming Examinations</h2>
                  <p className="text-xs text-muted-foreground">Internal Exam 1 Schedule</p>
                </div>
              </div>
              <Link
                href="/student/dashboard/exams"
                className="text-xs text-secondary hover:underline font-semibold flex items-center gap-1"
              >
                All Exams →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockExams.map((exam, i) => (
                <div key={i} className="glass p-4 rounded-xl border border-white/5 space-y-2">
                  <Badge variant="glass" className="text-secondary text-[10px]">Internal 1</Badge>
                  <h3 className="font-semibold text-xs leading-snug">{exam.title}</h3>
                  <div className="text-[11px] text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-primary" /> {exam.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-secondary" /> {exam.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-accent" /> {exam.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Official Notices & Quick Downloads */}
        <div className="lg:col-span-4 space-y-8">
          {/* Pinned Notices */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                <h2 className="font-bold text-base">Official Notices</h2>
              </div>
              <Link href="/student/dashboard/notices" className="text-xs text-accent hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {mockNotices.map((notice, i) => (
                <div key={i} className="p-3.5 rounded-xl glass border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="glass" className="text-[10px] text-accent">
                      {notice.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{notice.date}</span>
                  </div>
                  <h3 className="font-semibold text-xs leading-snug">{notice.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Quick Shortcuts</h2>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/student/dashboard/downloads"
                className="p-3.5 rounded-xl glass border border-white/5 hover:border-primary/40 flex flex-col items-center text-center gap-2 group transition-all"
              >
                <Download className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Download PYQs</span>
              </Link>

              <Link
                href="/student/dashboard/faculty"
                className="p-3.5 rounded-xl glass border border-white/5 hover:border-secondary/40 flex flex-col items-center text-center gap-2 group transition-all"
              >
                <BookOpen className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Faculty Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
