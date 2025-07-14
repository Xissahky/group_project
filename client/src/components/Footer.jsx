import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/chats') {
    return null;
  }
  if (location.pathname === '/contact') {
    return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-title">STUDY BUDDY</h3>
          <p className="footer-quote">
          Study Buddy is an excellent app for connecting with like-minded students. The interface is user-friendly, and the features, like matching with teammates and messaging, make it easy to collaborate and stay motivated. A must-have for anyone serious about studying and networking!
          </p>
          <p className="footer-quote-source">– PCU STUDENT</p>
        </div>
        <div className="footer-middle">
          <ul className="footer-links">
            <li><a href="/">About Us</a></li>
            <li><a href="/Privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
          
        </div>
        <div className="footer-right social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
      </div>
      <p className="footer-bottom-text">Copyright © 2025 @studybuddy.com</p>
    </footer>
    );
    
  }
  return (
    <footer className="footer">
      <div className="contact-us">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-left">
            <iframe
              src="https://www.google.com/maps?q=Hybernska+1009%2F24,+110+00+Nove+Mesto&output=embed"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <p className="contact-address">Address: Hybernska 1009/24, 110 00 Nove Mesto</p>
          </div>
          <div className="contact-right">
            <form>
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Send us a message" rows="5" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-title">STUDY BUDDY</h3>
          <p className="footer-quote">
          Study Buddy is an excellent app for connecting with like-minded students. The interface is user-friendly, and the features, like matching with teammates and messaging, make it easy to collaborate and stay motivated. A must-have for anyone serious about studying and networking!
          </p>
          <p className="footer-quote-source">– PCU STUDENT</p>
        </div>
        <div className="footer-middle">
          <ul className="footer-links">
            <li><a href="/">About Us</a></li>
            <li><a href="/Privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
          
        </div>
        <div className="footer-right social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
      </div>
      <p className="footer-bottom-text">Copyright © 2025 @studybuddy.com</p>
    </footer>

  );
};

export default Footer;
