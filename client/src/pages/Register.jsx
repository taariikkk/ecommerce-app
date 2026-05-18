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
        <h2 className={styles.title}>Join Atelier</h2>
        <p className={styles.subtitle}>Create an account to access exclusive pieces</p>
        
        <div className={styles.nameRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input 
              id="firstName"
              type="text" 
              name="firstName" 
              onChange={handleChange} 
              className={styles.input} 
              required 
              placeholder="First name"
              autoComplete="given-name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input 
              id="lastName"
              type="text" 
              name="lastName" 
              onChange={handleChange} 
              className={styles.input} 
              required 
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            name="email" 
            onChange={handleChange} 
            className={styles.input} 
            required 
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            name="password" 
            onChange={handleChange} 
            className={styles.input} 
            required 
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className={styles.button}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
        
        <p className={styles.footer}>
          Already have an account?
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
