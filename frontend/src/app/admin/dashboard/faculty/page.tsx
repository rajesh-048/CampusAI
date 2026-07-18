"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function FacultyAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const faculty = [
    { name: "Dr. Anand Prakash", designation: "Professor", email: "anand@campus.edu", dept: "CSE", office: "CSE-201" },
    { name: "Prof. Meena Gupta", designation: "Associate Professor", email: "meena@campus.edu", dept: "CSE", office: "CSE-202" },
    { name: "Dr. Karthik Rajan", designation: "Assistant Professor", email: "karthik@campus.edu", dept: "CSE", office: "CSE-305" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faculty Management</h1>
          <p className="text-sm text-muted-foreground">Add faculty members, designations, subjects taught, and office hours</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Faculty Member
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Register New Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Full Name</Label><Input placeholder="Dr. Suresh Reddy" className="mt-1" /></div>
            <div><Label>Email</Label><Input type="email" placeholder="suresh@campus.edu" className="mt-1" /></div>
            <div><Label>Designation</Label><Input placeholder="Professor & HOD" className="mt-1" /></div>
            <div><Label>Office Room</Label><Input placeholder="MECH-101" className="mt-1" /></div>
            <div><Label>Office Hours</Label><Input placeholder="Mon-Wed 01:00 PM - 03:00 PM" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Faculty Record
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {faculty.map((f, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm">
                {f.name.split(" ")[1]?.[0] || f.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{f.name}</h3>
                <div className="text-xs text-muted-foreground">{f.designation} • {f.email} • Office: {f.office}</div>
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
