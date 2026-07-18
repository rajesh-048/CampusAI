import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CampusAI — AI Campus Knowledge Navigator",
  description:
    "Find any campus information instantly with AI-powered search and chatbot. Timetables, exams, notices, faculty, and more — all in one place.",
  keywords: [
    "campus",
    "AI",
    "knowledge",
    "navigator",
    "education",
    "timetable",
    "university",
  ],
  authors: [{ name: "CampusAI" }],
  openGraph: {
    title: "CampusAI — AI Campus Knowledge Navigator",
    description:
      "Find any campus information instantly with AI-powered search and chatbot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
