import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

const ProductCard = ({ product }) => {
  // Postavljamo podrazumevanu sliku ako proizvod nema svoju
  const imageUrl = product.image || 'https://via.placeholder.com/300';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/product/${product.id}`}>
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-gray-600 mt-1">
          {formatCurrency(product.price)}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/product/${product.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Pogledaj detalje
          </Link>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;