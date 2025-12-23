"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { connect, sendMessage, broadcast, disconnect } from "../lib/sockjs";

import styles from "./ChatLayout.module.css";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import UsernameModal from "./UsernameModal";

const defaultGroups = [
  {
    id: "g-1",
    name: "Group - 1",
    active: true,
  },
];

export default function ChatLayout({ initialMessages = [] }) {
  const [username, setUsername] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const counter = useRef(1000);
  const [groups, setGroups] = useState(defaultGroups);
  const [currentGroup, setCurrentGroup] = useState(groups[0]);

  const getCurrentTime = useCallback(() => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const generateId = useCallback(() => {
    return `msg-${counter.current++}`;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessages([]);
      counter.current = 1000;
    }, 0);
    const onMessageReceived = (payload) => {
      const received = JSON.parse(payload.body);
      if (received.type === "GROUPS") {
        setGroups(JSON.parse(received.content));
      } else if (received.type === "MESSAGE" && received.sender !== username) {
        console.log(received.sender, username);
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
      }
    };
    connect(currentGroup.id, onMessageReceived);
    return () => {
      disconnect();
    };
  }, [currentGroup, username]);

  if (username === null) {
    return (
      <>
        <UsernameModal
          isOpen={true}
          onUsernameSet={(name) => {
            setUsername(name);
          }}
        />
        <div className={styles.layout}>
          {" "}
          <div className={styles.container}></div>
        </div>
      </>
    );
  }

  const sendMessageHandler = (text) => {
    if (!text.trim()) return;
    const currentTime = getCurrentTime();
    const msg = {
      id: `me-${generateId()}`,
      author: username,
      time: currentTime,
      text: text.trim(),
      incoming: false,
    };
    setMessages((prev) => [...prev, msg]);
    sendMessage(currentGroup.id, msg);
  };

  const addGroup = () => {
    const newGroups = [
      ...groups,
      {
        id: `g-${groups.length + 1}`,
        name: `Group - ${groups.length + 1}`,
        active: false,
      },
    ];
    setGroups(newGroups);
    broadcast("GROUPS", JSON.stringify(newGroups));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Sidebar
          username={username}
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
