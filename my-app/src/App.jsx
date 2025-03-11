import { useState } from "react";
import "./App.css";
import Chat from "./web"; 

function App() {
  const [userId, setUserId] = useState(""); 
  const [receiverId, setReceiverId] = useState(""); 

  return (
    <div>
      <h1>React Chat App</h1>

      <label>Enter Your User ID:</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your ID"
      />

      <label>Enter Receiver ID:</label>
      <input
        type="text"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="Enter receiver's ID"
      />

      {userId && receiverId && <Chat userId={userId} receiverId={receiverId} />}
    </div>
  );
}

export default App;
