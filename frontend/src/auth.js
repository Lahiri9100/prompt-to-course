// src/auth.js
const TOKEN_KEY = "syllabrix_token";
const USER_KEY = "syllabrix_user";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function saveUser(userObj) {
  localStorage.setItem(USER_KEY, JSON.stringify(userObj));
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getToken();
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};