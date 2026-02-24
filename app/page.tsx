import HeroSection from "@/components/hero-section";
import MudfaceSection from "@/components/mudface-section";
import TaskMindSection from "@/components/taskmind-section";
import PractAppSection from "@/components/practapp-section";
import SectionDivider from "@/components/section-divider";
import FooterSection from "@/components/footer-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero -- full viewport intro */}
      <HeroSection />

      {/* Divider between hero and first case study */}
      <SectionDivider />

      {/* MUDFACE -- internship case study */}
      <MudfaceSection />

      {/* Divider */}
      <SectionDivider />

      {/* TASKMIND -- AI research platform case study */}
      <TaskMindSection />

      {/* Divider */}
      <SectionDivider />

      {/* PRACTAPP -- personal language learning app */}
      <PractAppSection />

      {/* Divider */}
      <SectionDivider />

      {/* Footer -- contact + links */}
      <FooterSection />
    </div>
  );
}
