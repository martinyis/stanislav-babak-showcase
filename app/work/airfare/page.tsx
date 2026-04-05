import type { Metadata } from "next";
import AirfareCaseStudy from "@/components/airfare-case-study";

export const metadata: Metadata = {
  title: "AIRFARE — Stanislav Babak",
  description:
    "Airfare: Flight search app with flexible dates, price tracking, and smart filtering. React Native, Node.js, PostgreSQL, SerpAPI.",
};

export default function AirfarePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AirfareCaseStudy />
    </div>
  );
}
