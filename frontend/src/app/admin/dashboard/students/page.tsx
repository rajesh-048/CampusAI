"use client";

import { useState } from "react";
import { Plus, Upload, Trash2, GraduationCap, CheckCircle2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function StudentAdminPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const students = [
    { name: "Rahul Kumar", roll: "CS2023001", email: "student@campusai.com", dept: "CSE", sem: 5, status: "Active" },
    { name: "Priya Sharma", roll: "CS2023002", email: "priya.s@campus.edu", dept: "CSE", sem: 5, status: "Active" },
    { name: "Amit Verma", roll: "ME2023005", email: "amit.v@campus.edu", dept: "MECH", sem: 5, status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Account Management</h1>
          <p className="text-sm text-muted-foreground">Manage student credentials, batch import via CSV, activate/deactivate accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
            <Plus className="h-4 w-4 mr-1.5" /> Add Student
          </Button>
        </div>
      </div>

      {/* CSV Import Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
        <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" /> Batch Import Students via CSV
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} className="glass text-xs" />
          <Button disabled={!csvFile} className="gradient-primary text-white h-10 text-xs font-semibold shrink-0">
            Import CSV Roster
          </Button>
        </div>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Create Student Account</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Full Name</Label><Input placeholder="Neha Gupta" className="mt-1" /></div>
            <div><Label>Roll Number</Label><Input placeholder="CS2023010" className="mt-1" /></div>
            <div><Label>Email</Label><Input type="email" placeholder="neha@campus.edu" className="mt-1" /></div>
            <div><Label>Department</Label><Input placeholder="CSE" className="mt-1" /></div>
            <div><Label>Semester</Label><Input type="number" defaultValue={5} className="mt-1" /></div>
            <div><Label>Temporary Password</Label><Input defaultValue="student123" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Register Student
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {students.map((s, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm">
                {s.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{s.name} ({s.roll})</h3>
                <div className="text-xs text-muted-foreground">{s.email} • {s.dept} Sem {s.sem}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="glass" className="text-emerald-400 border-emerald-500/30">{s.status}</Badge>
              <button className="p-2 glass rounded-lg hover:text-amber-400" title="Reset Password"><Key className="h-4 w-4" /></button>
              <button className="p-2 glass rounded-lg hover:text-red-400" title="Deactivate"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
