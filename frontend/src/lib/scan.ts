export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type PredictResponse = {
  prediction: "safe" | "phishing";
  probabilities: { safe: number; phishing: number };
  risk_level: "safe" | "suspicious" | "dangerous";
  source: "ml_model" | "threat_intel";
  domain_age_days: number | null;
  explanation: string;
  features: Record<string, number>;
  reasons?: string[];
};

export async function scanUrl(url: string): Promise<PredictResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong while scanning this URL.");
  }
  return data as PredictResponse;
}

const SCAN_CACHE_PREFIX = "astro_scan:";

export function cacheScanResult(url: string, result: PredictResponse) {
  try {
    sessionStorage.setItem(SCAN_CACHE_PREFIX + url, JSON.stringify(result));
  } catch {
    // sessionStorage unavailable (SSR / privacy mode) — safe to ignore
  }
}

export function getCachedScanResult(url: string): PredictResponse | null {
  try {
    const raw = sessionStorage.getItem(SCAN_CACHE_PREFIX + url);
    return raw ? (JSON.parse(raw) as PredictResponse) : null;
  } catch {
    return null;
  }
}
