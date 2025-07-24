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
    let attempts = 0;
    const maxAttempts = 10;
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
        console.error('Nie udało się załadować CAPTCHA po wielu próbach.');
      }
    };
    checkTurnstile();
  }, []);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!form.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
    } else if (!nameRegex.test(form.firstName)) {
      newErrors.firstName = 'Imię może zawierać tylko litery';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest wymagane';
    } else if (!nameRegex.test(form.lastName)) {
      newErrors.lastName = 'Nazwisko może zawierać tylko litery';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Nieprawidłowy adres email';
    }

    if (!form.password) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(form.password)) {
      newErrors.password =
        'Hasło musi mieć co najmniej 8 znaków, zawierać wielką i małą literę oraz cyfrę';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są zgodne';
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = 'Musisz zaakceptować Regulamin i Politykę prywatności';
    }

    const token = window.turnstile?.getResponse();
    if (!token) {
      newErrors.captcha = 'Ukończ CAPTCHA';
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
        setErrors({ apiError: data.message || 'Rejestracja nie powiodła się' });
      }
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      setErrors({ apiError: 'Rejestracja nie powiodła się. Spróbuj ponownie później.' });
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-heading">DOŁĄCZ TERAZ</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="row">
          <div className="input-group">
            <input
              type="text"
              placeholder="Imię"
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
              placeholder="Nazwisko"
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
              placeholder="Hasło"
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
              placeholder="Potwierdź hasło"
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
          {!turnstileLoaded && <p>Ładowanie CAPTCHA...</p>}
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
            Akceptuję <a href="/Terms">Regulamin</a> i <a href="/Privacy">Politykę prywatności</a>
          </label>
        </div>
        {errors.agreeToTerms && <p className="error-text">{errors.agreeToTerms}</p>}

        {errors.apiError && <p className="error-text">{errors.apiError}</p>}

        <button type="submit" className="register-btn">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default RegisterPage;
