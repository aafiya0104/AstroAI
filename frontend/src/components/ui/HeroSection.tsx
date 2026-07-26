"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import AnimatedGlowingSearchBar from "@/components/ui/animated-glowing-search-bar";

const URL_REGEX =
  /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i;

export default function HeroSection() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleScan(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();

    if (!URL_REGEX.test(trimmed)) {
      setError("Please enter a valid URL");
      return;
    }

    setError(null);
    setLoading(true);
    window.location.href = "/scan-url?url=" + encodeURIComponent(trimmed);
  }

  return (
    <section
      className="relative flex min-h-svh w-full flex-col overflow-hidden bg-black px-6 md:px-16"
      style={{
        backgroundImage: "url(/Hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* nav */}
      <nav className="relative z-10 flex w-full items-center justify-center py-6">
        <div className="hidden md:flex">
          <Menu setActive={setActiveMenu}>
            <div className="flex items-center pr-2">
              <Image
                src="/logo-nobg.png"
                alt="Astro"
                width={40}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>
            <MenuItem setActive={setActiveMenu} active={activeMenu} item="Product">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#scan">Scan a URL</HoveredLink>
                <HoveredLink href="/scan-mail">Scan Mail</HoveredLink>
                <HoveredLink href="#how-it-works">How it works</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActiveMenu} active={activeMenu} item="Resources">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#threats">Threat Guide</HoveredLink>
                <HoveredLink href="https://github.com/aafiya0104/AstroAI">
                  Source Code
                </HoveredLink>
                <HoveredLink href="https://github.com/aafiya0104/AstroAI/issues">
                  Report an Issue
                </HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* mobile nav */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Image
            src="/logo-nobg.png"
            alt="Astro"
            width={40}
            height={40}
            className="h-9 w-auto"
            priority
          />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white"
          >
            <span className="sr-only">Menu</span>
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu panel */}
      {mobileMenuOpen && (
        <div className="relative z-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/80 p-6 text-sm font-medium text-white/80 backdrop-blur-sm md:hidden">
          <a href="#scan" className="hover:text-white">Scan a URL</a>
          <a href="/scan-mail" className="hover:text-white">Scan Mail</a>
          <a href="#how-it-works" className="hover:text-white">How it works</a>
          <a href="#threats" className="hover:text-white">Threat Guide</a>
          <a href="https://github.com/afraa786/CyberThreat" className="hover:text-white">
            Source Code
          </a>
          <a href="/login" className="hover:text-white">Log in</a>
        </div>
      )}

      {/* headline + input */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 py-16 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <h1
            className={`text-4xl font-extrabold uppercase leading-[1.05] text-white transition-all duration-700 ease-out md:text-6xl xl:text-7xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
          >
            One{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #EFEFEF 0%, #905BF4 55%, #4E2BCC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Link
            </span>
            . Instant Verdict.
          </h1>
        </div>

        <form
          onSubmit={handleScan}
          className={`flex w-full max-w-2xl flex-col items-stretch gap-3 transition-all delay-300 duration-700 ease-out sm:flex-row sm:items-center ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <AnimatedGlowingSearchBar
            value={url}
            onChange={(v) => {
              setUrl(v);
              if (error) setError(null);
            }}
            placeholder="Paste a URL to scan..."
            className="flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
            }}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Scanning...
              </>
            ) : (
              "Scan"
            )}
          </button>
        </form>

        {error && (
          <p className="text-sm text-[#ff6b6b]" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
