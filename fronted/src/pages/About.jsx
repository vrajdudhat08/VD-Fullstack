import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(storyRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%"
        }
      }
    );

    gsap.fromTo(valuesRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container py-5">
        <h1 className="section-title luxury-text">Our Story</h1>
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <div ref={storyRef}>
              <h3 className="gold-accent luxury-text mb-4">Since 1985</h3>
              <p className="lead">
                Luxe Jewels began as a small family business with a passion for creating 
                extraordinary pieces that celebrate life's most precious moments.
              </p>
              <p>
                Over four decades, we have grown into a trusted name in luxury jewelry, 
                known for our commitment to quality, craftsmanship, and customer satisfaction. 
              </p>
              <p>
                Our master jewelers combine traditional techniques with modern innovation 
                to create timeless pieces that will be treasured for generations.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
              alt="Jewelry Workshop" 
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>

        <h2 className="section-title luxury-text">Our Values</h2>
        <div ref={valuesRef} className="row">
          <div className="col-md-4">
            <div className="card card-luxury h-100">
              <div className="card-body text-center">
                <div className="display-3 gold-accent mb-3">🎯</div>
                <h5 className="card-title luxury-text">Excellence</h5>
                <p className="card-text">
                  We never compromise on quality. Every piece meets our exacting standards.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-luxury h-100">
              <div className="card-body text-center">
                <div className="display-3 gold-accent mb-3">🤝</div>
                <h5 className="card-title luxury-text">Trust</h5>
                <p className="card-text">
                  Building lasting relationships through transparency and integrity.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-luxury h-100">
              <div className="card-body text-center">
                <div className="display-3 gold-accent mb-3">✨</div>
                <h5 className="card-title luxury-text">Innovation</h5>
                <p className="card-text">
                  Combining traditional craftsmanship with cutting-edge design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
