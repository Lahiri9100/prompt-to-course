import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-20 flex flex-col md:flex-row items-center justify-between">

      {/* LEFT SIDE TEXT */}
      <div className="max-w-2xl">
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Learn. Build. Shine.
        </h1>

        <p className="text-gray-400 text-xl mb-10">
          Curated learning paths — beginner to pro. AI-curated courses, videos & articles to help you grow faster.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE HERO IMAGE */}
      <div className="mt-14 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={heroImg}
          alt="AI roadmap graphic"
          className="w-[420px] md:w-[480px] rounded-2xl shadow-lg shadow-purple-900/40"
        />
      </div>

    </div>
  );
}
