import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    gsap.fromTo(
      card,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const handleMouseEnter = () => {
      gsap.to(card, { rotationY: 5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { rotationY: 0, duration: 0.3 });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div ref={cardRef} className="col-md-4 mb-4">
      <div className="card card-luxury product-card">
        <img
          src={product.image}
          className="card-img-top product-image"
          alt={product.name}
        />
        <div className="card-body text-center">
          <h5 className="card-title luxury-text">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <p className="h4 gold-accent">${product.price}</p>
          <button className="btn btn-luxury">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
