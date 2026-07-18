"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState("MONDAY");

  const days = [
    { label: "Monday", value: "MONDAY" },
    { label: "Tuesday", value: "TUESDAY" },
    { label: "Wednesday", value: "WEDNESDAY" },
    { label: "Thursday", value: "THURSDAY" },
    { label: "Friday", value: "FRIDAY" },
  ];

  const timetableMap: Record<string, Array<{ time: string; subject: string; faculty: string; room: string; type: string }>> = {
    MONDAY: [
      { time: "09:00 - 10:00", subject: "Data Structures & Algorithms", faculty: "Dr. Anand Prakash", room: "CSE-101", type: "Lecture" },
      { time: "10:00 - 11:00", subject: "Database Management Systems", faculty: "Prof. Meena Gupta", room: "CSE-102", type: "Lecture" },
      { time: "11:00 - 12:00", subject: "Machine Learning Fundamentals", faculty: "Dr. Karthik Rajan", room: "CSE-201", type: "Lecture" },
      { time: "01:00 - 02:00", subject: "Software Engineering", faculty: "Prof. Meena Gupta", room: "CSE-103", type: "Lecture" },
    ],
    TUESDAY: [
      { time: "09:00 - 11:00", subject: "Data Structures Laboratory", faculty: "Dr. Anand Prakash", room: "CSE-Lab-1", type: "Lab" },
      { time: "11:00 - 12:00", subject: "Software Engineering", faculty: "Prof. Meena Gupta", room: "CSE-103", type: "Lecture" },
      { time: "01:00 - 03:00", subject: "Artificial Intelligence", faculty: "Dr. Karthik Rajan", room: "CSE-202", type: "Lecture" },
    ],
    WEDNESDAY: [
      { time: "09:00 - 10:00", subject: "Machine Learning Fundamentals", faculty: "Dr. Karthik Rajan", room: "CSE-201", type: "Lecture" },
      { time: "10:00 - 12:00", subject: "DBMS Laboratory", faculty: "Prof. Meena Gupta", room: "CSE-Lab-2", type: "Lab" },
      { time: "01:00 - 02:00", subject: "Formal Languages & Automata", faculty: "Dr. Rajesh Kumar", room: "CSE-101", type: "Lecture" },
    ],
    THURSDAY: [
      { time: "09:00 - 10:00", subject: "Data Structures & Algorithms", faculty: "Dr. Anand Prakash", room: "CSE-101", type: "Lecture" },
      { time: "10:00 - 11:00", subject: "Artificial Intelligence", faculty: "Dr. Karthik Rajan", room: "CSE-202", type: "Lecture" },
      { time: "11:00 - 12:00", subject: "Database Management Systems", faculty: "Prof. Meena Gupta", room: "CSE-102", type: "Lecture" },
    ],
    FRIDAY: [
      { time: "09:00 - 11:00", subject: "Machine Learning Laboratory", faculty: "Dr. Karthik Rajan", room: "CSE-Lab-3", type: "Lab" },
      { time: "11:00 - 12:00", subject: "Formal Languages & Automata", faculty: "Dr. Rajesh Kumar", room: "CSE-101", type: "Lecture" },
    ],
  };

  const schedule = timetableMap[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Weekly Timetable</h1>
          <p className="text-sm text-muted-foreground">CSE Semester 5 • Section A (Academic Year 2024-25)</p>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => (
          <button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedDay === day.value
                ? "gradient-primary text-white shadow-lg"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="glass-card p-5 rounded-2xl border border-white/10 hover:border-primary/40 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                <Clock className="h-3.5 w-3.5" /> {item.time}
              </div>
              <Badge variant={item.type === "Lab" ? "secondary" : "default"}>{item.type}</Badge>
            </div>

            <div>
              <h3 className="font-bold text-base text-foreground">{item.subject}</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <User className="h-3.5 w-3.5 text-secondary" /> {item.faculty}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Room: <strong className="text-foreground">{item.room}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
