package com.example.SportNerd.repository;

import com.example.SportNerd.model.PlayerTeamModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerTeamRepo extends JpaRepository<PlayerTeamModel, Long> {
    @Query("SELECT p FROM PlayerTeamModel p WHERE p.playerName IN (:player1, :player2)")
    List<PlayerTeamModel> findPlayers(String player1, String player2);
}
