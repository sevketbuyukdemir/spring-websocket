import styles from "./MessageBubble.module.css";

export default function MessageBubble({ message }) {
  const isIncoming = message.incoming;

  return (
    <div
      className={`${styles.messageGroup} ${
        isIncoming ? styles.incoming : styles.outgoing
      }`}
    >
      {!isIncoming && <div className={styles.avatar}></div>}
      <div className={styles.bubbleContainer}>
        <div className={styles.messageHeader}>
          <span className={styles.author}>{message.author}</span>
          <span className={styles.time}>{message.time}</span>
        </div>
        <div
          className={`${styles.bubble} ${
            isIncoming ? styles.incomingBubble : styles.outgoingBubble
          }`}
        >
          {message.text}
        </div>
      </div>
      {isIncoming && <div className={styles.avatar}></div>}
    </div>
  );
}
