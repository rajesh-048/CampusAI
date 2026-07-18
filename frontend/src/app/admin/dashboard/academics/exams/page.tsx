"use client";

import { useState } from "react";
import { Plus, Trash2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function ExamsAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const exams = [
    { title: "Internal Exam 1 - Data Structures", subject: "Data Structures", date: "2024-08-25", time: "09:00 AM - 11:00 AM", room: "Exam Hall 1", sem: 5 },
    { title: "Internal Exam 1 - Database Systems", subject: "Database Systems", date: "2024-08-26", time: "09:00 AM - 11:00 AM", room: "Exam Hall 1", sem: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exam Schedule Management</h1>
          <p className="text-sm text-muted-foreground">Publish internal, external, and supplementary exam dates</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Publish New Exam
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Create Exam Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Exam Title</Label><Input placeholder="Internal Exam 1 - AI" className="mt-1" /></div>
            <div><Label>Subject</Label><Input placeholder="Artificial Intelligence" className="mt-1" /></div>
            <div><Label>Exam Date</Label><Input type="date" className="mt-1" /></div>
            <div><Label>Time Slot</Label><Input placeholder="09:00 AM - 11:00 AM" className="mt-1" /></div>
            <div><Label>Venue / Room</Label><Input placeholder="Exam Hall 2" className="mt-1" /></div>
            <div><Label>Semester</Label><Input type="number" defaultValue={5} className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Exam Schedule
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {exams.map((ex, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-foreground">{ex.title}</h3>
              <div className="text-xs text-muted-foreground">{ex.date} • {ex.time} • Room: {ex.room}</div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
