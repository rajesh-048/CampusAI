"use client";

import { useState } from "react";
import { Plus, Trash2, Ticket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EventsAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const events = [
    { title: "TechFest 2024", category: "Technical Fest", date: "Sep 20 - Sep 22, 2024", venue: "Main Auditorium", max: 500 },
    { title: "Cultural Night", category: "Cultural Fest", date: "Oct 05, 2024", venue: "OAT", max: 1000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Event & Fest Governance</h1>
          <p className="text-sm text-muted-foreground">Post campus events, track registrations, and issue certificates</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Create Event
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Publish New Event</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Event Title</Label><Input placeholder="AI Hackathon 2024" className="mt-1" /></div>
            <div><Label>Category</Label><Input placeholder="Technical Fest" className="mt-1" /></div>
            <div><Label>Venue</Label><Input placeholder="CSE Seminar Hall" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Publish Event
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {events.map((e, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-foreground">{e.title}</h3>
              <div className="text-xs text-muted-foreground">{e.category} • {e.date} • Venue: {e.venue}</div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
