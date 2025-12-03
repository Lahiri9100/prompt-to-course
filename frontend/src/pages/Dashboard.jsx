import React from "react";
import { getUser } from "../auth";

export default function Dashboard() {
  const user = getUser();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user?.full_name} 👋</h1>

      <p className="text-gray-400 mb-10">
        Your personalized learning dashboard is coming soon!
        Use the Generate button in the navbar to create an AI-powered course.
      </p>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-semibold mb-3">Your Activity</h2>
        <p className="text-gray-400">No activity yet. Generate your first course!</p>
      </div>
    </div>
  );
}
