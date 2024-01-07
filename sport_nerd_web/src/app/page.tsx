'use client'
import Image from 'next/image'
import PlayerInput from '../component/PlayerInput'
import PlayerCard, { PlayerCardProps } from '@/component/PlayerCard'
import React, { useState, ReactNode, useEffect } from 'react';
import TeamCard, { TeamCardProps } from '@/component/TeamCard';
import LinkCard, { LinkCardProps } from '@/component/LinkCard';
import { LinkProps } from 'next/link';
import MessagePopup, { PopupProps } from '@/component/MessagePopup';

let teamLinkMap = new Map<string, number>();
let playersGuessedSet = new Set<string>();
export const MAX_TEAM_GUESSES:number = 5;

export default function Home() {
  const [defaultPlayerName, setDefaultPlayerName] = useState<string>('');
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  // State to keep track of the order
  const [playerIndex, setPlayerOrder] = useState<number>(0);
  let teamIndex = 1;
  const [linkIndex, setLinkOrder] = useState<number>(2);

  // State to manage link cards
  const [linkCards, setLinkCards] = useState<React.ReactElement<LinkCardProps>[]>([]);
  const [dialogError, setDialogError] = useState<React.ReactElement<PopupProps> | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  //fetch list of players and pick one at random to start the game
  useEffect(() => {
    const fetchNames = async () => {
      try {
        console.log("use effect");
        const response = await fetch('/player_name_list.txt'); // Replace with the actual path to your text file
        // Clone the response before reading the text content
        console.log("use effect 2");
        const content = await response.text();
        const namesArray: string[] = content.split('\n'); // Split by lines and remove empty strings
        const randomIndex = Math.floor(Math.random() * namesArray.length);
        console.log("Random Name " + namesArray[randomIndex]);
        setDefaultPlayerName(namesArray[randomIndex]);
        setCurrentPlayerName(namesArray[randomIndex]);
        console.log("Player Card: " + defaultPlayerCard);
        //add player name to playersGuessed set
        playersGuessedSet.add(namesArray[randomIndex]);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };
    fetchNames();
  }, []);
  let defaultPlayerCard = <PlayerCard key={playerIndex} name={defaultPlayerName}/>
  // Function to add a new player card
  const findPlayerLink = async (playerName: string, currentPlayerName:string) => {
    //case where player has been used in a previous guess
    if (playersGuessedSet.has(playerName)) {
      console.log("player name already used")
      let message = playerName + "\n Already Guessed"
      showMessagePopup(message);
      return;
    }

    //retrieve links between two players
    const apiUrl = "http://localhost:8080/player_link?player1=" + playerName + "&player2=" + currentPlayerName;
    console.log("API URL " + apiUrl);
    let teamNames: string[] = [];
    try {
      const response = await fetch(apiUrl);
      const clonedResponse = response.clone();
      const teamLink = await clonedResponse.json();
      console.log(teamLink);
      for (const team of teamLink) {
        teamNames.push(team);
      }
    } catch (error) {
      console.error(error);
    }

    //case where no link exists between players
    if (teamNames.length == 0) {
      console.log("Team Names Empty");
      let message = playerName + "\n Invalid Guess";
      showMessagePopup(message);
      console.log(dialogError);
      return;
    }

    //case where players have maxed out number of times a team is used as a link
    for (let i = 0; i < teamNames.length; i++) {
      let teamName = teamNames.at(i) ?? "";
      let count = teamLinkMap.get(teamName) ?? 0;
      if (count == MAX_TEAM_GUESSES) {
        console.log("Unable to use this team link");
        let message = teamName + "\n Link Maxed Out";
        showMessagePopup(message);
        return;
      }
    }

    //guess is valid create link card
    addLinkCard(playerName, currentPlayerName, teamNames);
  };

  const addLinkCard = (playerName: string, currentPlayerName: string, teamNames: string[]) => {
    console.log("Player Name " + playerName);
    console.log("Current Player " + currentPlayerName);
    console.log("Team Name " + teamNames);
    
    //add player name to playersGuessed set
    playersGuessedSet.add(playerName);

    const newPlayerCard = <PlayerCard key={playerIndex} name={playerName} />;
    
    let teamCards: React.ReactElement<TeamCardProps>[] = [];

    for (const team of teamNames) {
      //Store number of times this team has been used as a link
      let count = teamLinkMap.get(team) ?? 0;
      teamLinkMap.set(team, count+1);
      let teamNameArr = team.split(" ");
      let teamName = teamNameArr.at(teamNameArr.length-1) ?? "";

      //Create Team Card
      const newTeamCard = <TeamCard key={teamIndex} name={teamName} xNumber={count+1} />;
      teamIndex += 1;
      teamCards.push(newTeamCard);
    }
    
    const newLinkCard = <LinkCard key={linkIndex} playerCard={newPlayerCard} teamCards={teamCards}/>;

    setPlayerOrder((prevOrder) => prevOrder + 1);
    //console.log("Link Index " + linkIndex);
    // Update the order for the next player card
    
    setLinkOrder((prevOrder) => prevOrder + 1);
    
    // Add the new player card at the beginning of the array
    setLinkCards((prevLinkCards) => [newLinkCard, ...prevLinkCards]);

    setCurrentPlayerName(playerName);
    console.log("Done creating team card");
    
    closeDialog();
  }

  const showMessagePopup = (message:string) => {
    const newDialog = <MessagePopup message={message} onClose={closeDialog}/>
    setDialogError((prevDialog) => prevDialog = newDialog);
    openDialog();
  } 


  return (
    <main >
      <div className="player-input">
        <PlayerInput onFindPlayerLink={findPlayerLink} currentPlayer={currentPlayerName} />
      </div>
      {showDialog && dialogError}
      <div className="player-cards">
        {linkCards}
        {defaultPlayerCard}
      </div>
      
    </main>
  )
}

