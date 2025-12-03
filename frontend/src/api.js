// frontend/src/api.js

import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://prompt-to-course-production.up.railway.app/api",
});

// Attach Authorization header automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  console.log("🔑 Using token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
