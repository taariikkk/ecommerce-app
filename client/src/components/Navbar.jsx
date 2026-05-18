import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            Atelier
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <Link to="/" className={styles.link}>
              Collection
            </Link>
            
            <Link to="/cart" className={`${styles.link} ${styles.cartLink}`}>
              <svg 
                className={styles.cartIcon} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="sr-only">Cart</span>
              {cartQuantity > 0 && (
                <span className={styles.badge} aria-label={`${cartQuantity} items in cart`}>
                  {cartQuantity}
                </span>
              )}
            </Link>

            {/* Auth section */}
            {user ? (
              <div className={styles.authSection}>
                <Link to="/profile">
                  <span className={styles.userWelcome}>
                    {user.firstName}
                  </span>
                </Link>
                <Link to="/orders" className={styles.link}>
                  Orders
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className={styles.link}>Admin</Link>
                )}
                <button 
                  onClick={logout}
                  className={styles.btnLogout}
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className={styles.authSection}>
                <Link to="/login" className={styles.btnLogin}>
                  Sign In
                </Link>
                <Link to="/register" className={styles.btnRegister}>
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <Link to="/" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>
          Collection
        </Link>
        <Link to="/cart" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>
          Cart {cartQuantity > 0 && `(${cartQuantity})`}
        </Link>
        {user ? (
          <>
            <Link to="/orders" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>
              Orders
            </Link>
            <Link to="/profile" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>
              Profile
            </Link>
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className={styles.link}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>
              Sign In
            </Link>
            <Link to="/register" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>
              Join
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
