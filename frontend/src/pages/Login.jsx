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
      const res = await api.post("/api/auth/login/", payload);

      const { access } = res.data;

      // Save JWT access token
      saveToken(access);

      setMessage({ type: "success", text: "Login successful!" });

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white">

      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(123,63,242,0.4),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(0,224,255,0.3),transparent_60%)]"></div>
        <h1 className="relative text-5xl font-bold px-12 leading-tight">
          Level Up Your  
          <span className="block neon-underline mt-2">Learning Journey.</span>
        </h1>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="glass w-full max-w-md p-10 rounded-2xl shadow-neon-lg border border-white/10">

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
            className="w-full p-3 mb-4 rounded-lg bg-white/5 border border-white/10 focus:border-neonA outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-white/5 border border-white/10 focus:border-neonB outline-none"
          />

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-neon-gradient hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-white/70">
            Don’t have an account?{" "}
            <Link to="/register" className="text-neonB hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
