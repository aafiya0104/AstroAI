"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { scanUrl, cacheScanResult } from "@/lib/scan";

const STEPS = [
  "Validating URL",
  "Extracting URL Features",
  "Running AI Model",
  "Generating Security Report",
];

function ScanUrlInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url") ?? "";

  const [completedSteps, setCompletedSteps] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!url) {
      router.replace("/");
      return;
    }
    if (started.current) return;
    started.current = true;

    let cancelled = false;

    // Steps 1-2 are cosmetic pacing (validate/extract) while the real
    // request runs in the background; step 3 completes when the actual
    // API responds, not on a fixed timer.
    const stepTimer = setInterval(() => {
      setCompletedSteps((n) => (n < 2 ? n + 1 : n));
    }, 700);

    (async () => {
      try {
        const result = await scanUrl(url);
        if (cancelled) return;
        cacheScanResult(url, result);
        clearInterval(stepTimer);
        setCompletedSteps(4);
        setTimeout(() => {
          if (!cancelled) {
            router.replace(`/results?url=${encodeURIComponent(url)}`);
          }
        }, 500);
      } catch (err) {
        if (cancelled) return;
        clearInterval(stepTimer);
        setErrorMessage(
          err instanceof Error ? err.message : "Could not reach the detection service.",
        );
      }
    })();

    return () => {
      cancelled = true;
      clearInterval(stepTimer);
    };
  }, [url, router]);

  const progressPercent = (completedSteps / STEPS.length) * 100;

  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center gap-10 bg-black px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <h1
          className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Scanning
        </h1>
        <p
          className="max-w-md break-all text-sm italic text-white/50"
          style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
        >
          {url}
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
            }}
          />
        </div>

        <ul className="mt-8 flex flex-col gap-4 text-left">
          {STEPS.map((step, i) => {
            const done = i < completedSteps;
            const active = i === completedSteps && !errorMessage;
            return (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                    done
                      ? "border-transparent text-white"
                      : active
                        ? "border-[#905BF4] text-[#905BF4]"
                        : "border-white/20 text-white/30"
                  }`}
                  style={done ? { background: "#4E2BCC" } : undefined}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span
                  className={`text-sm ${done || active ? "text-white" : "text-white/40"}`}
                >
                  {step}
                </span>
                {active && (
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-[#905BF4]" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {errorMessage && (
        <div className="flex max-w-md flex-col items-center gap-4">
          <p className="text-sm text-[#ff6b6b]" role="alert">
            {errorMessage}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Try again
          </button>
        </div>
      )}
    </main>
  );
}

export default function ScanUrlPage() {
  return (
    <Suspense>
      <ScanUrlInner />
    </Suspense>
  );
}
