import { Bus, Clock, MapPin, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TransportPage() {
  const routes = [
    {
      routeNumber: "Route 1",
      routeName: "City Center to Campus",
      busNumber: "AP-01-1234",
      driver: "Mr. Raju",
      phone: "+91 9876543010",
      departure: "07:30 AM",
      arrival: "08:30 AM",
      pickups: ["City Center", "Railway Station", "Bus Stand", "Medical College", "Campus Gate"],
    },
    {
      routeNumber: "Route 2",
      routeName: "Old City to Campus",
      busNumber: "AP-01-5678",
      driver: "Mr. Sunil",
      phone: "+91 9876543011",
      departure: "07:15 AM",
      arrival: "08:15 AM",
      pickups: ["Old City", "Charminar", "Nampally", "Ameerpet", "Campus Gate"],
    },
    {
      routeNumber: "Route 3",
      routeName: "ECIL to Campus",
      busNumber: "AP-01-9012",
      driver: "Mr. Venkat",
      phone: "+91 9876543012",
      departure: "07:00 AM",
      arrival: "08:00 AM",
      pickups: ["ECIL", "Uppal", "Habsiguda", "Tarnaka", "Campus Gate"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transport & Bus Routes</h1>
        <p className="text-sm text-muted-foreground">Bus numbers, timings, pickup locations, and driver contacts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((r, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl gradient-primary text-white">
                  <Bus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base">{r.routeNumber}</h2>
                  <span className="text-xs text-muted-foreground">{r.routeName}</span>
                </div>
              </div>
              <Badge variant="glass" className="font-mono text-primary">{r.busNumber}</Badge>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary" /> <span>Departure: <strong className="text-foreground">{r.departure}</strong> → Arrival: <strong className="text-foreground">{r.arrival}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-secondary" /> <span>Driver: <strong className="text-foreground">{r.driver}</strong> ({r.phone})</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Pickup Points:
              </div>
              <div className="flex flex-wrap gap-1">
                {r.pickups.map((p, pIdx) => (
                  <Badge key={pIdx} variant="glass" className="text-[10px]">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
