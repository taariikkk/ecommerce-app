import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">First Name</label>
          <input type="text" name="firstName" onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Last Name</label>
          <input type="text" name="lastName" onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Email</label>
          <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold">Password</label>
          <input type="password" name="password" onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300">
          {isLoading ? 'Registering...' : 'Register'}
        </button>
         <p className="text-center mt-4">
          Već imate nalog? <Link to="/login" className="text-blue-500 hover:underline">Prijavite se</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;