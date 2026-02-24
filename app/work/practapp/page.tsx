import type { Metadata } from "next";
import PractAppCaseStudy from "@/components/practapp-case-study";

export const metadata: Metadata = {
  title: "PRACTAPP \u2014 Stanislav Babak",
  description:
    "PractApp: AI-powered language learning mobile app. React Native, Node.js, OpenAI, Google Cloud TTS, AssemblyAI.",
};

export default function PractAppPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PractAppCaseStudy />
    </div>
  );
}
