// src/api/axiosInstance.js
import axios from "axios";
const baseURL = import.meta.env.VITE_APP_BASE_URL;
console.log("Base URL:", baseURL);
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token from localStorage (or any auth store)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
