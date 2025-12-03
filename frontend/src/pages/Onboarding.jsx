import React, { useState } from "react";
import api from "../api";
import { saveUser } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    education_level: "",
    course: "",
    year: "",
    interests: [],
    goal: "",
    difficulty: "beginner",
    skills: [],
    profile_pic: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const skillsList = [
    "Python", "Java", "C++", "HTML", "CSS", "JavaScript",
    "React", "Django", "SQL", "Data Structures"
  ];

  const interestList = [
    "Web Development", "AI", "Machine Learning",
    "Cyber Security", "Data Science", "Cloud", "DevOps"
  ];

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleCheckbox = (listName, value) => {
    const updated = form[listName].includes(value)
      ? form[listName].filter((v) => v !== value)
      : [...form[listName], value];

    setForm({ ...form, [listName]: updated });
  };

  const handleFile = (e) =>
    setForm({ ...form, profile_pic: e.target.files[0] });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
          form[key].forEach((item) => fd.append(key, item));
        } else {
          fd.append(key, form[key]);
        }
      });

      const res = await api.post("/api/profile/setup/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      saveUser(res.data.user);
      setMessage({ type: "success", text: "Profile setup complete!" });

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.detail || "Failed to save profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08060a] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 glass p-10 rounded-2xl shadow-neon-lg">

        <div>
          <h1 className="text-3xl font-extrabold mb-2 neon-underline inline-block">
            Complete Your Profile
          </h1>
          <p className="text-gray-300 text-sm mb-6">
            Tell us more about you so we can personalize your learning journey.
          </p>

          <form onSubmit={submit} className="space-y-4">
            {/* Education */}
            <div>
              <label className="text-sm text-gray-200">Education Level</label>
              <select
                name="education_level"
                value={form.education_level}
                onChange={onChange}
                required
                className="w-full mt-1 p-3 rounded-md bg-[#0f0b12] border border-white/10"
              >
                <option value="">Select</option>
                <option value="school">School</option>
                <option value="intermediate">Intermediate</option>
                <option value="college">College / BTech / BSc</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Course & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-200">Course / Stream</label>
                <input
                  name="course"
                  value={form.course}
                  onChange={onChange}
                  required
                  className="w-full mt-1 p-3 rounded-md bg-[#0f0b12] border border-white/10"
                  placeholder="CSE / PCM / BSc CS"
                />
              </div>

              <div>
                <label className="text-sm text-gray-200">Year</label>
                <input
                  name="year"
                  value={form.year}
                  onChange={onChange}
                  required
                  className="w-full mt-1 p-3 rounded-md bg-[#0f0b12] border border-white/10"
                  placeholder="1st / 2nd / 3rd / 4th"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="text-sm text-gray-200 block mb-1">Interests</label>
              <div className="grid grid-cols-2 gap-2">
                {interestList.map((int) => (
                  <label key={int} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.interests.includes(int)}
                      onChange={() => toggleCheckbox("interests", int)}
                    />
                    {int}
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="text-sm text-gray-200 block mb-1">Learning Goal</label>
              <textarea
                name="goal"
                value={form.goal}
                onChange={onChange}
                required
                className="w-full p-3 h-20 rounded-md bg-[#0f0b12] border border-white/10"
                placeholder="What do you want to achieve?"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-sm text-gray-200">Preferred Difficulty</label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={onChange}
                className="w-full mt-1 p-3 rounded-md bg-[#0f0b12] border border-white/10"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm text-gray-200 block mb-1">Skills You Know</label>
              <div className="grid grid-cols-2 gap-2">
                {skillsList.map((sk) => (
                  <label key={sk} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.skills.includes(sk)}
                      onChange={() => toggleCheckbox("skills", sk)}
                    />
                    {sk}
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Pic */}
            <div>
              <label className="text-sm text-gray-200 block mb-1">Upload Profile Picture</label>
              <input
                type="file"
                onChange={handleFile}
                className="w-full text-sm"
                accept="image/*"
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`p-3 rounded text-sm ${message.type === "error" ? "bg-red-600/30" : "bg-green-600/30"}`}>
                {message.text}
              </div>
            )}

            {/* Submit */}
            <button
              className="w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r
                         from-[#7B3FF2] via-[#00E0FF] to-[#FF2D75] shadow-neon-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Finish Setup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
