"use client";

import { motion } from "framer-motion";
import { Users, FileText, Search, Target } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Students Served", change: "+45% this semester" },
  { icon: FileText, value: "50,000+", label: "Documents Indexed", change: "PDF, DOCX, OCR images" },
  { icon: Search, value: "1M+", label: "AI Searches", change: "Sub-second response time" },
  { icon: Target, value: "99.9%", label: "Accuracy Rate", change: "Zero hallucination RAG" },
];

export default function StatsSection() {
  return (
    <section className="py-20 relative bg-background border-y border-white/5">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center relative group overflow-hidden"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 mb-3 group-hover:rotate-6 transition-transform">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-black gradient-text tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
