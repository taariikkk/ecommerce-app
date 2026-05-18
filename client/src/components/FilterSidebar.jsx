import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/categoryApi';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (error) { 
        console.error(error); 
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className={styles.sidebar} aria-label="Product categories">
      <h3 className={styles.title}>Categories</h3>
      <div className={styles.list} role="list">
        <button
          onClick={() => onSelectCategory(null)}
          className={`${styles.button} ${selectedCategory === null ? styles.active : ''}`}
          aria-pressed={selectedCategory === null}
        >
          All Pieces
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`${styles.button} ${selectedCategory === cat.id ? styles.active : ''}`}
            aria-pressed={selectedCategory === cat.id}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FilterSidebar;
