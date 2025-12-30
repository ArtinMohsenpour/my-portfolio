import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import StickyBackground from "@/components/ui/StickyBackground"; // Import this
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artin Mohsenpour",
  description: "My portfolio website.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Check draft mode status
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StickyBackground />

        <main className="relative z-10">{children}</main>

        {/* 3. Render VisualEditing ONLY when in draft mode */}
        {isEnabled && <VisualEditing />}

        <SanityLive />
      </body>
    </html>
  );
}