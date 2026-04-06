"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GalleryVerticalEnd,
  HeartHandshake,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import clsx from "clsx";
import { BottomNav } from "@/components/bottom-nav";
import { BrandMark } from "@/components/brand-mark";
import { ExperienceGate } from "@/components/experience-gate";
import { useAuthSession } from "@/lib/use-auth-session";

const shellItems = [
  {
    href: "/archive",
    label: "Archive",
    note: "Your saved reflections and recent artifacts.",
    icon: GalleryVerticalEnd,
  },
  {
    href: "/capture",
    label: "Ritual",
    note: "Capture, write, breathe, and begin a new reflection.",
    icon: Sparkles,
  },
  {
    href: "/sanctuary",
    label: "Sanctuary",
    note: "Breath and wind-down practices for quieter pacing.",
    icon: Wind,
  },
  {
    href: "/guides",
    label: "Guides",
    note: "Human support and future companion surfaces.",
    icon: HeartHandshake,
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = pathname === "/processing";
  const { isSignedIn, user } = useAuthSession();

  return (
    <div className={clsx(immersive ? "immersive-canvas" : "app-canvas")}>
      {immersive ? (
        <main className="min-h-screen">
          <ExperienceGate>{children}</ExperienceGate>
        </main>
      ) : (
        <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
          <div className="app-content-frame lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
            <aside className="hidden lg:block">
              <div className="surface-panel route-section sticky top-6 flex min-h-[calc(100vh-3rem)] flex-col justify-between px-5 py-5">
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <BrandMark href={isSignedIn ? "/welcome" : "/"} />
                    <div className="secondary-cta h-10 rounded-full px-4 text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                      {isSignedIn ? "Member" : "Preview"}
                    </div>
                  </div>

                  <div className="surface-panel-soft rounded-[1.5rem] p-4">
                    <p className="eyebrow">ReflectDraw</p>
                    <p className="mt-3 font-serif text-[2rem] leading-[0.98] text-[var(--charcoal)]">
                      A calmer place for noisy days.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgba(105,113,107,0.92)]">
                      Come here when anxiety is loud, focus is slipping, or you
                      need a softer rhythm before sleep. The app is built to help
                      you slow down, notice, and continue.
                    </p>
                  </div>

                  <nav className="space-y-2">
                    {shellItems.map((item) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== "/archive" && pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          data-active={active}
                          className="desktop-nav-item flex items-start gap-3 px-4 py-4"
                        >
                          <span
                            className={clsx(
                              "secondary-cta mt-0.5 size-10 shrink-0",
                              active && "bg-[linear-gradient(135deg,#20302a,#5f7766)] text-white",
                            )}
                          >
                            <item.icon className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-[var(--charcoal)]">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-[rgba(105,113,107,0.9)]">
                              {item.note}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-3">
                  <div className="surface-panel-soft rounded-[1.5rem] p-4">
                    <p className="eyebrow">Your place</p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(105,113,107,0.92)]">
                      {isSignedIn
                        ? `Signed in as ${user?.email ?? "your account"}.`
                        : "Preview mode is active until you sign in."}
                    </p>
                  </div>
                  <Link
                    href={isSignedIn ? "/settings" : "/auth"}
                    className="primary-cta h-12 w-full px-4 text-sm font-semibold"
                  >
                    {isSignedIn ? "Open settings" : "Log in or sign up"}
                  </Link>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <header className="route-section sticky top-0 z-20 lg:hidden">
                <div className="surface-panel flex items-center justify-between rounded-[1.5rem] px-3 py-2.5 backdrop-blur-xl">
                  <div className="secondary-cta h-10 rounded-full px-4 text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                    {isSignedIn ? "Member" : "Preview"}
                  </div>

                  <BrandMark compact href={isSignedIn ? "/welcome" : "/"} />

                  <Link
                    href={isSignedIn ? "/settings" : "/auth"}
                    className="secondary-cta size-10 shrink-0"
                    aria-label={isSignedIn ? "Privacy settings" : "Log in"}
                    title={isSignedIn ? user?.email ?? "Settings" : "Log in"}
                  >
                    {isSignedIn ? (
                      <ShieldCheck className="size-4" />
                    ) : (
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em]">
                        Join
                      </span>
                    )}
                  </Link>
                </div>
              </header>

              <main className="pb-28 pt-4 lg:pt-0">
                <ExperienceGate>{children}</ExperienceGate>
              </main>
            </div>
          </div>

          <BottomNav />

          <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(251,248,242,0.98)] via-[rgba(251,248,242,0.82)] to-transparent lg:hidden" />
          <div className="pointer-events-none fixed right-6 top-8 hidden rounded-full bg-[rgba(255,252,247,0.92)] p-3 shadow-[0_22px_44px_-32px_rgba(23,29,27,0.2)] lg:block">
            <MoonStar className="size-4 text-[var(--sage)]" />
          </div>
        </div>
      )}
    </div>
  );
}
