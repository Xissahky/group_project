import React from 'react';
import './PrivacyAndTerms.css';

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <div className="content-box">
        <h1 className="heading">Polityka Prywatności</h1>
        <p className="paragraph">
          Twoja prywatność jest dla nas ważna. Niniejsza polityka prywatności wyjaśnia,
          w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje dane podczas korzystania
          z naszych usług.
        </p>

        <h2 className="subheading">Gromadzenie informacji</h2>
        <p className="paragraph">
          Zbieramy informacje, które podajesz nam bezpośrednio, a także dane dotyczące
          korzystania z naszej usługi. Mogą to być: imię i nazwisko, adres e-mail, adres IP,
          typ przeglądarki, informacje o urządzeniu i czasie dostępu. Korzystamy również z plików cookie
          i podobnych technologii w celu pozyskiwania danych.
        </p>

        <h2 className="subheading">Wykorzystanie danych</h2>
        <p className="paragraph">
          Wykorzystujemy Twoje dane, aby świadczyć, utrzymywać i ulepszać nasze usługi.
          Obejmuje to personalizację doświadczenia użytkownika, prowadzenie badań i analiz,
          komunikację z Tobą w sprawie aktualizacji lub ofert promocyjnych oraz zapewnienie
          bezpieczeństwa naszej platformy.
        </p>

        <h2 className="subheading">Udostępnianie danych</h2>
        <p className="paragraph">
          Nie sprzedajemy Twoich danych osobowych. Możemy je udostępniać zaufanym podmiotom trzecim,
          które wspierają nas w świadczeniu usług, takim jak dostawcy hostingu, platformy analityczne
          oraz narzędzia wsparcia klienta – wszystkie te podmioty są zobowiązane do ochrony Twoich danych.
        </p>

        <h2 className="subheading">Bezpieczeństwo danych</h2>
        <p className="paragraph">
          Wdrażamy szereg środków bezpieczeństwa, aby chronić Twoje dane osobowe.
          Obejmuje to szyfrowanie, kontrolę dostępu oraz regularne audyty bezpieczeństwa.
          Mimo naszych starań, żaden system nie gwarantuje 100% bezpieczeństwa, dlatego
          nie możemy zapewnić pełnej ochrony.
        </p>

        <h2 className="subheading">Twoje prawa</h2>
        <p className="paragraph">
          Masz prawo do wglądu, poprawiania lub usunięcia swoich danych osobowych.
          Jeśli chcesz skorzystać z któregokolwiek z tych praw, skontaktuj się z naszym
          zespołem wsparcia. Możesz również w każdej chwili zrezygnować z otrzymywania
          komunikatów marketingowych.
        </p>
      </div>
    </div>
  );
}
