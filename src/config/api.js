import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

// API Configuration for deployment
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ecommerce-webapp-1.onrender.com";

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    // User endpoints
    verifyEmail: "/api/user/verify-email",
    verifyMail: "/api/user/verifyMail",
    setupPassword: "/api/user/setup-password",
    userAddress: "/api/user/userAddress",
    deleteAddress: "/api/user/deleteAddress",
    getAddressByEmail: "/api/user/getaddressbyemail",
    users: "/api/user/users",
    deleteUser: "/api/user/delete-user",
    updateUser: "/api/user/update-user",

    // Product endpoints
    products: "/api/products",
    categories: "/api/categories",
    subcategories: "/api/subcategories",

    // Cart endpoints
    cart: "/api/cart",
    cartSummary: "/api/cart/summary",
    cartUser: "/api/cart/user",
    cartUpdateItem: "/api/cart/update-item",
    cartRemoveItem: "/api/cart/remove-item",
    cartClear: "/api/cart/clear",

    // Order endpoints
    orderAdd: "/api/order/add",
    orderPayment: "/api/order/payment",
    orderUpdateStatus: "/api/order/update-status",
    orderGeneratePdf: "/api/order/generate-pdf",
    adminOrders: "/api/order/admin/orders",
    adminOrdersUpdateStatus: "/api/order/admin/orders/update-status",
    adminOrdersDelete: "/api/order/admin/orders/delete",

    // Wishlist endpoints
    wishlist: "/api/wishlist",
  },
};

export default api;
