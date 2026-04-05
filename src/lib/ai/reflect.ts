import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { CapturePayload, DemoRun } from "@/lib/contracts";
import { breathModeSchema } from "@/lib/contracts";
import { createDemoRun } from "@/lib/demo-pipeline";

const modelOutputSchema = z.object({
  coreReflection: z.string(),
  overallStructure: z.string(),
  energyLine: z.string(),
  directionalProcess: z.string(),
  symbolicZones: z.string(),
  emotionalNarrative: z.string(),
  comparativeContext: z.string(),
  integrationPrompt: z.string(),
  goldenInsight: z.string(),
  breathMode: breathModeSchema,
  resonanceLabel: z.string(),
  confidenceLabel: z.string(),
  keyThemes: z.array(z.string()).min(3).max(5),
  imageVariant: z.enum(["glow", "mist", "forest", "water", "lotus"]),
  thumbnailKind: z.enum(["threshold", "ripples", "canopy", "dawn", "bloom", "echo"]),
  thumbnailAlt: z.string(),
  safetyFlags: z.array(z.string()).min(1),
});

const modelResponseJsonSchema = {
  type: "object",
  properties: {
    coreReflection: { type: "string" },
    overallStructure: { type: "string" },
    energyLine: { type: "string" },
    directionalProcess: { type: "string" },
    symbolicZones: { type: "string" },
    emotionalNarrative: { type: "string" },
    comparativeContext: { type: "string" },
    integrationPrompt: { type: "string" },
    goldenInsight: { type: "string" },
    breathMode: {
      type: "string",
      enum: ["arrival", "box", "extended-exhale", "wind-down", "physiological-sigh"],
    },
    resonanceLabel: { type: "string" },
    confidenceLabel: { type: "string" },
    keyThemes: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5,
    },
    imageVariant: {
      type: "string",
      enum: ["glow", "mist", "forest", "water", "lotus"],
    },
    thumbnailKind: {
      type: "string",
      enum: ["threshold", "ripples", "canopy", "dawn", "bloom", "echo"],
    },
    thumbnailAlt: { type: "string" },
    safetyFlags: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
    },
  },
  required: [
    "coreReflection",
    "overallStructure",
    "energyLine",
    "directionalProcess",
    "symbolicZones",
    "emotionalNarrative",
    "comparativeContext",
    "integrationPrompt",
    "goldenInsight",
    "breathMode",
    "resonanceLabel",
    "confidenceLabel",
    "keyThemes",
    "imageVariant",
    "thumbnailKind",
    "thumbnailAlt",
    "safetyFlags",
  ],
};

const diagnosisLikePatterns = [
  /\bdiagnos(?:e|is|ed)\b/gi,
  /\bdepression\b/gi,
  /\banxiety disorder\b/gi,
  /\bptsd\b/gi,
  /\bbipolar\b/gi,
  /\badhd\b/gi,
  /\binsomnia disorder\b/gi,
  /\bclinically\b/gi,
  /\btreatment plan\b/gi,
  /\bprescription\b/gi,
];

const certaintyPatterns = [
  { pattern: /\bthis means\b/gi, replacement: "this may suggest" },
  { pattern: /\byou are\b/gi, replacement: "you may be feeling" },
  { pattern: /\bclearly\b/gi, replacement: "gently" },
  { pattern: /\bdefinitely\b/gi, replacement: "possibly" },
];

const supportRiskPattern =
  /\b(kill myself|suicide|suicidal|self-harm|self harm|hurt myself|want to die)\b/i;

function getGoogleApiKey() {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    undefined
  );
}

function getGemmaModel() {
  return process.env.GOOGLE_GEMMA_MODEL ?? "gemma-3-27b-it";
}

function parseInlineImage(previewUrl?: string) {
  if (!previewUrl) {
    return null;
  }

  const match = previewUrl.match(/^data:([^;]+);base64,(.+)$/);

  if (!match?.[1] || !match[2]) {
    return null;
  }

  return {
    mimeType: match[1],
    data: match[2],
  };
}

function classifyContext(payload: CapturePayload) {
  const source = `${payload.threeWords.join(" ")} ${payload.freeText}`.trim();

  if (/sleep|night|rest|bed|insomnia|tired/i.test(source)) {
    return "sleep";
  }

  if (/anxious|panic|tight|overwhelm|racing|stress/i.test(source)) {
    return "activation";
  }

  return "general";
}

