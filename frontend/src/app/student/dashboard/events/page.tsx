import { Sparkles, Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const events = [
    {
      title: "TechFest 2024 — National Level Hackathon",
      description: "Annual technical extravaganza featuring 24-hour hackathon, robotics races, paper presentations, and tech talks.",
      category: "Technical Fest",
      venue: "Main Campus Auditorium",
      date: "Sep 20 - Sep 22, 2024",
      maxParticipants: 500,
      isOpen: true,
    },
    {
      title: "Cultural Night & Talent Hunt",
      description: "Showcase your singing, dancing, and theatrical talents at the biggest cultural night of the year.",
      category: "Cultural Fest",
      venue: "Open Air Theatre (OAT)",
      date: "Oct 05, 2024",
      maxParticipants: 1000,
      isOpen: true,
    },
    {
      title: "Hands-on AI & Machine Learning Workshop",
      description: "Master Python, PyTorch, and Transformer models in a 2-day practical workshop led by industry experts.",
      category: "Workshop",
      venue: "CSE Seminar Hall",
      date: "Aug 10, 2024",
      maxParticipants: 100,
      isOpen: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campus Events & Fests</h1>
        <p className="text-sm text-muted-foreground">Technical hackathons, workshops, cultural nights, and registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="gradient">{e.category}</Badge>
                <Badge variant={e.isOpen ? "secondary" : "outline"}>{e.isOpen ? "Registration Open" : "Closed"}</Badge>
              </div>

              <h2 className="font-bold text-base text-foreground leading-snug">{e.title}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">{e.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-primary" /> <span className="font-medium text-foreground">{e.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-secondary" /> <span>{e.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-accent" /> <span>Max Seats: {e.maxParticipants}</span>
              </div>

              <Button disabled={!e.isOpen} className="w-full gradient-primary text-white h-9 text-xs font-semibold mt-2">
                <Ticket className="h-3.5 w-3.5 mr-1.5" /> {e.isOpen ? "Register Now" : "Registrations Closed"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
