"use client";

import { User, Mail, Phone, GraduationCap, Building2, Calendar, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
        <p className="text-sm text-muted-foreground">Your academic identity and institutional details</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-black shadow-xl">
            {user?.name ? user.name[0].toUpperCase() : "S"}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name || "Rahul Kumar"}</h2>
            <div className="text-xs text-primary font-semibold">{user?.rollNumber || "CS2023001"}</div>
            <Badge variant="glass" className="mt-1">Student</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl glass space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-primary" /> Email</span>
            <div className="font-semibold text-foreground text-sm">{user?.email || "student@campusai.com"}</div>
          </div>

          <div className="p-4 rounded-xl glass space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-secondary" /> Phone</span>
            <div className="font-semibold text-foreground text-sm">{user?.phone || "+91 9876543210"}</div>
          </div>

          <div className="p-4 rounded-xl glass space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-accent" /> Department</span>
            <div className="font-semibold text-foreground text-sm">{user?.department || "Computer Science & Engineering"}</div>
          </div>

          <div className="p-4 rounded-xl glass space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-emerald-400" /> Current Semester</span>
            <div className="font-semibold text-foreground text-sm">Semester {user?.semester || 5} (Sec A)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
