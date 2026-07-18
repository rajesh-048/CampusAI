import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AIShowcase from "@/components/landing/AIShowcase";
import BenefitsSection from "@/components/landing/BenefitsSection";
import StatsSection from "@/components/landing/StatsSection";
import ScreenshotsSection from "@/components/landing/ScreenshotsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import ChatWrapper from "@/components/chat/ChatWrapper";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AIShowcase />
      <BenefitsSection />
      <StatsSection />
      <ScreenshotsSection />
      <ContactSection />
      <Footer />
      <ChatWrapper />
    </main>
  );
}
