"use client";

import { useState } from "react";
import { Plus, Trash2, Pin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function NoticeAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const notices = [
    { title: "Important: Semester Registration Deadline", category: "ACADEMIC", priority: "URGENT", date: "Jul 10, 2024", isPinned: true },
    { title: "Placement Drive - TCS", category: "PLACEMENT", priority: "HIGH", date: "Jul 12, 2024", isPinned: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notice & Circular Governance</h1>
          <p className="text-sm text-muted-foreground">Publish official circulars, pin important notices, and auto-embed into AI search</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Post New Circular
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Compose Official Notice</h2>
          <div className="space-y-4 text-xs">
            <div><Label>Title</Label><Input placeholder="Library Hours Extended" className="mt-1" /></div>
            <div><Label>Content Body</Label><textarea rows={3} className="w-full glass p-3 rounded-xl border border-white/10 text-foreground mt-1" placeholder="Detailed announcement..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <select className="glass px-3 py-2 rounded-xl bg-background border border-white/10 w-full text-foreground mt-1">
                  <option value="ACADEMIC">Academic</option>
                  <option value="EXAMINATION">Examination</option>
                  <option value="PLACEMENT">Placement</option>
                  <option value="LIBRARY">Library</option>
                </select>
              </div>
              <div>
                <Label>Priority</Label>
                <select className="glass px-3 py-2 rounded-xl bg-background border border-white/10 w-full text-foreground mt-1">
                  <option value="URGENT">Urgent</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Publish & Index into AI
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {notices.map((n, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {n.isPinned && <Badge variant="gradient"><Pin className="h-3 w-3 mr-1 fill-white" /> Pinned</Badge>}
              <div>
                <h3 className="font-bold text-sm text-foreground">{n.title}</h3>
                <div className="text-xs text-muted-foreground">{n.category} • Priority: {n.priority} • Date: {n.date}</div>
              </div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
