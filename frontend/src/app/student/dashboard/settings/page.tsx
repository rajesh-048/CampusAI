"use client";

import { useState } from "react";
import { Settings, Moon, Sun, Globe, Bell, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [voiceSearch, setVoiceSearch] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-sm text-muted-foreground">Manage theme preferences, AI search defaults, and notification triggers</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
        {/* Preference 1 */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-semibold text-sm">Email Notifications</h3>
            <p className="text-xs text-muted-foreground">Receive instant alerts when urgent notices or exam schedules are posted</p>
          </div>
          <Checkbox checked={emailAlerts} onCheckedChange={(c) => setEmailAlerts(!!c)} />
        </div>

        {/* Preference 2 */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-semibold text-sm">Voice Search & Speech Synthesis</h3>
            <p className="text-xs text-muted-foreground">Enable microphone input and spoken responses in Floating AI Chatbot</p>
          </div>
          <Checkbox checked={voiceSearch} onCheckedChange={(c) => setVoiceSearch(!!c)} />
        </div>

        {/* Preference 3 */}
        <div className="space-y-2 pt-2">
          <h3 className="font-semibold text-sm">Default AI Language</h3>
          <p className="text-xs text-muted-foreground mb-2">Preferred language for grounded RAG synthesis</p>
          <select className="glass px-3 py-2 rounded-xl text-xs bg-background border border-white/10 w-full max-w-xs text-foreground">
            <option value="EN">English (Default)</option>
            <option value="TE">Telugu (తెలుగు)</option>
            <option value="HI">Hindi (हिन्दी)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
