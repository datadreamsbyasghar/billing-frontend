import React, { useState } from 'react';
import api from '../utils/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff'); // ✅ default staff
  const [message, setMessage] = useState('');

  const currentRole = localStorage.getItem('role');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (currentRole !== 'admin') {
      setMessage('Only admins can register new users!');
      return;
    }

    try {
      const response = await api.post('/auth/register', { username, password, role });
      setMessage(response.data.message || 'Registration successful!');
      setUsername('');
      setPassword('');
      setRole('staff');
    } catch (error) {
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        setMessage(Array.isArray(detail) ? detail.map(d => d.msg).join(', ') : detail);
      } else {
        setMessage('Registration failed');
      }
    }
  };

  if (currentRole !== 'admin') {
    return (
      <div className="container mt-5" style={{ maxWidth: '500px' }}>
        <div className="alert alert-warning">
          Access denied. Only admins can register new users.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Register New User</h2>
      <form onSubmit={handleRegister}>
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
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Register;