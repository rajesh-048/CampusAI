"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  Shield,
  ArrowRight,
  Sparkles,
  Brain,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl opacity-20 pointer-events-none", className)}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Orbs */}
      <FloatingOrb
        className="w-[500px] h-[500px] bg-[hsl(250,90%,60%)] top-1/4 -left-40"
        delay={0}
      />
      <FloatingOrb
        className="w-[400px] h-[400px] bg-[hsl(200,90%,55%)] bottom-1/4 -right-32"
        delay={2}
      />
      <FloatingOrb
        className="w-[300px] h-[300px] bg-[hsl(320,80%,55%)] top-1/3 right-1/4"
        delay={4}
      />
      <FloatingOrb
        className="w-[200px] h-[200px] bg-[hsl(250,90%,60%)] bottom-1/3 left-1/4"
        delay={6}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(230,25%,8%)_75%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 container-custom text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
          <span className="glass px-4 py-2 rounded-full text-sm font-medium text-[hsl(220,15%,70%)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[hsl(250,90%,60%)]" />
            AI-Powered Campus Knowledge Platform
            <ArrowRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          <span className="gradient-text">Your Campus.</span>
          <br />
          <span className="gradient-text">Your AI.</span>
          <br />
          <span className="gradient-text">Your Knowledge.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[hsl(220,10%,55%)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Find any campus information instantly with AI-powered search.
          Timetables, exams, notices, faculty, and more — all in one intelligent
          platform.
        </motion.p>

        {/* Floating icons decoration */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {[Brain, Search, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <Icon className="w-5 h-5 text-[hsl(250,90%,65%)]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Login Cards */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-3xl mx-auto"
        >
          {/* Student Login Card */}
          <Link href="/student/login" className="w-full sm:w-auto flex-1 max-w-sm group">
            <motion.div
              className="glass-card p-8 rounded-2xl cursor-pointer relative overflow-hidden"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 40px rgba(99, 102, 241, 0.25), 0 20px 60px rgba(0,0,0,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(250,90%,60%)/0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 mx-auto shadow-lg shadow-indigo-500/25">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Student Login
                </h3>
                <p className="text-sm text-[hsl(220,10%,55%)] mb-4">
                  Access your dashboard, timetable, and AI search
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-[hsl(250,90%,65%)] group-hover:text-[hsl(250,90%,75%)] transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Admin Login Card */}
          <Link href="/admin/login" className="w-full sm:w-auto flex-1 max-w-sm group">
            <motion.div
              className="glass-card p-8 rounded-2xl cursor-pointer relative overflow-hidden"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 40px rgba(168, 85, 247, 0.25), 0 20px 60px rgba(0,0,0,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(320,80%,55%)/0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-4 mx-auto shadow-lg shadow-purple-500/25">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Admin Login
                </h3>
                <p className="text-sm text-[hsl(220,10%,55%)] mb-4">
                  Manage campus content and knowledge base
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-[hsl(320,80%,60%)] group-hover:text-[hsl(320,80%,70%)] transition-colors">
                  Admin Panel
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[hsl(220,15%,25%)] flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-[hsl(250,90%,60%)]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
