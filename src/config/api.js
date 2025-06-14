// Environment-based API configuration
const API_BASE_URL = import.meta.env.PROD
  ? "https://backend-psi-umber-53.vercel.app"
  : "http://localhost:3000";
// Create axios instance with base URL for production
import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove from cookies
      Cookies.remove("authToken");
      // Optionally redirect to login page
      if (
        window.location.pathname !== "/sign-in" &&
        window.location.pathname !== "/sign-up"
      ) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default apiClient;

// Also export the base URL for fetch requests
export { API_BASE_URL };
