// frontend/src/components/CourseGenerator.jsx
import React, { useState } from "react";
import api from "../api";

export default function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setCourse(null);

    try {
      const token = localStorage.getItem("access_token");

      const res = await api.post(
        "/generate-course/",
        { prompt: topic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourse(JSON.parse(res.data.course));
    } catch (err) {
      console.error(err);
      alert("Course generation failed.");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 text-white">
      <h2 className="text-3xl font-bold mb-4">AI Course Generator</h2>

      <input
        type="text"
        className="w-full p-4 bg-white/10 border border-white/20 rounded-lg mb-4"
        placeholder="Enter a topic (e.g., Data Science)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {course && (
        <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Generated Course</h2>
          <pre className="whitespace-pre-wrap text-gray-300">
            {JSON.stringify(course, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
