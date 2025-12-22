"use client";
import { useEffect, useState } from "react";
import { connect, sendMessage, disconnect } from "../../lib/sockjs";

export default function ChatScreen({ groupId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onMessageReceived = (payload) => {
      setMessages((prev) => [...prev, JSON.parse(payload.body)]);
    };
    connect(groupId, onMessageReceived);
    return () => {
      disconnect();
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(groupId, event.target.userId.value, event.target.message.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        {messages.map((message, index) => {
          return (
            <p
              key={index}
              style={{
                margin: 0,
                padding: 0,
                overflowWrap: "break-word",
              }}
            >{`${message.sender}: ${message.content}`}</p>
          );
        })}
      </div>
      <form
        onSubmit={handleSendMessage}
        style={{
          position: "fixed",
          bottom: "1rem",
          display: "flex",
          flexDirection: "row",
          gap: "0.2rem",
        }}
      >
        <input name="userId" type="text" required />
        <input name="message" type="text" required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
