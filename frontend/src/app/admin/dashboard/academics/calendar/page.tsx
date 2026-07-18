"use client";

import { useState } from "react";
import { Plus, Trash2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function CalendarAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const events = [
    { title: "Semester 5 Begins", date: "2024-07-15", type: "Semester Start", isImportant: true },
    { title: "Independence Day Holiday", date: "2024-08-15", type: "Holiday", isImportant: false },
    { title: "Internal Exam 1", date: "2024-08-25", type: "Exam", isImportant: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academic Calendar Management</h1>
          <p className="text-sm text-muted-foreground">Manage holidays, exam windows, and key academic dates</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Milestone
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Create Calendar Event</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Event Title</Label><Input placeholder="Dussehra Vacation" className="mt-1" /></div>
            <div><Label>Event Type</Label><Input placeholder="Holiday / Exam / Start" className="mt-1" /></div>
            <div><Label>Start Date</Label><Input type="date" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Milestone
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {events.map((ev, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="glass">{ev.type}</Badge>
              <div>
                <h3 className="font-bold text-sm text-foreground">{ev.title}</h3>
                <div className="text-xs text-muted-foreground">{ev.date}</div>
              </div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
