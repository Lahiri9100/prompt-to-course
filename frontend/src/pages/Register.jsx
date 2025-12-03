import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    education_level: "college",
    course: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        education_level: form.education_level,
        course: form.course,
      };

      await api.post("/api/auth/register/", payload);

      setMessage({
        type: "success",
        text: "Registration successful! Redirecting...",
      });

      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      setMessage({
        type: "error",
        text: "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <div className="flex flex-col md:flex-row w-full min-h-screen">

        <div
          className="md:w-1/2 w-full flex flex-col justify-center px-10 md:px-20 py-20"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(123,63,242,0.12), transparent 40%), radial-gradient(circle at 70% 80%, rgba(0,224,255,0.10), transparent 50%)",
          }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Create. Learn. <br /> Grow.
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-md">
            Join Syllabrix and unlock personalised learning paths curated just for you.
          </p>
        </div>

        <div className="md:w-1/2 w-full flex justify-center items-center px-6 md:px-10 py-16">

          <div className="w-full max-w-md bg-[#0b0710] border border-white/10 rounded-2xl p-8 shadow-lg shadow-[#7B3FF2]/20">

            <h2 className="text-3xl font-bold mb-2 neon-underline">Create account</h2>
            <p className="text-sm text-gray-400 mb-6">
              Start learning personalised courses — quick and easy.
            </p>

            <form onSubmit={submit} className="space-y-4">

              <div>
                <label className="text-sm text-gray-300">Full name</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={onChange}
                  required
                  className="w-full p-3 rounded-md bg-[#0f0b12] border border-white/10 mt-1"
                  placeholder="Aditi Sharma"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full p-3 rounded-md bg-[#0f0b12] border border-white/10 mt-1"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                  className="w-full p-3 rounded-md bg-[#0f0b12] border border-white/10 mt-1"
                  placeholder="Choose a secure password"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Education</label>
                  <select
                    name="education_level"
                    value={form.education_level}
                    onChange={onChange}
                    className="w-full p-3 rounded-md bg-[#0f0b12] border border-white/10 mt-1"
                  >
                    <option value="school">School</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="college">College / BTech / BSc</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Course / Stream</label>
                  <input
                    name="course"
                    value={form.course}
                    onChange={onChange}
                    className="w-full p-3 rounded-md bg-[#0f0b12] border border-white/10 mt-1"
                    placeholder="CSE / PCM / BSc CS"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`p-3 rounded text-sm ${
                    message.type === "error"
                      ? "bg-red-600/30 text-red-300"
                      : "bg-green-600/30 text-green-300"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-[#7B3FF2] via-[#00E0FF] to-[#FF2D75] shadow-lg shadow-[#7B3FF2]/30"
              >
                {loading ? "Creating..." : "Create account"}
              </button>

              <div className="text-center text-sm text-gray-300 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-[#00E0FF] hover:underline">
                  Sign in
                </a>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
