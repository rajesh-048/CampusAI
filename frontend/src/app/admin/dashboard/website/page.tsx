"use client";

import { useState } from "react";
import { Edit3, CheckCircle2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WebsiteAdminPage() {
  const [heroTitle, setHeroTitle] = useState("Your Campus. Your AI. Your Knowledge.");
  const [heroSub, setHeroSub] = useState("Find any campus information instantly with AI-powered search. Timetables, exams, notices, faculty, and more — all in one intelligent platform.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Website Content Management System (CMS)</h1>
        <p className="text-sm text-muted-foreground">Dynamically edit landing page hero section, feature titles, announcements, and footer details</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <Label>Hero Section Main Title</Label>
            <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="mt-1" />
          </div>

          <div>
            <Label>Hero Subtitle</Label>
            <textarea
              rows={3}
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
              className="w-full glass p-3 rounded-xl border border-white/10 text-foreground mt-1"
            />
          </div>

          <Button type="submit" className="w-full gradient-primary text-white h-11 text-xs font-semibold">
            {saved ? (
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Content Updated Live!</span>
            ) : (
              <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Save Website Content</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
