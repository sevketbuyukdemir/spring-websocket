import ChatScreen from "@/components/Home/ChatScreen";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main>
        <h1>WebSocket Client</h1>
        <ChatScreen groupId="defaultGroup" />
      </main>
    </div>
  );
}
