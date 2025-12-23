"use client";
import { useEffect, useRef } from "react";

import styles from "./MessageList.module.css";

import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className={styles.messageList}>
      <div className={styles.dateDivider}>
        <span>Today</span>
      </div>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div className={styles.endAnchor} ref={messagesEndRef} />
    </main>
  );
}
