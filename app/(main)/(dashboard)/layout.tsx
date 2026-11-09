import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoxCheck",
  description: "Civic verification console",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col`}
    >
      {children}
    </div>
  );
}
