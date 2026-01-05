import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import FilterSidebar from '../components/FilterSidebar';

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
      } catch (err) {
        console.error("Greška:", err);
        setError("Greška pri učitavanju.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (products.length === 0) return <p className="text-gray-500">Nema proizvoda u ovoj kategoriji.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-1/4">
          <FilterSidebar 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        <div className="lg:w-3/4">
          {renderContent()}
        </div>
        
      </div>
    </div>
  );
};

export default Home;