import React, { useState } from 'react';

// Define types
type PlayerInputProps = {
    onFindPlayerLink: (playerName: string, currentPlayer:string) => void;
    currentPlayer: string;
  };

export default function PlayerInput({onFindPlayerLink: onFindPlayerLink, currentPlayer}: PlayerInputProps) {
    // State to manage the input value
    const [playerName, setPlayerName] = useState<string>('');
    // Function to handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value);
    };

    const showInputValue = () => {
        // Call the callback function to add a new player card
        onFindPlayerLink(playerName, currentPlayer);

        // Clear the input field
        setPlayerName('');
    }
    return (
        <div className="player-input">
            <input 
            type="text" 
            className="rounded-box" 
            id="textInput" 
            placeholder="Enter Player Name: "
            value={playerName}
            onChange={handleInputChange}
            />
            <button className="rounded-button" onClick={showInputValue}>
                <span className="rounded-button-content"></span>
            </button>
        </div>
    );
}