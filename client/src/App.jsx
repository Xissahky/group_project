import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import TeammatesPage from "./pages/TeammatesPage";
import ChatsPage from './pages/ChatsPage';
import PrivacyPolicy from "./pages/PrivacyPage";
import TermsOfService from "./pages/TermsPage";
import FeaturePage from "./pages/FeaturePage";
import ContactUs from "./pages/ContactPage";

import './App.css'; 

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/teammates" element={<TeammatesPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path='/Privacy' element={<PrivacyPolicy />} />
          <Route path='/Terms' element={<TermsOfService />} />
          <Route path='/Features' element={<FeaturePage />} />
          <Route path='/Contact' element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
