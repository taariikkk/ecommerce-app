import React, { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {productToEdit ? 'Uredi proizvod' : 'Novi proizvod'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Naziv</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Opis</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Cijena</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Kategorija ID</label>
              <input type="number" name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">URL Slike</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded" placeholder="https://..." />
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="mr-2" />
            <label className="text-sm font-medium">Na stanju</label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Otkaži</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sačuvaj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;