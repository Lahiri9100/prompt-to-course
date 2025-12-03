import axios from "axios";
import { getToken } from "./auth";

// Backend URL
export const API_BASE = "https://prompt-to-course-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
