
// File: src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    gsap.fromTo(nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    const handleScroll = () => {
      if (window.scrollY > 100) {
        gsap.to(nav, { backgroundColor: "rgba(26, 26, 26, 0.98)", duration: 0.3 });
      } else {
        gsap.to(nav, { backgroundColor: "rgba(26, 26, 26, 0.95)", duration: 0.3 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg navbar-dark fixed-top navbar-luxury">
      <div className="container">
        <Link className="navbar-brand luxury-text" to="/">ARIHANT JEWELS</Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} to="/products">Collections</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/testimonials' ? 'active' : ''}`} to="/testimonials">Reviews</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Account</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart">Cart (0)</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
