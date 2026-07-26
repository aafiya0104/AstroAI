import Link from "next/link";

export default function ScanMailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Scan Mail</h1>
      <p className="max-w-xl text-[var(--muted-foreground)]">
        This page is ready for the dedicated mail scanning flow.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
      >
        Back to Home
      </Link>
    </main>
  );
}
