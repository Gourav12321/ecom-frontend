// Axios configuration for API calls
import axios from "axios";

// Set the base URL for API calls based on environment
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ecommerce-webapp-1.onrender.com";

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axios;
