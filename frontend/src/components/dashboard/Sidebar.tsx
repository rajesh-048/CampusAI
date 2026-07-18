"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Bell,
  Users,
  Building2,
  Home,
  Bus,
  CalendarDays,
  Download,
  MapPin,
  BellRing,
  User,
  Settings,
  Sparkles,
  LogOut,
  ChevronRight,
  Shield,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  role: "STUDENT" | "ADMIN";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const studentNavItems = [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "Timetable", href: "/student/dashboard/timetable", icon: Calendar },
    { label: "Exam Schedule", href: "/student/dashboard/exams", icon: ClipboardList },
    { label: "Academic Calendar", href: "/student/dashboard/calendar", icon: CalendarDays },
    { label: "Notices & Circulars", href: "/student/dashboard/notices", icon: Bell },
    { label: "Faculty Directory", href: "/student/dashboard/faculty", icon: Users },
    { label: "Departments", href: "/student/dashboard/departments", icon: Building2 },
    { label: "Hostels", href: "/student/dashboard/hostel", icon: Home },
    { label: "Transport / Buses", href: "/student/dashboard/transport", icon: Bus },
    { label: "Events & Fest", href: "/student/dashboard/events", icon: Sparkles },
    { label: "Study Materials / PYQs", href: "/student/dashboard/downloads", icon: Download },
    { label: "Campus Locations", href: "/student/dashboard/campus-map", icon: MapPin },
    { label: "Notifications", href: "/student/dashboard/notifications", icon: BellRing },
    { label: "Profile", href: "/student/dashboard/profile", icon: User },
    { label: "Settings", href: "/student/dashboard/settings", icon: Settings },
  ];

  const adminNavItems = [
    { label: "Dashboard Analytics", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Timetable Management", href: "/admin/dashboard/academics/timetable", icon: Calendar },
    { label: "Exam Schedules", href: "/admin/dashboard/academics/exams", icon: ClipboardList },
    { label: "Academic Calendar", href: "/admin/dashboard/academics/calendar", icon: CalendarDays },
    { label: "Notices & Circulars", href: "/admin/dashboard/notices", icon: Bell },
    { label: "Faculty Management", href: "/admin/dashboard/faculty", icon: Users },
    { label: "Student Accounts", href: "/admin/dashboard/students", icon: GraduationCap },
    { label: "Department Management", href: "/admin/dashboard/departments", icon: Building2 },
    { label: "AI Knowledge Base", href: "/admin/dashboard/knowledge-base", icon: Sparkles },
    { label: "Hostel Management", href: "/admin/dashboard/hostel", icon: Home },
    { label: "Transport Routes", href: "/admin/dashboard/transport", icon: Bus },
    { label: "Event Management", href: "/admin/dashboard/events", icon: CalendarDays },
    { label: "Campus Infrastructure", href: "/admin/dashboard/campus", icon: MapPin },
    { label: "Broadcast Notifications", href: "/admin/dashboard/notifications", icon: BellRing },
    { label: "Website Content", href: "/admin/dashboard/website", icon: Settings },
  ];

  const navItems = role === "ADMIN" ? adminNavItems : studentNavItems;

  return (
    <aside className="w-64 bg-card/60 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen sticky top-0 z-30 overflow-hidden text-foreground">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl text-white shadow-lg ${role === "ADMIN" ? "gradient-accent" : "gradient-primary"}`}>
            {role === "ADMIN" ? <Shield className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-lg gradient-text">CampusAI</span>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold font-mono">
              {role === "ADMIN" ? "Admin Portal" : "Student Portal"}
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                isActive
                  ? role === "ADMIN"
                    ? "gradient-accent text-white shadow-md font-semibold"
                    : "gradient-primary text-white shadow-md font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-80" />}
            </Link>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold truncate text-foreground">{user?.name || "User"}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user?.email || ""}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors shrink-0"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
