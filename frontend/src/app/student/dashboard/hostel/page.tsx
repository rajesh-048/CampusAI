import { Home, User, Phone, Mail, CheckCircle2, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HostelPage() {
  const hostels = [
    {
      name: "Boys Hostel - Block A",
      type: "Boys Hostel",
      warden: "Mr. Ramesh Babu",
      phone: "+91 9876543001",
      email: "ramesh@campus.edu",
      capacity: 200,
      facilities: ["High-speed Wi-Fi", "Central Mess", "Gym", "Study Room", "Laundry Service"],
      rules: "Entry closes at 10:00 PM. No outside visitors after 08:00 PM.",
    },
    {
      name: "Girls Hostel - Block B",
      type: "Girls Hostel",
      warden: "Mrs. Sunita Rani",
      phone: "+91 9876543002",
      email: "sunita@campus.edu",
      capacity: 150,
      facilities: ["High-speed Wi-Fi", "Central Mess", "Indoor Games", "Study Room", "24/7 Security"],
      rules: "Entry closes at 09:00 PM. Visitors allowed only in reception area.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hostel Information</h1>
        <p className="text-sm text-muted-foreground">Warden contacts, hostel facilities, rules, and guidelines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hostels.map((h, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:border-secondary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl gradient-primary text-white">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base">{h.name}</h2>
                  <span className="text-xs text-muted-foreground">Capacity: {h.capacity} Residents</span>
                </div>
              </div>
              <Badge variant="glass">{h.type}</Badge>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-primary" /> <span>Warden: <strong className="text-foreground">{h.warden}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-secondary" /> <span>{h.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" /> <span>{h.email}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="text-xs font-semibold text-foreground">Facilities:</div>
              <div className="flex flex-wrap gap-1.5">
                {h.facilities.map((f) => (
                  <Badge key={f} variant="glass" className="text-[10px] text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> {f}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl glass bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{h.rules}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
