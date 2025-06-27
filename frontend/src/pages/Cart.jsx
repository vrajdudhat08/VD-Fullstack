
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  // GSAP animation
  useEffect(() => {
    if (cartRef.current) {
      gsap.fromTo(
        cartRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = 0;
  const grandTotal = subtotal + tax + shipping;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const newOrder = {
        items: cartItems,
        total: grandTotal,
      };

      await axios.post('http://localhost:5000/api/orders', newOrder);

      alert("Order placed successfully!");
      localStorage.removeItem('cartItems');
      setCartItems([]);
      navigate('/order');
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container py-5">
        <h1 className="section-title luxury-text">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h3>Your cart is empty</h3>
            <Link to="/products" className="btn btn-luxury">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <div ref={cartRef}>
                {cartItems.map(item => (
                  <div key={item.id} className="card card-luxury mb-3">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img src={item.image} alt={item.name} className="img-fluid rounded" />
                        </div>
                        <div className="col-md-4">
                          <h5 className="luxury-text">{item.name}</h5>
                        </div>
                        <div className="col-md-2">
                          <span className="h5 gold-accent">${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                        <div className="col-md-2">
                          <div className="input-group">
                            <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <span className="form-control text-center">{item.quantity}</span>
                            <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                        <div className="col-md-2 text-end">
                          <button className="btn btn-outline-danger" onClick={() => updateQuantity(item.id, 0)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card card-luxury">
                <div className="card-body">
                  <h5 className="luxury-text">Order Summary</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong className="gold-accent">${grandTotal.toFixed(2)}</strong>
                  </div>
                  <button
                    className="btn btn-luxury w-100"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
