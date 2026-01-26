import axiosClient from './axiosClient';

export const createPaymentIntent = (items) => {
  return axiosClient.post('/payment/create-payment-intent', { items });
};