// // threat-carousel.tsx
// "use client";

// import React from "react";
// import { DragCarousel } from "@/components/ui/drag-carousel";

// type Threat = {
//   category: string;
//   title: string;
//   src: string;
//   paragraphs: string[];
// };

// const THREATS: Threat[] = [
//   {
//     category: "Lookalike Domains",
//     title: "paypa1.com is not paypal.com.",
//     src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
//     paragraphs: [
//       "Attackers register domains that look almost identical to the real thing — swapped letters, extra hyphens, or a different top-level domain like .info instead of .com.",
//       "Always check the full domain before entering credentials, not just the brand name that appears in the link text.",
//     ],
//   },
//   {
//     category: "URL Shorteners",
//     title: "You can't see where a shortened link goes.",
//     src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
//     paragraphs: [
//       "Services like bit.ly or tinyurl hide the real destination. Phishing campaigns use them to bypass spam filters and to disguise malicious domains as trustworthy short links.",
//       "ASTRO flags shortened links automatically — always resolve one before trusting it.",
//     ],
//   },
//   {
//     category: "Urgency & Fear",
//     title: "'Your account will be suspended in 24 hours.'",
//     src: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
//     paragraphs: [
//       "Phishing emails manufacture urgency to short-circuit careful thinking — a locked account, an unpaid invoice, a security alert demanding immediate action.",
//       "Legitimate organizations rarely threaten immediate account closure over email. Slow down and verify through a separate channel.",
//     ],
//   },
//   {
//     category: "Fake Login Pages",
//     title: "It looks exactly like the real site.",
//     src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
//     paragraphs: [
//       "Modern phishing kits clone the CSS and branding of real login pages pixel-for-pixel. Visual trust is not proof of legitimacy — the URL is the only reliable signal.",
//       "Newly registered domains impersonating major brands are one of the strongest heuristics ASTRO checks for.",
//     ],
//   },
//   {
//     category: "Newly Registered Domains",
//     title: "Registered yesterday, targeting you today.",
//     src: "https://images.unsplash.com/photo-1610563166150-b34df4f3bdff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
//     paragraphs: [
//       "Most phishing domains are registered within days of an attack campaign and abandoned shortly after. Domain age is one of the clearest predictors of intent.",
//       "ASTRO checks WHOIS registration data on every scan to catch this pattern.",
//     ],
//   },
// ];

// const CAROUSEL_ITEMS = THREATS.map((t, index) => ({
//   id: index + 1,
//   url: t.src,
//   title: t.category,
// }));

// export function ThreatCarousel() {
//   return (
//     <section className="w-full bg-[var(--muted)] py-20">
//       <h2
//         className="mx-auto max-w-7xl px-6 text-xl uppercase tracking-tight text-neutral-900 md:px-16 md:text-5xl"
//         style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
//       >
//         Common phishing{" "}
//         <span
//           style={{
//             background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
//             WebkitBackgroundClip: "text",
//             backgroundClip: "text",
//             color: "transparent",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           tactics
//         </span>{" "}
//         to watch for.
//       </h2>

//       <div className="mt-8 w-full">
//         <DragCarousel items={CAROUSEL_ITEMS} />
//       </div>

//       <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-16 xl:grid-cols-3">
//         {THREATS.map((threat) => (
//           <div
//             key={threat.category}
//             className="flex flex-col gap-3 rounded-3xl bg-white p-8 ring-1 ring-[var(--border)] transition hover:ring-[#905BF4]/50"
//           >
//             <span
//               className="text-xs font-semibold uppercase tracking-wide"
//               style={{ color: "#4E2BCC" }}
//             >
//               {threat.category}
//             </span>
//             <h3
//               className="text-lg font-bold text-neutral-900"
//               style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
//             >
//               {threat.title}
//             </h3>
//             <p className="text-sm leading-relaxed text-neutral-600">
//               {threat.paragraphs[0]}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
