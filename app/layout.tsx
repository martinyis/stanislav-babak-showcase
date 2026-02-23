import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Stanislav Babak",
  description:
    "Stanislav Babak — Full Stack Software Engineer. TypeScript, React, Next.js, Node.js, Python. AI/LLM Integration & RAG Pipelines.",
  authors: [{ name: "Stanislav Babak" }],
  icons: {
    icon: "/sbicon.png",
  },
  openGraph: {
    title: "Stanislav Babak — Software Engineer",
    description:
      "Full Stack Software Engineer. TypeScript, React, Next.js, Node.js, Python. AI/LLM Integration & RAG Pipelines.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
