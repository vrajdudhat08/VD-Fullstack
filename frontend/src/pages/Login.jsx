


import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 }
    );
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        alert(`Welcome back, ${res.data.user.firstName}`);
        localStorage.setItem('token', res.data.token);
        // Navigate to dashboard here
      } catch (err) {
        alert(err.response?.data?.msg || 'Login failed');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });

        alert('Account created successfully!');
        setIsLogin(true); // Switch to login view
      } catch (err) {
        alert(err.response?.data?.msg || 'Registration failed');
      }
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div ref={formRef} className="card card-luxury">
              <div className="card-body">
                <h3 className="text-center luxury-text mb-4">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  <button type="submit" className="btn btn-luxury w-100 mb-3">
                    {isLogin ? 'Login' : 'Create Account'}
                  </button>
                </form>

                <div className="text-center">
                  <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
