"use client";
import { useState, useCallback } from "react";

import styles from "./UsernameModal.module.css";

export default function UsernameModal({ onUsernameSet, isOpen }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!username.trim()) {
        setError("Please enter a username");
        return;
      }
      if (username.trim().length < 6) {
        setError("Username must be at least 6 characters");
        return;
      }
      onUsernameSet(username.trim());
    },
    [username, onUsernameSet]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Enter your username</h2>
          <p className={styles.subtitle}>Choose a name to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              maxLength={20}
              autoFocus
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} ${
              !username.trim() ? styles.disabled : ""
            }`}
            disabled={!username.trim()}
          >
            Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
}
