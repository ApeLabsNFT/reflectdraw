"use client";

import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Camera,
  Check,
  ImagePlus,
  LoaderCircle,
  PenLine,
  Smartphone,
  Wind,
} from "lucide-react";
import type { CapturePayload } from "@/lib/contracts";
import { capturePayloadSchema } from "@/lib/contracts";
import { breathPractices } from "@/lib/demo-data";
import { trackClientEvent } from "@/lib/analytics";
import { useBooleanPreference } from "@/lib/preferences";
import { writeLatestRun } from "@/lib/storage";

const resonanceOptions = [
  "Grounded",
  "Expansive",
  "Neutral",
  "Fluttering",
  "Tight",
  "Open",
];

const toneOptions: CapturePayload["preferredTone"][] = [
  "softly-held",
  "clear-eyed",
  "poetic",
];

const wordOptions = [
  "grounded",
  "soft",
  "restless",
  "expansive",
  "foggy",
  "open",
  "tender",
  "steady",
];

export function CaptureRitual() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [selectedResonance, setSelectedResonance] = useState("Expansive");
  const [selectedTone, setSelectedTone] =
    useState<CapturePayload["preferredTone"]>("softly-held");
  const [selectedWords, setSelectedWords] = useState<string[]>(["soft", "open"]);
  const [freeText, setFreeText] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [imageMimeType, setImageMimeType] = useState<string>();
  const [selectedSourceType, setSelectedSourceType] =
    useState<CapturePayload["sourceType"]>("upload");
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    camera: false,
    share: false,
    haptics: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deferredText = useDeferredValue(freeText);
  const [hapticsEnabled] = useBooleanPreference("haptics-enabled", true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setDeviceCapabilities({
      camera:
        typeof navigator !== "undefined" &&
        (Boolean(navigator.mediaDevices) ||
          /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)),
      share: typeof navigator !== "undefined" && typeof navigator.share === "function",
      haptics:
        typeof navigator !== "undefined" && typeof navigator.vibrate === "function",
    });
  }, []);

  async function fileToDataUrl(file: File) {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
          return;
        }

        reject(new Error("Unable to read image"));
      };
      reader.onerror = () => reject(new Error("Unable to read image"));
      reader.readAsDataURL(file);
    });
  }

  function pulse(pattern: number | number[] = 14) {
    if (
      !hapticsEnabled ||
      typeof navigator === "undefined" ||
      typeof navigator.vibrate !== "function"
    ) {
      return;
    }

    navigator.vibrate(pattern);
  }

  async function handleImageSelection(
    file: File,
    sourceType: CapturePayload["sourceType"],
  ) {
    const nextPreview = await fileToDataUrl(file);
    setPreviewUrl(nextPreview);
    setImageMimeType(file.type || "image/jpeg");
    setSelectedSourceType(sourceType);
    pulse([12, 24, 18]);
    trackClientEvent("capture_image_uploaded", {
      mime_type: file.type || "unknown",
      source: sourceType,
    });
  }

  function toggleWord(word: string) {
    setSelectedWords((current) => {
      if (current.includes(word)) {
        return current.filter((item) => item !== word);
      }

      if (current.length === 3) {
        return [...current.slice(1), word];
      }

      return [...current, word];
    });
  }

  async function submitReflection() {
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = capturePayloadSchema.parse({
        threeWords: selectedWords,
        freeText,
        preferredTone: selectedTone,
        sourceType: previewUrl ? selectedSourceType : "upload",
        selectedResonance,
        previewUrl,
        imageMimeType,
      });

      trackClientEvent("reflection_submission_started", {
        has_image: Boolean(previewUrl),
        tone: selectedTone,
        resonance: selectedResonance,
        words_selected: selectedWords.length,
      });

      const response = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const reflectResponse =
        response.ok
          ? response
          : await fetch("/api/demo/reflect", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      if (!reflectResponse.ok) {
        throw new Error("Unable to create reflection");
      }

      const run = await reflectResponse.json();
      writeLatestRun(run);
      pulse([18, 30, 18]);
      trackClientEvent("reflection_submission_succeeded", {
        has_image: Boolean(previewUrl),
        breath_mode: run.reflection.breathMode,
      });
      router.push("/processing");
    } catch (submitError) {
      trackClientEvent("reflection_submission_failed", {
        has_image: Boolean(previewUrl),
      });
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something softened out of reach. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <section className="space-y-4">
        <p className="eyebrow">The Daily Ritual</p>
        <h1 className="serif-heading max-w-[16rem] text-balance text-[3.3rem] leading-[0.91]">
          In this moment, how are you feeling?
        </h1>
        <p className="muted-copy max-w-sm text-sm">
          Let the thought arrive first. Add a drawing or photo if you want the
          reflection anchored to something visible.
        </p>
      </section>

      <section className="surface-panel overflow-hidden rounded-[2.4rem] p-3">
        {previewUrl ? (
          <div
            className="aspect-[0.92] rounded-[2rem] bg-cover bg-center"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        ) : (
          <div className="paper-image artwork-glow aspect-[0.92] w-full">
            <div className="flex h-full flex-col justify-between p-5">
              <div className="surface-panel inline-flex w-fit items-center gap-2 rounded-full px-3 py-2">
                <Camera className="size-4 text-[var(--sage)]" />
                <span className="text-xs font-semibold tracking-[0.14em] text-[var(--sage)] uppercase">
                  Paper frame ready
                </span>
              </div>
              <div className="space-y-2 rounded-[1.8rem] bg-[rgba(255,255,255,0.72)] p-4 backdrop-blur-xl">
                <p className="eyebrow">Capture ritual</p>
                <p className="font-serif text-[1.9rem] leading-[1.02] text-[var(--charcoal)]">
                  Give your image room to breathe.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-3 px-2 pb-1 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="secondary-cta h-12 px-4 text-sm font-semibold"
            >
              <Camera className="size-4" />
              Use camera
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="secondary-cta h-12 px-4 text-sm font-semibold"
            >
              <ImagePlus className="size-4" />
              Photo library
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(undefined);
              setImageMimeType(undefined);
            }}
            className="secondary-cta h-12 px-4 text-sm font-semibold"
          >
            <PenLine className="size-4" />
            Text-only ritual
          </button>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              try {
                await handleImageSelection(file, "camera");
              } catch (uploadError) {
                setError(
                  uploadError instanceof Error
                    ? uploadError.message
                    : "Unable to read the selected camera image.",
                );
              }
            }}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              try {
                await handleImageSelection(file, "upload");
              } catch (uploadError) {
                setError(
                  uploadError instanceof Error
                    ? uploadError.message
                    : "Unable to read the selected image.",
                );
              }
            }}
          />
        </div>
      </section>

      <section className="surface-panel-soft rounded-[2rem] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Phone features</p>
          <span className="text-xs text-[rgba(117,123,116,0.78)]">
            Progressive enhancement
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            {
              label: "Camera",
              ready: deviceCapabilities.camera,
            },
            {
              label: "Share",
              ready: deviceCapabilities.share,
            },
            {
              label: "Haptics",
              ready: deviceCapabilities.haptics && hapticsEnabled,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="surface-panel flex items-center justify-center gap-2 rounded-[1.4rem] px-3 py-3 text-xs font-semibold"
            >
              {item.ready ? <Check className="size-3.5 text-[var(--sage)]" /> : <Smartphone className="size-3.5 text-[rgba(117,123,116,0.72)]" />}
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[1.2fr_0.8fr] gap-3">
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <p className="eyebrow">Somatic resonance</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {resonanceOptions.map((option) => (
              <button
                key={option}
                type="button"
                data-active={selectedResonance === option}
                onClick={() => setSelectedResonance(option)}
                className="ghost-chip px-3.5 py-2 text-xs font-semibold"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="surface-panel rounded-[2rem] p-4">
          <div className="secondary-cta size-10">
            <Wind className="size-4" />
          </div>
          <p className="mt-4 font-semibold text-[var(--charcoal)]">
            Arrival Breath
          </p>
          <p className="mt-2 text-xs text-[rgba(117,123,116,0.88)]">
            75 seconds of pacing before you continue.
          </p>
        </div>
      </section>

      <section className="surface-panel-soft rounded-[2rem] p-4">
        <p className="eyebrow">Three words</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {wordOptions.map((word) => (
            <button
              key={word}
              type="button"
              data-active={selectedWords.includes(word)}
              onClick={() => toggleWord(word)}
              className="ghost-chip px-3.5 py-2 text-xs font-semibold capitalize"
            >
              {word}
            </button>
          ))}
        </div>
      </section>

      <section className="surface-panel rounded-[2rem] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Preferred tone</p>
          <span className="text-xs text-[rgba(117,123,116,0.8)]">
            Shapes how the reflection speaks back
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone}
              type="button"
              data-active={selectedTone === tone}
              onClick={() => setSelectedTone(tone)}
              className="ghost-chip px-3 py-3 text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
            >
              {tone.replace("-", " ")}
            </button>
          ))}
        </div>
      </section>

      <section className="surface-panel-soft rounded-[2rem] p-4">
        <label className="block">
          <span className="eyebrow">Free text</span>
          <textarea
            value={freeText}
            onChange={(event) => setFreeText(event.target.value)}
            rows={6}
            placeholder="Allow your thoughts to settle here..."
            className="mt-3 w-full resize-none bg-transparent text-sm leading-7 outline-none placeholder:text-[rgba(117,123,116,0.62)]"
          />
        </label>
      </section>

      <section className="surface-panel rounded-[2rem] p-4">
        <p className="eyebrow">Live reflection preview</p>
        <p className="mt-3 font-serif text-[2rem] leading-[1.04] text-[var(--charcoal)]">
          {deferredText
            ? `"${deferredText.slice(0, 140)}${deferredText.length > 140 ? "..." : ""}"`
            : "Your note will rest here in a softer summary before processing."}
        </p>
      </section>

      <section className="surface-panel rounded-[2rem] p-4">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11 shrink-0">
            <Wind className="size-5" />
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--charcoal)]">
              {breathPractices[0].title}
            </p>
            <p className="text-sm text-[rgba(117,123,116,0.9)]">
              {breathPractices[0].description} The body can settle before the
              mind needs to interpret.
            </p>
          </div>
        </div>
      </section>

      {error ? (
        <div className="surface-panel rounded-[1.6rem] px-4 py-3 text-sm text-[var(--sage)]">
          {error}
        </div>
      ) : null}

      <div className="space-y-3">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            startTransition(() => {
              void submitReflection();
            });
          }}
          className="primary-cta h-15 w-full px-6 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              Saving your reflection
            </>
          ) : (
            <>
              Save this reflection
              <ArrowRight className="size-5" />
            </>
          )}
        </button>
        <button
          type="button"
          className="block w-full text-center text-xs font-semibold tracking-[0.16em] text-[rgba(117,123,116,0.8)] uppercase"
        >
          Discard draft
        </button>
      </div>
    </div>
  );
}
