import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from './CartContext.js';

export const CartProvider = ({ children }) => {
  // 1. Učitaj korpu iz localStorage
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('shopping-cart');
    return localData ? JSON.parse(localData) : [];
  });

  // 2. Sačuvaj u localStorage pri svakoj promjeni
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const addToCart = (product) => {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return currItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currItems, { ...product, quantity: 1 }];
      }
    });
    toast.success('Proizvod dodat u korpu!');
  };

  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    toast.error('Proizvod uklonjen.');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const value = {
    getItemQuantity,
    addToCart,
    decreaseCartQuantity,
    removeFromCart,
    clearCart,
    cartItems,
    cartQuantity,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};