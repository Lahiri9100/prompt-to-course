import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        full_name: fullName,
        email,
        password,
      }; // ✅ FIXED: payload defined

      await api.post("/auth/register/", payload);

      setMessage({ type: "success", text: "Registration successful!" });

      setTimeout(() => navigate("/login"), 600);

    } catch (err) {
      console.error("Register error:", err);
      setMessage({ type: "error", text: "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="glass w-full max-w-md p-8 rounded-xl border border-white/10">

        <h2 className="text-3xl font-bold mb-6">Register</h2>

        {message && (
          <div className={`p-3 mb-3 rounded text-sm ${
            message.type === "error" ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
          }`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-white/10 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-white/10 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-white/10 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-3 bg-purple-600 rounded font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400">Login</Link>
        </p>

      </div>
    </div>
  );
}
