import { MapPin, Building, BookOpen, Utensils, Trophy, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CampusMapPage() {
  const locations = [
    { name: "Main Administrative Building", type: "BUILDING", floor: "Ground - 3rd Floor", description: "Principal Office, Exam Cell, Registrar Office, Accounts", icon: Building },
    { name: "CSE Department Block", type: "BUILDING", floor: "Ground - 4th Floor", description: "Classrooms 101-105, Labs 1-8, Faculty Cabins", icon: Building },
    { name: "CAD & Simulation Lab", type: "LAB", floor: "2nd Floor, MECH Block", description: "Computer Aided Design & Ansys simulation laboratory", icon: MapPin },
    { name: "Central Library & Digital Hub", type: "LIBRARY", floor: "Standalone 2-Story Building", description: "30,000+ volumes, digital journal access, quiet reading halls", icon: BookOpen },
    { name: "Central Canteen", type: "CANTEEN", floor: "Ground Floor", description: "Breakfast, South/North Indian lunch, beverages, snacks", icon: Utensils },
    { name: "Sports Complex & Ground", type: "SPORTS", floor: "Outdoor / Pavilion", description: "Cricket oval, basketball courts, badminton hall, gym", icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campus Locations & Map</h1>
        <p className="text-sm text-muted-foreground">Find buildings, laboratories, library, canteen, and sports facilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((loc, i) => {
          const Icon = loc.icon;
          return (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl gradient-accent text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant="glass">{loc.type}</Badge>
              </div>

              <div>
                <h2 className="font-bold text-base text-foreground">{loc.name}</h2>
                <div className="text-xs text-accent font-medium mt-0.5">{loc.floor}</div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-white/5">
                {loc.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
