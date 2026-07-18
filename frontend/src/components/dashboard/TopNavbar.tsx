"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, User, LogOut, Moon, Sun, Menu, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface TopNavbarProps {
  role: "STUDENT" | "ADMIN";
}

export default function TopNavbar({ role }: TopNavbarProps) {
  const { user, logout } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => {
    const langs = ["EN", "TE", "HI"];
    const nextIdx = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIdx]);
  };

  return (
    <header className="h-16 border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Left Greeting */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-foreground">
          Welcome back, <span className="gradient-text">{user?.name || (role === "ADMIN" ? "Administrator" : "Student")}</span> 👋
        </span>
        <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
          {user?.department || (role === "ADMIN" ? "Super Admin" : "CSE Department")}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Multilingual Selector */}
        <button
          onClick={toggleLanguage}
          className="glass px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:border-primary/40 transition-colors"
          title="Change AI Search Language"
        >
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>{language}</span>
        </button>

        {/* Notifications Icon */}
        <Link
          href={role === "ADMIN" ? "/admin/dashboard/notifications" : "/student/dashboard/notifications"}
          className="relative glass p-2 rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
        >
          <Bell className="h-4 w-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {unreadNotifications}
            </span>
          )}
        </Link>

        {/* Profile Avatar & Role Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <Link
            href={role === "ADMIN" ? "/admin/dashboard/website" : "/student/dashboard/profile"}
            className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
          >
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </Link>
        </div>
      </div>
    </header>
  );
}
