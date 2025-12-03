import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white px-14 py-20">

      <h1 className="text-4xl font-bold mb-2">Hi Learner 👋</h1>
      <p className="text-gray-400 mb-12">Welcome to your personalized learning dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link to="/generate" className="p-6 bg-white/10 rounded-xl border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Generate a New Course</h2>
          <p className="text-gray-400 text-sm">Use AI to create structured courses.</p>
        </Link>

        <div className="p-6 bg-white/10 rounded-xl border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Saved Courses</h2>
          <p className="text-gray-400 text-sm">No saved courses yet.</p>
        </div>

        <div className="p-6 bg-white/10 rounded-xl border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Progress</h2>
          <p className="text-gray-400 text-sm">Track your learning progress here soon.</p>
        </div>

      </div>

    </div>
  );
}
