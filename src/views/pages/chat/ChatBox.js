import { useEffect, useState } from "react";
import MessageList from "./MessageInput";
import MessageInput from "./MessageList";
import { io } from "socket.io-client";

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [socket, setSocket] = useState(null); 
    useEffect(() => {
        const newSocket = io("http://localhost:3001", {
        withCredentials: true,
    });
    setSocket(newSocket);  
    newSocket.on("chat message", (msg) => {
        setMessages((prev) => [...prev, msg]);
    });  
    return () => newSocket.disconnect();
    }, []);  
    const handleSend = () => {
        if (!text.trim() || !socket) return;  
        const newMessage = {
            user: { role: "ادمین" },
            text: text.trim(),
        };  
        socket.emit("chat message", newMessage);
        setMessages((prev) => [...prev, newMessage]);
        setText("");
    }; 
    return (
        <div className="d-flex flex-column gap-3">
            <MessageList messages={messages} />
            <MessageInput onSend={handleSend} />
        </div>
    );
}