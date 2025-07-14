import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import defaultAvatar from "../images/default_avatar.jpg";


const specialties = {
  "Computer Science": ["Algorithms", "Data Structures", "Web Development", "Databases", "AI"],
  "Design": ["Typography", "UX/UI", "Illustration", "Animation"],
  "Business": ["Marketing", "Finance", "Project Management"],
  "Engineering": ["Math", "Physics", "Mechanics", "CAD"],
};

const sections = ["Profile", "Account Security", "Privacy", "Delete Account"];

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
  const [activeSection, setActiveSection] = useState("Profile");
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
    alert("Profile updated!");
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
      alert("Password changed!");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } else {
      const err = await res.json();
      alert(err.error || "Error updating password");
    }
  };

  const handleAccountDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete your account?")) return;
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
      alert("Account deleted.");
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      const err = await res.json();
      alert(err.error || "Error deleting account");
    }
  };

  const availableSkills = specialties[form.specialty] || [];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <div className="sidebar-profile">
          <img
            src={form.avatar || defaultAvatar}
            alt="Avatar"
            className="sidebar-avatar"
          />
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
          Log Out
        </button>
      </aside>

      <header className="sidebar mobile-header">
        <div className="sidebar-profile">
          <img
            src={form.avatar || defaultAvatar}
            alt="Avatar"
            className="sidebar-avatar"
          />
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
            Log Out
          </button>
        </div>
      </header>

      <div className="profile-content">
        {activeSection === "Profile" && (
          <div className="profile-container">
            <h2>My Profile</h2>

            <div className="avatar-section">
              <img
                src={form.avatar ? form.avatar : defaultAvatar}
                alt="Avatar"
                className="sidebar-avatar"
              />
              <label className="upload-btn">
                Set new photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  hidden
                />
              </label>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <label>First Name:</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />

              <label>Last Name:</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />

              <label>About Me:</label>
              <textarea name="about" value={form.about} onChange={handleChange} />

              <label>Email:</label>
              <input value={form.email} disabled />

              <label>Specialty:</label>
              <select
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your specialty
                </option>
                {Object.keys(specialties).map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>

              {form.specialty && (
                <>
                  <label>Subjects:</label>
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

              <label>Study Availability:</label>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
              />

              <button type="submit">Update</button>
            </form>
          </div>
        )}

        {activeSection === "Account Security" && (
          <div className="profile-container">
            <h3>Change Password</h3>
            <div className="password-form">
              <input
                type="password"
                placeholder="Current password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />
              <input
                type="password"
                placeholder="New password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
              <button type="button" onClick={handlePasswordChange}>
                Change Password
              </button>
            </div>
          </div>
        )}

        {activeSection === "Privacy" && (
          <div className="profile-container">
            <h2>Privacy Policy</h2>
            <p>
              Your privacy is important to us. This privacy policy explains how we
              collect, use, and protect your information when you use our services.
            </p>

            <h3>Information Collection</h3>
            <p>
              We collect information that you provide to us directly and data about
              your usage of our service. This may include your name, email address,
              IP address, browser type, device information, and access times. We also
              gather data through cookies and similar technologies.
            </p>

            <h3>Usage</h3>
            <p>
              We use your data to provide, maintain, and improve our services. This
              includes personalizing your experience, conducting research and
              analytics, communicating with you about updates or promotional offers,
              and ensuring the security of our platform.
            </p>

            <h3>Data Sharing</h3>
            <p>
              We do not sell your personal data. We may share it with third-party
              providers who help us operate our services, such as hosting services,
              analytics platforms, and customer support tools, all of whom are
              obligated to keep your information secure.            
            </p>

            <h3>Data Security</h3>
            <p>
              We implement a variety of security measures to protect your personal
              information. This includes encryption, access controls, and regular
              security audits. Despite our efforts, no system is 100% secure, and we
              cannot guarantee absolute security.
            </p>

            <h3>Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal data. If
              you would like to exercise any of these rights, please contact our
              support team. You may also opt out of marketing communications at any
              time.
            </p>
          </div>
        )}

        {activeSection === "Delete Account" && (
          <form className="profile-container" onSubmit={handleAccountDelete}>
            <h3>Delete Account</h3>
            <p>Please confirm by entering your password:</p>
            <div className="password-form">
              <input
                type="password"
                placeholder="Your Password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
              <button type="submit" className="danger">
                Delete My Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
