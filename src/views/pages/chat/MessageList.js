import { useState } from "react";

export default function MessageInput({ onSend }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 " dir= 'rtl'>
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            placeholder="پیام خود را بنویسید..."
        />
        <button type="submit" className="btn btn-primary" disabled={!text.trim()}>
            ارسال
        </button>
        </form>
    );
}