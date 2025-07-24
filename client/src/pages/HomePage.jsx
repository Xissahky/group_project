import { useEffect, useState } from 'react';
import './HomePage.css';
import bgImage from '../images/background.png';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import user3 from '../images/user3.jpg';
import user4 from '../images/user4.jpg';
import user5 from '../images/user5.jpg';
import user6 from '../images/user6.jpg';

const commentsData = [
  {
    id: 1,
    name: "Anna Nowak",
    photo: user1,
    text:
      "Dzięki KumpelEdu znalazłam idealnego partnera do hackathonu! Wspólna praca była niesamowicie efektywna – szybko dzieliliśmy się pomysłami i wdrażaliśmy je w życie. Polecam każdemu, kto szuka ambitnych osób do współpracy!",
  },
  {
    id: 2,
    name: "Jan Kowalski",
    photo: user2,
    text:
      "Świetna platforma! W końcu mogę łatwo znaleźć osoby do projektów grupowych. Wcześniej trudno było mi znaleźć studentów o podobnym podejściu, ale tutaj poznałem świetnych współpracowników!",
  },
  {
    id: 3,
    name: "Emilia Zielińska",
    photo: user3,
    text:
      "Bardzo intuicyjna i szybka w obsłudze aplikacja. Dzięki KumpelEdu bez problemu zbudowałam zespół na projekt końcowy. Komunikacja była prosta, a praca zespołowa przyjemna.",
  },
  {
    id: 4,
    name: "Michał Wiśniewski",
    photo: user4,
    text:
      "Zbudowaliśmy zespół startupowy dzięki KumpelEdu! Miałem pomysł, ale brakowało mi ludzi. Tutaj znalazłem utalentowanych studentów, z którymi stworzyliśmy działający prototyp. Niesamowita społeczność!",
  },
  {
    id: 5,
    name: "Zofia Lewandowska",
    photo: user5,
    text:
      "Wreszcie projekty na uczelni to nie stres, tylko przyjemność! Na KumpelEdu znalazłam osoby, które naprawdę chcą działać i rozwijać się. Dzięki temu nasze prace były świetnie zrealizowane i na czas.",
  },
  {
    id: 6,
    name: "Daniel Maj",
    photo: user6,
    text:
      "Poznałem tu fantastycznych ludzi i nawiązałem kontakty, które pomogły mi w karierze. KumpelEdu to coś więcej niż tylko platforma – to społeczność pełna pasji i motywacji.",
  },
];

const getRandomComments = () => {
  const randomIndexes = [];
  while (randomIndexes.length < 3) {
    const randomIndex = Math.floor(Math.random() * commentsData.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  return randomIndexes.map((index) => commentsData[index]);
};

const HomePage = () => {
  const currentComments = getRandomComments();

  return (
    <div>
      <div className="home-content" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="overlay">
          <h1 className="welcome-title">Witamy na KumpelEdu</h1>
          <p className="welcome-text">
            Platforma, która łączy studentów o podobnych celach i zainteresowaniach. Znajdź partnerów do projektów, dziel się pomysłami i twórz coś wyjątkowego razem z innymi!
          </p>
        </div>
      </div>

      <div className="comments-section-wrapper">
        <h2 className="comments-title">Opinie naszej społeczności</h2>
        <div className="comments-section">
          {currentComments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <img src={comment.photo} alt={comment.name} className="comment-photo" />
                <h3 className="comment-name">{comment.name}</h3>
              </div>
              <div className="comment-body">
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
