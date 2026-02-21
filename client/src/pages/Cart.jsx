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

  const handleCheckout = () => {
    if (!user) {
      toast.error('Morate biti prijavljeni da bi završili kupovinu.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>Vaša korpa je prazna</h2>
        <p style={{marginBottom: '2rem', color: 'var(--text-light)'}}>Izgleda da još niste dodali proizvode.</p>
        <Link to="/" className={styles.backBtn}>
          Nazad na kupovinu
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vaša Korpa</h1>

      <div className={styles.layout}>
        {/* Lista proizvoda */}
        <div className={styles.itemsColumn}>
          <div className={styles.itemsContainer}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <img 
                   src={item.image || 'https://via.placeholder.com/150'} 
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
                  >
                    -
                  </button>
                  <span style={{fontWeight: '500', width: '20px', textAlign: 'center'}}>{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className={styles.qtyBtn}
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
                  >
                    Ukloni
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={clearCart} className={styles.clearCartBtn}>
            Isprazni korpu
          </button>
        </div>

        {/* Summary */}
        <div className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Pregled narudžbe</h2>
            
            <div className={styles.summaryRow}>
              <span>Međuzbir:</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Dostava:</span>
              <span>Besplatno</span>
            </div>
            
            <div className={styles.divider}>
              <span className={styles.finalTotalLabel}>Ukupno:</span>
              <span className={styles.finalTotalValue}>{formatCurrency(cartTotal)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className={styles.checkoutBtn}
            >
              Nastavi na plaćanje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;