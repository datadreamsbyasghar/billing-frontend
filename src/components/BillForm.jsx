// src/components/BillForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function BillForm({ onBillCreated }) {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [items, setItems] = useState([{ product_id: '', quantity: 1, price: '' }]);
  const [productOptions, setProductOptions] = useState([]);
  const [discountType, setDiscountType] = useState('percent'); // UI only
  const [discount, setDiscount] = useState(0);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch product list
  useEffect(() => {
    api.get('/products/list')
      .then(res => setProductOptions(res.data))
      .catch(() => console.error('Failed to load products'));
  }, []);

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    if (field === 'quantity' || field === 'price') {
      updatedItems[index][field] = Number(value);
    } else if (field === 'product_name') {
      const match = productOptions.find((p) => p.name === value);
      if (match) {
        updatedItems[index].product_id = match.product_id;
        updatedItems[index].price = match.price;
      }
      updatedItems[index].product_name = value;
    } else {
      updatedItems[index][field] = value;
    }
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { product_id: '', product_name: '', quantity: 1, price: '' }]);
  };

  const handleCreateBill = async (e) => {
    e.preventDefault();

    const payload = {
      client_name: clientName,
      phone,
      items: items.map(({ product_id, quantity, price }) => ({
        product_id,
        quantity,
        price,
      })),
      discount,
    };

    console.log("Sending bill payload:", payload);

    try {
      const response = await api.post('/bills/create', payload);
      setResult(response.data);
      setMessage('');
      setClientName('');
      setPhone('');
      setItems([{ product_id: '', product_name: '', quantity: 1, price: '' }]);
      setDiscount(0);
      setDiscountType('percent');

      // 🔄 Refresh bill list in dashboard
      if (onBillCreated) onBillCreated();
    } catch (error) {
      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        setMessage(detail.map((d) => d.msg).join(', '));
      } else if (typeof detail === 'object' && detail !== null && detail.msg) {
        setMessage(detail.msg);
      } else {
        setMessage(typeof detail === 'string' ? detail : 'Bill creation failed');
      }
      setResult(null);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      {/* Company Header */}
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Company Logo" style={{ height: '80px' }} />
        <h2>AL REHMAN PACKAGES</h2>
        <p>Manufacturer of Poly Bags</p>
        <p>40, Charagh Park Kasur Pura Stop Band Road, Lahore</p>
        <p>PH: +92-42-37704065 | CELL: 0300-4888252</p>
        <hr />
      </div>

      <h4 className="mb-3">Create Bill</h4>
      <form onSubmit={handleCreateBill}>
        {/* Client Info */}
        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <input
            type="text"
            className="form-control"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Items Section */}
        <h5>Items</h5>
        {items.map((item, index) => (
          <div key={index} className="row mb-2">
            <div className="col">
              <input
                list={`product-options-${index}`}
                className="form-control"
                placeholder="Product Name"
                value={item.product_name || ''}
                onChange={(e) => handleItemChange(index, 'product_name', e.target.value)}
                required
              />
              <datalist id={`product-options-${index}`}>
                {productOptions.map((p, i) => (
                  <option key={i} value={p.name} />
                ))}
              </datalist>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mb-3"
          onClick={handleAddItem}
        >
          + Add Item
        </button>

        {/* Discount Section */}
        <div className="mb-3">
          <label className="form-label">Discount</label>
          <div className="input-group mb-2">
            <select
              className="form-select"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="percent">Percent (%)</option>
              <option value="flat">Flat (Rs)</option>
            </select>
            <input
              type="number"
              className="form-control"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Create Bill</button>
      </form>

      {message && <div className="alert alert-warning mt-3">{message}</div>}

      {result && (
        <div className="alert alert-success mt-3">
          <h5>{result.message}</h5>
          <p><strong>Bill ID:</strong> {result.bill_id}</p>
          <p><strong>Final Amount:</strong> {result.final_amount}</p>
        </div>
      )}
    </div>
  );
}

export default BillForm;