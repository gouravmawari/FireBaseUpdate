import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

function Chat({ userId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    socket.emit("join", userId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage"); 
    };
  }, [userId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = { senderId: userId, receiverId, message: newMessage };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            {msg.senderId === userId ? "You: " : "Them: "} {msg.message}
          </p>
        ))}
      </div>
      <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
