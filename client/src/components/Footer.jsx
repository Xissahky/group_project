import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/chats' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  if (location.pathname === '/contact') {
    return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-title">KumpelEdu</h3>
          <p className="footer-quote">
            KumpelEdu to doskonała aplikacja do nawiązywania kontaktów ze studentami o podobnych zainteresowaniach. Interfejs jest przyjazny dla użytkownika, a funkcje, takie jak dopasowywanie zespołów i wiadomości, ułatwiają współpracę i utrzymanie motywacji. Obowiązkowa dla każdego, kto poważnie myśli o nauce i nawiązywaniu kontaktów!
          </p>
          <p className="footer-quote-source">– STUDENT PCU</p>
        </div>
        <div className="footer-middle">
          <ul className="footer-links">
            <li><a href="/">O nas</a></li>
            <li><a href="/Privacy">Polityka prywatności</a></li>
            <li><a href="/terms">Regulamin</a></li>
            <li><a href="#">Skontaktuj się z pomocą techniczną</a></li>
          </ul>

          
        </div>
        <div className="footer-right social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
      </div>
      <p className="footer-bottom-text">Copyright © 2025 @kumpeledu.com</p>
    </footer>
    );
    
  }
  return (
    <footer className="footer">
      <div className="contact-us">
        <h2>Skontaktuj się z nami</h2>
        <div className="contact-content">
          <div className="contact-left">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.9958086403994!2d21.979126677542837!3d50.048909816193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfb6d2f4ddf8f%3A0x958858da08f8753b!2sUniversity%20of%20Information%20Technology%20and%20Management%20in%20Rzeszow!5e0!3m2!1sen!2spl!4v1753362429200!5m2!1sen!2spl"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <p className="contact-address">Adres: Sucharskiego 2, 35-225 Rzeszów</p>
          </div>
          <div className="contact-right">
            <form>
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Napisz do nas wiadomość" rows="5" required></textarea>
              <button type="submit">Wyślij</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-title">KumpelEdu</h3>
          <p className="footer-quote">
            KumpelEdu to doskonała aplikacja do nawiązywania kontaktów ze studentami o podobnych zainteresowaniach. Interfejs jest przyjazny dla użytkownika, a funkcje, takie jak dopasowywanie zespołów i wiadomości, ułatwiają współpracę i utrzymanie motywacji. Obowiązkowa dla każdego, kto poważnie myśli o nauce i nawiązywaniu kontaktów!
          </p>
          <p className="footer-quote-source">– STUDENT PCU</p>
        </div>
        <div className="footer-middle">
          <ul className="footer-links">
            <li><a href="/">O nas</a></li>
            <li><a href="/Privacy">Polityka prywatności</a></li>
            <li><a href="/terms">Regulamin</a></li>
            <li><a href="#">Skontaktuj się z pomocą techniczną</a></li>
          </ul>

          
        </div>
        <div className="footer-right social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
      </div>
      <p className="footer-bottom-text">Copyright © 2025 @kumpeledu.com</p>
    </footer>

  );
};

export default Footer;
