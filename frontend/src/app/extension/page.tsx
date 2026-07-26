"use client";

import { Download, Puzzle } from "lucide-react";
import { SiteFooter } from "@/components/blocks/site-footer";

const STEPS = [
  {
    title: "Download the extension",
    description: 'Click "Download extension" below to get astro-extension.zip.',
  },
  {
    title: "Unzip the file",
    description:
      "Extract the zip anywhere on your computer — you'll need the folder in the next step.",
  },
  {
    title: "Open Chrome extensions",
    description: 'Go to chrome://extensions in your browser and turn on "Developer mode" (top right).',
  },
  {
    title: "Load the extension",
    description: 'Click "Load unpacked" and select the unzipped astro-extension folder.',
  },
  {
    title: "You're protected",
    description: "ASTRO now checks links in real time as you browse.",
  },
];

export default function ExtensionPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#905BF4]/10">
          <Puzzle className="h-7 w-7 text-[#905BF4]" />
        </div>

        <h1
          className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          ASTRO{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            Browser Extension
          </span>
        </h1>

        <p
          className="mx-auto mt-4 max-w-xl text-sm italic text-[var(--muted)] sm:text-base"
          style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
        >
          Not on the Chrome Web Store yet — install it manually in a couple of
          minutes using the steps below.
        </p>

        <a
          href="/astro-extension.zip"
          download
          className="mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)" }}
        >
          <Download className="h-4 w-4" />
          Download extension
        </a>

        <div className="mt-16 flex flex-col gap-6 text-left">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#905BF4]/40 text-sm font-semibold text-[#905BF4]">
                {i + 1}
              </div>
              <div>
                <h3
                  className="text-base font-bold uppercase tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-1 text-sm italic text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
