import axios from "axios";
import { getToken } from "./auth";

export const BASE_URL = "https://prompt-to-course-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // JWT TOKEN
  }
  return config;
});

export default api;