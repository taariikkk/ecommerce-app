import axiosClient from "./axiosClient.js";

export const updateUserProfile = (userData) => {
    return axiosClient.put('/users/profile', userData);
};

export const getUserProfile = () => {
    return axiosClient.get('/users/profile');
};