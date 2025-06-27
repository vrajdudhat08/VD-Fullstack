import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-luxury">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="gold-accent luxury-text">LUXE JEWELS</h5>
            <p>Crafting timeless elegance since 1985. Each piece tells a story of luxury, sophistication, and unmatched craftsmanship.</p>
          </div>
          <div className="col-md-4">
            <h6 className="gold-accent">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Collections</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/testimonials" className="text-light text-decoration-none">Reviews</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="gold-accent">Contact Info</h6>
            <p>📍 123 Luxury Ave, Diamond District</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info@luxejewels.com</p>
          </div>
        </div>
        <hr className="my-4" style={{borderColor: 'var(--gold)'}} />
        <div className="text-center">
          <p>&copy; 2025 Luxe Jewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;