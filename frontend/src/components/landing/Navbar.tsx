"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "AI", href: "#ai" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2"
          : "py-4"
      )}
    >
      <div className="container-custom">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
            scrolled
              ? "glass-strong shadow-lg shadow-black/20"
              : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg gradient-primary opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text">CampusAI</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-[hsl(220,10%,55%)] hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 gradient-primary rounded-full group-hover:w-2/3 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/student/login">
              <Button variant="ghost" size="sm" className="gap-2 text-[hsl(220,10%,55%)] hover:text-white">
                <GraduationCap className="w-4 h-4" />
                Student Login
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                size="sm"
                className="gap-2 gradient-primary border-0 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
              >
                <Shield className="w-4 h-4" />
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-6 pt-12">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">
                    CampusAI
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-sm font-medium text-[hsl(220,10%,55%)] hover:text-white hover:bg-[hsl(230,25%,12%)] rounded-lg transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  <Link href="/student/login">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <GraduationCap className="w-4 h-4" />
                      Student Login
                    </Button>
                  </Link>
                  <Link href="/admin/login">
                    <Button className="w-full gap-2 gradient-primary border-0">
                      <Shield className="w-4 h-4" />
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
