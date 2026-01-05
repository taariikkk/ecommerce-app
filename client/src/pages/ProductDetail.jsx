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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error(`Greška pri dohvatanju proizvoda sa ID ${id}:`, err);
        setError('Proizvod nije pronađen ili je došlo do greške.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <Link to="/" className={styles.backButton}>
          Vrati se na početnu
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p className={styles.errorContainer}>Proizvod nije pronađen.</p>;
  }

  const imageUrl = product.image || 'https://via.placeholder.com/600x400';

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Lijeva strana: Slika */}
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt={product.name} 
            className={styles.image} 
          />
        </div>

        {/* Desna strana: Detalji */}
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
              {product.description}
            </p>
            
            <div className={styles.stockStatus}>
               <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                {product.inStock ? '● Na stanju' : '● Nije na stanju'}
               </span>
            </div>
            
            <button 
              disabled={!product.inStock} 
              onClick={() => addToCart(product)}
              className={styles.addToCartBtn}
            >
              {product.inStock ? 'Dodaj u korpu' : 'Nije na stanju'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;