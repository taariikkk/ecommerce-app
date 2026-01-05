import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import AdminProductForm from '../components/AdminProductForm';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { formatCurrency } from '../utils/formatCurrency';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State za modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      toast.error('Neuspješno učitavanje proizvoda');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler za brisanje
  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite obrisati ovaj proizvod?')) {
      try {
        await deleteProduct(id);
        toast.success('Proizvod obrisan');
        fetchProducts(); // Osvježi listu
      } catch {
        toast.error('Greška pri brisanju');
      }
    }
  };

  // Handler za otvaranje forme (Create)
  const handleCreateClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Handler za otvaranje forme (Edit)
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Handler za čuvanje (i Create i Update)
  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        // Update logika
        await updateProduct(editingProduct.id, formData);
        toast.success('Proizvod ažuriran!');
      } else {
        // Create logika
        await createProduct(formData);
        toast.success('Proizvod kreiran!');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error('Došlo je do greške.');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={handleCreateClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
        >
          + Novi Proizvod
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proizvod</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cijena</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-full h-full rounded-full object-cover" src={product.image || 'https://via.placeholder.com/150'} alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-semibold">{product.name}</p>
                      <p className="text-gray-600 whitespace-no-wrap text-xs">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{formatCurrency(product.price)}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${product.inStock ? 'text-green-900' : 'text-red-900'}`}>
                    <span aria-hidden className={`absolute inset-0 ${product.inStock ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                    <span className="relative">{product.inStock ? 'Aktivan' : 'Nema stanje'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Uredi</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 font-medium">Obriši</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AdminProductForm 
          productToEdit={editingProduct} 
          onSave={handleSave} 
          onCancel={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Admin;