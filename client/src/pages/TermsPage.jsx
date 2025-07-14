import React from 'react';
import './PrivacyAndTerms.css';

export default function TermsOfService() {
  return (
    <div className="page-container">
      <div className="content-box">
        <h1 className="heading">Terms of Service</h1>
        <p className="paragraph">
          By using our services, you agree to the following terms and conditions.
          Please read them carefully.
        </p>
        <h2 className="subheading">Use of Service</h2>
        <p className="paragraph">
          You agree to use our services only for lawful purposes and in
          accordance with these terms. You may not use the service in any way
          that could damage, disable, overburden, or impair the functionality of
          our systems.
        </p>
        <h2 className="subheading">Account Responsibility</h2>
        <p className="paragraph">
          You are responsible for maintaining the confidentiality of your account
          and password. You agree to accept responsibility for all activities
          that occur under your account. We are not liable for any loss or
          damage arising from your failure to protect your login information.
        </p>
        <h2 className="subheading">Content Ownership</h2>
        <p className="paragraph">
          All content provided through the service remains the property of its
          respective owners. You agree not to copy, reproduce, or redistribute
          any content without proper authorization.
        </p>
        <h2 className="subheading">Modifications</h2>
        <p className="paragraph">
          We reserve the right to modify these terms at any time. Changes will be
          effective immediately upon posting to our website. Continued use of the
          service after changes are posted constitutes your acceptance of the
          revised terms.
        </p>
        <h2 className="subheading">Termination</h2>
        <p className="paragraph">
          We reserve the right to suspend or terminate your access to the service
          at our sole discretion, with or without notice, if you violate these
          terms or engage in harmful conduct.
        </p>
      </div>
    </div>
  );
}