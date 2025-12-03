// Save JWT access token
export const saveToken = (token) => {
  localStorage.setItem("access_token", token);
};

// Get JWT access token
export const getToken = () => {
  return localStorage.getItem("access_token");
};

// Remove token on logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};

// 🔥 Save user info (optional)
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// 🔥 Get user info (required by Dashboard.jsx)
export const getUser = () => {
  const data = localStorage.getItem("user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

// Check if logged in (used by Navbar / ProtectedRoute)
export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};
