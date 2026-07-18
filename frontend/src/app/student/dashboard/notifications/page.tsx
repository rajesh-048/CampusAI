import { Bell, Info, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const notifications = [
    { title: "Exam Schedule Released", message: "Internal Exam 1 timetable is now published. Check the exam portal.", type: "INFO", time: "2 hours ago" },
    { title: "Hostel Fee Due Reminder", message: "Hostel fee for the current semester is due by Aug 01, 2024.", type: "WARNING", time: "1 day ago" },
    { title: "Registration Approved", message: "Your elective choice for Machine Learning has been approved by HOD.", type: "SUCCESS", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
        <p className="text-sm text-muted-foreground">In-app alerts, broadcast messages, and academic updates</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-start gap-3 hover:border-primary/40 transition-colors">
            <div className={`p-2.5 rounded-xl shrink-0 ${n.type === "WARNING" ? "bg-amber-500/20 text-amber-400" : n.type === "SUCCESS" ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary"}`}>
              {n.type === "WARNING" ? <AlertTriangle className="h-5 w-5" /> : n.type === "SUCCESS" ? <CheckCircle2 className="h-5 w-5" /> : <Info className="h-5 w-5" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground">{n.title}</h3>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
