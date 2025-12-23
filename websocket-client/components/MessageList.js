import styles from "./MessageList.module.css";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  return (
    <main className={styles.messageList}>
      <div className={styles.dateDivider}>
        <span>Today</span>
      </div>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </main>
  );
}
