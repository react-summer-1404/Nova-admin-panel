export default function MessageList({ messages= [] }) {
    return (
        <div className="d-flex flex-column gap-2">
            {messages.map((msg) => (
            <div
                key={msg._id}
                 className={`d-flex ${msg.user?.role === "ادمین" ? "justify-content-end" : "justify-content-start"}`}
            >
                <div className="bg-light border rounded px-3 py-2">
                <strong>{msg.user?.role}:</strong> {msg.text}
                </div>
            </div>
            ))}
        </div>
        );
}