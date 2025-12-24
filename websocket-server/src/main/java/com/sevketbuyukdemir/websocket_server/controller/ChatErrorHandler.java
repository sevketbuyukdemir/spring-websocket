package com.sevketbuyukdemir.websocket_server.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.stereotype.Controller;

@Controller
public class ChatErrorHandler {
    private final Logger logger = LogManager.getLogger(ChatErrorHandler.class);

    @MessageExceptionHandler
    public String handleException(Exception e) {
        logger.info(e.getMessage());
        return "Error: " + e.getMessage();
    }
}