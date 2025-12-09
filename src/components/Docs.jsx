// src/components/Docs.jsx
import React from 'react';

function Docs() {
  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4 text-primary fw-bold">Project Documentation</h2>
      <p className="lead">
        This documentation provides a technical overview of the <strong>Billing & Inventory Management</strong> application,
        including architecture, setup instructions, usage guidelines, and deployment notes.
      </p>

      <hr className="my-4" />

      {/* 🔹 Architecture Section */}
      <h4 className="fw-semibold">System Architecture</h4>
      <p>The application is designed as a full-stack system with clear separation of concerns:</p>
      <ul className="list-group list-group-flush mb-3">
        <li className="list-group-item">
          <strong>Backend:</strong> FastAPI with JWT authentication, PostgreSQL database for products, bills, and clients.
        </li>
        <li className="list-group-item">
          <strong>Frontend:</strong> React with Bootstrap for responsive UI, modular components, and data tables.
        </li>
        <li className="list-group-item">
          <strong>Deployment:</strong> Backend served via Uvicorn, frontend deployed on Netlify/Vercel.
        </li>
      </ul>

      <hr className="my-4" />

      {/* 🔹 Setup Section */}
      <h4 className="fw-semibold">Setup Instructions</h4>
      <p>Follow these steps to run the project locally:</p>
      <ol className="ps-3">
        <li>
          Clone the repository and install dependencies:
          <pre className="bg-dark text-white p-2 rounded mt-2">
            <code>pip install -r requirements.txt</code>
          </pre>
          <pre className="bg-dark text-white p-2 rounded mt-2">
            <code>npm install</code>
          </pre>
        </li>
        <li>
          Configure environment variables in a <code>.env</code> file:
          <ul>
            <li><code>DATABASE_URL</code> → PostgreSQL connection string</li>
            <li><code>SECRET_KEY</code> and <code>ALGORITHM</code> → JWT configuration</li>
            <li><code>REACT_APP_API_URL</code> → Backend API base URL</li>
          </ul>
        </li>
        <li>
          Run backend:
          <pre className="bg-dark text-white p-2 rounded mt-2">
            <code>uvicorn main:app --reload</code>
          </pre>
        </li>
        <li>
          Run frontend:
          <pre className="bg-dark text-white p-2 rounded mt-2">
            <code>npm start</code>
          </pre>
        </li>
      </ol>

      <hr className="my-4" />

      {/* 🔹 Usage Section */}
      <h4 className="fw-semibold">Usage Guide</h4>
      <p>Once the application is running, users can:</p>
      <ul>
        <li>Add and manage products (name, price, stock).</li>
        <li>Create bills with multiple items and discounts.</li>
        <li>View client history with total spending.</li>
        <li>Analyze sales and inventory with summary endpoints.</li>
        <li>Export monthly CSV reports.</li>
      </ul>

      <hr className="my-4" />

      {/* 🔹 API Section */}
      <h4 className="fw-semibold">API Endpoints</h4>
      <ul className="mb-3">
        <li><code>POST /products/add</code> – Add a new product</li>
        <li><code>GET /products/list</code> – List all products</li>
        <li><code>POST /bills/create</code> – Create a new bill</li>
        <li><code>GET /bills/list</code> – Retrieve all bills</li>
        <li><code>GET /clients/{'{id}'}/history</code> – View client history</li>
        <li><code>GET /analytics/summary</code> – View sales analytics</li>
      </ul>

      <hr className="my-4" />

      {/* 🔹 Deployment Section */}
      <h4 className="fw-semibold">Deployment Notes</h4>
      <p>
        For production, ensure environment variables are configured correctly. The backend should be served with Uvicorn/Gunicorn,
        and the frontend should use <code>REACT_APP_API_URL</code> pointing to the deployed backend (e.g., Netlify or Vercel).
      </p>
    </div>
  );
}

export default Docs;