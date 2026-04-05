"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Search, Wind } from "lucide-react";
import { ArtworkTile } from "@/components/artwork-tile";
import { promptLibrary, seedArtifacts } from "@/lib/demo-data";
import { useLatestRun } from "@/lib/use-latest-run";
import { formatDayMonth } from "@/lib/utils";

const filters = ["All", "Recent", "Night", "Grounding", "Sleep"];

export function ArchiveFeed() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const latestRun = useLatestRun();

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
  const secondary = filteredArtifacts.slice(1, 3);
  const archiveList = filteredArtifacts.slice(3);

  return (
    <div className="route-section space-y-6">
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="serif-heading max-w-[14rem] text-balance text-[3.2rem] leading-[0.92]">
              Your Inner Echo Archive.
            </p>
            <p className="muted-copy max-w-sm text-sm">
              A quieter home for drawings, breath-linked rituals, and the
              patterns that reveal themselves over time.
            </p>
          </div>
          <Link href="/capture" className="primary-cta mt-1 size-12 shrink-0">
            <Plus className="size-5" />
          </Link>
        </div>

        <label className="soft-input flex items-center gap-3 px-4 py-3">
          <Search className="size-4 text-[rgba(117,123,116,0.9)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, state, or rhythm"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[rgba(117,123,116,0.68)]"
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
        <Link
          href={
            featured.id.startsWith("artifact-")
              ? "/artifact/latest"
              : `/artifact/${featured.id}`
          }
          className="block"
        >
          <section className="surface-panel-soft overflow-hidden rounded-[2.3rem] p-3">
            <ArtworkTile
              artifact={featured}
              className="aspect-[0.92]"
              title={featured.title}
              subtitle={`${formatDayMonth(featured.capturedAt)} • ${featured.coreInsight}`}
            />
            <div className="flex items-start justify-between gap-4 px-2 pb-1 pt-4">
              <div className="space-y-2">
                <p className="eyebrow">Featured reflection</p>
                <p className="muted-copy max-w-[15rem] text-sm">
                  {featured.coreInsight}
                </p>
              </div>
              <span className="secondary-cta size-11 shrink-0">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </section>
        </Link>
      ) : null}

      <section className="grid grid-cols-2 gap-3">
        <Link href="/compare" className="surface-panel rounded-[2rem] p-4">
          <p className="eyebrow">Compare over time</p>
          <p className="mt-3 font-serif text-[1.8rem] leading-[1.02] text-[var(--charcoal)]">
            Notice what changed.
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
            Soft summaries across your recent reflections.
          </p>
        </Link>
        <Link href="/sanctuary" className="surface-panel rounded-[2rem] p-4">
          <div className="secondary-cta size-11">
            <Wind className="size-5" />
          </div>
          <p className="mt-4 font-serif text-[1.8rem] leading-[1.02] text-[var(--charcoal)]">
            Ground first.
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
            Arrival, extended exhale, and quiet-night rituals.
          </p>
        </Link>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {secondary.map((artifact) => (
            <Link
              key={artifact.id}
              href={`/artifact/${artifact.id}`}
              className="surface-panel-soft rounded-[2rem] p-3"
            >
            <ArtworkTile artifact={artifact} className="aspect-square" />
            <div className="space-y-1 px-1 pt-3">
              <p className="eyebrow">Captured {formatDayMonth(artifact.capturedAt)}</p>
              <p className="font-serif text-[1.55rem] leading-[1.02] text-[var(--charcoal)]">
                {artifact.title}
              </p>
              <p className="text-sm text-[rgba(117,123,116,0.9)]">
                {artifact.coreInsight}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="surface-panel rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-4">
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
            <div key={prompt} className="surface-panel-soft rounded-[1.6rem] p-4">
              <p className="text-sm font-medium text-[var(--charcoal)]">{prompt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 pb-6">
        {archiveList.map((artifact) => (
          <Link
            key={artifact.id}
            href={`/artifact/${artifact.id}`}
            className="surface-panel-soft grid grid-cols-[92px_1fr] gap-3 rounded-[1.9rem] p-3"
          >
            <ArtworkTile artifact={artifact} className="aspect-square h-[92px]" />
            <div className="space-y-2 py-1">
              <p className="eyebrow">Captured {formatDayMonth(artifact.capturedAt)}</p>
              <p className="font-serif text-[1.45rem] leading-[1.02] text-[var(--charcoal)]">
                {artifact.title}
              </p>
              <p className="text-sm text-[rgba(117,123,116,0.9)]">
                {artifact.coreInsight}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
