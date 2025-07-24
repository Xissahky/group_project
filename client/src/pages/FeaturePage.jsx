import "./FeaturePage.css";

const FeaturePage = () => {
  return (
    <div className="feature-container">

      <h1 className="feature-title">Nasze zalety</h1>
      <p className="feature-subtitle">
        KumpelEdu to Twoje cyfrowe centrum życia studenckiego – przestrzeń, w której studenci mogą się łączyć, współpracować i rozwijać. Znajdziesz tu narzędzia, które wyniosą Twoje życie akademickie i towarzyskie na wyższy poziom.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3 className="feature-title">Znajdź osoby o podobnych zainteresowaniach</h3>
          <p className="feature-text">
            Odkryj studentów, którzy podzielają Twoje pasje, cele naukowe i zawodowe. Niezależnie od tego, czy szukasz partnerów do nauki, współpracowników do projektów grupowych, czy po prostu osób o podobnych zainteresowaniach – KumpelEdu ułatwia nawiązywanie kontaktów. Stwórz profil, w którym opiszesz swoje wykształcenie, zainteresowania i cele na przyszłość, aby spotkać osoby, które pomogą Ci odnieść sukces.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3 className="feature-title">Współpracuj i komunikuj się</h3>
          <p className="feature-text">
            Dzięki zaawansowanym funkcjom czatu i współpracy grupowej, KumpelEdu zapewnia stały kontakt z Twoimi rówieśnikami. Niezależnie od tego, czy pracujesz nad projektem, przygotowujesz się do egzaminów, czy dzielisz się materiałami edukacyjnymi – możesz łatwo rozmawiać, udostępniać pliki i wspólnie tworzyć pomysły.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">Buduj swój profil akademicki</h3>
          <p className="feature-text">
            Śledź swoją ścieżkę edukacyjną i prezentuj swoje postępy. KumpelEdu pozwala stworzyć kompleksowy profil, który pokazuje Twoje umiejętności, osiągnięcia i obszary specjalizacji. Dzięki temu możesz mieć wszystko – oceny, sukcesy i cele – w jednym miejscu.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3 className="feature-title">Rozwijająca się społeczność</h3>
          <p className="feature-text">
            Dołącz do dynamicznej sieci studentów z różnych dziedzin. Niezależnie od tego, czy szukasz rady od starszych kolegów, chcesz wziąć udział w aktywnościach pozalekcyjnych, czy znaleźć praktyki – KumpelEdu to Twoja brama do prężnie rozwijającej się społeczności osób o podobnym myśleniu.
          </p>
        </div>
      </div>

    </div>
  );
};

export default FeaturePage;
