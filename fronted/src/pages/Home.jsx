import React, { useEffect, useRef } from 'react';
import { useState  } from 'react';
import ProductCard from '../components/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  const imageRef = useRef(null);
   const productsRef = useRef(null);

  const [products] = useState([
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      description: "Classic 1-carat diamond in platinum",
      price: "3,299",
      category: "rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Pearl Drop Earrings",
      description: "Tahitian pearls with diamond accents",
      price: "1,199",
      category: "earrings",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPVtuJNCVm3DaLs7F74UxhBMw5JLERqHJS8Q&s"
    },
    {
      id: 3,
      name: "Gold Chain Necklace",
      description: "18k gold Italian chain",
      price: "899",
      category: "necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop"
    },
  ]);

  // ✅ Add to cart function
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItem = existingCart.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  useEffect(() => {
    
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      );

    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.8,
        borderRadius: '50%',
      },
      {
        opacity: 1,
        scale: 1,
        borderRadius: '15px',
        duration: 1.2,
        rotate: 360,
        ease: 'power3.out',
      }
    );

    const existingData = localStorage.getItem('featuredProducts');
    if (!existingData) {
      localStorage.setItem('Products', JSON.stringify(products));
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 ref={titleRef} className="display-2 luxury-text mb-4">
                Timeless <span className="gold-accent">Elegance</span>
              </h1>
              <p ref={subtitleRef} className="lead mb-4">
                Discover our exquisite collection of handcrafted jewelry,
                where each piece tells a story of luxury and sophistication.
              </p>
              <button ref={ctaRef} className="btn btn-luxury btn-lg">
                Explore Collections
              </button>
            </div>
            <div className="col-md-6">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop"
                alt="Luxury Jewelry"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title luxury-text">Why Choose Luxe Jewels</h2>
          <div ref={featuresRef} className="row">
            <div className="col-md-4 text-center">
              <div className="mb-4">
                <div className="display-1 gold-accent">💎</div>
                <h4 className="luxury-text">Premium Quality</h4>
                <p>Only the finest diamonds and precious metals</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-4">
                <div className="display-1 gold-accent">👑</div>
                <h4 className="luxury-text">Expert Craftsmanship</h4>
                <p>Handcrafted by master jewelers with decades of experience</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-4">
                <div className="display-1 gold-accent">🛡️</div>
                <h4 className="luxury-text">Lifetime Warranty</h4>
                <p>Complete protection and maintenance for your investment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title luxury-text">Featured Collection</h2>
          
                  <div className="row" ref={productsRef}>
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card card-luxury h-100">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="luxury-text">{product.name}</h5>
                  <p className="gold-accent h5">${product.price}</p>
                  <button
                    className="btn btn-luxury mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        </div>
      </section>
    </div>
  );
};

export default Home;
