// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import BillForm from './BillForm';
import BillList from './BillList';
import ClientList from './ClientList';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showBillForm, setShowBillForm] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/list');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products:', err);
      setMessage('❌ Failed to load products');
    }
  };

  // Fetch bills
  const fetchBills = async () => {
    try {
      const res = await api.get('/bills/list');
      setBills(res.data);
    } catch (err) {
      console.error('Failed to load bills:', err);
      setMessage('❌ Failed to load bills');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBills();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {message && <div className="alert alert-warning">{message}</div>}

      {/* Products Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Products</h4>
          <button
            className="btn btn-primary"
            onClick={() => setShowProductForm(!showProductForm)}
          >
            + Add Product
          </button>
        </div>
        {showProductForm && <ProductForm onProductAdded={fetchProducts} />}
        <ProductList products={products} onProductsChanged={fetchProducts} />
      </div>

      {/* Bills Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Bills</h4>
          <button
            className="btn btn-success"
            onClick={() => setShowBillForm(!showBillForm)}
          >
            + Create Bill
          </button>
        </div>
        {showBillForm && <BillForm onBillCreated={fetchBills} />}
        <BillList bills={bills} onBillsChanged={fetchBills} />
      </div>

      {/* Clients Section */}
      <div className="mb-5">
        <h4>Clients</h4>
        <ClientList />
      </div>
    </div>
  );
}

export default Dashboard;