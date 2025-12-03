import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

export default function Home() {
  const user = getUser();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE — TEXT */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Learn. Build. Shine.
            </h1>

            <p className="text-gray-300 text-lg max-w-xl mb-10">
              Curated learning paths — from beginner to pro. AI-curated courses,
              videos and articles to get you job-ready faster.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex gap-4 mb-6">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7B3FF2] via-[#00E0FF] to-[#FF2D75] shadow-neon-lg hover:opacity-90 transition"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-xl border border-white/15 font-semibold hover:bg-white/10 transition"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/generate"
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7B3FF2] via-[#00E0FF] to-[#FF2D75] shadow-neon-lg"
                >
                  Generate My Course
                </Link>
              )}
            </div>

            <p className="text-sm text-gray-400">
              Syllabrix • AI-powered learning • Personalized roadmaps
            </p>
          </div>

          {/* RIGHT SIDE — GLOW CARD */}
          <div className="relative">
            <div className="rounded-3xl bg-[#0b0710]/90 p-6 border border-white/10 shadow-[0_0_40px_-5px_rgba(123,63,242,0.3)]">

              <div className="rounded-2xl bg-[#0f0b12] p-6 h-[350px] border border-white/10 relative overflow-hidden">
                {/* Replace hero image here */}
                <img
                  src="/assets/hero.png"
                  alt="hero"
                  className="w-full h-full object-cover rounded-xl opacity-70"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Featured text */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Featured: Learn Python</h3>
                <p className="text-gray-400 text-sm">
                  A curated list of the best videos & articles to start learning Python quickly.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* FEATURES SECTION */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md 
                          transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 
                          shadow-lg hover:shadow-neonA cursor-pointer">
            <h4 className="font-semibold mb-2 text-lg">Personalized</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Roadmaps tailored to your goals and skill level.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md
                          transition-all duration-300 hover:scale-[1.03] hover:bg-white/10
                          shadow-lg hover:shadow-neonA cursor-pointer">
            <h4 className="font-semibold mb-2 text-lg">Curated</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Courses, videos & resources selected by AI + experts.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md
                          transition-all duration-300 hover:scale-[1.03] hover:bg-white/10
                          shadow-lg hover:shadow-neonA cursor-pointer">
            <h4 className="font-semibold mb-2 text-lg">Progress</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Easily track your learning journey & what's next.
            </p>
          </div>

        </div>


      </div>
    </div>
  );
}
