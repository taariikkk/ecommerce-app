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
      } catch (error) { console.error(error); }
    };
    fetchCategories();
  }, []);

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Kategorije</h3>
      <div className={styles.list}>
        <button
          onClick={() => onSelectCategory(null)}
          className={`${styles.button} ${selectedCategory === null ? styles.active : ''}`}
        >
          Svi proizvodi
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`${styles.button} ${selectedCategory === cat.id ? styles.active : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;