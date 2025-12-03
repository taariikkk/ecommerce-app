import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const imageUrl = 'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
      <Link to={`/product/${product.id}`}>
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-gray-600 mt-1 font-bold">
          {formatCurrency(product.price)}
        </p>
        
        <div className="flex-grow"></div> 

        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/product/${product.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Detalji
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;