function toneInstruction(tone: CapturePayload["preferredTone"]) {
  if (tone === "softly-held") {
    return "Use warm, steady, non-clinical language with soft edges.";
  }

  if (tone === "clear-eyed") {
    return "Be grounded, direct, and gentle without becoming cold or diagnostic.";
  }

  return "Use lyrical language sparingly, but remain concrete and easy to understand.";
}

function scopePrompt(payload: CapturePayload) {
  const context = classifyContext(payload);
  const lines = [
    "You are ReflectDraw, an AI writer inside a somatic reflection and regulation app.",
    "Your scope is limited to this app only: grounding, breath pairing, non-diagnostic image reflection, bedtime wind-down support, and gentle integration prompts.",
    "Never diagnose, label disorders, prescribe treatment, mention medications, claim certainty, or act like a therapist, doctor, crisis line, general-purpose assistant, or life coach.",
    "Do not provide advice outside the artifact reflection workflow. If the input suggests acute distress, use concise supportive language, lower interpretive confidence, and encourage reaching out to trusted human or crisis support.",
    "Keep every section emotionally intelligent, non-shaming, and rooted in observation rather than certainty.",
    toneInstruction(payload.preferredTone),
    `The user's selected resonance is "${payload.selectedResonance}".`,
    `The user's three words are: ${payload.threeWords.join(", ") || "none"}.`,
    payload.freeText
      ? `The user note is: ${payload.freeText}`
      : "The user did not add a note. Reflect gently from the artifact and selected state only.",
    context === "sleep"
      ? "Bias toward wind-down, permission, low stimulation, and sleep-supportive ritual language without claiming to treat insomnia."
      : context === "activation"
        ? "Bias toward grounding, nervous-system downshifting, and spaciousness without implying pathology."
        : "Bias toward curiosity, pacing, and gentle integration.",
  ];

  return lines.join("\n");
}

function sanitizeText(text: string) {
  let next = text;

  for (const pattern of diagnosisLikePatterns) {
    next = next.replace(pattern, "pattern");
  }

  for (const rule of certaintyPatterns) {
    next = next.replace(rule.pattern, rule.replacement);
  }

  return next.replace(/\s+/g, " ").trim();
}

function applySafety(output: z.infer<typeof modelOutputSchema>) {
  return {
    ...output,
    coreReflection: sanitizeText(output.coreReflection),
    overallStructure: sanitizeText(output.overallStructure),
    energyLine: sanitizeText(output.energyLine),
    directionalProcess: sanitizeText(output.directionalProcess),
    symbolicZones: sanitizeText(output.symbolicZones),
    emotionalNarrative: sanitizeText(output.emotionalNarrative),
    comparativeContext: sanitizeText(output.comparativeContext),
    integrationPrompt: sanitizeText(output.integrationPrompt),
    goldenInsight: sanitizeText(output.goldenInsight),
    resonanceLabel: sanitizeText(output.resonanceLabel),
    confidenceLabel: sanitizeText(output.confidenceLabel),
    keyThemes: output.keyThemes.map((theme) => sanitizeText(theme)),
    thumbnailAlt: sanitizeText(output.thumbnailAlt),
    safetyFlags: [...new Set([...output.safetyFlags, "non-diagnostic", "scope-limited"])],
  };
}

function createSupportRun(payload: CapturePayload): DemoRun {
  const now = new Date().toISOString();
  const artifactId = `artifact-${randomUUID().slice(0, 8)}`;
  const preview = parseInlineImage(payload.previewUrl);

  return {
    capture: payload,
    artifact: {
      id: artifactId,
      title: "Immediate Support Reflection",
      capturedAt: now,
      sourceType: payload.sourceType,
      imageVariant: "mist",
      coreInsight: "This moment deserves human care before interpretation.",
      thumbnail: payload.previewUrl
        ? {
            kind: "uploaded",
            alt: "User provided drawing preview for a support-first reflection.",
            previewUrl: payload.previewUrl,
            hint: payload.selectedResonance,
          }
        : {
            kind: "dawn",
            alt: "A softened dawn field signaling pause and human support.",
            hint: payload.selectedResonance,
          },
      orientation: "portrait",
    },
    reflection: {
      artifactId,
      userId: "support-first",
      status: "completed",
      coreReflection:
        "I want to stay very gentle here: this feels important enough that human support matters more than interpretation right now.",
      overallStructure:
        "Rather than reading deep meaning into the image, the safest next step is to pause and reduce stimulation.",
      energyLine:
        "The energy here reads as strained enough that steadiness and contact matter more than analysis.",
      directionalProcess:
        "Move toward a trusted person, local crisis support, or emergency help if you feel unable to stay safe.",
      symbolicZones:
        "Let the image simply mark that something hard is here. It does not need to prove anything else.",
      emotionalNarrative:
        "Your experience deserves care, not pressure. You do not have to hold it alone.",
      comparativeContext:
        "This reflection is intentionally more safety-forward than interpretive because the language suggests extra care is needed.",
      integrationPrompt:
        "Can you put the phone down, take one slower exhale, and contact a trusted human or local crisis support now?",
      goldenInsight: "Safety comes before meaning-making.",
      safetyFlags: [
        "non-diagnostic",
        "crisis-support-encouraged",
        preview ? "image-included" : "text-only",
      ],
      modelVersion: "reflectdraw-support-first-v1",
      generatedAt: now,
      breathMode: "arrival",
      resonanceLabel: "Support first",
      confidenceLabel: "Low-interpretation safety mode",
      keyThemes: ["Pause", "Contact", "Care"],
    },
  };
}

