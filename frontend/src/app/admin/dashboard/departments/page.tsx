"use client";

import { useState } from "react";
import { Plus, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function DepartmentsAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const depts = [
    { code: "CSE", name: "Computer Science & Engineering", hod: "Dr. Rajesh Kumar", email: "rajesh@campus.edu" },
    { code: "MECH", name: "Mechanical Engineering", hod: "Dr. Suresh Reddy", email: "suresh@campus.edu" },
    { code: "ECE", name: "Electronics & Communication", hod: "Dr. Priya Sharma", email: "priya@campus.edu" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Department Governance</h1>
          <p className="text-sm text-muted-foreground">Manage college departments, HOD assignments, and codes</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Create Department
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Add New Department</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Department Code</Label><Input placeholder="AI" className="mt-1" /></div>
            <div><Label>Department Name</Label><Input placeholder="Artificial Intelligence & Data Science" className="mt-1" /></div>
            <div><Label>HOD Name</Label><Input placeholder="Dr. Vikram Singh" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Department
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {depts.map((d, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="gradient" className="font-mono">{d.code}</Badge>
              <div>
                <h3 className="font-bold text-sm text-foreground">{d.name}</h3>
                <div className="text-xs text-muted-foreground">HOD: {d.hod} ({d.email})</div>
              </div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
