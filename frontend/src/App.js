// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import CourseGenerator from "./components/CourseGenerator";
import Generate from "./pages/Generate";
import Dashboard from "./pages/Dashboard";  // <-- FIX

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="pt-20">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/generate" element={<Generate />} />

            {/* After login -> onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Course generator page */}
            <Route
              path="/generate"
              element={
                <ProtectedRoute>
                  <CourseGenerator />
                </ProtectedRoute>
              }
            />

            {/* REAL dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />   {/* <-- FINALLY FIXED */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
