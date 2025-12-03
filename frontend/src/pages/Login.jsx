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
      const res = await api.post("/auth/login/", { email, password });

      const { access } = res.data;
      saveToken(access);

      setMessage({ type: "success", text: "Login successful!" });

      setTimeout(() => navigate("/dashboard"), 600);
    } catch (err) {
      setMessage({ type: "error", text: "Invalid credentials" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      <div className="w-full flex items-center justify-center px-6 py-10">
        <div className="glass w-full max-w-md p-10 rounded-2xl border border-white/10">
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
            className="w-full p-3 mb-4 rounded-lg bg-white/5 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-white/5 border border-white/10"
          />

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold bg-purple-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-white/70">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
