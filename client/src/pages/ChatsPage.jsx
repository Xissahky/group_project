import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import "./ChatPage.css";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/chats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setChats(data))
      .catch(err => console.error("Failed to load chats", err));
  }, []);

  const handleBack = () => setSelectedChat(null);

  return (
    <div className="chat-page">
      {isMobile ? (
        selectedChat ? (
          <ChatWindow chat={selectedChat} onBack={handleBack} />
        ) : (
          <ChatList chats={chats} onSelectChat={setSelectedChat} />
        )
      ) : (
        <>
          <ChatList chats={chats} onSelectChat={setSelectedChat} />
          <ChatWindow chat={selectedChat} />
        </>
      )}
    </div>
  );
};

export default ChatPage;
