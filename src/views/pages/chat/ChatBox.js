// import { useEffect, useState } from "react";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";
// import { io } from "socket.io-client";

// export default function ChatBox() {
//     const [messages, setMessages] = useState([]);
//     const [text, setText] = useState("");
//     const [socket, setSocket] = useState(null); 
//     useEffect(() => {
//         const newSocket = io("http://localhost:3001", {
//         withCredentials: true,
//         auth: {
//             token : localStorage.getItem("token")
//         }
//     });
//     newSocket.on("connect", () => {
//         console.log("✅ Socket connected:", socket.id);
//       });
//     setSocket(newSocket);  
//     newSocket.on("chat message", (msg) => {
//         setMessages((prev) => [...prev, msg]);
//     });  
//     return () => newSocket.disconnect();
//     }, []);  
//     const handleSend = () => {
//         if (!text.trim() || !socket) return;  
//         const newMessage = {
//             user: { role: "ادمین" },
//             text: text.trim(),
//         };  
//         socket.emit("chat message", newMessage);
//         setMessages((prev) => [...prev, newMessage]);
//         setText("");
//     }; 
//     return (
//         <div className="d-flex flex-column gap-3">
//             <MessageList messages={messages} />
//             <MessageInput onSend={handleSend} />
//         </div>
//     );
// }

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001"); // اتصال به سرور سوکت

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     // اتصال اولیه
//     socket.on("connect", () => {
//       console.log("✅ Connected to server:", socket.id);
//     });

//     // دریافت پیام از سرور
//     socket.on("chat message", (msg) => {
//       console.log("📩 Received message:", msg);
//       setMessages((prev) => [...prev, msg]);
//     });

//     // قطع اتصال
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // ارسال پیام به سرور
//     socket.emit("chat message", input);
//     setInput("");
//   };

//   return (
//     <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
//       <h2>💬 ChatBox</h2>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "1rem",
//           height: "300px",
//           overflowY: "auto",
//           marginBottom: "1rem",
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div key={index} style={{ marginBottom: "0.5rem" }}>
//             {msg}
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSend}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           style={{ width: "80%", padding: "0.5rem" }}
//         />
//         <button type="submit" style={{ padding: "0.5rem 1rem" }}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;


import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("chat message", (msg) => {
      console.log("📩 Received message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = {
      user: { role: "ادمین" }, // یا "مستخدم" برای کاربر
      text: input,
      time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("chat message", message);
    setInput("");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <h2>💬 چت</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.user?.role || "ناشناس"}</strong> ({msg.time}): {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          ارسال
        </button>
      </form>
    </div>
  );
};

export default ChatBox;