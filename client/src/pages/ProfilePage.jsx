import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import defaultAvatar from "../images/avatar.png";

const specialties = {
  "Computer Science": ["Algorytmy", "Struktury danych", "Tworzenie stron WWW", "Bazy danych", "Sztuczna inteligencja"],
  "Design": ["Typografia", "UX/UI", "Ilustracja", "Animacja"],
  "Business": ["Marketing", "Finanse", "Zarządzanie projektami"],
  "Engineering": ["Matematyka", "Fizyka", "Mechanika", "CAD"],
};

const sections = ["Profil", "Bezpieczeństwo konta", "Prywatność", "Usuń konto"];

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialty: "",
    skills: [],
    avatar: "",
    about: "",
    availability: "",
  });
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [deletePassword, setDeletePassword] = useState("");
  const [activeSection, setActiveSection] = useState("Profil");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          specialty: data.specialty || "",
          skills: data.skills || [],
          avatar: data.avatar || "",
          about: data.about || "",
          availability: data.availability || "",
        });
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSkillToggle = (skill) =>
    setForm((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/profile/avatar", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, avatar: data.avatar }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    alert("Profil zaktualizowany!");
  };

  const handlePasswordChange = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/profile/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordForm),
    });
    if (res.ok) {
      alert("Hasło zostało zmienione!");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } else {
      const err = await res.json();
      alert(err.error || "Błąd podczas zmiany hasła");
    }
  };

  const handleAccountDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Czy na pewno chcesz usunąć swoje konto?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/profile/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: deletePassword }),
    });
    if (res.ok) {
      alert("Konto zostało usunięte.");
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      const err = await res.json();
      alert(err.error || "Błąd podczas usuwania konta");
    }
  };

  const availableSkills = specialties[form.specialty] || [];

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <div className="sidebar-profile">
          <img src={form.avatar || defaultAvatar} alt="Avatar" className="sidebar-avatar" />
          <p className="sidebar-name">
            {form.firstName} {form.lastName}
          </p>
        </div>

        <div className="sidebar-sections">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={activeSection === section ? "active" : ""}
            >
              {section}
            </button>
          ))}
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Wyloguj się
        </button>
      </aside>

      <header className="sidebar mobile-header">
        <div className="sidebar-profile">
          <img src={form.avatar || defaultAvatar} alt="Avatar" className="sidebar-avatar" />
          <span className="sidebar-name">
            {form.firstName} {form.lastName}
          </span>
        </div>

        <button
          className={`burger-icon${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
        >
          menu
        </button>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <div className="sidebar-sections">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setMenuOpen(false);
                }}
                className={activeSection === section ? "active" : ""}
              >
                {section}
              </button>
            ))}
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Wyloguj się
          </button>
        </div>
      </header>

      <div className="profile-content">
        {activeSection === "Profil" && (
          <div className="profile-container">
            <h2>Mój profil</h2>

            <div className="avatar-section">
              <img src={form.avatar ? form.avatar : defaultAvatar} alt="Avatar" className="sidebar-avatar" />
              <label className="upload-btn">
                Zmień zdjęcie
                <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
              </label>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <label>Imię:</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} />

              <label>Nazwisko:</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} />

              <label>O mnie:</label>
              <textarea name="about" value={form.about} onChange={handleChange} />

              <label>Email:</label>
              <input value={form.email} disabled />

              <label>Specjalizacja:</label>
              <select name="specialty" value={form.specialty} onChange={handleChange}>
                <option value="" disabled>Wybierz swoją specjalizację</option>
                {Object.keys(specialties).map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              {form.specialty && (
                <>
                  <label>Tematy:</label>
                  <div className="checkbox-group">
                    {availableSkills.map((skill) => (
                      <label key={skill}>
                        <input
                          type="checkbox"
                          checked={form.skills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </>
              )}

              <label>Dostępność do nauki:</label>
              <input name="availability" value={form.availability} onChange={handleChange} />

              <button type="submit">Zaktualizuj</button>
            </form>
          </div>
        )}

        {activeSection === "Bezpieczeństwo konta" && (
          <div className="profile-container">
            <h3>Zmień hasło</h3>
            <div className="password-form">
              <input
                type="password"
                placeholder="Obecne hasło"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((prev) => ({
                  ...prev, currentPassword: e.target.value,
                }))}
              />
              <input
                type="password"
                placeholder="Nowe hasło"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({
                  ...prev, newPassword: e.target.value,
                }))}
              />
              <button type="button" onClick={handlePasswordChange}>
                Zmień hasło
              </button>
            </div>
          </div>
        )}

        {activeSection === "Prywatność" && (
          <div className="profile-container">
            <h2>Polityka prywatności</h2>
            <p>Twoja prywatność jest dla nas ważna. Ta polityka opisuje, jak gromadzimy, wykorzystujemy i chronimy Twoje dane.</p>
            <h3>Gromadzenie informacji</h3>
            <p>Zbieramy dane podane bezpośrednio przez Ciebie oraz dane o korzystaniu z platformy (np. adres IP, typ przeglądarki).</p>
            <h3>Wykorzystanie danych</h3>
            <p>Wykorzystujemy dane do ulepszania usług, personalizacji, analizy i komunikacji.</p>
            <h3>Udostępnianie danych</h3>
            <p>Nie sprzedajemy danych. Udostępniamy je tylko zaufanym partnerom technologicznym.</p>
            <h3>Bezpieczeństwo danych</h3>
            <p>Stosujemy szyfrowanie, kontrole dostępu i audyty bezpieczeństwa.</p>
            <h3>Twoje prawa</h3>
            <p>Masz prawo do wglądu, poprawiania i usunięcia danych. Skontaktuj się z nami, jeśli chcesz z nich skorzystać.</p>
          </div>
        )}

        {activeSection === "Usuń konto" && (
          <form className="profile-container" onSubmit={handleAccountDelete}>
            <h3>Usuń konto</h3>
            <p>Potwierdź, wpisując swoje hasło:</p>
            <div className="password-form">
              <input
                type="password"
                placeholder="Twoje hasło"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
              <button type="submit" className="danger">Usuń moje konto</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
