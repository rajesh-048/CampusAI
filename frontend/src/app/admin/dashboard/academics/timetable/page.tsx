"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function TimetableAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const entries = [
    { day: "MONDAY", time: "09:00 - 10:00", subject: "Data Structures", faculty: "Dr. Anand Prakash", room: "CSE-101", sem: 5, dept: "CSE" },
    { day: "MONDAY", time: "10:00 - 11:00", subject: "Database Systems", faculty: "Prof. Meena Gupta", room: "CSE-102", sem: 5, dept: "CSE" },
    { day: "TUESDAY", time: "09:00 - 11:00", subject: "DS Laboratory", faculty: "Dr. Anand Prakash", room: "CSE-Lab-1", sem: 5, dept: "CSE" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Timetable Management</h1>
          <p className="text-sm text-muted-foreground">Create, edit, and delete class schedules across departments</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Class Schedule
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Create New Timetable Entry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <Label>Day of Week</Label>
              <select className="glass px-3 py-2 rounded-xl bg-background border border-white/10 w-full text-foreground mt-1">
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
              </select>
            </div>
            <div>
              <Label>Time Slot</Label>
              <Input placeholder="09:00 - 10:00" className="mt-1" />
            </div>
            <div>
              <Label>Subject Name</Label>
              <Input placeholder="Data Structures" className="mt-1" />
            </div>
            <div>
              <Label>Faculty Name</Label>
              <Input placeholder="Dr. Anand Prakash" className="mt-1" />
            </div>
            <div>
              <Label>Room / Lab</Label>
              <Input placeholder="CSE-101" className="mt-1" />
            </div>
            <div>
              <Label>Semester</Label>
              <Input type="number" defaultValue={5} className="mt-1" />
            </div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Schedule
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {entries.map((item, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="glass" className="text-accent font-mono">{item.day}</Badge>
              <div>
                <h3 className="font-bold text-sm text-foreground">{item.subject}</h3>
                <div className="text-xs text-muted-foreground">{item.time} • {item.faculty} • Room: {item.room}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 glass rounded-lg hover:text-primary"><Edit2 className="h-4 w-4" /></button>
              <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
