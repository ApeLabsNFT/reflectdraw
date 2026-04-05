import { LegalDocument } from "@/components/legal-document";

const sections = [
  {
    title: "What ReflectDraw is",
    body:
      "ReflectDraw is a somatic reflection and regulation experience. It offers drawing-based reflection, breathwork, sleep-supportive rituals, and AI-generated language intended to help users notice patterns and feel more grounded. It is not a diagnostic system, a medical device, or a replacement for licensed mental health care.",
  },
  {
    title: "Appropriate use",
    body:
      "You agree to use ReflectDraw for personal reflection, nervous-system downshifting, journaling, and pattern noticing. You agree not to rely on it for medical diagnosis, crisis support, legal advice, emergency decisions, or high-stakes treatment planning. If you feel unsafe, at risk, or unable to care for yourself, seek local emergency or crisis support immediately.",
  },
  {
    title: "AI feedback boundaries",
    body:
      "ReflectDraw's AI is scoped only to the app's experience. It may summarize, gently interpret, suggest a breath pairing, or offer an integration prompt. It must not diagnose conditions, prescribe treatment, shame you, impersonate a clinician, or act outside the reflective workflow. You remain responsible for deciding what feels useful and what does not.",
  },
  {
    title: "Accounts and content",
    body:
      "You are responsible for your account credentials and for the content you upload or write. You retain ownership of your drawings, photos, and notes. By using the service, you grant ReflectDraw permission to process that content solely to operate the features you request, such as storage, thumbnails, and reflective AI output generation.",
  },
  {
    title: "Availability and changes",
    body:
      "Features may evolve as we improve reliability, safety, and privacy. We may add, pause, or remove features, including AI providers and integrations, when needed to reduce risk or improve the product. Where possible, we will avoid changes that compromise access to your saved material without notice.",
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms and conditions"
      title="Use ReflectDraw with clear expectations."
      updatedOn="April 5, 2026"
      sections={sections}
    />
  );
}
