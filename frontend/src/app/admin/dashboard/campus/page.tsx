"use client";

import { useState } from "react";
import { Plus, Trash2, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CampusAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const locations = [
    { name: "Main Administrative Building", type: "BUILDING", floor: "Ground - 3rd Floor" },
    { name: "CSE Department Block", type: "BUILDING", floor: "Ground - 4th Floor" },
    { name: "CAD & Simulation Lab", type: "LAB", floor: "2nd Floor, MECH Block" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campus Infrastructure & Map</h1>
          <p className="text-sm text-muted-foreground">Manage buildings, labs, classrooms, canteen, and sports facilities</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Location
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Create Campus Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Location Name</Label><Input placeholder="Robotics Lab" className="mt-1" /></div>
            <div><Label>Type</Label><Input placeholder="LAB / BUILDING / CANTEEN" className="mt-1" /></div>
            <div><Label>Floor / Wing</Label><Input placeholder="3rd Floor, ECE Block" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Location
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {locations.map((loc, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Building className="h-5 w-5" /></div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{loc.name}</h3>
                <div className="text-xs text-muted-foreground">{loc.type} • {loc.floor}</div>
              </div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
