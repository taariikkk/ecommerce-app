import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import Loader from '../components/Loader';
import { formatCurrency } from '../utils/formatCurrency';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="text-center py-10">
        <p className="text-red-500 text-xl">{error}</p>
        <Link to="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Vrati se na početnu
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p>Proizvod nije pronađen.</p>;
  }

  // KORAK 4: Finalni prikaz
  const imageUrl = product.image
    ? `http://localhost:5000${product.image}`
    : 'https://via.placeholder.com/600x600';

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        
        <div className="md:w-1/2">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <div>
            {product.Category && (
               <span className="text-sm text-gray-500 bg-gray-200 py-1 px-3 rounded-full">
                 {product.Category.name}
               </span>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.name}</h1>
            <p className="text-3xl font-light text-gray-900 my-4">
              {formatCurrency(product.price)}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-6">
               <span className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'Na stanju' : 'Nije na stanju'}
               </span>
            </div>
            <div className="mt-6">
              <button 
                disabled={!product.inStock} 
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Dodaj u korpu
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;