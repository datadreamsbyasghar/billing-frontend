import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem('role'); // ✅ get role from login
  const isActive = (path) =>
    location.pathname.startsWith(path) ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // ✅ fixed key
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login'); // ✅ cleaner redirect
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">BillingApp</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={isActive("/about")} to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className={isActive("/docs")} to="/docs">Docs</Link>
          </li>

          {!isLoggedIn && (
            <li className="nav-item">
              <Link className={isActive("/login")} to="/login">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <>
              {/* Staff + Admin shared routes */}
              {(role === "staff" || role === "admin") && (
                <>
                  <li className="nav-item">
                    <Link className={isActive("/products")} to="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={isActive("/bills")} to="/bills">Bills</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={isActive("/clients")} to="/clients">Clients</Link>
                  </li>
                </>
              )}

              {/* Admin-only routes */}
              {role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className={isActive("/register")} to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={isActive("/analytics")} to="/analytics">Analytics</Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;