import axiosClient from './axiosClient';

export const getProducts = (params) => {
  return axiosClient.get('/products', { params });
};

export const getProductById = (productId) => {
  return axiosClient.get(`/products/${productId}`);
};
