import api from "../config/api";

// Authentication Services
export const authService = {
  verifyEmail: (data) => api.post("/user/verify-email", data),
  verifyMail: (data) => api.post("/user/verifyMail", data),
  setupPassword: (data) => api.post("/user/setup-password", data),
  signin: (data) => api.post("/auth/signin", data),
  signup: (data) => api.post("/auth/signup", data),
  logout: () => api.post("/auth/logout"),
};

// User Services
export const userService = {
  getUsers: () => api.get("/user/users"),
  deleteUser: (id) => api.delete(`/user/delete-user/${id}`),
  updateUser: (id, data) => api.put(`/user/update-user/${id}`, data),
  getUserAddresses: (email) => api.get(`/user/getaddressbyemail/${email}`),
  addAddress: (data) => api.post("/user/userAddress", data),
  deleteAddress: (id) => api.delete(`/user/deleteAddress/${id}`),
};

// Product Services
export const productService = {
  getAllProducts: () => api.get("/products"),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post("/products", data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get("/categories"),
  createCategory: (data) => api.post("/categories", data),
  getSubcategories: () => api.get("/subcategories"),
};

// Cart Services
export const cartService = {
  getCart: () => api.get("/cart"),
  getUserCart: (userId) => api.get(`/cart/user/${userId}`),
  addToCart: (data) => api.post("/cart", data),
  updateCartItem: (data) => api.put("/cart/update-item", data),
  removeFromCart: (itemId) => api.delete(`/cart/remove-item/${itemId}`),
  clearCart: () => api.delete("/cart/clear"),
  getCartSummary: () => api.get("/cart/summary"),
};

// Order Services
export const orderService = {
  createOrder: (data) => api.post("/order/add", data),
  processPayment: (data) => api.post("/order/payment", data),
  updateOrderStatus: (orderId, status) =>
    api.put(`/order/update-status/${orderId}`, { status }),
  generateOrderPdf: (orderId) => api.get(`/order/generate-pdf/${orderId}`),
  getAdminOrders: () => api.get("/order/admin/orders"),
  updateAdminOrderStatus: (orderId, status) =>
    api.put(`/order/admin/orders/update-status/${orderId}`, { status }),
  deleteAdminOrder: (orderId) =>
    api.delete(`/order/admin/orders/delete/${orderId}`),
};

// Wishlist Services
export const wishlistService = {
  getWishlist: () => api.get("/wishlist"),
  addToWishlist: (productId) => api.post("/wishlist", { productId }),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
};
