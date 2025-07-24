import React from 'react';
import './PrivacyAndTerms.css';

export default function TermsOfService() {
  return (
    <div className="page-container">
      <div className="content-box">
        <h1 className="heading">Regulamin</h1>
        <p className="paragraph">
          Korzystając z naszych usług, akceptujesz poniższe warunki. Prosimy o uważne zapoznanie się z nimi.
        </p>
        <h2 className="subheading">Korzystanie z usług</h2>
        <p className="paragraph">
          Zobowiązujesz się do korzystania z naszych usług wyłącznie w sposób zgodny z prawem oraz niniejszym regulaminem.
          Zabrania się wykorzystywania usług w sposób, który mógłby uszkodzić, przeciążyć lub zakłócić działanie naszych systemów.
        </p>
        <h2 className="subheading">Odpowiedzialność za konto</h2>
        <p className="paragraph">
          Jesteś odpowiedzialny za zachowanie poufności swojego konta i hasła.
          Akceptujesz odpowiedzialność za wszelkie działania wykonywane z użyciem Twojego konta.
          Nie ponosimy odpowiedzialności za jakiekolwiek straty lub szkody wynikające z niezabezpieczenia danych logowania.
        </p>
        <h2 className="subheading">Własność treści</h2>
        <p className="paragraph">
          Wszystkie treści udostępnione w ramach usługi pozostają własnością ich właścicieli.
          Zobowiązujesz się nie kopiować, nie powielać ani nie rozpowszechniać treści bez odpowiedniego upoważnienia.
        </p>
        <h2 className="subheading">Zmiany w regulaminie</h2>
        <p className="paragraph">
          Zastrzegamy sobie prawo do wprowadzania zmian w regulaminie w dowolnym momencie.
          Zmiany wchodzą w życie natychmiast po opublikowaniu ich na naszej stronie internetowej.
          Dalsze korzystanie z usług po wprowadzeniu zmian oznacza akceptację nowego regulaminu.
        </p>
        <h2 className="subheading">Zakończenie korzystania</h2>
        <p className="paragraph">
          Zastrzegamy sobie prawo do zawieszenia lub zakończenia Twojego dostępu do usług według własnego uznania,
          z lub bez wcześniejszego powiadomienia, w przypadku naruszenia regulaminu lub zachowań szkodliwych.
        </p>
      </div>
    </div>
  );
}
