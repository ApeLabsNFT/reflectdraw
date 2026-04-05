import type { Artifact } from "@/lib/contracts";
import { cn } from "@/lib/utils";

const variantClassName: Record<Artifact["imageVariant"], string> = {
  glow: "artwork-glow",
  mist: "artwork-mist",
  forest: "artwork-forest",
  water: "artwork-water",
  lotus: "artwork-lotus",
};

function ThumbnailScene({
  thumbnail,
  variant,
}: {
  thumbnail?: Artifact["thumbnail"];
  variant: Artifact["imageVariant"];
}) {
  if (thumbnail?.kind === "uploaded" && thumbnail.previewUrl) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnail.previewUrl})` }}
        aria-label={thumbnail.alt}
      />
    );
  }

  switch (thumbnail?.kind) {
    case "threshold":
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,30,33,0.96),rgba(214,219,220,0.78)_42%,rgba(40,43,45,0.96))]" />
          <div className="absolute inset-x-[18%] top-[18%] h-[56%] rounded-[2rem] border border-white/22 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.38),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
          <div className="absolute inset-x-0 top-[42%] h-[16%] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)]" />
        </>
      );
    case "ripples":
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,244,239,0.98),rgba(171,188,179,0.88),rgba(123,141,131,0.96))]" />
          <div className="absolute inset-x-0 top-[18%] h-[46%] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.25)_4px,rgba(111,138,125,0.12)_4px,rgba(111,138,125,0.12)_11px)]" />
          <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_72%)]" />
        </>
      );
    case "canopy":
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(196,201,173,0.9),rgba(82,102,76,0.96),rgba(28,35,30,0.98))]" />
          <div className="absolute left-[34%] top-0 h-full w-[24%] bg-[linear-gradient(180deg,rgba(241,230,163,0.4),rgba(241,230,163,0.08),transparent)] blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_58%)]" />
        </>
      );
    case "dawn":
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(97,86,64,0.92),rgba(255,244,214,0.9)_46%,rgba(109,94,68,0.94))]" />
          <div className="absolute -left-[6%] top-[8%] h-[88%] w-[40%] rotate-[28deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.04))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(255,255,255,0.28),transparent_24%)]" />
        </>
      );
    case "bloom":
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(240,244,236,0.96),rgba(211,225,206,0.88),rgba(171,188,167,0.94))]" />
          <div className="absolute left-[18%] top-[24%] size-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.52),transparent_72%)]" />
          <div className="absolute right-[14%] top-[34%] size-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.42),transparent_72%)]" />
          <div className="absolute bottom-[12%] left-1/2 h-20 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_72%)]" />
        </>
      );
    case "echo":
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,238,217,0.96),rgba(212,202,173,0.82),rgba(109,93,67,0.92))]" />
          <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/22" />
          <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/26" />
          <div className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_72%)]" />
        </>
      );
    default:
      return (
        <div
          className={cn("absolute inset-0", variantClassName[variant])}
        />
      );
  }
}

export function ArtworkTile({
  artifact,
  variant,
  className,
  title,
  subtitle,
}: {
  artifact?: Artifact;
  variant?: Artifact["imageVariant"];
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  const fallbackVariant = artifact?.imageVariant ?? variant ?? "glow";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem]",
        !artifact?.thumbnail?.kind ? variantClassName[fallbackVariant] : "",
        className,
      )}
    >
      <ThumbnailScene thumbnail={artifact?.thumbnail} variant={fallbackVariant} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_42%)]" />
      {artifact?.thumbnail?.hint ? (
        <div className="absolute left-3 top-3 rounded-full bg-[rgba(255,255,255,0.72)] px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-[var(--sage)] uppercase backdrop-blur-md">
          {artifact.thumbnail.hint}
        </div>
      ) : null}
      {title ? (
        <div className="absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-[rgba(24,26,23,0.76)] via-[rgba(24,26,23,0.3)] to-transparent px-4 pb-4 pt-12 text-white">
          <p className="font-serif text-2xl leading-tight">{title}</p>
          {subtitle ? (
            <p className="text-sm text-white/82">{subtitle}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
