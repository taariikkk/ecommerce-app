import React, { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
     const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = { categoryId: selectedCategory, search: searchTerm, sortBy: sortBy };
        const response = await getProducts(params);
        setProducts(response.data);
      } catch { setError("Greška pri učitavanju."); } finally { setIsLoading(false); }
    };
    fetchProducts();
  }, [selectedCategory, sortBy, searchTerm]);

  const renderContent = () => {
     if (isLoading) return <Loader />;
     if (error) return <p className="text-red-500 text-center">{error}</p>;
     if (products.length === 0) return <p className="text-gray-500 text-center">Nema proizvoda.</p>;
     return <div className={styles.productsGrid}>{products.map(p => <ProductCard key={p.id} product={p} />)}</div>;
  };

  return (
    <div className="container">
      {/* Hero Baner */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Nova Kolekcija 2026</h1>
          <p>Otkrijte najbolje proizvode po nevjerovatnim cijenama.</p>
          <a href="#shop" className={styles.ctaButton}>Kupi Odmah</a>
        </div>
      </section>

      <div className={styles.mainContent} id="shop">
        <aside className={styles.sidebarWrapper}>
          <FilterSidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </aside>

        <div className={styles.productsWrapper}>
          <div className={styles.toolbar}>
            
            <div className={styles.searchContainer}>
              {/* Ikonica Lupa (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              
              <input 
                type="text" 
                placeholder="Pretraži proizvode..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.sortContainer}>
              <label className={styles.sortLabel}>Sortiraj:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="">Najnovije</option>
                <option value="price_asc">Cijena: Niska &rarr; Visoka</option>
                <option value="price_desc">Cijena: Visoka &rarr; Niska</option>
                <option value="name_asc">Naziv (A-Z)</option>
              </select>
            </div>
          </div>
          <h2 style={{ marginBottom: '1rem', fontWeight: '600' }}>
            {selectedCategory ? 'Rezultati' : 'Svi Proizvodi'}
            {searchTerm && <span style={{fontSize: '0.9rem', color: '#6b7280', marginLeft: '0.5rem'}}>(Pretraga: "{searchTerm}")</span>}
          </h2>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;