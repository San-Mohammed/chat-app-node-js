import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  console.log(messages);
  const [roomNumber, setRoomNumber] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const handleSendMessage = () => {
    console.log(roomNumber, "room number");

    socket.emit("send-message", messageInput, "1");
  };
  const handleJoinRoom = () => {
    socket.emit("joinRoom", "1");
  };
  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages([...messages, message]);
    });
  }, []);
  return (
    <>
      <div className="w-full h-screen flex bg-black justify-center items-center ">
        <div className="w-2/3 h-2/3 border-2 border-white text-white ">
          <div className="w-full">
            {messages.map((message) => {
              return <div className="bg-white text-blue-500">{message}</div>;
            })}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3">
              <input
                className="bg-white text-amber-500"
                type="text"
                onChange={(e) => setMessageInput(e.target.value)}
                value={messageInput}
              />
              <button className="bg-amber-800" onClick={handleSendMessage}>
                Send
              </button>
            </div>
            <div>
              <input
                className="bg-white text-amber-500"
                type="text"
                onChange={(e) => setRoomNumber(e.target.value)}
              />
              <button className="bg-amber-700" onClick={handleJoinRoom}>
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
