import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/categoryApi';

const FilterSidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (error) {
        console.error('Greška pri dohvatanju kategorija', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 lg:mb-0">
      <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">Kategorije</h3>
      <div className="flex flex-col gap-2">
        {/* Dugme za reset*/}
        <button
          onClick={() => onSelectCategory(null)}
          className={`text-left px-3 py-2 rounded transition-colors ${
            selectedCategory === null 
              ? 'bg-blue-100 text-blue-700 font-semibold' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Svi proizvodi
        </button>

        {/* Lista kategorija iz baze */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`text-left px-3 py-2 rounded transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-100 text-blue-700 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;