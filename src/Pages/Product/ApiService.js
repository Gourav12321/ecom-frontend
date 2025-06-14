import apiClient, { API_BASE_URL } from "../../config/api.js";

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryName) => {
  try {
    const response = await apiClient.get(
      `/api/product/category/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch products by category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
