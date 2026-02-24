import type { Metadata } from "next";
import TaskMindCaseStudy from "@/components/taskmind-case-study";

export const metadata: Metadata = {
  title: "TASKMIND \u2014 Stanislav Babak",
  description:
    "TaskMind: AI-powered research platform. Next.js, Node.js, OpenAI, Google Gemini, GCP. Led architecture and full-stack development.",
};

export default function TaskMindPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TaskMindCaseStudy />
    </div>
  );
}
