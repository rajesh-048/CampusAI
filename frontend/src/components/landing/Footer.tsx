import Link from "next/link";
import { Sparkles, GraduationCap, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 relative overflow-hidden text-sm">
      <div className="h-0.5 w-full gradient-primary" />
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl gradient-primary text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight gradient-text">
                CampusAI
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              The AI-powered Campus Knowledge Navigator. Empowering students with instant answer retrieval and administrators with full knowledge governance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="/student/login" className="px-3 py-1.5 rounded-lg glass text-xs font-semibold hover:border-primary/50 transition-colors flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-primary" /> Student Portal
              </Link>
              <Link href="/admin/login" className="px-3 py-1.5 rounded-lg glass text-xs font-semibold hover:border-accent/50 transition-colors flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-accent" /> Admin Portal
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">Navigation</div>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#ai" className="hover:text-primary transition-colors">AI Engine</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Benefits</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Features Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">Capabilities</div>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li><span>Semantic Vector RAG</span></li>
              <li><span>Document OCR Processing</span></li>
              <li><span>Real-time Timetables</span></li>
              <li><span>Multilingual Support (EN, TE, HI)</span></li>
              <li><span>Official Source Citations</span></li>
            </ul>
          </div>

          {/* Legal / Institutional */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">CampusAI Platform</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for local on-premise execution with ChromaDB vector store and Gemini LLM synthesis.
            </p>
            <div className="text-xs text-muted-foreground font-mono pt-2">
              Status: <span className="text-emerald-400">All Services Operational</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} CampusAI. All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>using Next.js 15, FastAPI & Gemini RAG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
