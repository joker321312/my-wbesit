import type { Metadata } from "next";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "ToolHub | Premium Gaming Arsenal",
  description: "Elite checker suite for professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <VisitorTracker />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
