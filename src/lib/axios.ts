import axios from "axios";
import { getAuthToken } from "@/lib/auth-token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:9000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
