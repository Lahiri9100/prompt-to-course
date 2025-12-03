import React, { useState } from "react";
import api from "../api";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const res = await api.post("/generate-course/", { prompt });

      alert("Course generated successfully!");
      console.log("RESULT:", res.data);

    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate course — check backend logs.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <h1 className="text-4xl font-bold mb-6">Generate a Course</h1>

      <textarea
        className="w-full p-4 bg-white/10 rounded-lg border border-white/20 mb-6"
        placeholder="Enter topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 rounded-lg"
      >
        {loading ? "Generating..." : "Generate Course"}
      </button>
    </div>
  );
}
