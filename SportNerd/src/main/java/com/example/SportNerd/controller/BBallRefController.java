package com.example.SportNerd.controller;

import com.example.SportNerd.model.PlayerTeamModel;
import com.example.SportNerd.service.BBallRefCrawlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class BBallRefController {
    @Autowired
    BBallRefCrawlerService bBallRefCrawlerService;
    @PostMapping("/roster")
    public List<PlayerTeamModel> createRoster() {
        return bBallRefCrawlerService.extractData();
    }
}
