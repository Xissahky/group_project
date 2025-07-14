import React from "react";
import './ContactPage.css';
import devPhoto from '../images/developer.jpg'; 

export default function ContactUs() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="dev-card">
          <div className="dev-photo-block">
            <img src={devPhoto} alt="Developer" className="dev-photo" />
            <div>
                <h2 className="dev-heading">Why I Created Study Buddy</h2>
                <p className="dev-comment">
                I developed Study Buddy to bring students together in a community
                where collaboration fuels creativity. By making it easy to connect
                on shared interests, I hope to inspire teamwork and meaningful
                learning experiences for everyone.
                </p>
            </div>
            
          </div>
          <div className="contact-details-block">
            <h2 className="dev-heading">Contact Me</h2>
            <div className="contact-details">
              <p>Have feedback or found a bug? Reach out:</p>
              <ul>
                <li>Email: <a href="mailto:developer@studybuddy.com">developer@studybuddy.com</a></li>
                <li>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></li>
                <li>GitHub: <a href="https://github.com/studybuddy">github.com/studybuddy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}