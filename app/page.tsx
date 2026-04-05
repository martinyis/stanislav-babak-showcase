import ProjectCarousel from "@/components/project-carousel";
import FooterSection from "@/components/footer-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectCarousel />
      <FooterSection />
    </div>
  );
}
