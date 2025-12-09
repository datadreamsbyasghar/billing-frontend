import React, { useState } from 'react';
import api from '../utils/api';

function ProductForm({ onProductAdded }) {   // ✅ allow parent to refresh list
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  const role = localStorage.getItem('role');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (role !== 'admin') {
      setMessage('Only admins can add products!');
      return;
    }

    try {
      const response = await api.post('/products/add', {
        name,
        price: Number(price),
        stock: Number(stock),
        is_active: true,   // ✅ explicitly set active
      });
      setMessage(response.data.message || 'Product added successfully!');
      setName('');
      setPrice('');
      setStock('');
      if (onProductAdded) onProductAdded();   // ✅ refresh product list in Dashboard
    } catch (error) {
      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        setMessage(detail.map((d) => d.msg).join(', '));
      } else {
        setMessage(detail || 'Failed to add product');
      }
    }
  };

  if (role !== 'admin') {
    return (
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <div className="alert alert-warning">
          Access denied. Only admins can add products.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default ProductForm;