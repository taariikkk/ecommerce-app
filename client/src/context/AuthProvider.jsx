import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../api/authApi.js';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
  });  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await loginUser(credentials);
      const { token, user: userFromServer } = res.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userFromServer));
      setUser(userFromServer);

      toast.success('Uspješno ste se prijavili!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Greška pri prijavi';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await registerUser(userData);
      const { token, user: userFromServer } = res.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userFromServer));
      setUser(userFromServer);

      toast.success('Registracija uspješna! Dobrodošli!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Greška pri registraciji';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    setUser,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};