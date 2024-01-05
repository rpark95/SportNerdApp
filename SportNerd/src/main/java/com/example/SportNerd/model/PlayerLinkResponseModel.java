package com.example.SportNerd.model;

public class PlayerLinkResponseModel {
    String teamName;

    public PlayerLinkResponseModel(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
