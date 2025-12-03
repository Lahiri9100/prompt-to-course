// src/components/HeroLeft.jsx
import React from "react";

export default function HeroLeft({ imageUrl }) {
  return (
    <div className="hidden md:flex md:w-1/2 h-full items-center justify-center relative overflow-hidden">
      {/* Background gradient / optional image */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#071423] via-[#081a25] to-[#0b0b12] opacity-95"
        aria-hidden="true"
      />

      {/* Decorative blurred blobs */}
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7B3FF2]/40 via-[#00E0FF]/30 to-[#FF2D75]/20 filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute right-10 bottom-10 w-80 h-80 rounded-full bg-gradient-to-tr from-[#00E0FF]/25 via-[#7B3FF2]/10 to-[#FF2D75]/15 filter blur-2xl opacity-60 animate-blob animation-delay-2000" />

      {/* If you want to use an image: */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none"
        />
      )}

      {/* Animated SVG curved lines */}
      <svg
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid slice"
        className="max-w-full max-h-full w-[90%] h-[80%]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7B3FF2" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#00E0FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF2D75" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* multiple animated paths at different speeds and offsets */}
        <g stroke="url(#g1)" strokeWidth="3" fill="none" filter="url(#glow)">
          <path
            className="curve path-1"
            d="M0,480 C150,380 250,350 420,380 C600,420 700,300 900,340"
            strokeLinecap="round"
          />
          <path
            className="curve path-2"
            d="M0,420 C120,320 240,300 420,320 C600,340 720,260 900,300"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <path
            className="curve path-3"
            d="M0,520 C140,420 260,380 420,400 C560,420 680,360 900,400"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
        </g>
      </svg>

      {/* small caption */}
      <div className="absolute bottom-8 left-8 text-left text-sm text-slate-300/80">
        <div className="font-semibold text-white">Syllabrix</div>
        <div className="mt-1 max-w-xs">
          AI-curated learning paths. Personalized roadmaps and curated resources.
        </div>
      </div>
    </div>
  );
}
