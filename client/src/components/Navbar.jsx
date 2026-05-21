import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          E-Shop
        </Link>

        {/* Glavni linkovi */}
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>
            Početna
          </Link>
          
          <Link to="/cart" className={`${styles.link} ${styles.cartLink}`}>
            Korpa
            {cartQuantity > 0 && (
              <span className={styles.badge}>
                {cartQuantity}
              </span>
            )}
          </Link>

          {/* Auth sekcija */}
          {user ? (
            <div className={styles.authSection}>
              <Link to="/profile">
                <span className={styles.userWelcome}>
                  {user.firstName}
                </span>
              </Link>
              <Link to="/orders" className={styles.link}>
                Narudžbe
              </Link>
              {user.isAdmin && (
                 <Link to="/admin" className={styles.link}>Admin</Link>
              )}
              <button 
                onClick={logout}
                className={styles.btnLogout}
              >
                Odjava
              </button>
            </div>
          ) : (
            <div className={styles.authSection}>
              <Link to="/login" className={styles.btnLogin}>
                Prijava
              </Link>
              <Link to="/register" className={styles.btnRegister}>
                Registracija
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;