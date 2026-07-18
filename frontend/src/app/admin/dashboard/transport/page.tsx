"use client";

import { useState } from "react";
import { Plus, Trash2, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransportAdminPage() {
  const [showAdd, setShowAdd] = useState(false);

  const routes = [
    { num: "Route 1", name: "City Center to Campus", bus: "AP-01-1234", driver: "Mr. Raju" },
    { num: "Route 2", name: "Old City to Campus", bus: "AP-01-5678", driver: "Mr. Sunil" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transport & Bus Route Management</h1>
          <p className="text-sm text-muted-foreground">Manage bus routes, timings, pickup points, and driver assignments</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-accent text-white h-10 text-xs font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Bus Route
        </Button>
      </div>

      {showAdd && (
        <div className="glass-card p-6 rounded-2xl border border-accent/40 space-y-4">
          <h2 className="font-bold text-sm text-accent">Add Bus Route</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><Label>Route Name</Label><Input placeholder="Kukatpally to Campus" className="mt-1" /></div>
            <div><Label>Bus Number</Label><Input placeholder="AP-01-9999" className="mt-1" /></div>
            <div><Label>Driver Name</Label><Input placeholder="Mr. Ramesh" className="mt-1" /></div>
          </div>
          <Button onClick={() => setShowAdd(false)} className="gradient-primary text-white h-9 text-xs font-semibold">
            Save Bus Route
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {routes.map((r, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary"><Bus className="h-5 w-5" /></div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{r.num}: {r.name}</h3>
                <div className="text-xs text-muted-foreground">Bus: {r.bus} • Driver: {r.driver}</div>
              </div>
            </div>
            <button className="p-2 glass rounded-lg hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
