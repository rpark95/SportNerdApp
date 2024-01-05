package com.example.SportNerd.controller;

import com.example.SportNerd.service.PlayerLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlayerLinkController {
    @Autowired
    PlayerLinkService playerLinkService;
    @GetMapping("/player_link")
    public List<String> retrievePlayerLink(@RequestParam String player1, @RequestParam String player2) {
        return playerLinkService.retrievePlayerLink(player1, player2);
    }
}
