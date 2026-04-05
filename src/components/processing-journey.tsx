"use client";

import { useEffect, useEffectEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreathOrb } from "@/components/breath-orb";
import { useLatestRun } from "@/lib/use-latest-run";

const stages = [
  "Taking a moment to listen...",
  "Synthesizing your intention",
  "Softening the language",
  "Preparing your reflection",
];

export function ProcessingJourney() {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const latestRun = useLatestRun();

  const tick = useEffectEvent(() => {
    setProgress((current) => {
      const next = Math.min(current + 3, 100);
      setStageIndex(Math.min(stages.length - 1, Math.floor(next / 30)));
      return next;
    });
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      tick();
    }, 160);

    return () => window.clearInterval(timer);
  }, []);

  const ready = progress >= 100;

  return (
    <div className="route-section flex min-h-screen flex-col justify-center px-8 text-center text-white">
      <div className="mx-auto w-full max-w-sm space-y-8">
        <BreathOrb mode="extended-exhale" dark />

        <div className="space-y-4">
          <h1 className="serif-heading text-balance text-[3.3rem] leading-[1.02] text-white">
            {stages[stageIndex]}
          </h1>
          <p className="eyebrow text-white/52">
            {latestRun?.capture.threeWords.length
              ? `Holding ${latestRun.capture.threeWords.join(" - ")}`
              : "Holding your intention"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-[2px] overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[rgba(255,255,255,0.86)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-white/62">
            Gently follow the rhythm. Every response is checked for warmth,
            safety, and non-diagnostic language.
          </p>
        </div>

        {ready ? (
          <Link
            href="/artifact/latest"
            className="primary-cta mx-auto h-15 w-full px-6 text-base font-semibold"
          >
            Open reflection
            <ArrowRight className="size-5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
