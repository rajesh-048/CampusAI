import Link from "next/link";
import {
  Users,
  FileText,
  Search,
  Download,
  Brain,
  Bell,
  Plus,
  TrendingUp,
  Activity,
  Sparkles,
  Shield,
  ArrowRight,
  Database,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Students", value: "1,248", change: "+12% this term", icon: Users, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { title: "Documents Indexed", value: "482", change: "ChromaDB Active", icon: FileText, color: "text-secondary", bg: "bg-secondary/10 border-secondary/20" },
    { title: "AI Searches Today", value: "3,890", change: "99.9% Accuracy", icon: Search, color: "text-accent", bg: "bg-accent/10 border-accent/20" },
    { title: "Active Users", value: "894", change: "Live Sessions", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  ];

  const recentUploads = [
    { title: "Syllabus_R23_CSE_Sem5.pdf", category: "Syllabus", size: "3.2 MB", status: "Indexed in ChromaDB", time: "10 mins ago" },
    { title: "Internal_Exam1_Timetable.pdf", category: "Exam", size: "1.1 MB", status: "Indexed in ChromaDB", time: "1 hour ago" },
    { title: "Placement_Notice_TCS.docx", category: "Notice", size: "840 KB", status: "Indexed in ChromaDB", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Admin Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-accent/30 relative overflow-hidden bg-gradient-to-r from-accent/10 via-primary/10 to-transparent">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30">
              <Shield className="h-3.5 w-3.5" /> Super Admin Control Console
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Campus Governance & <span className="gradient-text">AI Knowledge Base</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Upload documents to automatically extract, chunk, and embed into ChromaDB vector store for instant student semantic search.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/dashboard/knowledge-base"
              className="px-5 py-3 rounded-xl gradient-accent text-white font-bold text-xs shadow-xl flex items-center gap-2 hover:opacity-95 transition-opacity"
            >
              <Sparkles className="h-4 w-4" /> AI Knowledge Upload
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">{stat.title}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{stat.change}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action CRUD Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent AI Indexing Stream (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-accent" />
              <h2 className="font-bold text-base">Recent AI Embeddings Ingestion</h2>
            </div>
            <Link href="/admin/dashboard/knowledge-base" className="text-xs text-accent hover:underline font-semibold">
              Manage Base →
            </Link>
          </div>

          <div className="space-y-3">
            {recentUploads.map((file, i) => (
              <div key={i} className="p-3.5 rounded-xl glass border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{file.title}</div>
                    <div className="text-[10px] text-muted-foreground">{file.size} • {file.time}</div>
                  </div>
                </div>
                <Badge variant="glass" className="text-emerald-400 border-emerald-500/30">
                  {file.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Management Quick Navigation (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="font-bold text-base text-foreground">Management Modules</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link href="/admin/dashboard/academics/timetable" className="p-3 rounded-xl glass border border-white/5 hover:border-primary/40 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Timetables
            </Link>
            <Link href="/admin/dashboard/notices" className="p-3 rounded-xl glass border border-white/5 hover:border-secondary/40 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4 text-secondary" /> Notices
            </Link>
            <Link href="/admin/dashboard/faculty" className="p-3 rounded-xl glass border border-white/5 hover:border-accent/40 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4 text-accent" /> Faculty
            </Link>
            <Link href="/admin/dashboard/students" className="p-3 rounded-xl glass border border-white/5 hover:border-emerald-400/40 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-400" /> Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
