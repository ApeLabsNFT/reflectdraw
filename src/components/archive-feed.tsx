"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Search, Wind } from "lucide-react";
import { ArtworkTile } from "@/components/artwork-tile";
import { promptLibrary, seedArtifacts } from "@/lib/demo-data";
import { useAuthSession } from "@/lib/use-auth-session";
import { useLatestRun } from "@/lib/use-latest-run";
import { formatDayMonth } from "@/lib/utils";

const filters = ["All", "Recent", "Night", "Grounding", "Sleep"];

export function ArchiveFeed() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const latestRun = useLatestRun();
  const { isSignedIn, displayName, sanctuaryLabel } = useAuthSession();

  const artifacts = useMemo(() => {
    if (!latestRun) return seedArtifacts;

    return [
      latestRun.artifact,
      ...seedArtifacts.filter((artifact) => artifact.id !== latestRun.artifact.id),
    ];
  }, [latestRun]);

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((artifact) => {
      const matchesQuery = `${artifact.title} ${artifact.coreInsight}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        artifact.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        artifact.coreInsight.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, artifacts, query]);

  const featured = filteredArtifacts[0];
  const secondary = filteredArtifacts.slice(1, 5);

  return (
    <div className="route-section space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow">Archive</p>
          <h1 className="serif-heading max-w-[10ch] text-balance text-[clamp(3rem,6vw,5.6rem)] leading-[0.9] text-[var(--charcoal)]">
            {isSignedIn ? sanctuaryLabel : "Preview the sanctuary."}
          </h1>
          <p className="muted-copy max-w-[42rem] text-[0.98rem]">
            {isSignedIn
              ? `Welcome back, ${displayName}. This is where your drawings, rituals, and quieter patterns begin to accumulate over time.`
              : "Guest preview mode is open. Sign in when you're ready to save reflections, build continuity, and unlock the full journey."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/capture" className="primary-cta h-14 px-5 text-sm font-semibold">
            <Plus className="size-4" />
            New ritual
          </Link>
          <Link href="/compare" className="secondary-cta h-14 px-5 text-sm font-semibold">
            Compare over time
          </Link>
        </div>
      </section>

      {!isSignedIn ? (
        <section className="surface-panel rounded-[1.9rem] p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Guest preview</p>
              <p className="mt-3 max-w-[44rem] text-sm leading-7 text-[rgba(105,113,107,0.92)]">
                Explore the archive and ritual pacing first. When you join, the app
                moves you through auth, onboarding, and directly back into this space
                with your own saved continuity.
              </p>
            </div>
            <Link
              href="/auth"
              className="primary-cta h-12 px-5 text-xs font-semibold tracking-[0.14em] uppercase"
            >
              Join ReflectDraw
            </Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <label className="soft-input flex items-center gap-3 px-4 py-3">
          <Search className="size-4 text-[rgba(105,113,107,0.9)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, state, or rhythm"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[rgba(105,113,107,0.64)]"
          />
        </label>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              data-active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="ghost-chip shrink-0 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.15em] uppercase"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {featured ? (
        <section className="grid gap-4 xl:grid-cols-[1.16fr_0.84fr]">
          <Link
            href={
              featured.id.startsWith("artifact-")
                ? "/artifact/latest"
                : `/artifact/${featured.id}`
            }
            className="surface-panel overflow-hidden rounded-[2.2rem] p-3"
          >
            <ArtworkTile
              artifact={featured}
              className="aspect-[1.18] lg:aspect-[1.28]"
              title={featured.title}
              subtitle={`${formatDayMonth(featured.capturedAt)} / ${featured.coreInsight}`}
            />
            <div className="grid gap-4 px-2 pb-2 pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-2">
                <p className="eyebrow">Featured reflection</p>
                <p className="font-serif text-[2.4rem] leading-[0.98] text-[var(--charcoal)]">
                  {featured.title}
                </p>
                <p className="max-w-[36rem] text-sm leading-7 text-[rgba(105,113,107,0.92)]">
                  {featured.coreInsight}
                </p>
              </div>
              <span className="secondary-cta size-12 shrink-0">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>

          <div className="grid gap-4">
            <Link href="/sanctuary" className="surface-panel rounded-[2rem] p-5">
              <div className="secondary-cta size-11">
                <Wind className="size-5" />
              </div>
              <p className="mt-4 font-serif text-[2rem] leading-[1] text-[var(--charcoal)]">
                Regulate first.
              </p>
              <p className="mt-3 text-sm leading-7 text-[rgba(105,113,107,0.9)]">
                Arrival breath, extended exhale, and quieter nighttime pacing live here.
              </p>
            </Link>

            <section className="surface-panel-soft rounded-[2rem] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Prompt retrieval</p>
                  <p className="mt-2 font-semibold text-[var(--charcoal)]">
                    Start from a quieter question.
                  </p>
                </div>
                <Link href="/capture" className="secondary-cta size-11">
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-4 grid gap-2">
                {promptLibrary.slice(0, 3).map((prompt) => (
                  <div key={prompt} className="surface-panel rounded-[1.4rem] p-4">
                    <p className="text-sm leading-7 text-[var(--charcoal)]">{prompt}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {secondary.map((artifact) => (
          <Link
            key={artifact.id}
            href={`/artifact/${artifact.id}`}
            className="surface-panel-soft rounded-[1.8rem] p-3"
          >
            <ArtworkTile artifact={artifact} className="aspect-[0.96]" />
            <div className="space-y-2 px-1 pt-4">
              <p className="eyebrow">Captured {formatDayMonth(artifact.capturedAt)}</p>
              <p className="font-serif text-[1.65rem] leading-[1.02] text-[var(--charcoal)]">
                {artifact.title}
              </p>
              <p className="text-sm leading-7 text-[rgba(105,113,107,0.9)]">
                {artifact.coreInsight}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
