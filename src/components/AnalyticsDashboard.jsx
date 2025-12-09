// src/components/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import api from '../utils/api';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

function AnalyticsDashboard() {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState('');

  const role = localStorage.getItem('role');

  const fetchSummary = async () => {
    try {
      const res = await api.get('/analytics/summary');
      setSummary(res.data);
    } catch (err) {
      setMessage('Failed to load analytics');
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      fetchSummary();
    }
  }, []);

  if (role !== 'admin') {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Access denied. Only admins can view analytics.</div>
      </div>
    );
  }

  if (!summary) return <p className="mt-5 text-center">Loading analytics...</p>;

  // ✅ Pie chart for totals
  const pieData = {
    labels: ['Total Sales', 'Total Discounts'],
    datasets: [
      {
        data: [summary.total_revenue || 0, summary.total_discount || 0],
        backgroundColor: ['green', 'orange'],
      },
    ],
  };

  // ✅ Bar chart for top products
  const barData = {
    labels: (summary.top_products || []).map((p) => p.name),
    datasets: [
      {
        label: 'Top Products',
        data: (summary.top_products || []).map((p) => p.total_sold),
        backgroundColor: 'blue',
      },
    ],
  };

  // ✅ Weekly progress chart
  const weeklyLabels = (summary.weekly_sales || []).map((w) => w.week);
  const weeklySalesData = (summary.weekly_sales || []).map((w) => w.total);
  const weeklyDiscountsData = (summary.weekly_discounts || []).map((w) => w.discount);

  const weeklyBarData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: 'Weekly Sales',
        data: weeklySalesData,
        backgroundColor: 'green',
      },
      {
        label: 'Weekly Discounts',
        data: weeklyDiscountsData,
        backgroundColor: 'orange',
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2>Analytics Dashboard</h2>
      {message && <div className="alert alert-warning">{message}</div>}

      {/* Pie Chart */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <Pie data={pieData} />
        </div>

        {/* Top Products Chart */}
        <div className="col-md-6 mb-4">
          {summary.top_products && summary.top_products.length > 0 ? (
            <Bar data={barData} />
          ) : (
            <div className="alert alert-info text-center">No product data available</div>
          )}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="row mt-4">
        <div className="col-md-12">
          {weeklyLabels.length > 0 ? (
            <Bar data={weeklyBarData} />
          ) : (
            <div className="alert alert-info text-center">No weekly progress data available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;