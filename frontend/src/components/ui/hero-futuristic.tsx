// hero-futuristic.tsx
'use client';

import { useEffect, useState } from 'react';
import { GenerateButton } from '@/components/ui/generate-button';
import GradualBlur from '@/components/ui/gradual-blur';

const TITLE_WORDS = 'Stop Phishing Links With ASTRO'.split(' ');
const SUBTITLE = 'AI-powered URL detection before you click.';

export const Html = ({ onExploreClick }: { onExploreClick?: () => void } = {}) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    setDelays(TITLE_WORDS.map(() => Math.random() * 0.07));
  }, []);

  useEffect(() => {
    if (visibleWords < TITLE_WORDS.length) {
      const t = setTimeout(() => setVisibleWords(visibleWords + 1), 130);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSubtitleVisible(true), 250);
    return () => clearTimeout(t);
  }, [visibleWords]);

  useEffect(() => {
    if (!subtitleVisible) return;
    const t = setTimeout(() => setVideoVisible(true), 300);
    return () => clearTimeout(t);
  }, [subtitleVisible]);

  useEffect(() => {
    if (!videoVisible) return;
    const t = setTimeout(() => setButtonVisible(true), 450);
    return () => clearTimeout(t);
  }, [videoVisible]);

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center gap-8 overflow-hidden bg-black px-6 py-24 md:px-16">
      {/* ambient glow behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 40%, rgba(78,43,204,0.30) 0%, rgba(15,3,45,0.16) 45%, transparent 80%)',
        }}
      />

      {/* headline — same width as the video below it */}
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <h1
          className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-4xl font-extrabold uppercase leading-[1.05] text-white md:text-6xl xl:text-7xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          {TITLE_WORDS.map((word, index) => {
            const isLast = index === TITLE_WORDS.length - 1;
            return (
              <span
                key={word + index}
                className={index < visibleWords ? 'fade-in' : ''}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                  ...(isLast
                    ? {
                        background:
                          'linear-gradient(90deg, #EFEFEF 0%, #905BF4 55%, #4E2BCC 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                      }
                    : {}),
                }}
              >
                {word}
              </span>
            );
          })}
        </h1>

        <p
          className={`mt-4 max-w-xl text-base italic text-white/70 md:text-xl ${
            subtitleVisible ? 'fade-in-subtitle' : ''
          }`}
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display"), serif',
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          {SUBTITLE}
        </p>
      </div>

      {/* video */}
      <div
        className={`relative w-full max-w-5xl overflow-hidden rounded-3xl ring-1 ring-white/10 transition-all duration-700 ease-out ${
          videoVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{
          boxShadow: '0 0 30px -10px rgba(144, 91, 244, 0.25)',
        }}
      >
      
        <video
          src="/hero_vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="aspect-video w-full object-cover"
        />
      </div>

      {/* CTA */}
      <div
        className={`transition-all duration-700 ease-out ${
          buttonVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div onClick={onExploreClick} className="scale-125 origin-center">
          <GenerateButton hue={265} />
        </div>
      </div>

    </section>
  );
};

export default Html;
