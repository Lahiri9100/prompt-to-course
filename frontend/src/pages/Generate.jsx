import React, { useState } from "react";
import api from "../api";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const generateCourse = async () => {
    setLoading(true);
    const res = await api.post("/auth/login/../generate-course/", { prompt });
    setCourse(JSON.parse(res.data.course));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Generate a Course</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to learn?"
        className="w-full p-4 rounded bg-gray-800 border border-gray-600"
      />

      <button
        onClick={generateCourse}
        disabled={loading}
        className="mt-4 px-6 py-3 rounded bg-purple-600"
      >
        {loading ? "Generating..." : "Generate Course"}
      </button>

      {course && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold">{course.title}</h2>
          {course.modules.map((m, i) => (
            <div key={i} className="mt-4">
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <ul className="list-disc ml-6">
                {m.topics.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
