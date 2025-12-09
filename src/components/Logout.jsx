import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear token + role
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);

    // ✅ Redirect after short delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="alert alert-info">
        <h4 className="mb-0">You have been logged out successfully.</h4>
      </div>
    </div>
  );
}

export default Logout;