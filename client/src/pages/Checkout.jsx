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
        toast.error("Error initializing payment.");
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
      toast.success("Payment successful! Your order has been placed.");
      navigate('/orders');
    } catch (error) {
      console.error(error);
      toast.error("Error saving order.");
    }
  };

  if (!clientSecret) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  // Custom Stripe Elements appearance for dark theme
  const stripeAppearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#f5a623',
      colorBackground: '#111111',
      colorText: '#fafaf9',
      colorDanger: '#ef4444',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      borderRadius: '0px',
    },
    rules: {
      '.Input': {
        border: '1px solid #262626',
        backgroundColor: 'transparent',
      },
      '.Input:focus': {
        border: '1px solid #fafaf9',
        boxShadow: 'none',
      },
      '.Label': {
        fontSize: '0.75rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#a8a8a8',
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Complete Your Order</h1>
      {clientSecret && (
        <Elements 
          options={{ clientSecret, appearance: stripeAppearance }} 
          stripe={stripePromise}
        >
          <CheckoutForm totalAmount={cartTotal} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
