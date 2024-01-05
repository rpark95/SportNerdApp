package com.example.SportNerd.service;

import com.example.SportNerd.model.PlayerLinkResponseModel;
import com.example.SportNerd.model.PlayerTeamModel;
import com.example.SportNerd.repository.PlayerTeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PlayerLinkService {
    @Autowired
    PlayerTeamRepo playerTeamRepo;
    public List<String> retrievePlayerLink(String player1, String player2) {
        Set<String> teamYearCounter = new HashSet<>();
        Set<String> teamMateList = new HashSet<>();
        if (player1.equals(player2)) {
            return teamMateList.stream().toList();
        }
        List<PlayerTeamModel> teamList = playerTeamRepo.findPlayers(player1, player2);
        PlayerLinkResponseModel response = new PlayerLinkResponseModel("");
        //order list in descending by year
        for (PlayerTeamModel ptm : teamList) {
            String key = ptm.getTeamName() + ptm.getYear();
            if (teamYearCounter.contains(key)) {
                teamMateList.add(ptm.getTeamName());
            }
            teamYearCounter.add(key);
        }
        return teamMateList.stream().toList();
    }
}
