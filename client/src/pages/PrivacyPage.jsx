import React from 'react';
import './PrivacyAndTerms.css';

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <div className="content-box">
        <h1 className="heading">Privacy Policy</h1>
        <p className="paragraph">
          Your privacy is important to us. This privacy policy explains how we
          collect, use, and protect your information when you use our services.
        </p>
        <h2 className="subheading">Information Collection</h2>
        <p className="paragraph">
          We collect information that you provide to us directly and data about
          your usage of our service. This may include your name, email address,
          IP address, browser type, device information, and access times. We also
          gather data through cookies and similar technologies.
        </p>
        <h2 className="subheading">Usage</h2>
        <p className="paragraph">
          We use your data to provide, maintain, and improve our services. This
          includes personalizing your experience, conducting research and
          analytics, communicating with you about updates or promotional offers,
          and ensuring the security of our platform.
        </p>
        <h2 className="subheading">Data Sharing</h2>
        <p className="paragraph">
          We do not sell your personal data. We may share it with third-party
          providers who help us operate our services, such as hosting services,
          analytics platforms, and customer support tools, all of whom are
          obligated to keep your information secure.
        </p>
        <h2 className="subheading">Data Security</h2>
        <p className="paragraph">
          We implement a variety of security measures to protect your personal
          information. This includes encryption, access controls, and regular
          security audits. Despite our efforts, no system is 100% secure, and we
          cannot guarantee absolute security.
        </p>
        <h2 className="subheading">Your Rights</h2>
        <p className="paragraph">
          You have the right to access, correct, or delete your personal data. If
          you would like to exercise any of these rights, please contact our
          support team. You may also opt out of marketing communications at any
          time.
        </p>
      </div>
    </div>
  );
}