import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    setMessage(null);

    try {
      const res = await api.post("/auth/register/", {
        email: email,
        username: username,
        password: password,
      });

      console.log("Register:", res.data);
      setMessage("Account created successfully!");

      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      setMessage("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-white/10 p-8 rounded-xl border border-white/20">

        <h2 className="text-3xl font-bold mb-6">Register</h2>

        {message && <div className="mb-4">{message}</div>}

        <input
          className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
        >
          Register
        </button>
      </div>
    </div>
  );
}
