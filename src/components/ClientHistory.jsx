// src/components/ClientHistory.jsx
import React, { useState } from 'react';
import api from '../utils/api';

function ClientHistory() {
  const [searchValue, setSearchValue] = useState('');
  const [history, setHistory] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetchHistory = async (e) => {
    e.preventDefault();

    try {
      const clientId = parseInt(searchValue);
      const res = await api.get(`/clients/${clientId}/history`);

      if (res.data && res.data.client_id) {
        setHistory(res.data);
        setMessage('');
      } else {
        setMessage('Client not found');
        setHistory(null);
      }
    } catch (err) {
      setHistory(null);
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setMessage(detail.map((d) => d.msg).join(', '));
      } else if (typeof detail === 'object' && detail !== null) {
        setMessage(detail.msg || 'Error occurred');
      } else {
        setMessage(detail || 'Failed to load client history');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4">Client History</h2>
      <form onSubmit={handleFetchHistory} className="mb-3">
        <div className="input-group mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Enter client ID"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Fetch
          </button>
        </div>
      </form>

      {message && <div className="alert alert-warning">{message}</div>}

      {history && (
        <div className="mt-3">
          <h5>Client Info</h5>
          <p><strong>ID:</strong> {history.client_id}</p>
          <p><strong>Name:</strong> {history.name}</p>
          <p><strong>Phone:</strong> {history.phone}</p>
          <p><strong>Total Spent:</strong> {history.total_spent}</p>

          <h5 className="mt-4">Bills</h5>
          {history.bills.length > 0 ? (
            <table className="table table-bordered mt-2">
              <thead className="table-dark">
                <tr>
                  <th>Bill ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>Final</th>
                </tr>
              </thead>
              <tbody>
                {history.bills.map((bill) => (
                  <tr key={bill.bill_id}>
                    <td>{bill.bill_id}</td>
                    <td>{new Date(bill.date).toLocaleString()}</td>
                    <td>{bill.total_amount}</td>
                    <td>{bill.discount}</td>
                    <td>{bill.final_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bills found for this client.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientHistory;