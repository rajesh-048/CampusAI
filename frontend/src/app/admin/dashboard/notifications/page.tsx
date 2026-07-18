"use client";

import { useState } from "react";
import { Send, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NotificationsAdminPage() {
  const [target, setTarget] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setTitle("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Broadcast Notification Center</h1>
        <p className="text-sm text-muted-foreground">Send real-time in-app alerts to all students, specific departments, or semester batches</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <form onSubmit={handleSend} className="space-y-4 text-xs">
          <div>
            <Label>Target Audience</Label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="glass px-3 py-2 rounded-xl bg-background border border-white/10 w-full text-foreground mt-1"
            >
              <option value="all">All Registered Students</option>
              <option value="CSE">Computer Science Department (CSE)</option>
              <option value="MECH">Mechanical Department (MECH)</option>
              <option value="sem5">Semester 5 Batch</option>
            </select>
          </div>

          <div>
            <Label>Notification Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Urgent: Semester Registration Extended" required />
          </div>

          <div>
            <Label>Message Body</Label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Full notification text..."
              className="w-full glass p-3 rounded-xl border border-white/10 text-foreground"
              required
            />
          </div>

          <Button type="submit" className="w-full gradient-accent text-white h-11 text-xs font-semibold">
            {sent ? (
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Notification Broadcast Sent!</span>
            ) : (
              <span className="flex items-center gap-2"><Send className="h-4 w-4" /> Broadcast Notification</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
