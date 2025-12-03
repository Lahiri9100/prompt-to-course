import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login/", {
        email: email,
        password: password,
      });

      console.log("Login response:", res.data);

      const token =
        res.data.access ||
        res.data.access_token ||
        res.data.token;

      if (!token) {
        throw new Error("No token returned from backend");
      }

      saveToken(token);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-white/10 p-8 rounded-xl border border-white/20">
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <input
          className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 bg-white/10 border border-white/20 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full py-3 bg-purple-600 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400">Register</Link>
        </p>
      </div>
    </div>
  );
}
