package com.sevketbuyukdemir.websocket_server.model;

import lombok.Data;

@Data
public class ChatMessage {
    private String type;
    private String groupId;
    private String sender;
    private String content;
    private String time;
}