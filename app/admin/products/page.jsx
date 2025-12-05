'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const DEFAULT_PRODUCTS = [
  {
    _id: '1',
    slug: 'black-rice-1kg',
    name: 'Black Rice (Karhani)',
    price: 180,
    unit: 'kg',
    weightValue: 1,
    category: 'Grains',
    stock: 20,
    farmerName: 'Ramesh Netam',
    location: 'Bastar',
    description: 'Premium black rice from the forests of Bastar'
  },
  {
    _id: '2',
    slug: 'red-rice-1kg',
    name: 'Red Rice (Gahat)',
    price: 150,
    unit: 'kg',
    weightValue: 1,
    category: 'Grains',
    stock: 25,
    farmerName: 'Asha Kumari',
    location: 'Rajnandgaon',
    description: 'Red rice rich in minerals'
  }
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Grains',
    unit: 'kg',
    weightValue: '',
    farmerName: '',
    location: '',
    description: ''
  });
  const [showForm, setShowForm] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    // Load products from API
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (e) {
        // Fallback to defaults
        setProducts(DEFAULT_PRODUCTS);
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const token = adminToken || localStorage.getItem('admin_token') || 'devtoken';
        if (editingId) {
          const res = await fetch('/api/products', { method: 'PUT', body: JSON.stringify({ ...formData, _id: editingId }), headers: { 'Content-Type': 'application/json', 'x-admin-token': token } });
          if (!res.ok) throw new Error('Update failed');
          const updated = await res.json();
          setProducts(prev => prev.map(p => p._id === updated._id ? updated : p));
        } else {
          const res = await fetch('/api/products', { method: 'POST', body: JSON.stringify({ ...formData }), headers: { 'Content-Type': 'application/json', 'x-admin-token': token } });
          if (!res.ok) throw new Error('Create failed');
          const created = await res.json();
          setProducts(prev => [...prev, created]);
        }
        resetForm();
      } catch (err) {
        alert('Failed to save product');
      }
    })();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      stock: '',
      category: 'Grains',
      unit: 'kg',
      weightValue: '',
      farmerName: '',
      location: '',
      description: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    (async () => {
      try {
        const token = adminToken || localStorage.getItem('admin_token') || 'devtoken';
        const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
        if (!res.ok) throw new Error('Delete failed');
        setProducts(prev => prev.filter(p => p._id !== id));
      } catch (e) {
        alert('Failed to delete');
      }
    })();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl text-tribal-charcoal mb-2">Products</h1>
          <p className="text-stone-600">Manage your tribal product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-tribal-turmeric hover:bg-yellow-500 text-tribal-charcoal font-bold py-3 px-6 rounded-lg transition-all"
        >
          <Plus size={20} />
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-lg border border-kraft-800/10 mb-8">
          <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Black Rice"
                required
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="180"
                required
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="20"
                required
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              >
                <option>Grains</option>
                <option>Forest Produce</option>
                <option>Spices</option>
                <option>Snacks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Weight Value *</label>
              <input
                type="number"
                name="weightValue"
                value={formData.weightValue}
                onChange={handleChange}
                placeholder="1"
                required
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Unit *</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              >
                <option>kg</option>
                <option>g</option>
                <option>packet</option>
                <option>liter</option>
                <option>jar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Farmer Name *</label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                placeholder="e.g., Ramesh Netam"
                required
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bastar"
                required
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-stone-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description..."
                required
                rows="4"
                className="w-full px-4 py-2 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric resize-none"
              />
            </div>

            <div className="lg:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                <Save size={18} />
                {editingId ? 'Update' : 'Add'} Product
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 bg-stone-400 hover:bg-stone-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-kraft-800/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-kraft-100 border-b border-kraft-800/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-stone-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-stone-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-stone-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-stone-700">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-stone-700">Farmer</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kraft-800/10">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-kraft-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-tribal-charcoal">{product.name}</p>
                    <p className="text-xs text-stone-500">{product.description.slice(0, 50)}...</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-tribal-turmeric">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600">{product.farmerName}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded text-tribal-turmeric hover:bg-kraft-100 transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 rounded text-red-600 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-stone-500 text-sm mt-6">
        Total Products: <span className="font-bold">{products.length}</span>
      </p>
    </div>
  );
}
