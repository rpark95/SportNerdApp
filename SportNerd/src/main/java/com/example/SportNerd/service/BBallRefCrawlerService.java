package com.example.SportNerd.service;

import com.example.SportNerd.model.NBATeams;
import com.example.SportNerd.model.PlayerTeamModel;
import com.example.SportNerd.repository.PlayerTeamRepo;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BBallRefCrawlerService extends WebCrawlerService {
    String url = "https://www.basketball-reference.com/teams/%s/%s.html";
    @Autowired
    PlayerTeamRepo playerTeamRepo;

    public BBallRefCrawlerService() {
    }

    public List<PlayerTeamModel> extractData() {
        int year = LocalDate.now().getYear();
        List<PlayerTeamModel> playerTeamModels = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            for (NBATeams nbaTeam : NBATeams.values()) {
                try {
                    String formattedUrl = url.formatted(nbaTeam, String.valueOf(year));
                    System.out.println(formattedUrl);

                    List<String> teamMembers = new ArrayList<>();
                    initWebDriverAndLinks("/html/body/div[2]/div[5]/div[3]/div[2]/table/tbody/tr[1]/td[1]", formattedUrl, ".bbr");
                    Elements coachElement = links.select("p:contains(Coach:)");

                    // Extract the coach's name
                    String coachName = coachElement.select("a").text();
                    List<String> coachNames = Arrays.stream(coachName.split(" ")).toList();
                    for (int j = 0; j < coachNames.size() - 1; j+=2) {
                        String name = coachNames.get(j) + " " + coachNames.get(j+1);
                        playerTeamModels.add(new PlayerTeamModel(name, nbaTeam.getName(), year));
                    }
                    teamMembers.add(coachName);

                    Element rosterElement = links.select(".sortable").first();
                    Elements players = rosterElement.select("td[data-stat=player] a");
                    for (Element player : players) {
                        playerTeamModels.add(new PlayerTeamModel(player.text(), nbaTeam.getName(), year));
                    }
                } catch (Exception e) {
                    System.out.println("Error caught");
                    System.out.println("Nba Team " + nbaTeam.getName() + " " + "Year " + year);
                    e.printStackTrace();
                }
            }
            year -= 1;
        }
        for (PlayerTeamModel playerTeamModel : playerTeamModels) {
            try {
                playerTeamRepo.save(playerTeamModel);
            } catch (Exception e) {
                System.out.println("Error saving");
            }
            System.out.println(playerTeamModel.getPlayerName() + " " + playerTeamModel.getTeamName() + " " + playerTeamModel.getYear());
        }
        return playerTeamModels;
    }
}
