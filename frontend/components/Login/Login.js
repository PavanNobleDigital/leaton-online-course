'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { login, register } from '../../redux/action/AuthAction';

const LoginPage = () => {
  const loginRef = useRef(null);
  const userNameRef = useRef(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null); // Local state for form errors

  const scrollToLogin= () => {
    loginRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const focusUsername = () => {
    userNameRef.current.focus();
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user.disclaimer === true) {
        router.push('/');
      } else {
        router.push('/health-disclaimer');
      }
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null); // Reset form error
    try {
      dispatch(login(credentials));
    } catch (err) {
      setFormError(err.message); // Capture error message
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.password2) {
      setFormError('Passwords do not match');
      return;
    }
    setLoading(true);
    setFormError(null); // Reset form error
    try {
      await dispatch(register(registerData));
      setTimeout(() => {
        scrollToLogin();
        focusUsername();
      }, 500);
    } catch (err) {
      setFormError(err.message); // Capture error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="col-lg-6" ref={loginRef}>
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                ref={userNameRef}
                name="username"
                type="text"
                placeholder="Username or email *"
                value={credentials.username}
                onChange={handleChange}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password *"
                value={credentials.password}
                onChange={handleChange}
              />
              <span className="focus-border"></span>
            </div>
            {formError && <p>{formError}</p>}
            <div className="form-submit-group">
              <button
                type="submit"
                disabled={loading}
                className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Log In</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Register</h3>
          <form className="max-width-auto" onSubmit={handleRegister}>
            <div className="form-group">
              <input
                name="first_name"
                type="text"
                placeholder="First Name *"
                value={registerData.first_name}
                onChange={handleRegisterChange}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="last_name"
                type="text"
                placeholder="Last Name *"
                value={registerData.last_name}
                onChange={handleRegisterChange}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email address *"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="username"
                type="text"
                placeholder="Username *"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password *"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="password2"
                type="password"
                placeholder="Confirm Password *"
                value={registerData.password2}
                onChange={handleRegisterChange}
              />
              <span className="focus-border"></span>
            </div>
            {formError && <p>{formError}</p>}
            <div className="form-submit-group">
              <button
                type="submit"
                disabled={loading}
                className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Register</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
