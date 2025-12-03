import axios from "axios";
import { getToken } from "./auth";

export const BASE_URL = "https://prompt-to-course-production.up.railway.app";
export const API_BASE = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: BASE_URL,   // FIXED
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
