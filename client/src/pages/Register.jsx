import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { register, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.title}>Kreiraj nalog</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Ime</label>
          <input 
            type="text" 
            name="firstName" 
            onChange={handleChange} 
            className={styles.input} 
            required 
            placeholder="npr. Marko"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Prezime</label>
          <input 
            type="text" 
            name="lastName" 
            onChange={handleChange} 
            className={styles.input} 
            required 
            placeholder="npr. Marković"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            className={styles.input} 
            required 
            placeholder="vasa@adresa.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Lozinka</label>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            className={styles.input} 
            required 
            placeholder="Najmanje 6 karaktera"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className={styles.button}
        >
          {isLoading ? 'Registracija...' : 'Registruj se'}
        </button>
        
        <p className={styles.footer}>
          Već imate nalog? 
          <Link to="/login" className={styles.link}>Prijavite se</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;