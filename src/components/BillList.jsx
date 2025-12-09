// src/components/BillList.jsx
import React from 'react';
import api from '../utils/api';

function BillList({ bills = [] }) {
  const role = localStorage.getItem('role');

  const handleExportCSV = async () => {
    try {
      const res = await api.get('/export/monthly_csv?year=2025&month=12', {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'monthly_bills.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('❌ Failed to export CSV');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Bills</h2>

      {/* ✅ Export CSV only for admin */}
      {role === 'admin' && (
        <button
          className="btn btn-sm btn-outline-primary mb-3"
          onClick={handleExportCSV}
        >
          Export Monthly CSV
        </button>
      )}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.bill_id}>
              <td>{b.bill_id}</td>
              <td>{b.client_name}</td>
              <td>{new Date(b.date).toLocaleString()}</td>
              <td>{b.total_amount}</td>
              <td>{b.discount}</td>
              <td>{b.final_amount}</td>
            </tr>
          ))}
          {!bills.length && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No bills found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BillList;