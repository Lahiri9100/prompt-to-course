// frontend/src/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const payload = { email, password };

      console.log("📩 Sending Login Payload:", payload);

      const res = await api.post("/auth/login/", payload);

      console.log("✅ Login Response:", res.data);

      // Backend might return different token field names
      const token =
        res.data.access ||
        res.data.access_token ||
        res.data.token ||
        null;

      if (!token) {
        console.error("❌ NO TOKEN RECEIVED FROM BACKEND!");
        setMessage({
          type: "error",
          text: "Backend did not return a token.",
        });
        return;
      }

      saveToken(token);

      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err.response?.data || err);

      setMessage({
        type: "error",
        text: err.response?.data?.message || "Invalid login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      <div className="w-full max-w-md mx-auto mt-24 p-10 rounded-xl bg-white/10">
        <h2 className="text-3xl font-bold mb-8">Login</h2>

        {message && (
          <div
            className={`p-3 mb-3 text-sm rounded ${
              message.type === "error"
                ? "bg-red-500/20 text-red-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white/5 border border-white/20"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-white/5 border border-white/20"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-3 rounded bg-purple-600 hover:bg-purple-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-white/70">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-300 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
