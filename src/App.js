import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Docs from './components/Docs';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import BillForm from './components/BillForm';
import BillsPage from './components/BillsPage';
import ClientHistory from './components/ClientHistory';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Utility: check if current user is admin
const isAdmin = () => localStorage.getItem('role') === 'admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Keep login state in sync with localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // ✅ fixed key
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/register"
            element={
              <ProtectedRoute requiredRole="admin">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/add"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <BillsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills/create"
            element={
              <ProtectedRoute>
                <BillForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <AnalyticsDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;