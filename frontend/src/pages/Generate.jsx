// frontend/src/pages/Generate.jsx
import React, { useState } from "react";
import api from "../api";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const generateCourse = async () => {
    setLoading(true);
    setCourse(null);

    try {
      const token = localStorage.getItem("access_token");

      const res = await api.post(
        "/generate-course/",
        { prompt: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend returns course in JSON string → parse it
      setCourse(JSON.parse(res.data.course));
    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate course — check backend logs.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Generate a Course</h1>

      <textarea
        className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white"
        placeholder="Enter a topic (Ex: learn python advanced)"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateCourse}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
      >
        {loading ? "Generating..." : "Generate Course"}
      </button>

      {course && (
        <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Generated Course</h2>

          <pre className="whitespace-pre-wrap text-gray-300">
            {JSON.stringify(course, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
