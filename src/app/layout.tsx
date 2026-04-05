import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import { AppProviders } from "@/components/app-providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
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
