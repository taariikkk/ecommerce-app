import axiosClient from './axiosClient';

export const getProducts = (params) => {
  return axiosClient.get('/products', { params });
};

export const getProductById = (productId) => {
  return axiosClient.get(`/products/${productId}`);
};

// --- ADMIN ---

export const createProduct = (productData) => {
  return axiosClient.post('/products', productData);
};

export const updateProduct = (id, productData) => {
  return axiosClient.put(`/products/${id}`, productData);
};

export const deleteProduct = (id) => {
  return axiosClient.delete(`/products/${id}`);
};