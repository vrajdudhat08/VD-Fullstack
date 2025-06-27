import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const testimonialsRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "The most beautiful engagement ring! The quality is exceptional and the service was outstanding.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      text: "Bought a necklace for my wife's anniversary. She absolutely loves it and the craftsmanship is incredible.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      text: "Professional service and gorgeous jewelry. I've been a customer for 3 years now.",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      text: "Custom designed wedding bands - exactly what we wanted. Highly recommend!",
      rating: 5
    }
  ];

  useEffect(() => {
    gsap.fromTo(testimonialsRef.current.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <div style={{paddingTop: '100px'}}>
      <div className="container py-5">
        <h1 className="section-title luxury-text">What Our Customers Say</h1>
        
        <div ref={testimonialsRef} className="row">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-md-6 mb-4">
              <div className="testimonial-card">
                <div className="mb-3">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="mb-3">"{testimonial.text}"</p>
                <h6 className="gold-accent luxury-text">{testimonial.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
