import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.title}>Dobrodošli nazad</h2>
        
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
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Prijava u toku...' : 'Prijavi se'}
        </button>
        
        <p className={styles.footer}>
          Nemate nalog? 
          <Link to="/register" className={styles.link}>Registrujte se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;