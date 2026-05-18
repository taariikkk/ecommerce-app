import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Premium fashion images from Unsplash
  const fashionImages = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80',
  ];
  
  const secondaryImages = [
    'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80',
  ];
  
  // Use product id to consistently select an image
  const imageIndex = product.id ? (product.id % fashionImages.length) : 0;
  const primaryImage = product.image || fashionImages[imageIndex];
  const secondaryImage = secondaryImages[imageIndex];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
        <img 
          src={primaryImage} 
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        <img 
          src={secondaryImage} 
          alt={`${product.name} - alternate view`}
          className={styles.imageSecondary}
          loading="lazy"
        />
        
        {/* Quick add overlay */}
        <div className={styles.quickAdd}>
          <button 
            onClick={handleQuickAdd}
            className={styles.btnQuickAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Bag
          </button>
        </div>

        {/* Wishlist button */}
        <button 
          className={styles.wishlistBtn}
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </Link>
      
      <div className={styles.content}>
        <Link to={`/product/${product.id}`}>
          <h3 className={styles.title}>
            {product.name}
          </h3>
        </Link>
        
        <p className={styles.price}>
          {formatCurrency(product.price)}
        </p>

        <div className={styles.actions}>
          <Link 
            to={`/product/${product.id}`}
            className={styles.detailsLink}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
