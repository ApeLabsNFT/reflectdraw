import { randomUUID } from "node:crypto";
import type { CapturePayload, DemoRun } from "@/lib/contracts";

const themes = [
  {
    match: /sleep|night|rest|bed|insomnia/i,
    insight: "Your marks lean toward settling rather than activation.",
    structure:
      "The image gathers softly around the center, leaving the edges open enough to suggest winding down instead of vigilance.",
    energy:
      "The line quality feels slower and more rounded, like the body looking for a quieter cadence.",
    process:
      "Directionally, the movement is descending and softening rather than pushing outward.",
    zones:
      "The lower field feels like a cradle, while the lighter space above introduces room to exhale.",
    narrative:
      "Emotionally, there is fatigue here, but not collapse. It feels more like a wish for gentleness than a plea for escape.",
    comparison:
      "Across your recent reflections, this one feels the most prepared for quiet.",
    prompt:
      "What would help your evening feel held instead of managed?",
    golden: "Rest begins where pressure ends.",
    breath: "wind-down" as const,
    variant: "water" as const,
    thumbnailKind: "ripples" as const,
    thumbnailAlt:
      "Soft water-like ripples suggesting a quieter night rhythm.",
    resonance: "Settling",
    confidence: "Night-signal clarity",
    themes: ["Rest", "Permission", "Gentleness"],
  },
  {
    match: /anxious|panic|tight|overwhelm|racing/i,
    insight: "This drawing is already trying to create more room than the mind is allowing.",
    structure:
      "The structure holds tension in one zone while opening another, which often reads as an honest attempt to regulate in real time.",
    energy:
      "The energy line is alert, but not chaotic. There is still pattern and rhythm inside the activation.",
    process:
      "The movement looks like it wants to travel outward and then settle, rather than stay trapped in a loop.",
    zones:
      "The most charged area is balanced by softer pockets that keep the whole image from tipping into overwhelm.",
    narrative:
      "Emotionally, this feels like a body trying to come back into contact with itself.",
    comparison:
      "Compared with more compressed images, this one already contains more exits and more breath.",
    prompt:
      "Where in your body do you notice even a small shift from pressure toward possibility?",
    golden: "Relief often starts as a little more space.",
    breath: "extended-exhale" as const,
    variant: "forest" as const,
    thumbnailKind: "canopy" as const,
    thumbnailAlt:
      "A darker canopy opening into space, reflecting tension releasing outward.",
    resonance: "Expansion",
    confidence: "High signal clarity",
    themes: ["Groundedness", "Release", "Rhythm"],
  },
];

const defaultTheme = {
  insight: "The drawing feels receptive, as if it is listening as much as expressing.",
  structure:
    "There is a balanced structure here: enough density to hold meaning, enough openness to let interpretation breathe.",
  energy:
    "The energy line is steady and intentional, with a pacing that suggests observation over urgency.",
  process:
    "The movement appears to widen gradually, giving the image a sense of unfolding rather than arriving all at once.",
  zones:
    "Darker or denser zones carry grounding, while the lighter field adds perspective and softness.",
  narrative:
    "Emotionally, the image carries contemplation, patience, and a willingness to notice what is changing.",
  comparison:
    "In the broader arc of your reflections, this feels more spacious and more integrated than tightly defended.",
  prompt:
    "What feels ready to be witnessed here without needing to be solved?",
  golden: "Clarity can be quiet and still be real.",
  breath: "arrival" as const,
  variant: "glow" as const,
  thumbnailKind: "echo" as const,
  thumbnailAlt:
    "Concentric, echoing forms suggesting openness, presence, and quiet clarity.",
  resonance: "Grounded",
  confidence: "Steady resonance",
  themes: ["Openness", "Presence", "Ease"],
};

export function createDemoRun(payload: CapturePayload): DemoRun {
  const joined = `${payload.threeWords.join(" ")} ${payload.freeText}`.trim();
  const tone =
    themes.find((theme) => theme.match.test(joined)) ?? defaultTheme;
  const artifactId = `artifact-${randomUUID().slice(0, 8)}`;
  const now = new Date().toISOString();
  const headlineWord = payload.threeWords[0] ?? tone.themes[0];

  return {
    capture: payload,
    artifact: {
      id: artifactId,
      title: `Field of ${headlineWord[0]?.toUpperCase() ?? "C"}${headlineWord.slice(1)}`,
      capturedAt: now,
      sourceType: payload.sourceType,
      imageVariant: tone.variant,
      coreInsight: tone.insight,
      thumbnail: payload.previewUrl
        ? {
            kind: "uploaded",
            alt: "User uploaded drawing preview for the latest reflection.",
            previewUrl: payload.previewUrl,
            hint: payload.selectedResonance,
          }
        : {
            kind: tone.thumbnailKind,
            alt: tone.thumbnailAlt,
            hint: payload.selectedResonance,
          },
      orientation: "portrait",
    },
    reflection: {
      artifactId,
      userId: "demo-user",
      status: "completed",
      coreReflection: tone.insight,
      overallStructure: tone.structure,
      energyLine: tone.energy,
      directionalProcess: tone.process,
      symbolicZones: tone.zones,
      emotionalNarrative: tone.narrative,
      comparativeContext: tone.comparison,
      integrationPrompt: tone.prompt,
      goldenInsight: tone.golden,
      safetyFlags: ["supportive-language-verified", "non-diagnostic"],
      modelVersion: "reflectdraw-editorial-v1",
      generatedAt: now,
      breathMode: tone.breath,
      resonanceLabel: tone.resonance,
      confidenceLabel: tone.confidence,
      keyThemes: tone.themes,
    },
  };
}
