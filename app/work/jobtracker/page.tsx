import type { Metadata } from "next";
import JobTrackerCaseStudy from "@/components/jobtracker-case-study";

export const metadata: Metadata = {
  title: "JOBTRACKER \u2014 Stanislav Babak",
  description:
    "JobTracker: AI-powered LinkedIn job search automation with intelligent scoring, multi-layer filtering, and analytics dashboard. TypeScript, Node.js, Playwright, NVIDIA AI.",
};

export default function JobTrackerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JobTrackerCaseStudy />
    </div>
  );
}
