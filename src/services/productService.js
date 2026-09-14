

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { INITIAL_CATEGORIES } from "../constants/mockData";

export const productService = {
  getAllProducts: async (params) => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.BASE, { params });
    return response.data;
  },

  getSingleProduct: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.SINGLE}/${id}`);
    return response.data;
  },

  // ⚠️ backend e /products/categories route nai, tai eita mock e thakteche.
  // Category feature banale ei function update korte hobe.
  getCategories: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.CATEGORIES);
      return response.data;
    } catch {
      return {
        success: true,
        categories: INITIAL_CATEGORIES
      };
    }
  },

  // ⚠️ eita ekhon actual flow e use hocche na - AdminCreateProduct.jsx
  // nijei axios.post diye formData sorasori backend e pathay (image upload er jonno).
  createProduct: async (productData) => {
    const response = await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await apiClient.put(`${API_ENDPOINTS.PRODUCTS.UPDATE}/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.PRODUCTS.DELETE}/${id}`);
    return response.data;
  }
};