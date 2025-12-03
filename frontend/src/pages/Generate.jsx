// frontend/src/pages/Generate.jsx

import React, { useState } from "react";
import api from "../api";

export default function Generate() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const res = await api.post("/generate-course/", { topic });

      console.log("📚 Course Response:", res.data);

      alert("Course generated successfully!");
    } catch (err) {
      console.error("❌ Generation error:", err.response?.data || err);
      alert("Failed to generate course — check backend logs.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Generate a Course</h1>

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-4 bg-white/5 border border-white/10 rounded-lg mb-6"
        placeholder="Enter your topic..."
      />

      <button
        onClick={generate}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 rounded-md"
      >
        {loading ? "Generating..." : "Generate Course"}
      </button>
    </div>
  );
}
