// src/components/CourseGenerator.jsx
import React, { useState } from "react";
import api from "../api";

export default function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/api/generate/", { topic });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate course." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center pt-24 px-4">

      <div className="w-full max-w-3xl bg-[#0b0710]/80 border border-white/10 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 neon-underline">Generate a Course</h2>

        <div className="flex gap-3 mb-8">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Learn Python from zero"
            className="flex-1 p-3 rounded-lg bg-[#0f0b12] border border-white/10 focus:border-neonA outline-none"
          />
          <button
            onClick={generate}
            disabled={loading}
            className="px-6 py-3 bg-neon-gradient rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Output UI */}
        {result && (
          <div className="mt-6 space-y-4">
            {result.error && (
              <p className="text-red-400">{result.error}</p>
            )}

            {result.youtube_videos && (
              <div>
                <h3 className="text-xl font-bold mb-2">🎥 YouTube Videos</h3>
                <ul className="space-y-2">
                  {result.youtube_videos.map((v, i) => (
                    <li key={i} className="bg-white/5 p-3 rounded-md border border-white/10">
                      <a href={v.url} target="_blank" rel="noreferrer" className="text-neonB">
                        {v.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.articles && (
              <div>
                <h3 className="text-xl font-bold mb-2">📄 Articles</h3>
                <ul className="space-y-2">
                  {result.articles.map((v, i) => (
                    <li key={i} className="bg-white/5 p-3 rounded-md border border-white/10">
                      <a href={v.url} target="_blank" rel="noreferrer" className="text-neonA">
                        {v.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
