import { LegalDocument } from "@/components/legal-document";

const sections = [
  {
    title: "What we collect",
    body:
      "ReflectDraw collects the information needed to run the product you choose to use: account details such as email and profile metadata, uploaded drawings or photos, written notes, breath session usage, and product telemetry when you explicitly grant analytics consent. We do not need passive phone surveillance or broad sensor harvesting to deliver the current product.",
  },
  {
    title: "How your data is used",
    body:
      "Your data is used to authenticate you, store your archive, generate thumbnails, deliver AI reflections, send transactional emails, and improve reliability and safety. AI requests are orchestrated server-side whenever possible, and outputs are intended to be reflective, non-diagnostic, and logged with versioning for safety review. Raw reflection content should not be sent into analytics pipelines.",
  },
  {
    title: "Private storage and sharing",
    body:
      "Artifact images and derived previews are intended to live in private storage with signed access. We avoid exposing sensitive URLs more broadly than needed. If sharing features are enabled on your device, they are initiated by you. We do not publish your reflections publicly by default.",
  },
  {
    title: "Retention and deletion",
    body:
      "You should be able to review, export, or delete your content with low friction. Some operational logs, error traces, and security records may persist for a limited period to protect the service and investigate failures, but they should avoid storing unnecessary reflective content whenever possible.",
  },
  {
    title: "Safety posture",
    body:
      "ReflectDraw is designed to support grounding, not clinical diagnosis. If an input suggests acute distress, the product should bias toward humane, low-certainty language and encourage human help rather than escalating interpretive confidence. If you need urgent help, contact local emergency or crisis support rather than relying on the app.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy policy"
      title="Your reflections deserve privacy by default."
      updatedOn="April 5, 2026"
      sections={sections}
    />
  );
}
