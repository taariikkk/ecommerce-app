import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const imageUrl = product.image || 'https://via.placeholder.com/300';

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
        <img 
          src={imageUrl} 
          alt={product.name} 
          className={styles.image}
        />
      </Link>
      
      <div className={styles.content}>
        <h3 className={styles.title} title={product.name}>
          {product.name}
        </h3>
        
        <p className={styles.price}>
          {formatCurrency(product.price)}
        </p>

        <div className={styles.actions}>
          <Link 
            to={`/product/${product.id}`}
            className={styles.detailsLink}
          >
            Detalji
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className={styles.btnAdd}
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;