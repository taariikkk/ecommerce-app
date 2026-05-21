import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../hooks/useCart';
import { createPaymentIntent } from '../api/paymentApi';
import { createOrder } from '../api/orderApi';
import CheckoutForm from '../components/CheckoutForm';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './Checkout.module.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    const itemsForBackend = cartItems.map(item => ({ productId: item.id, quantity: item.quantity }));
    
    createPaymentIntent(itemsForBackend)
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error(err);
        toast.error("Greška pri inicijalizaciji plaćanja.");
      });
  }, [cartItems, navigate]);

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      const orderData = {
        items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
        paymentId: paymentIntent.id, 
        totalAmount: paymentIntent.amount / 100 
      };
      await createOrder(orderData);
      clearCart();
      toast.success("Plaćanje uspješno! Narudžba kreirana.");
      navigate('/orders');
    } catch (error) {
      console.error(error);
      toast.error("Greška pri čuvanju narudžbe.");
    }
  };

  if (!clientSecret) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Završetak kupovine</h1>
      {clientSecret && (
        <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
          <CheckoutForm totalAmount={cartTotal} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;