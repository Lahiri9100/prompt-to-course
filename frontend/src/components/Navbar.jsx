import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../auth";

export default function Navbar() {
  const navigate = useNavigate();
  
  const [token, setToken] = React.useState(getToken());

  React.useEffect(() => {
    setToken(getToken());
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);   // Force navbar to update
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        Syllabrix
      </Link>

      <div className="flex items-center gap-6 text-white">
        {!token ? (
          <>
            <Link to="/login" className="hover:text-neonA transition">Login</Link>
            <Link to="/register" className="hover:text-neonB transition">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-neonA transition">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
