"use client";
import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Track threats effectively",
      description:
        "Every scan is logged and analyzed so you can track suspicious URLs over time.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Real-time visual scanning",
      description:
        "Watch ASTRO analyze a page live, frame by frame, as it checks for phishing signals.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "See ASTRO in action",
      description:
        "Watch a full walkthrough of how ASTRO detects and explains phishing attempts.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "Protection, everywhere",
      description:
        "From the web app to the browser extension, ASTRO keeps watch wherever you click.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 mx-auto max-w-7xl pt-10 pb-10 lg:pt-40 lg:pb-10">
      <div className="px-8">
        <h4
          className="mx-auto max-w-5xl text-center text-3xl font-extrabold uppercase tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Packed with{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4E2BCC 0%, #905BF4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            thousands of features
          </span>
        </h4>

        <p
          className="mx-auto my-4 max-w-2xl text-center text-sm italic font-normal text-neutral-500 lg:text-base dark:text-neutral-300"
          style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
        >
          From live feature analysis to AI-generated reasoning, ASTRO tells you
          exactly why a URL is safe or dangerous.
        </p>
      </div>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 rounded-md lg:grid-cols-6 xl:border dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className="mx-auto max-w-5xl text-left text-xl font-extrabold uppercase tracking-tight text-black md:text-2xl md:leading-snug dark:text-white"
      style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
    >
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-left text-sm italic md:text-base",
        "text-center font-normal text-neutral-500 dark:text-neutral-300",
        "mx-0 my-2 max-w-sm text-left md:text-sm",
      )}
      style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full overflow-hidden rounded-sm bg-white p-1 shadow-2xl dark:bg-neutral-900">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <video
            src="/hero_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-square h-full w-full rounded-sm object-contain object-center"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent dark:from-black" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="group/image relative flex h-full gap-10">
      <div className="group mx-auto h-full w-full bg-transparent dark:bg-transparent">
        <div className="relative flex h-full w-full flex-1 flex-col space-y-2">
          <IconBrandYoutubeFilled className="absolute inset-0 z-10 m-auto h-20 w-20 text-[#905BF4]" />
          <video
            src="/scan-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-square h-full w-full rounded-sm object-cover object-center blur-none transition-all duration-200 group-hover/image:blur-md"
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?fm=jpg&q=60&w=500&auto=format&fit=crop", // blue and white laptop closeup
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fm=jpg&q=60&w=500&auto=format&fit=crop", // teal LED panel
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fm=jpg&q=60&w=500&auto=format&fit=crop", // matrix-style code, green-blue
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?fm=jpg&q=60&w=500&auto=format&fit=crop", // blue-lit computer code closeup
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?fm=jpg&q=60&w=500&auto=format&fit=crop", // dark laptop, blue-toned
  ];

  // Fixed rotation angles (not randomized): Math.random() during render
  // produces different values on the server vs. the client, which caused a
  // hydration mismatch. A static per-image angle still gives the scattered
  // photo-pile look without that bug.
  const rotations = [-8, 4, -3, 9, -6];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  return (
    <div className="relative flex h-full flex-col gap-6 overflow-hidden p-8">
      <div className="flex flex-col gap-4">
        <div className="-ml-20 flex flex-row">
          {images.map((image, idx) => (
            <motion.div
              variants={imageVariants}
              key={"images-first" + idx}
              style={{
                rotate: rotations[idx % rotations.length],
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <img
                src={image}
                alt="Cybersecurity scan reference"
                width="500"
                height="500"
                className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-row">
          {images.map((image, idx) => (
            <motion.div
              key={"images-second" + idx}
              style={{
                rotate: rotations[(idx + 2) % rotations.length],
              }}
              variants={imageVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <img
                src={image}
                alt="Cybersecurity scan reference"
                width="500"
                height="500"
                className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Grows to fill remaining space instead of leaving a gap */}
      <div className="flex flex-1 flex-col justify-center rounded-lg border border-neutral-800 bg-black/40 p-6 font-mono text-xs text-neutral-300 backdrop-blur-sm md:text-sm">
        <p className="mb-2 text-[#905BF4]">$ astro scan --url target.com</p>
        <p className="mb-1 text-neutral-400">
          → checking domain age...{" "}
          <span className="text-green-400">verified</span>
        </p>
        <p className="mb-1 text-neutral-400">
          → analyzing SSL certificate chain...{" "}
          <span className="text-green-400">valid</span>
        </p>
        <p className="mb-1 text-neutral-400">
          → cross-referencing phishing signatures...{" "}
          <span className="text-red-400">2 flags found</span>
        </p>
        <p className="mb-1 text-neutral-400">
          → checking redirect chain depth...{" "}
          <span className="text-yellow-400">3 hops</span>
        </p>
        <p className="mt-3 border-t border-neutral-800 pt-3 text-neutral-500">
          Verdict:{" "}
          <span className="font-semibold text-[#905BF4]">SUSPICIOUS</span> —
          redirect chain masks true destination.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-black" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-black" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative mt-10 flex h-full w-full items-center justify-center bg-transparent dark:bg-transparent">
      <Globe className="translate-x-6 translate-y-6" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let animationFrameId: number;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 420 * 2,
      height: 420 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 4000,
      mapBrightness: 6,
      baseColor: [0.31, 0.17, 0.8],
      markerColor: [0.565, 0.357, 0.957],
      glowColor: [0.565, 0.357, 0.957],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
    });

    const animate = () => {
      phi += 0.01;
      globe.update({ phi });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 420, height: 420, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};