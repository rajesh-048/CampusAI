"use client";

import { motion } from "framer-motion";
import { Monitor, Search, Settings, Calendar, Bell, FileText, Bot } from "lucide-react";

export default function ScreenshotsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Beautiful. Intuitive. <span className="gradient-text">Powerful.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Designed from the ground up for clarity, speed, and elegance across every device.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Preview Card 1: Student Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-primary/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">Student Dashboard</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] rounded bg-primary/20 text-primary font-mono">/student</span>
            </div>
            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5 font-sans">
              <div className="h-9 glass rounded-lg flex items-center px-3 gap-2 text-xs text-muted-foreground">
                <Search className="h-3.5 w-3.5 text-primary" />
                <span>Ask AI: &quot;When is my exam?&quot;</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 glass rounded-lg border border-white/5 text-left">
                  <Calendar className="h-4 w-4 text-secondary mb-1" />
                  <div className="text-[11px] font-bold">Today Schedule</div>
                  <div className="text-[10px] text-muted-foreground">3 Lectures • 1 Lab</div>
                </div>
                <div className="p-3 glass rounded-lg border border-white/5 text-left">
                  <Bell className="h-4 w-4 text-accent mb-1" />
                  <div className="text-[11px] font-bold">New Notices</div>
                  <div className="text-[10px] text-muted-foreground">2 Pinned Circulars</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Card 2: AI Search & RAG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-secondary/40 transition-all duration-300 scale-105 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-secondary" />
                <span className="text-xs font-semibold">Semantic RAG Search</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] rounded bg-secondary/20 text-secondary font-mono">Live RAG</span>
            </div>
            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5 font-sans">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                &quot;Where is CAD Lab in Mechanical Block?&quot;
              </div>
              <div className="p-3 rounded-lg glass border border-white/10 text-xs text-foreground leading-snug">
                CAD Lab is located on the 2nd Floor of the MECH Block. Room M-204.
                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-primary flex items-center justify-between">
                  <span>📄 Source: Campus_Map_2024.pdf</span>
                  <span className="text-muted-foreground">98% Match</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Card 3: Admin Portal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-accent/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold">Admin Knowledge Base</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] rounded bg-accent/20 text-accent font-mono">/admin</span>
            </div>
            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5 font-sans">
              <div className="p-3 glass rounded-lg border border-dashed border-accent/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <span>Upload PDF / DOCX</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-accent text-white text-[10px] font-bold">Auto-Embed</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between p-2 glass rounded">
                  <span>Syllabus_R23_CSE.pdf</span>
                  <span className="text-emerald-400 font-mono">Processed</span>
                </div>
                <div className="flex items-center justify-between p-2 glass rounded">
                  <span>Circular_2024_08.docx</span>
                  <span className="text-emerald-400 font-mono">Processed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
