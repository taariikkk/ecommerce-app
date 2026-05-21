import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded": setMessage("Uplata uspješna!"); break;
        case "processing": setMessage("Uplata se obrađuje."); break;
        case "requires_payment_method": setMessage("Uplata nije uspjela."); break;
        default: setMessage("Nešto je pošlo po zlu."); break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "/orders" },
      redirect: "if_required", 
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent); 
    } else {
      setMessage("Neočekivano stanje.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Plaćanje</h2>
      <p className={styles.totalText}>
        Ukupno za platiti: <span className={styles.amount}>{formatCurrency(totalAmount)}</span>
      </p>
      
      <PaymentElement id="payment-element" />
      
      {message && <div className={styles.errorMessage}>{message}</div>}

      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className={styles.payBtn}
      >
        {isLoading ? "Obrađujem..." : "Plati sada"}
      </button>
    </form>
  );
};

export default CheckoutForm;