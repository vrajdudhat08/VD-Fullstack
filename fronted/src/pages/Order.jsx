// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrderHistory(history);
  }, []);

  return (
    <div className="container py-5" style={{ paddingTop: '100px' }}>
      <h1 className="section-title luxury-text">Your Orders</h1>

      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderHistory.map(order => (
          <div key={order.id} className="card card-luxury my-4">
            <div className="card-body">
              <h5 className="luxury-text">Order ID: {order.id}</h5>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <ul className="list-group">
                {order.items.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>
                      ${(
                        parseFloat(item.price || 0) * parseInt(item.quantity || 0)
                      ).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-end">
                <strong>Total: ${parseFloat(order.total || 0).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
