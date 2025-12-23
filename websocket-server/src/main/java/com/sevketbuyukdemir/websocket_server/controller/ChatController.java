package com.sevketbuyukdemir.websocket_server.controller;

import com.sevketbuyukdemir.websocket_server.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private Map<String, Set<String>> groupUsers = new ConcurrentHashMap<>();

    @MessageMapping("/chat.broadcast")
    public void broadcast(@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/group/broadcast", chatMessage);
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        String groupId = chatMessage.getGroupId();
        messagingTemplate.convertAndSend("/topic/group/" + groupId, chatMessage);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        String groupId = chatMessage.getGroupId();
        String username = chatMessage.getSender();

        groupUsers.computeIfAbsent(groupId, k -> ConcurrentHashMap.newKeySet()).add(username);
        headerAccessor.getSessionAttributes().put("username", username);
        headerAccessor.getSessionAttributes().put("groupId", groupId);

        ChatMessage joinMsg = new ChatMessage();
        joinMsg.setSender(username);
        joinMsg.setContent("joined the group");
        messagingTemplate.convertAndSend("/topic/group/" + groupId, joinMsg);
    }
}