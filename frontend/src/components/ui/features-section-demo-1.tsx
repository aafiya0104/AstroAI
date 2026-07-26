import React from "react";
import { useId } from "react";

export default function FeaturesGridDemo() {
  return (
    <div className="pt-0 pb-20 lg:pb-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Live Feature Analysis",
    description:
      "ASTRO inspects 30 URL and page-structure signals in real time, from domain age to hidden iframes.",
  },
  {
    title: "AI-Generated Reasoning",
    description:
      "Every verdict comes with a plain-English explanation grounded in the exact signals that were detected.",
  },
  {
    title: "Threat Intelligence Layer",
    description:
      "Cross-checked against Google Safe Browsing, OpenPhish, and URLhaus before the ML model even runs.",
  },
  {
    title: "Domain Age Verification",
    description:
      "Long-established, clean domains are trusted automatically, cutting down on false positives.",
  },
  {
    title: "Browser Extension",
    description:
      "Get protected while you browse — ASTRO flags dangerous links before you click them.",
  },
  {
    title: "Instant Verdicts",
    description:
      "Paste a URL and get a safety percentage back in seconds, no waiting around.",
  },
  {
    title: "Mail Scanning",
    description:
      "Check suspicious links straight from your inbox before you ever open them.",
  },
  {
    title: "Continuously Retrained",
    description:
      "The detection model is retrained on real-world phishing and legitimate URL data to stay sharp.",
  },
];

// Fixed pattern (not randomized): Math.random() during render produces
// different values on the server vs. the client, which caused a hydration
// mismatch. A static pattern still looks like scattered decorative squares
// without that bug.
const DEFAULT_PATTERN: number[][] = [
  [8, 3],
  [9, 5],
  [7, 1],
  [10, 4],
  [8, 6],
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? DEFAULT_PATTERN;
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#4E2BCC]/20 from-[#905BF4]/10 to-[#905BF4]/20 dark:to-[#0F032D]/40 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, i: number) => (
            <rect
              strokeWidth="0"
              key={i}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
