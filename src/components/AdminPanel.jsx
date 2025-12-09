// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import api from "../utils/api";

function AdminPanel() {
  // State for registering new users
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "staff" });

  // State for adding products
  const [product, setProduct] = useState({ name: "", price: 0, stock: 0, is_active: true });

  // State for product list
  const [products, setProducts] = useState([]);

  // Fetch products on load
  useEffect(() => {
    api.get("/products/list")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Register user
  const registerUser = async () => {
    try {
      const res = await api.post("/auth/register", newUser);
      alert(`✅ ${res.data.message} (${res.data.username}, role: ${res.data.role})`);
    } catch (err) {
      alert("❌ Failed to register user");
    }
  };

  // Add product
  const addProduct = async () => {
    try {
      const res = await api.post("/products/add", product);
      alert(`✅ ${res.data.message} (ID: ${res.data.product_id})`);
      // Refresh product list
      const listRes = await api.get("/products/list");
      setProducts(listRes.data);
    } catch (err) {
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>

      {/* Register User Section */}
      <div className="mb-4">
        <h3>Register User</h3>
        <input
          placeholder="Username"
          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button onClick={registerUser}>Register</button>
      </div>

      {/* Add Product Section */}
      <div className="mb-4">
        <h3>Add Product</h3>
        <input
          placeholder="Name"
          onChange={e => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={e => setProduct({ ...product, price: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Stock"
          onChange={e => setProduct({ ...product, stock: parseInt(e.target.value) })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* Product List Section */}
      <div>
        <h3>Product List</h3>
        <ul>
          {products.map(p => (
            <li key={p.product_id}>
              {p.name} — Rs {p.price} — Stock: {p.stock}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;