// page.tsx
"use client";

import Link from "next/link";
import { Globe, Puzzle, Mail, ArrowRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import HeroSection from "@/components/ui/HeroSection";
import FeaturesSectionDemo from "@/components/ui/features-section-demo-3";
import FeaturesGridDemo from "@/components/ui/features-section-demo-1";
import ModelExplainer from "@/components/ui/model-explainer";
//import { ScrollFXDemo } from "@/components/blocks/scroll-fx-demo";
// import { ThreatCarousel } from "@/components/blocks/threat-carousel";
import { SiteFooter } from "@/components/blocks/site-footer";

export default function Home() {
  return (
    <>
      <div id="top">
        <HeroSection />
      </div>
      {/* <div id="how-it-works">
        <ScrollFXDemo />
      </div> */}
      <FeaturesSectionDemo />
      <FeaturesGridDemo />

      <ModelExplainer />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 text-center">
          <h3
            className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl"
            style={{
              fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif',
            }}
          >
            One scanner,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              everywhere protected
            </span>
          </h3>
          <p
            className="mx-auto mt-2 max-w-xl text-sm italic text-[var(--muted)] sm:text-base"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display"), serif',
            }}
          >
            ASTRO doesn&apos;t stop at this page — it watches your browser and
            your inbox too.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PromoCard
            icon={<Globe className="h-6 w-6 text-[#905BF4]" />}
            title="Web Scanner"
            description="Paste any link here for an instant, in-depth risk breakdown."
            action={{ label: "Scan a URL", href: "/scan-url" }}
            active
          />
          <PromoCard
            icon={<Puzzle className="h-6 w-6 text-[#905BF4]" />}
            title="Browser Extension"
            description="ASTRO checks every link you click in real time, before you land on it."
            action={{ label: "Add to Chrome", href: "/extension" }}
          />
          <PromoCard
            icon={<Mail className="h-6 w-6 text-[#905BF4]" />}
            title="Email Scanner"
            description="Forward a suspicious email or connect your inbox — ASTRO flags phishing before you click."
            action={{ label: "Scan an email", href: "/scan-mail" }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div
          className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-10"
        >
          <div className="rounded-full bg-[#905BF4]/10 p-3">
            <IconBrandGithub className="h-7 w-7 text-[#905BF4]" />
          </div>
          <h3
            className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl"
            style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
          >
            Checkout the{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              source code
            </span>
          </h3>
          <p
            className="max-w-xl text-sm italic text-white sm:text-base"
            style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
          >
            ASTRO is fully open source: the ML pipeline, threat-intelligence layer,
            browser extension, and this site are all on GitHub.
          </p>
          <a
            href="https://github.com/aafiya0104/AstroAI"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)" }}
          >
            <IconBrandGithub className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function PromoCard({
  icon,
  title,
  description,
  action,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: { label: string; href: string };
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border p-6 transition-colors ${
        active
          ? "border-[#905BF4]/40 bg-[#905BF4]/5"
          : "border-neutral-800 bg-[#0F032D]/40 hover:border-neutral-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-[#905BF4]/10 p-2.5">{icon}</div>
        {active && (
          <span className="rounded-full bg-[#905BF4]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#905BF4]">
            Active
          </span>
        )}
      </div>
      <div>
        <h4
          className="text-lg font-bold uppercase tracking-tight text-white"
          style={{
            fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif',
          }}
        >
          {title}
        </h4>
        <p
          className="mt-1.5 text-sm italic leading-relaxed text-[var(--muted)]"
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display"), serif',
          }}
        >
          {description}
        </p>
      </div>
      <Link
        href={action.href}
        className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#905BF4] transition hover:gap-2.5"
      >
        {action.label}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}