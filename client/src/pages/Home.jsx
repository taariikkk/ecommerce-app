import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data); 
      } catch (err) {
        console.error("Greška pri dohvatanju proizvoda:", err);
        setError("Nismo uspeli da učitamo proizvode. Molimo pokušajte ponovo kasnije.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
// ...

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <p className="text-center text-red-500 text-lg">{error}</p>;
    }

    if (products.length === 0) {
      return <p className="text-center text-gray-500 text-lg">Trenutno nema dostupnih proizvoda.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Naša Ponuda</h1>
        <p className="text-gray-600 mt-2">Istražite najnovije proizvode u našoj kolekciji</p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Home;