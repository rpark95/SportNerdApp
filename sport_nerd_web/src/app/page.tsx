'use client'
import Image from 'next/image'
import PlayerInput from '../component/PlayerInput'
import PlayerCard, { CardProps } from '@/component/PlayerCard'
import React, { useState, ReactNode, useEffect } from 'react';
import TeamCard from '@/component/TeamCard';
import LinkCard, { LinkCardProps } from '@/component/LinkCard';
import { LinkProps } from 'next/link';

export default function Home() {
  const [defaultPlayerName, setDefaultPlayerName] = useState<string>('');
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  // State to keep track of the order
  const [playerIndex, setPlayerOrder] = useState<number>(0);
  let teamIndex = 1;
  const [linkIndex, setLinkOrder] = useState<number>(2);

  // State to manage link cards
  const [linkCards, setLinkCards] = useState<React.ReactElement<LinkCardProps>[]>([]);

  //fetch list of players and pick one at random to start the game
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/player_name_list.txt'); // Replace with the actual path to your text file
        
        // Clone the response before reading the text content
        const clonedResponse = response.clone();
        const content = await clonedResponse.text();
        //console.log("Content " + content);
        const namesArray: string[] = content.split('\n'); // Split by lines and remove empty strings
        const randomIndex = Math.floor(Math.random() * namesArray.length);
        console.log("Random Name " + namesArray[randomIndex]);
        setDefaultPlayerName(namesArray[randomIndex]);
        setCurrentPlayerName(namesArray[randomIndex]);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };
    fetchNames();
  }, []);

  const defaultPlayerCard = <PlayerCard key={playerIndex} name={defaultPlayerName}/>

  // Function to add a new player card
  const findPlayerLink = async (playerName: string, currentPlayerName:string) => {
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
    if (teamNames.length == 0) {
      console.log("Team Names Empty");
      return;
    }
  
    addLinkCard(playerName, currentPlayerName, teamNames);
    
    
  };

  const addLinkCard = (playerName: string, currentPlayerName: string, teamNames: string[]) => {
    console.log("Player Name " + playerName);
    console.log("Current Player " + currentPlayerName);
    console.log("Team Name " + teamNames);
    setPlayerOrder((prevOrder) => prevOrder + 1);
    
    const newPlayerCard = <PlayerCard key={playerIndex} name={playerName} />;
    
    teamIndex += 1;
    let teamCards: React.ReactElement<CardProps>[] = [];
    console.log("Team Names " + teamNames);
    for (const team of teamNames) {
      const newTeamCard = <TeamCard key={teamIndex} name={team} />;
      teamIndex += 1;
      teamCards.push(newTeamCard);
    }
    
    const newLinkCard = <LinkCard key={linkIndex} playerCard={newPlayerCard} teamCards={teamCards}/>;

    //console.log("Link Index " + linkIndex);
    // Update the order for the next player card
    
    teamIndex += 1;
    setLinkOrder((prevOrder) => prevOrder + 1);

    // Add the new player card at the beginning of the array
    setLinkCards((prevLinkCards) => [newLinkCard, ...prevLinkCards]);

    setCurrentPlayerName(playerName);
  }


  return (
    <main >
      <div className="player-input">
        <PlayerInput onFindPlayerLink={findPlayerLink} currentPlayer={currentPlayerName} />
      </div>
      <div className="player-cards">
        {linkCards}
        {defaultPlayerCard}
      </div>
      
    </main>
  )
}

