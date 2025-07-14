import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.render('#turnstile-container', {
          sitekey: '0x4AAAAAABZCH2_Bn-m7mzF0',
          theme: 'light',
        });
        setTurnstileLoaded(true);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkTurnstile, 500);
      } else {
        console.error('Turnstile failed to load after multiple attempts.');
      }
    };
    checkTurnstile();
  }, []);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(form.firstName)) {
      newErrors.firstName = 'First name must contain only letters';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(form.lastName)) {
      newErrors.lastName = 'Last name must contain only letters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase letters and numbers';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms and Privacy Policy';
    }

    const token = window.turnstile?.getResponse();
    if (!token) {
      newErrors.captcha = 'Please complete the CAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const token = window.turnstile.getResponse();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          captchaToken: token, 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setErrors({ apiError: data.message });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ apiError: 'Registration failed. Try again later.' });
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-heading">JOIN NOW</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="row">
          <div className="input-group">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="row">
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="input-group cf-turnstile">
          <div id="turnstile-container" />
          {!turnstileLoaded && <p>Loading CAPTCHA...</p>}
          {errors.captcha && <p className="error-text">{errors.captcha}</p>}
        </div>

        <div className="checkbox-row">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={form.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeToTerms">
            I agree to the <a href="/Terms">Terms</a> and <a href="/Privacy">Privacy Policy</a>
          </label>
        </div>
        {errors.agreeToTerms && <p className="error-text">{errors.agreeToTerms}</p>}

        {errors.apiError && <p className="error-text">{errors.apiError}</p>}

        <button type="submit" className="register-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
