import React, { useState, useEffect } from 'react';
import styles from './AdminProductForm.module.css';

const AdminProductForm = ({ productToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
    inStock: true
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        description: productToEdit.description || '',
        price: productToEdit.price || '',
        image: productToEdit.image || '',
        categoryId: productToEdit.categoryId || '',
        inStock: productToEdit.inStock ?? true
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {productToEdit ? 'Uredi proizvod' : 'Novi proizvod'}
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Naziv</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={styles.input} 
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Opis</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className={styles.textarea} 
              required 
            />
          </div>

          <div className={styles.row}>
            <div className={`${styles.formGroup} ${styles.col}`}>
              <label className={styles.label}>Cijena</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                className={styles.input} 
                required 
              />
            </div>
            <div className={`${styles.formGroup} ${styles.col}`}>
              <label className={styles.label}>Kategorija ID</label>
              <input 
                type="number" 
                name="categoryId" 
                value={formData.categoryId} 
                onChange={handleChange} 
                className={styles.input} 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>URL Slike</label>
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              className={styles.input} 
              placeholder="https://..." 
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input 
              type="checkbox" 
              name="inStock" 
              id="inStock"
              checked={formData.inStock} 
              onChange={handleChange} 
            />
            <label htmlFor="inStock" className={styles.checkboxLabel}>Na stanju</label>
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Otkaži</button>
            <button type="submit" className={styles.saveBtn}>Sačuvaj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;