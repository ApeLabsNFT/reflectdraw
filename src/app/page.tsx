import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export default function LandingPage() {
  return (
    <main className="app-canvas min-h-screen px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[430px] flex-col justify-between">
        <div className="route-section">
          <BrandMark />
        </div>

        <section className="route-section mt-8 space-y-10">
          <div className="paper-image artwork-glow aspect-[0.88] w-full" />

          <div className="space-y-5 px-1 text-center">
            <p className="display-heading text-balance text-[clamp(3rem,9vw,4.5rem)] text-[var(--charcoal)]">
              A Space for Your Inner Echo.
            </p>
            <p className="muted-copy mx-auto max-w-sm text-lg">
              Draw, settle, breathe, and receive a reflective response shaped
              for grounding, not judgment.
            </p>
          </div>
        </section>

        <section className="route-section mt-8 space-y-5 pb-4">
          <Link
            href="/archive"
            className="primary-cta h-16 w-full px-6 text-lg font-semibold"
          >
            Begin the Journey
            <ArrowRight className="size-5" />
          </Link>
          <Link
            href="/settings"
            className="block text-center text-sm font-semibold tracking-[0.24em] text-[rgba(117,123,116,0.88)] uppercase"
          >
            Already a member? Enter sanctuary
          </Link>
        </section>
      </div>
    </main>
  );
}
