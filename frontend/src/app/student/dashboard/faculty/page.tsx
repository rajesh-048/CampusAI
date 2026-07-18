import { Users, Mail, Phone, MapPin, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FacultyPage() {
  const facultyList = [
    {
      name: "Dr. Anand Prakash",
      designation: "Professor & Head of Research",
      department: "Computer Science & Engineering",
      email: "anand@campus.edu",
      phone: "+91 9876543001",
      office: "CSE-201",
      hours: "Mon - Fri: 10:00 AM - 12:00 PM",
      subjects: ["Data Structures", "Design & Analysis of Algorithms"],
    },
    {
      name: "Prof. Meena Gupta",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      email: "meena@campus.edu",
      phone: "+91 9876543002",
      office: "CSE-202",
      hours: "Mon - Fri: 02:00 PM - 04:00 PM",
      subjects: ["Database Systems", "Software Engineering"],
    },
    {
      name: "Dr. Karthik Rajan",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      email: "karthik@campus.edu",
      phone: "+91 9876543003",
      office: "CSE-305",
      hours: "Tue - Thu: 11:00 AM - 01:00 PM",
      subjects: ["Machine Learning", "Artificial Intelligence"],
    },
    {
      name: "Dr. Suresh Reddy",
      designation: "Professor & HOD",
      department: "Mechanical Engineering",
      email: "suresh@campus.edu",
      phone: "+91 9876543004",
      office: "MECH-101",
      hours: "Mon - Wed: 01:00 PM - 03:00 PM",
      subjects: ["Thermodynamics", "Fluid Mechanics"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Faculty Directory</h1>
        <p className="text-sm text-muted-foreground">Contact information, office locations, and office hours for campus faculty</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facultyList.map((f, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg">
                {f.name.split(" ")[1]?.[0] || f.name[0]}
              </div>
              <div>
                <h2 className="font-bold text-base text-foreground">{f.name}</h2>
                <div className="text-xs text-primary font-medium">{f.designation}</div>
                <div className="text-[11px] text-muted-foreground">{f.department}</div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" /> <a href={`mailto:${f.email}`} className="text-foreground hover:underline">{f.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-secondary" /> <span>{f.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent" /> <span>Office: <strong className="text-foreground">{f.office}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-400" /> <span>Office Hours: <strong className="text-foreground">{f.hours}</strong></span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {f.subjects.map((sub) => (
                <Badge key={sub} variant="glass" className="text-[10px]">{sub}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
