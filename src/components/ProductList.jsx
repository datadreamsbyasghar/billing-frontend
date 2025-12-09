import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const role = localStorage.getItem('role');

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/list');
      setProducts(res.data);
    } catch (err) {
      setMessage('Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdatePrice = async (product_id, newPrice) => {
    if (role !== 'admin') {
      setMessage('Only admins can update price!');
      return;
    }
    try {
      await api.post('/products/update_price', {
        product_id,
        new_price: Number(newPrice),
      });
      setMessage('Price updated successfully!');
      fetchProducts();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setMessage(Array.isArray(detail) ? detail.map(d => d.msg).join(', ') : detail || 'Update failed');
    }
  };

  const handleUpdateStock = async (product_id, newStock) => {
    if (role !== 'admin') {
      setMessage('Only admins can update stock!');
      return;
    }
    try {
      await api.post('/products/update_stock', {
        product_id,
        new_stock: Number(newStock),
      });
      setMessage('Stock updated successfully!');
      fetchProducts();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setMessage(Array.isArray(detail) ? detail.map(d => d.msg).join(', ') : detail || 'Update failed');
    }
  };

  const handleDeactivateProduct = async (product_id) => {
    if (role !== 'admin') {
      setMessage('Only admins can deactivate products!');
      return;
    }
    if (!window.confirm(`Are you sure you want to deactivate product #${product_id}?`)) return;
    try {
      await api.delete(`/products/${product_id}`);
      setMessage('Product deactivated successfully!');
      fetchProducts();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setMessage(Array.isArray(detail) ? detail.map(d => d.msg).join(', ') : detail || 'Deactivate failed');
    }
  };

  const handleRestoreProduct = async (product_id) => {
    if (role !== 'admin') {
      setMessage('Only admins can restore products!');
      return;
    }
    try {
      await api.post(`/products/restore/${product_id}`);
      setMessage('Product restored successfully!');
      fetchProducts();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setMessage(Array.isArray(detail) ? detail.map(d => d.msg).join(', ') : detail || 'Restore failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Products</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Status</th>
            {role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.is_active ? "Active" : "Inactive"}</td>
              {role === 'admin' && (
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      const newPrice = prompt("Enter new price:", p.price);
                      if (newPrice) handleUpdatePrice(p.product_id, newPrice);
                    }}
                  >
                    Update Price
                  </button>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => {
                      const newStock = prompt("Enter new stock:", p.stock);
                      if (newStock) handleUpdateStock(p.product_id, newStock);
                    }}
                  >
                    Update Stock
                  </button>
                  {p.is_active ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeactivateProduct(p.product_id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleRestoreProduct(p.product_id)}
                    >
                      Restore
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
          {!products.length && (
            <tr>
              <td colSpan={role === 'admin' ? 6 : 5} className="text-center text-muted">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;