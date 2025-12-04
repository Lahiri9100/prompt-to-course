import React from "react";
import heroImg from "../assets/hero.png";

export default function HeroLeft() {
  return (
    <div className="w-[420px] h-[420px] rounded-3xl bg-[#0b0b12] shadow-[0_0_40px_rgba(123,63,242,0.4)] relative overflow-hidden">

      {/* Glow decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FF2]/20 via-[#00E0FF]/10 to-transparent" />

      {/* HERO IMAGE */}
      <img
        src={heroImg}
        alt="hero"
        className="w-full h-full object-cover opacity-90"
      />

      {/* Caption */}
      <div className="absolute bottom-4 left-4 text-white">
        <div className="font-semibold">Featured: Learn Python</div>
        <div className="text-sm text-gray-300 max-w-xs">
          A curated list of the best videos & articles to start learning Python quickly.
        </div>
      </div>
    </div>
  );
}
