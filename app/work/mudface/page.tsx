import type { Metadata } from "next";
import MudfaceCaseStudy from "@/components/mudface-case-study";

export const metadata: Metadata = {
  title: "MUDFACE -- Stanislav Babak",
  description:
    "Case study: Building the full product stack for mudface.ai, an AI-powered skincare platform. React Native, Django, OpenAI, Next.js.",
};

export default function MudfacePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MudfaceCaseStudy />
    </div>
  );
}
