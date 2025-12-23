"use client";
import { config } from "@/config";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connect = (groupId, onMessageReceived) => {
  const socket = new SockJS(config.endpoint);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe(
        `${config.destinationPrefix}${groupId}`,
        onMessageReceived
      );
    },
    (error) => {
      console.error("Error connecting to WebSocket:", error);
    }
  );
};

export const sendMessage = (groupId, message) => {
  stompClient.send(
    `/app/chat.send`,
    {},
    JSON.stringify({
      groupId: groupId,
      sender: message.author,
      content: message.text,
      time: message.time,
    })
  );
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
};
