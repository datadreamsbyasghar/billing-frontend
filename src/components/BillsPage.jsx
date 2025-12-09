// src/components/BillsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import BillList from './BillList';

function BillsPage() {
  const [bills, setBills] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBills = async () => {
    try {
      const res = await api.get('/bills/list');
      setBills(res.data);
    } catch (err) {
      console.error('Failed to fetch bills:', err);
      setMessage('❌ Failed to load bills');
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div>
      {message && <div className="alert alert-warning">{message}</div>}
      <BillList bills={bills} />
    </div>
  );
}

export default BillsPage;