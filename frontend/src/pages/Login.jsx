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
      const res = await api.post("/auth/login/", { email, password });
      saveToken(res.data.access);

      navigate("/dashboard");
    } catch (err) {
      setMessage("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex bg-black text-white">

      {/* LEFT SIDE HERO SECTION */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <h1 className="text-6xl font-bold leading-tight px-10">
          Level Up Your <br /> Learning Journey.
        </h1>
      </div>

      {/* RIGHT SIDE LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-[#0f0f0f] p-10 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">Login</h2>

          {message && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded mb-3">
              {message}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-white/10 border border-white/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded bg-white/10 border border-white/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            disabled={loading}
            className="w-full p-3 rounded bg-gradient-to-r from-blue-500 to-pink-500 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-4 text-white/60">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
