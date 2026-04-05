import { z } from "zod";

export const preferredToneSchema = z.enum([
  "softly-held",
  "clear-eyed",
  "poetic",
]);

export const breathModeSchema = z.enum([
  "arrival",
  "box",
  "extended-exhale",
  "wind-down",
  "physiological-sigh",
]);

export const imageVariantSchema = z.enum([
  "glow",
  "mist",
  "forest",
  "water",
  "lotus",
]);

export const artifactThumbnailKindSchema = z.enum([
  "uploaded",
  "threshold",
  "ripples",
  "canopy",
  "dawn",
  "bloom",
  "echo",
]);

export const artifactThumbnailSchema = z.object({
  kind: artifactThumbnailKindSchema,
  alt: z.string(),
  previewUrl: z.string().optional(),
  hint: z.string().optional(),
});

export const artifactSchema = z.object({
  id: z.string(),
  title: z.string(),
  capturedAt: z.string(),
  sourceType: z.enum(["camera", "upload"]),
  imageVariant: imageVariantSchema,
  coreInsight: z.string(),
  thumbnail: artifactThumbnailSchema.optional(),
  orientation: z.enum(["portrait", "landscape"]).default("portrait"),
});

export const reflectionSchema = z.object({
  artifactId: z.string(),
  userId: z.string(),
  status: z.enum(["queued", "processing", "completed", "failed"]),
  coreReflection: z.string(),
  overallStructure: z.string(),
  energyLine: z.string(),
  directionalProcess: z.string(),
  symbolicZones: z.string(),
  emotionalNarrative: z.string(),
  comparativeContext: z.string(),
  integrationPrompt: z.string(),
  goldenInsight: z.string(),
  safetyFlags: z.array(z.string()),
  modelVersion: z.string(),
  generatedAt: z.string(),
  breathMode: breathModeSchema,
  resonanceLabel: z.string(),
  confidenceLabel: z.string(),
  keyThemes: z.array(z.string()),
});

export const comparisonSchema = z.object({
  id: z.string(),
  artifactAId: z.string(),
  artifactBId: z.string(),
  comparisonText: z.string(),
  createdAt: z.string(),
  headline: z.string(),
  prompt: z.string(),
});

export const guideSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
  specialties: z.array(z.string()),
  bookingLink: z.string(),
  active: z.boolean(),
});

export const shopProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  active: z.boolean(),
});

export const breathPracticeSchema = z.object({
  id: z.string(),
  title: z.string(),
  mode: breathModeSchema,
  durationSeconds: z.number(),
  tone: z.string(),
  description: z.string(),
});

export const capturePayloadSchema = z.object({
  threeWords: z.array(z.string()).max(3),
  freeText: z.string().max(500),
  preferredTone: preferredToneSchema,
  sourceType: z.enum(["camera", "upload"]),
  selectedResonance: z.string(),
  previewUrl: z.string().optional(),
});

export const demoRunSchema = z.object({
  artifact: artifactSchema,
  reflection: reflectionSchema,
  capture: capturePayloadSchema,
});

export type Artifact = z.infer<typeof artifactSchema>;
export type Reflection = z.infer<typeof reflectionSchema>;
export type Comparison = z.infer<typeof comparisonSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type ShopProduct = z.infer<typeof shopProductSchema>;
export type BreathPractice = z.infer<typeof breathPracticeSchema>;
export type CapturePayload = z.infer<typeof capturePayloadSchema>;
export type DemoRun = z.infer<typeof demoRunSchema>;
