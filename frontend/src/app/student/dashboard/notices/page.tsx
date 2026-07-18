import { Bell, Pin, FileText, Calendar, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NoticesPage() {
  const notices = [
    {
      title: "Important: Semester Registration Deadline",
      content: "All students must complete their semester registration by July 20, 2024. Late registrations will incur a fee of Rs. 500.",
      category: "ACADEMIC",
      priority: "URGENT",
      date: "Jul 10, 2024",
      isPinned: true,
    },
    {
      title: "Placement Drive - Tata Consultancy Services (TCS)",
      content: "TCS will be conducting a campus placement drive on August 5, 2024. Eligible students with CGPA >= 6.5 must submit their resume.",
      category: "PLACEMENT",
      priority: "HIGH",
      date: "Jul 12, 2024",
      isPinned: true,
    },
    {
      title: "Library Hours Extended for Exam Preparation",
      content: "The central library will now remain open until 10:00 PM on weekdays during the exam period starting August 15.",
      category: "LIBRARY",
      priority: "MEDIUM",
      date: "Aug 01, 2024",
      isPinned: false,
    },
    {
      title: "Annual Sports Day Registration",
      content: "Registrations for Annual Sports Day are now open. Interested students should contact their department sports lead by Aug 10.",
      category: "SPORTS",
      priority: "LOW",
      date: "Aug 02, 2024",
      isPinned: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notices & Circulars</h1>
        <p className="text-sm text-muted-foreground">Official campus circulars, placement updates, and administrative notices</p>
      </div>

      <div className="space-y-4">
        {notices.map((notice, i) => (
          <div
            key={i}
            className={`glass-card p-6 rounded-2xl border ${
              notice.isPinned ? "border-primary/40 bg-primary/[0.02]" : "border-white/10"
            } space-y-3 relative`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {notice.isPinned && (
                  <Badge variant="gradient" className="flex items-center gap-1">
                    <Pin className="h-3 w-3 fill-white" /> Pinned
                  </Badge>
                )}
                <Badge variant="glass">{notice.category}</Badge>
              </div>
              <span className="text-xs text-muted-foreground">{notice.date}</span>
            </div>

            <h2 className="font-bold text-base text-foreground leading-snug">{notice.title}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
