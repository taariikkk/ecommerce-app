import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { getCategories, createCategory, deleteCategory } from '../api/categoryApi';
import AdminProductForm from '../components/AdminProductForm';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { formatCurrency } from '../utils/formatCurrency';
import styles from './Admin.module.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch {
      toast.error('Neuspješno učitavanje podataka');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Obrisati proizvod?')) {
      try {
        await deleteProduct(id);
        toast.success('Proizvod obrisan');
        fetchData();
      } catch { toast.error('Greška pri brisanju'); }
    }
  };

  const handleCreateClick = () => { setEditingProduct(null); setIsModalOpen(true); };
  const handleEditClick = (p) => { setEditingProduct(p); setIsModalOpen(true); };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Ažurirano!');
      } else {
        await createProduct(formData);
        toast.success('Kreirano!');
      }
      setIsModalOpen(false);
      fetchData();
    } catch { toast.error('Greška.'); }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await createCategory(newCategoryName);
      toast.success('Kategorija dodana!');
      setNewCategoryName('');
      const res = await getCategories();
      setCategories(res.data);
    } catch { toast.error('Greška.'); }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Obrisati kategoriju?')) return;
    try {
      await deleteCategory(id);
      toast.success('Obrisano');
      const res = await getCategories();
      setCategories(res.data);
    } catch { toast.error('Greška (možda ima proizvode).'); }
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      {/* Kategorije */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Upravljanje Kategorijama</h2>
        <form onSubmit={handleAddCategory} className={styles.categoryForm}>
          <input 
            type="text" 
            placeholder="Nova kategorija..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.addBtn}>Dodaj</button>
        </form>
        <div className={styles.tagsContainer}>
          {categories.map((cat) => (
            <div key={cat.id} className={styles.categoryTag}>
              <span>{cat.name}</span>
              <button onClick={() => handleDeleteCategory(cat.id)} className={styles.deleteTagBtn}>&times;</button>
            </div>
          ))}
        </div>
      </div>

      {/* Proizvodi */}
      <div className={styles.productsHeader}>
        <h2 className={styles.sectionTitle}>Proizvodi</h2>
        <button onClick={handleCreateClick} className={styles.newProductBtn}>+ Novi Proizvod</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Proizvod</th>
              <th className={styles.th}>Kat.</th>
              <th className={styles.th}>Cijena</th>
              <th className={styles.th}>Status</th>
              <th style={{textAlign: 'right'}} className={styles.th}>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className={styles.td}>
                  <div className={styles.productRow}>
                    <img className={styles.productImg} src={p.image || 'https://via.placeholder.com/40'} alt="" />
                    <div style={{fontWeight: 600}}>{p.name}</div>
                  </div>
                </td>
                <td className={styles.td}>{categories.find(c => c.id === p.categoryId)?.name || '-'}</td>
                <td className={styles.td}>{formatCurrency(p.price)}</td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${p.inStock ? styles.activeStatus : styles.inactiveStatus}`}>
                    {p.inStock ? 'Aktivan' : 'Nema stanje'}
                  </span>
                </td>
                <td style={{textAlign: 'right'}} className={styles.td}>
                  <button onClick={() => handleEditClick(p)} className={`${styles.actionBtn} ${styles.editBtn}`}>Uredi</button>
                  <button onClick={() => handleDelete(p.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>Obriši</button>
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