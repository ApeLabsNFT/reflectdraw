"use client";

import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import type { BreathPractice } from "@/lib/contracts";

export function BreathOrb({
  mode,
  dark = false,
}: {
  mode: BreathPractice["mode"];
  dark?: boolean;
}) {
  const colorMap = {
    arrival: "rgba(217,230,211,0.55)",
    box: "rgba(196,214,204,0.58)",
    "extended-exhale": "rgba(173,205,188,0.58)",
    "wind-down": "rgba(131,158,144,0.62)",
    "physiological-sigh": "rgba(166,212,214,0.6)",
  } as const;

  return (
    <div className="relative flex items-center justify-center py-8">
      <motion.div
        className="breath-ring absolute size-64 rounded-full"
        animate={{ scale: [0.92, 1.03, 0.92], opacity: [0.32, 0.78, 0.32] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(86,98,83,0.12)" }}
      />
      <motion.div
        className="relative flex size-44 items-center justify-center rounded-full"
        animate={{ scale: [0.96, 1.06, 0.96], rotate: [0, 4, 0, -4, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 28%), ${colorMap[mode]}`,
          boxShadow: dark
            ? "0 45px 90px -60px rgba(255,255,255,0.4)"
            : "0 45px 90px -60px rgba(47,52,48,0.35)",
        }}
      >
        <div
          className="flex size-24 items-center justify-center rounded-full"
          style={{
            background: dark ? "rgba(36,43,37,0.8)" : "rgba(255,255,255,0.78)",
          }}
        >
          <Waves className={dark ? "text-white/70" : "text-[var(--sage)]"} />
        </div>
      </motion.div>
    </div>
  );
}
