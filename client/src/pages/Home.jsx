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
        const params = {
          categoryId: selectedCategory,
          search: searchTerm,
          sortBy: sortBy
        };
        const response = await getProducts(params);
        setProducts(response.data);
      } catch {
        setError("Greška pri učitavanju.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, sortBy, searchTerm]);

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
        {/* Sidebar (Kategorije) */}
        <aside className={styles.sidebarWrapper}>
          <FilterSidebar 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </aside>

        {/* Glavni dio */}
        <div className={styles.productsWrapper}>
          {/* --- NOVO: Search & Sort Bar --- */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:w-1/2">
              <input 
                type="text" 
                placeholder="Pretraži proizvode..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border p-2 pl-4 rounded-full focus:outline-none focus:border-blue-500 transition"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Sortiraj:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border p-2 rounded focus:outline-none bg-white"
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
            {searchTerm && <span className="text-gray-500 text-sm ml-2">(Pretraga: "{searchTerm}")</span>}
          </h2>

          {/* Lista Proizvoda */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;