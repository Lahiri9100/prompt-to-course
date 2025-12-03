import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const payload = { email, password };   // ✅ FIXED: payload defined

      const res = await api.post("/auth/login/", payload);
      const { access } = res.data;

      saveToken(access);

      setMessage({ type: "success", text: "Login successful!" });

      setTimeout(() => navigate("/dashboard"), 600);

    } catch (err) {
      console.error("Login error:", err);
      setMessage({ type: "error", text: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="glass w-full max-w-md p-8 rounded-xl border border-white/10">

        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {message && (
          <div className={`p-3 mb-3 rounded text-sm ${
            message.type === "error" ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
          }`}>
            {message.text}
          </div>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400">Register</Link>
        </p>

      </div>
    </div>
  );
}
