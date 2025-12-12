import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/messages")
        .then((res) => res.json())
        .then((data) => setMessages(data));

        socket.on("chat message", (msg) => {
        setMessages((prev) => [...prev, msg]);
        });

        return () => {
        socket.off("chat message");
        socket.disconnect();
        };
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const message = {
        user: { role: "ادمین" },
        text: input,
        time: new Date().toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
    socket.emit("chat message", message);
    setInput("");
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-light p-3"> 
        <div className="overflow-auto mb-2 border rounded p-3 " style={{height: "60vh", background: "url('/public/telegram.jpg')", backgroundSize:"cover", backgroundPosition:"center"}}>
            {messages.length > 0 ? (
            messages.map((msg, index) => (
                <div
                key={index}
                className ={`d-flex mb-2 p-2 rounded shadow ${
                    msg.user?.role === "ادمین"
                    ? "bg-info text-end ms-auto"
                    : "bg-white text-start me-auto"
                }`}
                style={{maxWidth:'15%'}}
                >
                <span className="text-secondary fw-bold">{msg.user?.role}</span> ({msg.time}):<br />
                {msg.text}
                </div>
            ))
            ) : (
            <p className="text-muted bg-white py-3 rounded text-center" style={{width:"150px"}}>هیچ پیامی وجود ندارد</p>
            )}
        </div>
        <form onSubmit={handleSend} className="d-flex">
            <input
            type="text"
            className ="form-control py-1 me-2 border-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            />
            <button type="submit" className="px-4 btn btn-primary">
            ارسال
            </button>
        </form>
        </div>
    );
};

export default ChatBox;