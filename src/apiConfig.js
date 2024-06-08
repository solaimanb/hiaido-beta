import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: apiUrl || "http://localhost:5173/api",
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    // Set token in the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
