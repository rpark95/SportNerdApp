package com.example.SportNerd.model;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name = "PlayerTeam", uniqueConstraints = @UniqueConstraint(columnNames = {"playerName", "teamName", "year"}))
public class PlayerTeamModel {
    @Id
    @GeneratedValue
    Long id;
    String playerName;
    String teamName;
    int year;
    @Autowired
    public PlayerTeamModel() {
    }

    public PlayerTeamModel(String playerName, String teamName, int year) {
        this.playerName = playerName;
        this.teamName = teamName;
        this.year = year;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
