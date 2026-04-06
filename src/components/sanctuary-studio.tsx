"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MoonStar, Play, Wind } from "lucide-react";
import type { BreathPractice } from "@/lib/contracts";
import { BreathOrb } from "@/components/breath-orb";
import { ArtworkTile } from "@/components/artwork-tile";
import { breathPractices } from "@/lib/demo-data";
import { trackClientEvent } from "@/lib/analytics";

const phases: Record<BreathPractice["mode"], string[]> = {
  arrival: ["Inhale softly", "Exhale longer"],
  box: ["Inhale", "Hold", "Exhale", "Hold"],
  "extended-exhale": ["Inhale 4", "Exhale 6"],
  "wind-down": ["Ease in", "Release slowly"],
  "physiological-sigh": ["Two-part inhale", "Long exhale"],
};

export function SanctuaryStudio() {
  const [selected, setSelected] = useState<BreathPractice>(breathPractices[0]);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const cyclePhase = useEffectEvent(() => {
    setPhaseIndex((current) => (current + 1) % phases[selected.mode].length);
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      cyclePhase();
    }, 3200);

    return () => window.clearInterval(timer);
  }, [selected.mode]);

  const currentPhase = useMemo(
    () => phases[selected.mode][phaseIndex],
    [phaseIndex, selected.mode],
  );

  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <section className="space-y-3">
        <p className="eyebrow">Breath and sleep support</p>
        <h1 className="serif-heading max-w-[14rem] text-balance text-[3.2rem] leading-[0.92]">
          Come back to yourself.
        </h1>
        <p className="muted-copy text-sm">
          Use these practices when your chest feels tight, your thoughts keep
          circling, your attention will not stay put, or bedtime feels harder
          than it should.
        </p>
      </section>

      <section className="surface-panel overflow-hidden rounded-[2.5rem] px-4 py-5 text-center">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {breathPractices.map((practice) => (
            <button
              key={practice.id}
              type="button"
              data-active={selected.id === practice.id}
              onClick={() => {
                setSelected(practice);
                setPhaseIndex(0);
                trackClientEvent("breath_practice_selected", {
                  mode: practice.mode,
                  duration_seconds: practice.durationSeconds,
                });
              }}
              className="ghost-chip shrink-0 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
            >
              {practice.title}
            </button>
          ))}
        </div>

        <BreathOrb mode={selected.mode} />
        <p className="eyebrow">{selected.tone}</p>
        <p className="mt-3 font-serif text-[2.7rem] leading-[0.96] text-[var(--charcoal)]">
          {selected.title}
        </p>
        <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
          {selected.description}
        </p>
        <p className="mt-4 text-sm font-semibold text-[var(--sage)]">
          {currentPhase}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <p className="eyebrow">When to use it</p>
          <p className="mt-3 font-serif text-[2rem] leading-none text-[var(--charcoal)]">
            {selected.tone}
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
            {selected.durationSeconds < 120
              ? "A short reset for buzzy or overloaded moments."
              : "A longer practice for steadier pacing and deeper exhale."}
          </p>
        </div>
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <div className="secondary-cta size-11">
            <MoonStar className="size-5" />
          </div>
          <p className="mt-4 font-semibold text-[var(--charcoal)]">
            Quiet mode
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
            Low-light visuals and softer transitions for nighttime use.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--charcoal)]">
            Featured rituals
          </h2>
          <Link href="/guides" className="text-sm text-[var(--sage)]">
            Explore all
          </Link>
        </div>

        <ArtworkTile
          variant="forest"
          className="aspect-[1.03]"
          title="The 4-7-8 Anchor"
          subtitle="5 min - Grounded"
        />
        <ArtworkTile
          variant="lotus"
          className="aspect-[1.32]"
          title="Softening the Jaw"
          subtitle="3 min - Calm"
        />
      </section>

      <section className="surface-panel rounded-[2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11">
            <Play className="size-5" />
          </div>
          <div>
            <p className="font-semibold text-[var(--charcoal)]">
              Nighttime ritual
            </p>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
              Pair a low-light drawing prompt with wind-down breath when sleep
              feels far away, or save the reflection for morning if tonight is
              not the time to read deeply.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/capture"
            className="primary-cta h-13 w-full px-4 text-sm font-semibold"
          >
            <Wind className="size-4" />
            Start ritual
          </Link>
          <Link
            href="/guides"
            className="secondary-cta h-13 w-full px-4 text-sm font-semibold"
          >
            Sleep guides
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
