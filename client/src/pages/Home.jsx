import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import FilterSidebar from '../components/FilterSidebar';
import styles from './Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts({ categoryId: selectedCategory });
        setProducts(response.data); 
      } catch {
        setError("Greška pri učitavanju.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (products.length === 0) return <p className="text-gray-500 text-center">Nema proizvoda.</p>;

    return (
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="container"> {/* Globalna klasa iz index.css */}
      
      {/* Hero Baner */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Nova Kolekcija 2026</h1>
          <p>Otkrijte najbolje proizvode po nevjerovatnim cijenama.</p>
          <a href="#shop" className={styles.ctaButton}>Kupi Odmah</a>
        </div>
      </section>

      {/* Glavni Sadržaj */}
      <div className={styles.mainContent} id="shop">
        
        {/* Sidebar */}
        <aside className={styles.sidebarWrapper}>
          <FilterSidebar 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </aside>

        {/* Lista Proizvoda */}
        <div className={styles.productsWrapper}>
          <h2 style={{ marginBottom: '1rem', fontWeight: '600' }}>
            {selectedCategory ? 'Odabrana Kategorija' : 'Svi Proizvodi'}
          </h2>
          {renderContent()}
        </div>
        
      </div>
    </div>
  );
};

export default Home;