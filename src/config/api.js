// Environment-based API configuration
const API_BASE_URL = import.meta.env.PROD
  ? "https://backend-psi-umber-53.vercel.app"
  : "http://localhost:3000";
// Create axios instance with base URL for production
import axios from "axios";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the configured axios instance
export default apiClient;

// Also export the base URL for fetch requests
export { API_BASE_URL };
