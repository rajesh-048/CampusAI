"use client";

import { motion, Variants } from "framer-motion";
import { Search, Bot, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "AI-powered semantic search across all campus data. Ask questions in natural language and get precise answers instantly.",
    gradient: "from-[hsl(250,90%,60%)] to-[hsl(200,90%,55%)]",
    shadowColor: "shadow-indigo-500/20",
  },
  {
    icon: Bot,
    title: "AI Chatbot",
    description:
      "A conversational AI assistant available 24/7 to answer your campus queries, powered by RAG technology.",
    gradient: "from-[hsl(200,90%,55%)] to-[hsl(170,80%,50%)]",
    shadowColor: "shadow-cyan-500/20",
  },
  {
    icon: BookOpen,
    title: "Knowledge Hub",
    description:
      "Centralized repository of all campus information — syllabi, circulars, notices, faculty data, and much more.",
    gradient: "from-[hsl(320,80%,55%)] to-[hsl(250,90%,60%)]",
    shadowColor: "shadow-pink-500/20",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <motion.div
        className="relative z-10 container-custom"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-[hsl(250,90%,65%)] mb-4">
            About
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">What is CampusAI?</span>
          </h2>
          <p className="text-lg text-[hsl(220,10%,55%)] max-w-2xl mx-auto leading-relaxed">
            CampusAI is a centralized, AI-powered knowledge platform that brings
            together all campus information into one searchable, intelligent
            system. No more hunting through WhatsApp groups, lost emails, or
            cluttered notice boards.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card p-8 rounded-2xl h-full relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500",
                    feature.gradient
                  )}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg",
                      feature.gradient,
                      feature.shadowColor
                    )}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[hsl(220,10%,55%)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
