"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { connect, sendMessage, disconnect } from "../lib/sockjs";

import styles from "./ChatLayout.module.css";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MessageList from "./MessageList";
import InputArea from "./InputArea";

const defaultGroups = [
  {
    id: "g-0",
    name: "Group - 0",
    active: true,
  },
];

export default function ChatLayout({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const messageIdCounter = useRef(1000);
  const [groups, setGroups] = useState(defaultGroups);
  const [currentGroup, setCurrentGroup] = useState(groups[0]);

  const getCurrentTime = useCallback(() => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const generateMessageId = useCallback(() => {
    return `msg-${messageIdCounter.current++}`;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessages([]);
      messageIdCounter.current = 1000;
    }, 0);
    const onMessageReceived = (payload) => {
      const received = JSON.parse(payload.body);
      const msg = {
        id: `ws-${Date.now()}`,
        author: received.sender,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: received.content,
        incoming: true,
      };
      setMessages((prev) => [...prev, msg]);
    };
    connect(currentGroup.id, onMessageReceived);
    return () => {
      disconnect();
    };
  }, [currentGroup]);

  const sendMessageHandler = (text) => {
    if (!text.trim()) return;
    const currentTime = getCurrentTime();
    const msg = {
      id: `me-${generateMessageId()}`,
      author: "You",
      time: currentTime,
      text: text.trim(),
      incoming: false,
    };
    setMessages((prev) => [...prev, msg]);
    sendMessage(currentGroup.id, msg);
  };

  const addGroup = () => {
    setGroups((prev) => [
      ...prev,
      {
        id: `g-${groups.length + 1}`,
        name: `Group - ${groups.length + 1}`,
        active: false,
      },
    ]);
  };

  return (
    <div className={styles.layout}>
      {JSON.stringify(currentGroup)}
      <div className={styles.container}>
        <Sidebar
          groups={groups}
          currentGroup={currentGroup}
          onGroupSelect={setCurrentGroup}
          addGroup={addGroup}
        />
        <div className={styles.main}>
          <Header title={currentGroup.name} />
          <MessageList messages={messages} />
          <InputArea onSend={sendMessageHandler} />
        </div>
      </div>
    </div>
  );
}
