import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submit = async () => {
    setMessage(null);
    try {
      await api.post("/auth/register/", {
        full_name: fullName,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="h-screen w-full flex bg-black text-white">

      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <h1 className="text-6xl font-bold leading-tight px-10">
          Build Your Future <br /> With AI Learning.
        </h1>
      </div>

      {/* RIGHT FORM */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-[#0f0f0f] p-10 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">Register</h2>

          {message && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded mb-3">{message}</div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 rounded bg-white/10 border border-white/20"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            className="w-full p-3 rounded bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
          >
            Register
          </button>

          <p className="text-center mt-4 text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
