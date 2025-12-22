package com.sevketbuyukdemir.websocket_server.model;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String groupId;
    private String content;
    private String timestamp;
}