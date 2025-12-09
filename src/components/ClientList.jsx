// src/components/ClientList.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState('');

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients/list');
      setClients(res.data);
    } catch (err) {
      console.error('Failed to load clients:', err);
      setMessage('❌ Failed to load clients');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="mt-4">
      <h5>Clients</h5>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.client_id}>
              <td>{c.client_id}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.total_spent}</td>
            </tr>
          ))}
          {!clients.length && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;