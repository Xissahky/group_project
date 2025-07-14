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
        console.error("Failed to fetch teammates:", err);
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
        alert(data.message || "Failed to start chat");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Something went wrong while starting chat.");
    }
  };

  const handleSkip = () => {
    if (currentIndex < teammates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more recommendations!");
    }
  };

  return (
    <div className="recommendation-page">
  <h2 className="title">STUDY PARTNERS FOR YOU</h2>

  {currentTeammate ? (
    <div className="card-wrapper">

      <button className="skip-button desktop-only" onClick={handleSkip}>✖</button>

      <div className="teammate-card">
        <img src={currentTeammate.avatar} alt="Avatar" className="profile-img" />
        <div className="card-content">
          <h3>
            {currentTeammate.first_name} {currentTeammate.last_name}, {currentTeammate.age || "N/A"}
          </h3>
          <p><strong>{currentTeammate.specialty || "No specialty"}</strong></p>
          <hr />
          <p>{currentTeammate.skills?.join(", ") || "No skills listed"}</p>
          <hr />
          <p>{currentTeammate.availability || "No preferred study time"}</p>
          <hr />
          <p>{currentTeammate.about || "No additional info"}</p>
        </div>
      </div>

      <button className="like-button desktop-only" onClick={handleLike}>✔</button>

      <div className="mobile-button-group mobile-only">
        <button className="skip-button" onClick={handleSkip}>✖</button>
        <button className="like-button" onClick={handleLike}>✔</button>
      </div>
    </div>
  ) : (
    <p>No matching study partners found.</p>
  )}
</div>


  );
};

export default TeammatesPage;
