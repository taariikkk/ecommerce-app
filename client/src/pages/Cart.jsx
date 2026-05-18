import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, decreaseCartQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fashion images for cart items
  const fashionImages = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop&q=80',
  ];

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please sign in to complete your purchase.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>Your bag is empty</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--foreground-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
          Discover our curated collection and find your next favorite piece.
        </p>
        <Link to="/" className={styles.backBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Bag</h1>

      <div className={styles.layout}>
        {/* Items List */}
        <div className={styles.itemsColumn}>
          <div className={styles.itemsContainer}>
            {cartItems.map((item, index) => {
              const imageIndex = item.id ? (item.id % fashionImages.length) : (index % fashionImages.length);
              const itemImage = item.image || fashionImages[imageIndex];
              
              return (
                <div key={item.id} className={styles.itemRow}>
                  <img 
                    src={itemImage} 
                    alt={item.name} 
                    className={styles.itemImage}
                  />
                  
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{formatCurrency(item.price)}</p>
                  </div>

                  <div className={styles.quantityControls}>
                    <button 
                      onClick={() => decreaseCartQuantity(item.id)}
                      className={styles.qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span style={{ fontWeight: '500', width: '24px', textAlign: 'center', color: 'var(--foreground)' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => addToCart(item)}
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    <p className={styles.totalPrice}>
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeBtn}
                      aria-label={`Remove ${item.name} from bag`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button onClick={clearCart} className={styles.clearCartBtn}>
            Clear Bag
          </button>
        </div>

        {/* Summary */}
        <div className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            
            <div className={styles.divider}>
              <span className={styles.finalTotalLabel}>Total</span>
              <span className={styles.finalTotalValue}>{formatCurrency(cartTotal)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className={styles.checkoutBtn}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
