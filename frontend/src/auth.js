// frontend/src/auth.js

// Save JWT token
export function saveToken(token) {
  if (!token) {
    console.error("⚠️ Tried to save EMPTY TOKEN!", token);
  }
  localStorage.setItem("access_token", token);
}

// Get JWT token
export function getToken() {
  return localStorage.getItem("access_token");
}

// Clear JWT token
export function logout() {
  localStorage.removeItem("access_token");
}
