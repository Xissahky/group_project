import { useEffect, useState } from "react";
import "./ChatWindow.css";

const ChatWindow = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!chat) return;

    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/chats/${chat.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Failed to load messages", err));
  }, [chat]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/chats/${chat.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    const newMessage = await res.json();
    setMessages(prev => [...prev, { ...newMessage, fromMe: true }]);
    setText("");
  };

  if (!chat) {
    return <div className="chat-window empty">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>&lt;</button>
        <div className="chat-title">{chat.partner.first_name} {chat.partner.last_name}</div>
        <img
          src={chat.partner.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="chat-avatar"
        />
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.fromMe ? "mine" : ""}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

