import ChatLayout from "@/components/ChatLayout";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main>
        <ChatLayout groupId="defaultGroup" />
      </main>
    </div>
  );
}
