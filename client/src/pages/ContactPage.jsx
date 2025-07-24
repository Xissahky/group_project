import React from "react";
import './ContactPage.css';
import devPhoto from '../images/developer.jpg'; 

export default function ContactUs() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="dev-card">
          <div className="dev-photo-block">
            <img src={devPhoto} alt="Deweloperzy" className="dev-photo" />
            <div>
              <h2 className="dev-heading">Dlaczego stworzyliśmy KumpelEdu</h2>
              <p className="dev-comment">
                Jesteśmy dwójką pasjonatów technologii, którzy stworzyli KumpelEdu
                jako projekt uczelniany. Szybko jednak zauważyliśmy jego potencjał
                i postanowiliśmy rozwijać go dalej. Naszym celem jest budowanie
                społeczności, która wspiera się nawzajem w nauce, dzieleniu się
                wiedzą i wspólnej pracy nad projektami.
              </p>
            </div>
          </div>
          <div className="contact-details-block">
            <h2 className="dev-heading">Skontaktuj się z nami</h2>
            <div className="contact-details">
              <p>Masz sugestię lub znalazłeś błąd? Daj nam znać:</p>
              <ul>
                <li>Email: <a href="mailto:developer@studybuddy.com">developer@studybuddy.com</a></li>
                <li>Telefon: <a href="tel:+1234567890">+1 (234) 567-890</a></li>
                <li>GitHub: <a href="https://github.com/studybuddy">github.com/studybuddy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
