


import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Products = () => {
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
    {
      id: 4,
      name: "Ruby Tennis Bracelet",
      description: "Burmese rubies in white gold setting",
      price: "2,199",
      category: "bracelets",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Emerald Engagement Ring",
      description: "Colombian emerald with diamond halo",
      price: "4,599",
      category: "rings",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZkGJR44XnZgGpcOe_KfAlo9hJUvdBlLg-g&s"
    },
    {
      id: 6,
      name: "Diamond Stud Earrings",
      description: "Brilliant cut diamonds, 2 carats total",
      price: "1,899",
      category: "earrings",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop"
    }
  ]);

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
    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
      );
    }
  }, []);

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container py-5">
        <h1 className="section-title luxury-text">Our Products</h1>
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
    </div>
  );
};

export default Products;



