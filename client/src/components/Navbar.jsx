import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart(); // Uzimamo broj artikala

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
            E-Shop
          </Link>

          {/* Glavni linkovi */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Početna
            </Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center">
              Korpa
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Link>

            {/* Auth sekcija */}
            {user ? (
              <div className="flex items-center gap-4 ml-4 border-l pl-4 border-gray-300">
                <span className="text-sm font-semibold text-gray-800 hidden sm:block">
                  {user.firstName}
                </span>
                
                {/* Novi Link */}
                <Link to="/orders" className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                  Moje narudžbe
                </Link>

                <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-medium">
                  Odjava
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Prijava
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105">
                  Registracija
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;