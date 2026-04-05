import type {
  Artifact,
  BreathPractice,
  Comparison,
  Guide,
  Reflection,
  ShopProduct,
} from "@/lib/contracts";

export const seedProfile = {
  name: "Ravi",
  sanctuaryLabel: "Your Inner Sanctuary",
  tone: "softly-held",
  timezone: "Asia/Calcutta",
  streakDays: 12,
};

export const seedArtifacts: Artifact[] = [
  {
    id: "a-threshold",
    title: "The Threshold of Stillness",
    capturedAt: "2026-04-03T20:10:00.000Z",
    sourceType: "camera",
    imageVariant: "mist",
    coreInsight: "A softer boundary is beginning to appear.",
    thumbnail: {
      kind: "threshold",
      alt: "A misty threshold-like composition with a softened center and quiet horizon.",
      hint: "Permission",
    },
    orientation: "portrait",
  },
  {
    id: "a-resonance",
    title: "Somatic Resonance",
    capturedAt: "2026-04-01T11:05:00.000Z",
    sourceType: "upload",
    imageVariant: "water",
    coreInsight: "Your marks are settling into steadier rhythm.",
    thumbnail: {
      kind: "ripples",
      alt: "Soft horizontal ripples suggesting steadier rhythm and resonance.",
      hint: "Rhythm",
    },
    orientation: "portrait",
  },
  {
    id: "a-night",
    title: "Night Whispers",
    capturedAt: "2026-03-29T15:48:00.000Z",
    sourceType: "camera",
    imageVariant: "forest",
    coreInsight: "Restlessness is giving way to something more spacious.",
    thumbnail: {
      kind: "canopy",
      alt: "A deep green canopy with a vertical clearing, evoking night and space opening.",
      hint: "Night",
    },
    orientation: "portrait",
  },
  {
    id: "a-golden",
    title: "Chlorophyll & Calm",
    capturedAt: "2026-03-25T08:22:00.000Z",
    sourceType: "upload",
    imageVariant: "glow",
    coreInsight: "Warmth and steadiness are sharing the frame.",
    thumbnail: {
      kind: "dawn",
      alt: "Warm diagonal light across a soft field, suggesting warmth and steadiness.",
      hint: "Warmth",
    },
    orientation: "portrait",
  },
];

export const seedReflections: Record<string, Reflection> = {
  "a-threshold": {
    artifactId: "a-threshold",
    userId: "demo-user",
    status: "completed",
    coreReflection:
      "Your reflection suggests a shift toward openness, with more space around the center and less compression at the edges.",
    overallStructure:
      "The composition moves from density to release, creating a threshold effect rather than a closed container.",
    energyLine:
      "Energy appears softer and more wave-like than jagged, with a pacing that feels steady rather than urgent.",
    directionalProcess:
      "The movement trends outward, as if the drawing is allowing more breath to enter the scene.",
    symbolicZones:
      "The lower half carries grounding, while the brighter upper field introduces permission and spaciousness.",
    emotionalNarrative:
      "There is a gentle narrative of exhale here: less bracing, more listening, and a cautious return to safety.",
    comparativeContext:
      "Compared with your earlier work, this image feels less defended and more available to contact.",
    integrationPrompt:
      "What feels a little easier to name now that the image has had time to settle?",
    goldenInsight:
      "You are not forcing calm. You are making room for it.",
    safetyFlags: ["supportive-language-verified"],
    modelVersion: "reflectdraw-editorial-v1",
    generatedAt: "2026-04-03T20:12:00.000Z",
    breathMode: "extended-exhale",
    resonanceLabel: "84% coherence",
    confidenceLabel: "High signal clarity",
    keyThemes: ["Groundedness", "Connection", "Growth"],
  },
};

export const seedComparison: Comparison = {
  id: "cmp-spring",
  artifactAId: "a-night",
  artifactBId: "a-threshold",
  comparisonText:
    "Compared with your March reflection, the newest drawing feels lighter, with more openness around the center and less pressure gathered in the corners.",
  createdAt: "2026-04-03T20:14:00.000Z",
  headline: "Openness is becoming easier to sustain.",
  prompt: "What feels more available to you now than it did a week ago?",
};

export const breathPractices: BreathPractice[] = [
  {
    id: "bp-arrival",
    title: "Arrival Breath",
    mode: "arrival",
    durationSeconds: 75,
    tone: "Settle before drawing",
    description: "A brief inhale-exhale rhythm to help your attention land.",
  },
  {
    id: "bp-box",
    title: "Box Breathing",
    mode: "box",
    durationSeconds: 180,
    tone: "Regulate through structure",
    description: "Four equal phases for moments that need shape and steadiness.",
  },
  {
    id: "bp-extended",
    title: "Extended Exhale",
    mode: "extended-exhale",
    durationSeconds: 180,
    tone: "Downshift overwhelm",
    description: "A softer out-breath for anxious or over-full moments.",
  },
  {
    id: "bp-wind",
    title: "Wind-down Breath",
    mode: "wind-down",
    durationSeconds: 240,
    tone: "Night ritual",
    description: "Slower pacing, lower stimulation, and a gentler finish to the day.",
  },
];

export const seedGuides: Guide[] = [
  {
    id: "guide-aisha",
    name: "Aisha Raman",
    bio: "Somatic guide focused on grounding rituals, imagery, and bedtime transitions.",
    specialties: ["Sleep support", "Grounding", "Reflective drawing"],
    bookingLink: "#request-guide",
    active: true,
  },
  {
    id: "guide-emil",
    name: "Emil Hart",
    bio: "Breath and pacing coach for stress cycles, preparation, and post-reflection integration.",
    specialties: ["Breathwork", "Nervous system pacing", "Integration"],
    bookingLink: "#request-guide",
    active: true,
  },
];

export const shopProducts: ShopProduct[] = [
  {
    id: "shop-journal",
    title: "Somatic Journal Set",
    description: "A textured prompt journal paired with low-light reflection cards.",
    price: "INR 1,950",
    active: true,
  },
  {
    id: "shop-atmosphere",
    title: "Quiet Atmosphere Pack",
    description: "Sleep-supportive soundscapes and ritual starters for evening practice.",
    price: "INR 990",
    active: true,
  },
];

export const promptLibrary = [
  "What is loosening here without being forced?",
  "Where do you notice rhythm rather than pressure?",
  "Which part of the image feels like it wants more space?",
  "What would tonight feel like with ten percent less urgency?",
];
