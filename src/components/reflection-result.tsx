import Link from "next/link";
import { ArrowRight, MoonStar, Sparkles, Wind } from "lucide-react";
import type { Artifact, Comparison, Reflection } from "@/lib/contracts";
import { ArtworkTile } from "@/components/artwork-tile";
import { ShareReflectionButton } from "@/components/share-reflection-button";
import { formatDayMonth, formatFullDate } from "@/lib/utils";

export function ReflectionResult({
  artifact,
  reflection,
  comparison,
}: {
  artifact: Artifact;
  reflection: Reflection;
  comparison?: Comparison;
}) {
  const sections = [
    { label: "Overall Structure", body: reflection.overallStructure },
    { label: "Energy Line", body: reflection.energyLine },
    { label: "Directional Process", body: reflection.directionalProcess },
    { label: "Symbolic Zones", body: reflection.symbolicZones },
    { label: "Emotional Narrative", body: reflection.emotionalNarrative },
  ];

  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <section className="surface-panel overflow-hidden rounded-[2.5rem] p-3">
        <ArtworkTile
          artifact={artifact}
          className="aspect-[0.98]"
          title={artifact.title}
          subtitle={`Captured ${formatDayMonth(artifact.capturedAt)}`}
        />

        <div className="space-y-4 px-2 pb-2 pt-5">
          <div className="flex flex-wrap gap-2">
            <span className="ghost-chip px-3 py-1.5 text-[0.66rem] font-semibold tracking-[0.14em] uppercase">
              Weekly summary
            </span>
            <span className="ghost-chip px-3 py-1.5 text-[0.66rem] font-semibold tracking-[0.14em] uppercase">
              {reflection.modelVersion}
            </span>
          </div>
          <h1 className="serif-heading text-balance text-[3rem] leading-[0.93] text-[var(--charcoal)]">
            {reflection.coreReflection}
          </h1>
          <p className="muted-copy text-sm">
            Generated {formatFullDate(reflection.generatedAt)}. Every output is
            framed as reflective, not diagnostic.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <p className="eyebrow">Resonance</p>
          <p className="mt-3 font-serif text-[2rem] leading-[0.98] text-[var(--charcoal)]">
            {reflection.resonanceLabel}
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
            {reflection.confidenceLabel}
          </p>
        </div>
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <p className="eyebrow">Breath pairing</p>
          <p className="mt-3 font-serif text-[2rem] leading-[0.98] text-[var(--charcoal)]">
            {reflection.breathMode.replace("-", " ")}
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
            Suggested after reading this reflection.
          </p>
        </div>
      </section>

      <section className="surface-panel rounded-[2.2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11 shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div className="space-y-3">
            <p className="eyebrow">Golden Insight</p>
            <p className="serif-heading text-[2.5rem] leading-[0.96] text-[var(--charcoal)]">
              {reflection.goldenInsight}
            </p>
            <p className="text-sm text-[rgba(117,123,116,0.92)]">
              Integration prompt: {reflection.integrationPrompt}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--charcoal)]">Key themes</h2>
          <span className="eyebrow">Active states</span>
        </div>
        {reflection.keyThemes.map((theme, index) => (
          <div key={theme} className="surface-panel-soft rounded-[1.9rem] p-4">
            <p className="font-semibold text-[var(--charcoal)]">
              {index + 1}. {theme}
            </p>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.92)]">
              {sections[index % sections.length]?.body}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        {sections.map((section) => (
          <div key={section.label} className="surface-panel rounded-[1.95rem] p-5">
            <p className="eyebrow">{section.label}</p>
            <p className="mt-3 text-sm leading-7 text-[rgba(117,123,116,0.95)]">
              {section.body}
            </p>
          </div>
        ))}
      </section>

      <section className="surface-panel-soft rounded-[2.2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11 shrink-0">
            <MoonStar className="size-5" />
          </div>
          <div className="space-y-3">
            <p className="eyebrow">Comparative context</p>
            <p className="text-sm leading-7 text-[rgba(117,123,116,0.95)]">
              {reflection.comparativeContext}
            </p>
            {comparison ? (
              <div className="surface-panel rounded-[1.75rem] p-4">
                <p className="font-semibold text-[var(--charcoal)]">
                  {comparison.headline}
                </p>
                <p className="mt-2 text-sm text-[rgba(117,123,116,0.92)]">
                  {comparison.comparisonText}
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--sage)]">
                  {comparison.prompt}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        <Link
          href="/compare"
          className="primary-cta h-14 w-full px-6 text-base font-semibold"
        >
          Explore the patterns further
          <ArrowRight className="size-5" />
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/sanctuary"
            className="secondary-cta h-14 w-full px-4 text-sm font-semibold"
          >
            <Wind className="size-4" />
            Closing breath
          </Link>
          <ShareReflectionButton />
        </div>
        <Link
          href="/archive"
          className="secondary-cta h-14 w-full px-4 text-sm font-semibold"
        >
          Back to archive
        </Link>
      </section>
    </div>
  );
}
