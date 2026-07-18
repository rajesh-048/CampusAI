"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Languages, FileSearch, Mic, Sparkles, CheckCircle2, Bot, Send } from "lucide-react";

const sampleQueries = [
  "When is my Mechanical Internal Exam?",
  "Show today's CSE 5th sem timetable",
  "Download R23 Computer Networks syllabus",
  "Where is CAD Lab in Mechanical Block?",
  "Latest placement drive notice for TCS",
];

const sampleResponses = [
  {
    query: "When is my Mechanical Internal Exam?",
    answer: "Your Internal Exam 1 for Thermal Engineering is scheduled for August 26, 2024 from 09:00 AM to 11:00 AM in Exam Hall 2.",
    source: "Official Exam Schedule 2024-25.pdf",
    date: "Aug 10, 2024",
  },
  {
    query: "Show today's CSE 5th sem timetable",
    answer: "Today (Monday), you have: 09:00-10:00 Data Structures (CSE-101), 10:00-11:00 Database Systems (CSE-102), and 11:00-12:00 Machine Learning (CSE-201).",
    source: "CSE_Sem5_Timetable_v2.pdf",
    date: "Jul 15, 2024",
  },
];

export default function AIShowcase() {
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentFullText = sampleQueries[currentQueryIndex];

    if (isTyping) {
      if (typedText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setTypedText("");
        setCurrentQueryIndex((prev) => (prev + 1) % sampleQueries.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isTyping, currentQueryIndex]);

  return (
    <section id="ai" className="py-24 relative overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Retrieval-Augmented Generation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            AI That Understands <span className="gradient-text">Your Campus</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Powered by Gemini API, local vector embeddings, and semantic RAG. Ask naturally and get accurate answers straight from official campus documents.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: Animated Interactive Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-muted-foreground ml-2 font-mono">campusai.search</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">RAG Active</span>
                </div>
              </div>

              {/* Mockup Search Bar */}
              <div className="relative mb-6">
                <div className="flex items-center gap-3 glass rounded-xl px-4 py-3.5 border border-primary/30 glow-primary">
                  <Brain className="h-5 w-5 text-primary animate-pulse" />
                  <div className="flex-1 text-sm font-medium text-foreground min-h-[24px] flex items-center">
                    <span>{typedText}</span>
                    {isTyping && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />}
                  </div>
                  <Mic className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  <button className="p-2 rounded-lg gradient-primary text-white">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Mock Response Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQueryIndex % sampleResponses.length}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="glass rounded-xl p-4 border border-white/5 bg-white/[0.02]">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg gradient-primary text-white shrink-0 mt-0.5">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <p className="text-sm leading-relaxed font-normal text-foreground">
                          {sampleResponses[currentQueryIndex % sampleResponses.length].answer}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5 text-primary font-medium">
                            <FileSearch className="h-3.5 w-3.5" />
                            <span>Source: {sampleResponses[currentQueryIndex % sampleResponses.length].source}</span>
                          </div>
                          <span>Updated: {sampleResponses[currentQueryIndex % sampleResponses.length].date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side: AI Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
                <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Semantic Search & RAG</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Searches meaning, not just keywords. Converts documents into local vector embeddings using Sentence Transformers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary border border-secondary/20 shrink-0">
                  <Languages className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Multilingual Intelligence</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ask questions in English, Telugu, or Hindi. CampusAI responds in your preferred language seamlessly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
                <div className="p-3 rounded-lg bg-accent/10 text-accent border border-accent/20 shrink-0">
                  <FileSearch className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Zero Hallucination Guarantee</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Every answer is strictly grounded in official campus circulars, timetables, and documents with clear citations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
