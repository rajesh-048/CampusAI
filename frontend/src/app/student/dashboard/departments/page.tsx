import { Building2, User, Mail, Phone, BookOpen } from "lucide-react";

export default function DepartmentsPage() {
  const departments = [
    { code: "CSE", name: "Computer Science & Engineering", hod: "Dr. Rajesh Kumar", email: "rajesh@campus.edu", labs: "8 Computer Labs", students: "480 Students" },
    { code: "MECH", name: "Mechanical Engineering", hod: "Dr. Suresh Reddy", email: "suresh@campus.edu", labs: "6 Heavy Machinery Labs", students: "360 Students" },
    { code: "ECE", name: "Electronics & Communication", hod: "Dr. Priya Sharma", email: "priya@campus.edu", labs: "5 VLSI & Embedded Labs", students: "300 Students" },
    { code: "CE", name: "Civil Engineering", hod: "Dr. Vikram Singh", email: "vikram@campus.edu", labs: "4 Surveying Labs", students: "240 Students" },
    { code: "EE", name: "Electrical Engineering", hod: "Dr. Lakshmi Devi", email: "lakshmi@campus.edu", labs: "4 Power Systems Labs", students: "240 Students" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Departments</h1>
        <p className="text-sm text-muted-foreground">Information on all engineering departments and HOD contacts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl gradient-primary text-white font-bold text-sm shrink-0">
                {dept.code}
              </div>
              <div>
                <h2 className="font-bold text-base text-foreground leading-snug">{dept.name}</h2>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-primary" /> <span>HOD: <strong className="text-foreground">{dept.hod}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-secondary" /> <a href={`mailto:${dept.email}`} className="hover:underline">{dept.email}</a>
              </div>
            </div>

            <div className="pt-2 flex justify-between text-[11px] text-muted-foreground font-medium">
              <span>{dept.labs}</span>
              <span>{dept.students}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
