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
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
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
      toast.error("Plaćanje je prošlo, ali nismo uspjeli sačuvati narudžbu. Kontaktirajte podršku.");
    }
  };

  if (!clientSecret) return <Loader />;

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Završetak kupovine</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm 
            totalAmount={cartTotal} 
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;