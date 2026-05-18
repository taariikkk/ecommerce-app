import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import Loader from '../components/Loader';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { id } = useParams();

  // Premium fashion images
  const fashionImages = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1200&fit=crop&q=85',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1200&fit=crop&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1200&fit=crop&q=85',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1200&fit=crop&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop&q=85',
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error(`Error fetching product with ID ${id}:`, err);
        setError('This piece could not be found.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <Link to="/" className={styles.backButton}>
          Return to Collection
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>This piece could not be found.</p>
        <Link to="/" className={styles.backButton}>
          Return to Collection
        </Link>
      </div>
    );
  }

  const imageIndex = product.id ? (product.id % fashionImages.length) : 0;
  const imageUrl = product.image || fashionImages[imageIndex];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Image Section */}
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt={product.name} 
            className={styles.image} 
          />
        </div>

        {/* Details Section */}
        <div className={styles.detailsContainer}>
          <div>
            {product.Category && (
              <span className={styles.categoryTag}>
                {product.Category.name}
              </span>
            )}
            
            <h1 className={styles.title}>{product.name}</h1>
            
            <p className={styles.price}>
              {formatCurrency(product.price)}
            </p>
            
            <p className={styles.description}>
              {product.description || 'Meticulously crafted with the finest materials, this piece embodies the essence of contemporary luxury. Designed for those who appreciate exceptional quality and timeless elegance.'}
            </p>
            
            <div className={styles.stockStatus}>
              <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <button 
              disabled={!product.inStock} 
              onClick={() => addToCart(product)}
              className={styles.addToCartBtn}
              aria-label={product.inStock ? `Add ${product.name} to bag` : 'Out of stock'}
            >
              {product.inStock ? 'Add to Bag' : 'Out of Stock'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
