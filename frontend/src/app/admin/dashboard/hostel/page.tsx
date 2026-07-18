"use client";

import { useState } from "react";
import { Plus, Trash2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HostelAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const hostels = [
    { name: "Boys Hostel - Block A", type: "Boys Hostel", warden: "Mr. Ramesh Babu", cap: 200 },
    { name: "Girls Hostel - Block B", type: "Girls Hostel", warden: "Mrs. Sunita Rani", cap: 150 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hostel Management</h1>
          <p className="text-sm text-muted-foreground">Manage hostel blocks, capacity, warden contacts, and rules</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Hostel Block
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Create Hostel Entry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Hostel Name</Label><Input placeholder="Boys Hostel Block C" className="mt-1" /></div>
            <div><Label>Warden Name</Label><Input placeholder="Mr. Suresh" className="mt-1" /></div>
            <div><Label>Capacity</Label><Input type="number" defaultValue={180} className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Hostel
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {hostels.map((h, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Home className="h-5 w-5" /></div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{h.name}</h3>
                <div className="text-xs text-muted-foreground">Warden: {h.warden} • Capacity: {h.cap} Seats</div>
              </div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
