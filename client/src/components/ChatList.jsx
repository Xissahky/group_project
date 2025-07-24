import "./ChatList.css";
import { useEffect, useState } from "react";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setChats(data);
        } else {
          console.error("Unexpected chat response:", data);
          setChats([]);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter((chat) =>
    `${chat.partner.first_name} ${chat.partner.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <input
        type="text"
        placeholder="Szukaj"
        className="chat-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => onSelectChat(chat)}
        >
          {chat.partner && (
            <>
              <img
                src={chat.partner.avatar}
                alt="Avatar"
                className="chat-avatar"
              />
              <div>
                <p>{chat.partner.first_name} {chat.partner.last_name}</p>
                <small>{chat.partner.specialty || "Brak specjalizacji"}</small>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
