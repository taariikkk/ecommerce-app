import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

const CheckoutForm = ({ totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Uplata uspješna!");
          break;
        case "processing":
          setMessage("Uplata se obrađuje.");
          break;
        case "requires_payment_method":
          setMessage("Uplata nije uspjela, pokušajte ponovo.");
          break;
        default:
          setMessage("Nešto je pošlo po zlu.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/orders",
      },
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Plaćanje</h2>
      <p className="mb-4 text-gray-600">Ukupno za platiti: <span className="font-bold text-blue-600">{formatCurrency(totalAmount)}</span></p>
      
      {/* Stripe Element (Unos kartice) */}
      <PaymentElement id="payment-element" />
      
      {message && <div className="text-red-500 mt-2 text-sm">{message}</div>}

      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded mt-6 hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {isLoading ? "Obrađujem..." : "Plati sada"}
      </button>
    </form>
  );
};

export default CheckoutForm;