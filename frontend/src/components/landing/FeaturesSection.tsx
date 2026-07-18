"use client";

import { motion, Variants } from "framer-motion";
import {
  Brain,
  MessageSquare,
  Calendar,
  ClipboardList,
  Bell,
  Users,
  FileText,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "AI Search",
    description: "Search with natural language across all campus data",
    color: "hsl(250, 90%, 60%)",
  },
  {
    icon: MessageSquare,
    title: "Smart Chatbot",
    description: "24/7 conversational AI assistant for instant answers",
    color: "hsl(200, 90%, 55%)",
  },
  {
    icon: Calendar,
    title: "Timetable",
    description: "Real-time class schedules always at your fingertips",
    color: "hsl(320, 80%, 55%)",
  },
  {
    icon: ClipboardList,
    title: "Exam Portal",
    description: "Exam schedules, results, and previous year papers",
    color: "hsl(142, 76%, 36%)",
  },
  {
    icon: Bell,
    title: "Notice Board",
    description: "Official announcements you'll never miss",
    color: "hsl(38, 92%, 50%)",
  },
  {
    icon: Users,
    title: "Faculty Directory",
    description: "Find any faculty member — contact, office, schedule",
    color: "hsl(270, 80%, 60%)",
  },
  {
    icon: FileText,
    title: "Study Materials",
    description: "Syllabus, lecture notes, and reference papers",
    color: "hsl(180, 70%, 45%)",
  },
  {
    icon: MapPin,
    title: "Campus Map",
    description: "Navigate the campus buildings and facilities",
    color: "hsl(0, 80%, 60%)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(250,90%,60%,0.04),transparent_50%)]" />

      <motion.div
        className="relative z-10 container-custom"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div
          variants={cardVariants}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-[hsl(200,90%,60%)] mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-lg text-[hsl(220,10%,55%)] max-w-2xl mx-auto">
            Everything you need to navigate campus life, powered by
            cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative"
            >
              <div className="glass-card p-6 rounded-2xl h-full relative overflow-hidden">
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${feature.color}15`,
                    }}
                  >
                    <feature.icon
                      className="w-6 h-6"
                      style={{ color: feature.color }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[hsl(220,10%,55%)] leading-relaxed">
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
