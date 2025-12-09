import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const accessToken = response.data.access_token;
      const role = response.data.role || "user"; // fallback if role not returned

      // ✅ Save token + role
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('role', role);

      // ✅ Update app state
      setIsLoggedIn(true);

      // ✅ Show success message
      setMessage(`Login successful as ${role}`);

      // ✅ Clear form
      setUsername('');
      setPassword('');

      // ✅ Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        setMessage(Array.isArray(detail) ? detail[0].msg : detail);
      } else {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Login;