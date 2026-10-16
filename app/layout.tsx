import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kritika Manandhar | Studio Ghibli & Lo-Fi Portfolio",
  description:
    "Portfolio of Kritika Manandhar — Aspiring Software Developer & CSIT Student. Featuring a continuous Studio Ghibli scroll-linked canvas cinematic experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#3D352E]">
        {children}
      </body>
    </html>
  );
}
