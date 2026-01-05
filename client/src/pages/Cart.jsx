import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { createOrder } from '../api/orderApi';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, decreaseCartQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Morate biti prijavljeni da bi završili kupovinu.');
      navigate('/login');
      return;
    }

    setIsCheckoutLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      await createOrder(orderData);

      clearCart();
      toast.success('Narudžba uspješno kreirana!');
      navigate('/orders');

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Došlo je do greške pri naručivanju.';
      toast.error(msg);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Vaša korpa je prazna</h2>
        <p className="text-gray-500 mb-8">Izgleda da još niste dodali proizvode.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Nazad na kupovinu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Vaša Korpa</h1>

      <div className="flex flex-col lg:flex-row gap-8">
         <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition">
                <img 
                   src={item.image || 'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                   alt={item.name} 
                   className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3 mr-4">
                  <button onClick={() => decreaseCartQuantity(item.id)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600">-</button>
                  <span className="font-medium w-4 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600">+</button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 mb-1">{formatCurrency(item.price * item.quantity)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm underline">Ukloni</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={clearCart} className="mt-4 text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1">Isprazni korpu</button>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow top-24 sticky">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Pregled narudžbe</h2>
            
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Međuzbir:</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Dostava:</span>
              <span>Besplatno</span>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">Ukupno:</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(cartTotal)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition shadow-lg disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              {isCheckoutLoading ? 'Obrada...' : 'Završi kupovinu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;