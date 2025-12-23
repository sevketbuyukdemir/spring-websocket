"use client";
import { useRef, useState } from "react";
import styles from "./InputArea.module.css";

export default function InputArea({ onSend }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Type a message..."
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.actionButtons}>
          <button className={styles.sendBtn} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
      <div className={styles.inputHint}>
        Press Enter to send, Shift + Enter for new line
      </div>
    </div>
  );
}
