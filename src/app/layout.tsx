import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/app-providers";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "./fonts/manrope-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/manrope-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/manrope-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const notoSerif = localFont({
  src: [
    {
      path: "./fonts/noto-serif-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/noto-serif-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReflectDraw",
  description:
    "A somatic reflection and regulation app for drawing, breathwork, sleep-supportive rituals, and gentle AI reflection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSerif.variable} min-h-full antialiased`}
    >
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
