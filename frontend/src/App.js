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


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/* Always at the top */}
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

            {/* Example protected dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="p-10 text-3xl">Private Dashboard</div>
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
