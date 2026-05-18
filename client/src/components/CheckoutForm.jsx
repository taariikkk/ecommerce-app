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
        case "succeeded": setMessage("Payment successful!"); break;
        case "processing": setMessage("Payment is processing."); break;
        case "requires_payment_method": setMessage("Payment failed. Please try again."); break;
        default: setMessage("Something went wrong."); break;
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
      setMessage("Unexpected payment state.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Payment Details</h2>
      <p className={styles.totalText}>
        Order Total: <span className={styles.amount}>{formatCurrency(totalAmount)}</span>
      </p>
      
      <PaymentElement id="payment-element" />
      
      {message && <div className={styles.errorMessage} role="alert">{message}</div>}

      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className={styles.payBtn}
        type="submit"
      >
        {isLoading ? "Processing..." : "Complete Purchase"}
      </button>
    </form>
  );
};

export default CheckoutForm;
