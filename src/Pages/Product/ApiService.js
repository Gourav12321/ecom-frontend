import axios from 'axios';

const API_URL = '/api'; 
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data.categories;
  } catch (error) {
    console.error('Failed to fetch categories', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${API_URL}/product/category/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products by category:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};