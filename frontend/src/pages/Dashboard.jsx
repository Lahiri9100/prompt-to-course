import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

export default function Dashboard() {
  const user = getUser();

  return (
    <div className="min-h-screen bg-black text-white px-10 py-16">

      <h1 className="text-4xl font-bold mb-4">
        Hi {user?.username || "Learner"} 👋
      </h1>

      <p className="text-gray-400 mb-12">
        Welcome to your personalized learning dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/generate"
          className="p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Generate a New Course</h2>
          <p className="text-gray-400 text-sm">
            Use AI to create custom structured roadmaps.
          </p>
        </Link>

        <div className="p-6 rounded-xl bg-white/10 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Saved Courses</h2>
          <p className="text-gray-400 text-sm">
            Your saved courses will appear here soon.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/10 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Progress</h2>
          <p className="text-gray-400 text-sm">
            Track what you’ve completed so far.
          </p>
        </div>

      </div>

    </div>
  );
}
