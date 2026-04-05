"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

export function ShareReflectionButton() {
  const [message, setMessage] = useState<string | null>(null);

  function queueMessageClear() {
    window.setTimeout(() => setMessage(null), 2200);
  }

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "ReflectDraw reflection",
          text: "A reflective moment from ReflectDraw.",
          url,
        });
        setMessage("Shared from your device.");
        queueMessageClear();
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Link copied.");
      queueMessageClear();
    } catch {
      setMessage("Sharing is not available right now.");
      queueMessageClear();
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => void handleShare()}
        className="secondary-cta h-14 w-full px-4 text-sm font-semibold"
      >
        <Share2 className="size-4" />
        Share reflection
      </button>
      {message ? (
        <p className="text-center text-xs font-semibold tracking-[0.12em] text-[rgba(117,123,116,0.8)] uppercase">
          {message}
        </p>
      ) : null}
    </div>
  );
}
