import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../api/orderApi';
import Loader from '../components/Loader';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';
import styles from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No orders yet</h2>
        <Link to="/" className={styles.emptyLink}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Order History</h1>
      
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <article key={order.id} className={styles.orderCard}>
            
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <p>Order <span className={styles.orderId}>#{order.id}</span></p>
                <p>{new Date(order.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              
              <div className={styles.orderSummary}>
                <p className={styles.totalPrice}>{formatCurrency(order.totalPrice)}</p>
                <span className={`${styles.statusBadge} ${order.status === 'paid' ? styles.statusPaid : styles.statusPending}`}>
                  {order.status === 'paid' ? 'Confirmed' : 'Processing'}
                </span>
              </div>
            </div>

            <div className={styles.itemsList}>
              {order.items && order.items.map((item) => (
                <div key={item.id} className={styles.itemRow}>
                  <div>
                    <span className={styles.itemName}>
                      {item.Product ? item.Product.name : 'Product'}
                    </span>
                    <span className={styles.itemQuantity}>
                       × {item.quantity}
                    </span>
                  </div>
                  <span className={styles.itemPrice}>
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
            
          </article>
        ))}
      </div>
    </div>
  );
};

export default Orders;
