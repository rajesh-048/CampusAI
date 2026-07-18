"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, Globe2, Mic, Smartphone, FileCheck, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Instant Information Retrieval",
    description: "Save hours searching through cluttered WhatsApp groups, emails, and physical notice boards.",
  },
  {
    icon: ShieldCheck,
    title: "Official Source Guarantee",
    description: "Zero hallucinations. Answers are strictly extracted from uploaded college circulars and syllabi.",
  },
  {
    icon: Globe2,
    title: "Multilingual Accessibility",
    description: "Seamlessly search and chat in English, Telugu, or Hindi based on student preference.",
  },
  {
    icon: Mic,
    title: "Voice Search & Dictation",
    description: "Just speak your question. Perfect for fast lookups on mobile devices while on the move.",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive UI",
    description: "Mobile-first, progressive design that feels like a native mobile app on any screen.",
  },
  {
    icon: FileCheck,
    title: "Direct Source Citations",
    description: "Every answer includes original document links, upload dates, and direct PDF downloads.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 bg-background/50 relative">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Why CampusAI?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Built for Modern <span className="gradient-text">Campus Life</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Empowering students with instant clarity and providing administrators complete control over institution knowledge.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl relative group hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>Verified feature</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
