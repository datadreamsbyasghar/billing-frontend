// src/components/About.jsx
import React from 'react';

function About() {
  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">About This Project</h2>
      <p className="lead">
        This application demonstrates a full-stack <strong>Billing & Inventory Management System</strong> 
        built with <strong>FastAPI</strong> on the backend and <strong>React + Bootstrap</strong> on the frontend.
      </p>
      <p>
        The backend integrates PostgreSQL for reliable data storage, providing endpoints for managing 
        products, bills, clients, and analytics. It also supports secure operations with JWT authentication 
        for sensitive actions like price updates.
      </p>
      <p>
        The frontend provides a user-friendly interface to add products, create bills, view client history, 
        and analyze sales. It is modularized into reusable components for clarity and scalability.
      </p>
      <hr />
      <h4>Key Features</h4>
      <ul>
        <li>Product management (add, list, update stock & prices)</li>
        <li>Bill creation with discounts and final amount calculation</li>
        <li>Client history tracking with total spending</li>
        <li>Analytics dashboard for sales and inventory insights</li>
        <li>Responsive UI built with React and Bootstrap</li>
      </ul>
    </div>
  );
}

export default About;