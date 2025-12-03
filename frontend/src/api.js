import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://prompt-to-course-production.up.railway.app/api",
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