function createRunFromModel(
  payload: CapturePayload,
  output: z.infer<typeof modelOutputSchema>,
  modelVersion: string,
): DemoRun {
  const now = new Date().toISOString();
  const artifactId = `artifact-${randomUUID().slice(0, 8)}`;
  const headlineWord = payload.threeWords[0] ?? output.keyThemes[0] ?? "echo";

  return {
    capture: payload,
    artifact: {
      id: artifactId,
      title: `Field of ${headlineWord[0]?.toUpperCase() ?? "E"}${headlineWord.slice(1)}`,
      capturedAt: now,
      sourceType: payload.sourceType,
      imageVariant: output.imageVariant,
      coreInsight: output.coreReflection,
      thumbnail: payload.previewUrl
        ? {
            kind: "uploaded",
            alt: "User uploaded drawing preview for the latest reflection.",
            previewUrl: payload.previewUrl,
            hint: payload.selectedResonance,
          }
        : {
            kind: output.thumbnailKind,
            alt: output.thumbnailAlt,
            hint: payload.selectedResonance,
          },
      orientation: "portrait",
    },
    reflection: {
      artifactId,
      userId: "ai-user",
      status: "completed",
      coreReflection: output.coreReflection,
      overallStructure: output.overallStructure,
      energyLine: output.energyLine,
      directionalProcess: output.directionalProcess,
      symbolicZones: output.symbolicZones,
      emotionalNarrative: output.emotionalNarrative,
      comparativeContext: output.comparativeContext,
      integrationPrompt: output.integrationPrompt,
      goldenInsight: output.goldenInsight,
      safetyFlags: output.safetyFlags,
      modelVersion,
      generatedAt: now,
      breathMode: output.breathMode,
      resonanceLabel: output.resonanceLabel,
      confidenceLabel: output.confidenceLabel,
      keyThemes: output.keyThemes,
    },
  };
}

async function callGemma(
  payload: CapturePayload,
): Promise<{ output: z.infer<typeof modelOutputSchema>; modelVersion: string }> {
  const apiKey = getGoogleApiKey();

  if (!apiKey) {
    throw new Error("Google AI key missing");
  }

  const model = getGemmaModel();
  const prompt = scopePrompt(payload);
  const image = parseInlineImage(payload.previewUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: prompt }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "Generate ReflectDraw JSON only. Use the selected tone, resonance, note, and optional image as inputs.",
                },
                ...(image
                  ? [
                      {
                        inline_data: {
                          mime_type: image.mimeType,
                          data: image.data,
                        },
                      },
                    ]
                  : []),
              ],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            topP: 0.9,
            responseMimeType: "application/json",
            responseJsonSchema: modelResponseJsonSchema,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemma request failed with ${response.status}`);
    }

    const json = await response.json();
    const text = json.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    if (!text) {
      throw new Error("Gemma response was empty");
    }

    const parsed = modelOutputSchema.parse(JSON.parse(text));

    return {
      output: applySafety(parsed),
      modelVersion: model,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function generateReflectiveRun(payload: CapturePayload) {
  const riskSource = `${payload.threeWords.join(" ")} ${payload.freeText}`;

  if (supportRiskPattern.test(riskSource)) {
    return createSupportRun(payload);
  }

  try {
    const { output, modelVersion } = await callGemma(payload);
    return createRunFromModel(payload, output, modelVersion);
  } catch {
    return createDemoRun(payload);
  }
}
