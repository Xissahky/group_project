import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeammatesPage.css";

const TeammatesPage = () => {
  const [teammates, setTeammates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeammates = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/teammates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setTeammates(data);
          setCurrentIndex(0);
        } else {
          setTeammates([]);
        }
      } catch (err) {
        console.error("Nie udało się pobrać partnerów do nauki:", err);
      }
    };

    fetchTeammates();
  }, []);

  const currentTeammate = teammates[currentIndex];

  const handleLike = async () => {
    if (!currentTeammate) return;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: currentTeammate.id }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/chats");
      } else {
        alert(data.message || "Nie udało się rozpocząć czatu");
      }
    } catch (error) {
      console.error("Błąd podczas rozpoczynania czatu:", error);
      alert("Coś poszło nie tak podczas rozpoczynania czatu.");
    }
  };

  const handleSkip = () => {
    if (currentIndex < teammates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Brak dalszych rekomendacji!");
    }
  };

  return (
    <div className="recommendation-page">
      <h2 className="title">PARTNERZY DO NAUKI DLA CIEBIE</h2>

      {currentTeammate ? (
        <div className="card-wrapper">

          <button className="skip-button desktop-only" onClick={handleSkip}>✖</button>

          <div className="teammate-card">
            <img src={currentTeammate.avatar} alt="Avatar" className="profile-img" />
            <div className="card-content">
              <h3>
                {currentTeammate.first_name} {currentTeammate.last_name}
              </h3>
              <p><strong>{currentTeammate.specialty || "Brak specjalizacji"}</strong></p>
              <hr />
              <p>{currentTeammate.skills?.join(", ") || "Brak umiejętności"}</p>
              <hr />
              <p>{currentTeammate.availability || "Brak preferowanego czasu nauki"}</p>
              <hr />
              <p>{currentTeammate.about || "Brak dodatkowych informacji"}</p>
            </div>
          </div>

          <button className="like-button desktop-only" onClick={handleLike}>✔</button>

          <div className="mobile-button-group mobile-only">
            <button className="skip-button" onClick={handleSkip}>✖</button>
            <button className="like-button" onClick={handleLike}>✔</button>
          </div>
        </div>
      ) : (
        <p>Nie znaleziono pasujących partnerów do nauki.</p>
      )}
    </div>
  );
};

export default TeammatesPage;
