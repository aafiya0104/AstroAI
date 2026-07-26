"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getCachedScanResult, scanUrl, type PredictResponse } from "@/lib/scan";
import { FEATURE_LABELS, featureVerdictLabel } from "@/lib/features";

const RISK_COLORS: Record<string, string> = {
  safe: "#2ecc71",
  suspicious: "#e6b800",
  dangerous: "#ff4d4d",
};

function ConfidenceGauge({ safePercent, risk }: { safePercent: number; risk: string }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safePercent / 100) * circumference;
  const color = RISK_COLORS[risk] ?? "#905BF4";
  const gradientId = "gauge-gradient";

  return (
    <div className="relative flex h-52 w-52 items-center justify-center">
      <svg width="208" height="208" viewBox="0 0 208 208" className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.55} />
            <stop offset="100%" stopColor={color} stopOpacity={1} />
          </linearGradient>
        </defs>
        <circle cx="104" cy="104" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" />
        <circle
          cx="104"
          cy="104"
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-extrabold tracking-tight text-white">{safePercent}%</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          confidence
        </span>
      </div>
    </div>
  );
}

function ResultsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url") ?? "";

  const [result, setResult] = useState<PredictResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      router.replace("/");
      return;
    }

    const cached = getCachedScanResult(url);
    if (cached) {
      setResult(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await scanUrl(url);
        if (!cancelled) setResult(data);
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(
            err instanceof Error ? err.message : "Could not reach the detection service.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, router]);

  if (loading) {
    return (
      <main className="flex min-h-svh w-full items-center justify-center bg-black">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#905BF4]" />
      </main>
    );
  }

  if (errorMessage || !result) {
    return (
      <main className="flex min-h-svh w-full flex-col items-center justify-center gap-6 bg-black px-6 text-center">
        <p className="text-sm text-[#ff6b6b]">{errorMessage ?? "No result found for this URL."}</p>
        <Link
          href="/"
          className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const isSafe = result.prediction === "safe";
  const safePercent = Math.round(result.probabilities.safe * 100);
  const riskLabel =
    result.risk_level === "safe" ? "Safe" : result.risk_level === "suspicious" ? "Suspicious" : "Dangerous";

  return (
    <main className="min-h-svh w-full bg-black px-2 py-16 text-white sm:px-4">
      {/* header */}
      <div className="mx-auto mb-12 flex max-w-5xl flex-col items-center gap-3 text-center">
        <h1
          className="text-3xl font-extrabold uppercase tracking-tight md:text-5xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Security Report
        </h1>
        <p className="max-w-2xl break-all text-sm italic text-white md:text-base"
           style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}>
          {url}
        </p>
      </div>

      {/* two-column dashboard */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* left panel: AI prediction */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <span
            className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              color: RISK_COLORS[result.risk_level] ?? "#905BF4",
              border: `1px solid ${RISK_COLORS[result.risk_level] ?? "#905BF4"}`,
            }}
          >
            {riskLabel}
          </span>

          <ConfidenceGauge safePercent={safePercent} risk={result.risk_level} />

          <p
            className="text-xl font-extrabold uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
          >
            {isSafe ? "Legitimate" : "Phishing"}
          </p>

          {result.domain_age_days !== null && (
            <p className="text-sm text-white">
              Domain age: {Math.floor(result.domain_age_days / 365)} year(s)
            </p>
          )}

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)" }}
          >
            {isSafe ? "Continue to site" : "Continue anyway"}
          </a>
        </div>

        {/* right panel: AI reasoning */}
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2
            className="text-lg font-extrabold uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
          >
            AI Reasoning
          </h2>
          <p className="text-sm leading-relaxed text-white md:text-base">
            {result.explanation}
          </p>
          {result.reasons && result.reasons.length > 0 && (
            <ul className="mt-2 flex flex-col gap-2 text-sm text-white">
              {result.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#905BF4]" />
                  {reason}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* how the AI works */}
      <section className="mx-auto mt-20 max-w-5xl">
        <h2
          className="text-center text-2xl font-extrabold uppercase tracking-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          How the AI Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-bold text-sm text-white md:text-base"
           style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}>
          ASTRO's HEURISTICS inspects 30 URL and page-structure signals extracted live from this page.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(result.features ?? {}).map(([key, value]) => {
            const verdict = featureVerdictLabel(value);
            const color =
              verdict === "Safe" ? "#2ecc71" : verdict === "Suspicious" ? "#ff4d4d" : "rgba(255,255,255,0.4)";
            return (
              <div
                key={key}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
              >
                <span className="text-sm text-white">{FEATURE_LABELS[key] ?? key}</span>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                  {verdict}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* dataset */}
      <section className="mx-auto mt-20 max-w-5xl">
        <h2
          className="text-2xl font-extrabold uppercase tracking-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Dataset
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
          The model is trained on real, live-extracted URLs: legitimate domains sampled
          from the Tranco top-1M list plus a curated set of well-known sites, and phishing
          URLs pulled from the OpenPhish and PhishStats feeds. Every URL's 30 features are
          computed the same way at training time and at scan time, so no pre-featurized or
          synthetic data is used and the model sees the same signals in production that it
          learned from.
        </p>
      </section>

      {/* model */}
      <section className="mx-auto mt-20 max-w-5xl">
        <h2
          className="text-2xl font-extrabold uppercase tracking-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Model
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
          ASTRO uses a Gradient Boosting Classifier trained with cross-validated
          hyperparameter tuning to avoid overfitting. Before scoring, every URL passes
          through a threat-intelligence layer, including Google Safe Browsing, OpenPhish,
          URLhaus, and RDAP domain-age lookups, which can short-circuit obviously malicious
          or long-established, trusted domains before the ML model even runs. When the model
          does run, its probability output becomes the confidence score shown above, and a
          Groq-hosted language model turns the specific signals that fired into the plain-English
          explanation on the right. It only summarizes evidence that was actually detected,
          so the explanation can never contradict the verdict.
        </p>
      </section>

      {/* pipeline */}
      <section className="mx-auto mt-20 max-w-5xl">
        <h2
          className="text-2xl font-extrabold uppercase tracking-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Detection Pipeline
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
          Every scan runs through the full pipeline in real time: live feature extraction
          from the URL and page structure, a threat-intelligence check against known
          blocklists and domain age, the trained classifier's probability score, and finally
          the AI reasoning step that explains the result. Each stage is checked against real
          websites during development, not just held-out test data, so edge cases like
          long-established sites with unusual page structures are caught and corrected before
          they reach production.
        </p>
      </section>

      {/* threat intelligence databases */}
      <section className="mx-auto mt-20 mb-20 max-w-5xl">
        <h2
          className="text-2xl font-extrabold uppercase tracking-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Threat Intelligence Databases
        </h2>
        <p className="mt-3 max-w-2xl text-sm italic text-white md:text-base"
           style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}>
          Checked before the ML model even runs. A hit here short-circuits straight to a
          phishing verdict.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              name: "Google Safe Browsing",
              description:
                "Google's threat intelligence API scanning billions of URLs daily. The most authoritative real-time phishing and malware detection service available.",
              hit: (result.reasons ?? []).some((r) => r.toLowerCase().includes("safe browsing")),
            },
            {
              name: "OpenPhish",
              description:
                "Community-driven phishing URL feed updated every 12 hours. Free, no API key required, cached locally so checks are instant.",
              hit: (result.reasons ?? []).some((r) => r.toLowerCase().includes("openphish")),
            },
            {
              name: "Abuse.ch URLhaus",
              description:
                "Community-driven DNS blocklist tracking malware distribution domains. Combined with RDAP domain age analysis to catch newly registered phishing domains.",
              hit: (result.reasons ?? []).some((r) => r.toLowerCase().includes("urlhaus")),
            },
            {
              name: "RDAP Domain Age",
              description:
                "Queries IANA RDAP to find when a domain was registered. Domains under 30 days old are flagged high risk, since newly registered domains are the #1 phishing indicator.",
              hit: result.domain_age_days !== null && result.domain_age_days < 30,
            },
          ].map((db) => (
            <div
              key={db.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: db.hit ? "#ff4d4d" : "rgba(255,255,255,0.4)" }}
                />
                <h3 className="text-base font-bold text-white">{db.name}</h3>
                <span
                  className="ml-auto text-xs font-semibold uppercase tracking-wide"
                  style={{ color: db.hit ? "#ff4d4d" : "rgba(255,255,255,0.5)" }}
                >
                  {db.hit ? "Flagged" : "Clean"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white">{db.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsInner />
    </Suspense>
  );
}
