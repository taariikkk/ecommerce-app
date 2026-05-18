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
      } catch { 
        setError("Unable to load collection."); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchProducts();
  }, [selectedCategory, sortBy, searchTerm]);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <p className={styles.errorState}>{error}</p>;
    if (products.length === 0) return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>No pieces found in this collection.</p>
      </div>
    );
    return (
      <div className={styles.productsGrid}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    );
  };

  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section - Editorial Full-Bleed */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=85" 
            alt="Luxury fashion editorial"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Spring/Summer 2026</span>
          <h1 className={styles.heroTitle}>
            The Art of <em>Timeless</em> Design
          </h1>
          <p className={styles.heroDescription}>
            Discover our curated collection of contemporary pieces that transcend seasons. 
            Crafted with intention, designed for those who appreciate the extraordinary.
          </p>
          <button onClick={scrollToShop} className={styles.heroCta}>
            Explore Collection
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.mainContent} id="shop">
        <aside className={styles.sidebarWrapper}>
          <FilterSidebar 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </aside>

        <div className={styles.productsWrapper}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchContainer}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={styles.searchIcon} 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search collection..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                aria-label="Search products"
              />
            </div>

            <div className={styles.sortContainer}>
              <label className={styles.sortLabel} htmlFor="sort-select">Sort by</label>
              <select 
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
                aria-label="Sort products"
              >
                <option value="">Latest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory ? 'Curated Selection' : 'All Pieces'}
            </h2>
            {searchTerm && (
              <span className={styles.searchMeta}>
                Searching for &ldquo;{searchTerm}&rdquo;
              </span>
            )}
          </div>

          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Home;
