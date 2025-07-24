import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);

        const userRes = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = await userRes.json();

        if (userRes.ok) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              firstName: userData.first_name,
              lastName: userData.last_name,
            })
          );
        }

        navigate('/');
      } else {
        alert(data.message || 'Logowanie nie powiodło się');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      alert('Coś poszło nie tak. Spróbuj ponownie.');
    }
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-heading">WITAJ PONOWNIE</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Zaloguj się</button>
      </form>
    </div>
  );
};

export default LoginPage;
