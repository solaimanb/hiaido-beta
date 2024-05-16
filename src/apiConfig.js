import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;


const API = axios.create({
    baseURL: apiUrl || "http://localhost:5173/api", // Your API base URL
    timeout: 10000, // Timeout for requests in milliseconds
});

API.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
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
