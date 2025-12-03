import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-20">

      <h1 className="text-6xl font-bold mb-6">Learn. Build. Shine.</h1>

      <p className="text-gray-400 text-xl max-w-2xl mb-10">
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
  );
}
