import axiosClient from './axiosClient';

export const getCategories = () => {
  return axiosClient.get('/categories');
};

export const createCategory = (name) => {
  return axiosClient.post('/categories', { name });
};

export const deleteCategory = (id) => {
  return axiosClient.delete(`/categories/${id}`);
};