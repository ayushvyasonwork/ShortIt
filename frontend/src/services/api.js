// src/api/index.js
import axiosInstance from "./axiosInstance";

export const shortenUrl = (data) => axiosInstance.post("/shorten", data);

export const fetchUrlsByTag = (tag) => axiosInstance.get(`/tags/${tag}`);

// frontend
export const fetchAnalytics = (code, userId) =>
  axiosInstance.post(`/analytics/${code}`, { userid: userId });


export const loginUser = (formData) => axiosInstance.post("/login", formData);

export const registerUser = (formData) => axiosInstance.post("/register", formData);
// client
export const fetchAllAnalytics = (userId) => {
  return axiosInstance.get(`/analytics?userid=${userId}`);
};

