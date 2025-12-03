import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

export default function Dashboard() {
  const user = getUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch saved courses from backend
  useEffect(() => {
    async function fetchCourses() {
      try {
        const token = localStorage.getItem("access_token");

        const res = await fetch(
          "https://prompt-to-course-production.up.railway.app/api/courses/", // CHANGE if your backend URL is different
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch courses:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }

      setLoading(false);
    }

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-16">
      <h1 className="text-4xl font-bold mb-4">
        Hi {user?.username || "Learner"} 👋
      </h1>

      <p className="text-gray-400 mb-12">
        Welcome to your personalized learning dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Generate New Course */}
        <Link
          to="/generate"
          className="p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Generate a New Course</h2>
          <p className="text-gray-400 text-sm">
            Use AI to create custom structured roadmaps.
          </p>
        </Link>

        {/* Saved Courses */}
        <div className="p-6 rounded-xl bg-white/10 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Saved Courses</h2>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-400 text-sm">No saved courses yet.</p>
          ) : (
            <ul className="text-gray-300 text-sm space-y-2">
              {courses.map((c, idx) => (
                <li key={idx} className="hover:text-white">
                  <Link to={`/course/${c.id}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Progress */}
        <div className="p-6 rounded-xl bg-white/10 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Progress</h2>
          <p className="text-gray-400 text-sm">
            Track your learning progress here soon.
          </p>
        </div>

      </div>
    </div>
  );
}

